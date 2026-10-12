const fs=require('fs'),path=require('path'),vm=require('vm'),ch=require('cheerio');
const root=path.resolve(__dirname,'..'),routes=JSON.parse(fs.readFileSync(root+'/routes.json'));
const pages=Object.keys(routes.en),origin='https://enki.ngo',rtl=['ar','he','ur'];
const url=(lang,page)=>'/'+lang+(routes[lang][page]?'/'+encodeURIComponent(routes[lang][page]):'');
function localize(href,lang){
 if(!href||href.startsWith('#')||/^(mailto:|tel:|data:)/i.test(href))return href;
 let u;try{u=new URL(href,origin+'/')}catch{return href;}
 if(!['enki.ngo','www.enki.ngo'].includes(u.hostname))return href;
 let parts=decodeURIComponent(u.pathname).replace(/^\/|\/$/g,'').replace(/\.html$/,'').split('/');
 const from=routes[parts[0]]?parts.shift():'en',slug=parts.join('/');
 const page=pages.find(p=>routes[from][p]===slug)||(pages.includes(slug)?slug:null);
 if(!page)return href;
 const target=routes[u.searchParams.get('lang')]?u.searchParams.get('lang'):lang;
 u.searchParams.delete('lang');return url(target,page)+u.search+u.hash;
}
fs.writeFileSync(root+'/routes-data.js','window.ENKI_ROUTE_DATA = '+JSON.stringify(routes)+';\n');
const sitemap=[];
for(const lang of Object.keys(routes)){
 const ctx={window:{}};let dict;
 if(lang==='en')dict=JSON.parse(fs.readFileSync(root+'/assets/i18n/en.json')).strings;
 else{vm.runInNewContext(fs.readFileSync(root+'/assets/i18n/'+lang+'.js','utf8'),ctx);dict=ctx.window.ENKI_I18N.strings;}
 const output={};
 for(const page of pages){
  const $=ch.load(fs.readFileSync(root+'/'+page+'.html','utf8'));
  $('html').attr({'lang':lang,'dir':rtl.includes(lang)?'rtl':'ltr','data-locale':lang,'data-page':page});
  $('[data-i18n]').each((_,el)=>{
   const k=$(el).attr('data-i18n');if(typeof dict[k]!=='string')return;
   const svgs=$(el).find('svg').toArray().map(n=>$.html(n));
   if($(el).is('text'))$(el).text(dict[k]);
   else $(el).html(dict[k].replace(/\{\{svg(\d+)\}\}/g,(_,n)=>svgs[n-1]||''));
  });
  for(const attr of ['aria-label','alt','title','placeholder','content'])$('[data-i18n-'+attr+']').each((_,el)=>{
   const k=$(el).attr('data-i18n-'+attr)+'@'+attr;if(typeof dict[k]==='string')$(el).attr(attr,dict[k]);
  });
  $('link[rel=canonical]').attr('href',origin+url(lang,page));
  $('meta[property="og:url"]').attr('content',origin+url(lang,page));
  $('link[hreflang]').remove();
  for(const l of Object.keys(routes))$('head').append($('<link>').attr({rel:'alternate',hreflang:l,href:origin+url(l,page)}));
  $('head').append($('<link>').attr({rel:'alternate',hreflang:'x-default',href:origin+url('en',page)}));
  if(page==='simple'){
   const d=JSON.parse($('#sx-data').text())[lang];
   // Useful localized content is present even before JavaScript initializes.
   $('#sx-title').text(d.title);$('#sx-lede').text(d.lede);
   const keys={manifesto:'manifesto',protocol:'standard',client:'client',registry:'models',device:'device',institute:'institute'};
   const body=$('#sx-body').empty();
   for(const section of d.sections){
    const el=$('<section class="sxsec">').attr('data-sx-section',section.key).append($('<h2>').text(section.h));
    section.p.forEach(t=>el.append($('<p>').text(t)));
    el.append($('<p>').append($('<a class="glink">').attr('href',url(lang,keys[section.key])).text(section.link)));body.append(el);
   }
   const status=$('<section class="sxsec">').attr('data-sx-section','who').append($('<h2>').text(d.status.h));
   d.status.p.forEach(t=>status.append($('<p>').text(t)));body.append(status);
   $('#sx-audio').attr('src','/simple-audio-'+lang+'.mp3?v=20261012-'+(['en','fr'].includes(lang)?'98':'97'));
  }
  $('a[href]').each((_,el)=>$(el).attr('href',localize($(el).attr('href'),lang)));
  output[page]=$.html();
  const alternates=Object.keys(routes).map(l=>`<xhtml:link rel="alternate" hreflang="${l}" href="${origin+url(l,page)}"/>`).join('');
  sitemap.push(`<url><loc>${origin+url(lang,page)}</loc>${alternates}</url>`);
  // Static preview counterparts, ignored by git and not uploaded to SiteGround.
  const preview=root+'/'+lang+(routes[lang][page]?'/'+routes[lang][page]:'');
  fs.mkdirSync(preview,{recursive:true});fs.writeFileSync(preview+'/index.html',output[page]);
 }
 fs.writeFileSync(root+'/assets/i18n/pages-'+lang+'.json',JSON.stringify(output));
}
fs.writeFileSync(root+'/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'+sitemap.join('')+'</urlset>\n');
console.log('Built '+Object.keys(routes).length*pages.length+' localized pages, canonical URLs and sitemap entries.');
