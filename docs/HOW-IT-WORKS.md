# How it works

This page is a walkthrough for someone who has never looked at a website's code before — maybe a curious kid, maybe a curious grown-up. It follows four everyday moments on [enki.ngo](https://enki.ngo) and tells the small story of what the computer actually does at each one, with a tiny snippet of the real code alongside.

No jargon left unexplained on purpose: if a word like "array" or "listener" shows up, it gets a one-line translation the first time.

---

## 1. What happens when you open the page

**The story:** you type `enki.ngo` and hit enter. A moment later, the page appears — already in the right language, if you've visited before.

1. Your browser downloads `index.html`. Right at the top, before your eyes see anything, a small script runs. It's the very first thing the page does.
2. That script asks the browser's `localStorage` — a tiny bit of memory the browser keeps for each website, even after you close the tab — "did this visitor pick a language last time?"

   ```js
   var l = 'en';
   try { l = localStorage.getItem('enki-lang') || 'en'; } catch (e) {}
   ```

   If nothing is stored yet, `l` just stays `'en'` (English).
3. It checks that answer against the list of 20 languages we actually support, and falls back to English if it doesn't recognise it (so a corrupted or old value can never break the page).
4. If the saved language reads right-to-left — Arabic, Hebrew or Urdu — the script flips the whole page's text direction:

   ```js
   if (['ar', 'he', 'ur'].indexOf(window.ENKI_LANG) > -1) document.documentElement.dir = 'rtl';
   ```
5. If the language isn't English, the script injects one more `<script>` tag that loads that language's dictionary file — a big list of `{ "key": "translated text" }` pairs — from `assets/i18n/<lang>.js`, *before* the rest of the page keeps loading.
6. Only after all of that does the visible page start being built: CSS is applied, images load, and `app.js` runs. Near the very start of `app.js`, one function walks the whole page looking for any element tagged `data-i18n="something"` and replaces its text with the matching entry from the dictionary that was just loaded. If no dictionary was loaded (because you're viewing it in English), nothing changes — the HTML already has the English text written in by hand.

**Why do it this way, instead of translating after the page shows up?** Because doing it *before* anything is visible means you never see a flash of English before it switches — the page simply appears already in your language.

---

## 2. What happens when you click a language

**The story:** you click the little globe icon and pick "Português". The page reloads and now everything — headings, buttons, even the video subtitles — is in Portuguese.

1. Clicking the globe opens a small dialog listing all 20 supported languages. This dialog is just a `<div>` that was sitting hidden in the HTML the whole time; clicking the globe simply removes the "hidden" attribute.
2. Each language in that list is a clickable option. Clicking "Português" runs a short function that does two things:

   ```js
   try { localStorage.setItem('enki-lang', 'pt'); } catch (e) {}
   location.reload();
   ```

   First, it writes `'pt'` into `localStorage` under the key `enki-lang` — the same slot the bootstrap script (from Step 1) checks every time the page loads. Second, it reloads the page.
3. Because the page reloads, the whole Step 1 sequence runs again from scratch — except this time, `localStorage.getItem('enki-lang')` returns `'pt'` instead of nothing, so the Portuguese dictionary gets loaded instead of English.
4. There's no separate "translate this page" logic that runs when you click — the click's *only* job is to remember your choice and start over. All the actual translating happens through the exact same `data-i18n` lookup mechanism described in Step 1, just fed a different dictionary.
5. The saved choice sticks around: next time you visit, even weeks later, `localStorage` still remembers `'pt'`, so the page opens in Portuguese immediately, without you clicking anything.

**A neat side effect:** because translating is just "swap this element's text for a value from a lookup table," the *same* mechanism also translates things you might not expect, like the alt text on images, form placeholder text, and even the subtitle lines in the intro film (more on that in Step 4) — anything tagged with a `data-i18n`-style attribute gets swapped, not just plain paragraph text.

---

## 3. What happens when you submit a form

**The story:** you fill out the "Add your build" form to add a project to the Registry, click through a few steps, hit "Submit," and see a thank-you message.

1. The form isn't one long page — it's a **wizard**: several `<div>` "panels," only one of which is visible at a time. Clicking "Next" hides the current panel and shows the next one; clicking "Back" reverses that. Nothing is submitted yet at this point — you're just filling in fields, one screen at a time, and the code is checking each screen has valid data before letting you move forward (a required field left empty, for instance, keeps "Next" from working).
2. The very last panel is a "Review" screen showing everything you typed back to you, so you can double-check it before it's final.
3. When you click the real "Submit" button, the JavaScript gathers everything you typed into one plain object — basically a labelled box for each answer — and turns it into a JSON string (JSON is just a standard, simple way to write data as text so it can travel between a browser and a server):

   ```js
   fetch('api/submit.php', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ kind: 'registry', payload: formData, page: location.pathname })
   })
   ```
4. That request travels over the internet to `api/submit.php` — the one piece of the site that isn't just files sitting in a browser, but a small program that runs on the server. It:
   - checks the request is actually coming from Enki's own website (not some other site trying to sneak data in),
   - double-checks every field is a sane shape and length (nobody's allowed to send something absurdly long or oddly formatted),
   - makes sure the same visitor hasn't already submitted more than 10 times in the last 10 minutes (a simple defence against spam),
   - and then saves everything as one new row in a small database file.
5. The server sends back a tiny reply — literally the text `{"ok":true}` — and the browser's JavaScript, seeing that reply, swaps the form's last panel for a "thank you, your submission is pending review" message.
6. Nothing you submitted appears on the live Registry immediately. It's stored as **pending**; a real person looks at every submission before it's added to the public page. Nothing here publishes automatically.

**Why store it in a database file instead of, say, a spreadsheet?** A tiny embedded database (called SQLite) lets the server search, sort, and count entries reliably — like checking "has this visitor submitted 10 times in the last 10 minutes?" — something that's awkward to do quickly with a plain text file, while still being just one file on disk, nothing fancy to install or run separately.

---

## 4. How the video subtitles work

**The story:** the site opens with a short intro film. As it plays, lines of dialogue appear and disappear at the bottom of the screen, perfectly timed to what's being said — and if your language is French, the subtitles are in French too.

1. Subtitles are just a list, hardcoded into the page's JavaScript, of "at this time, show this text":

   ```js
   var CUES = [
     [3.4, 7, 'Only the hard and strong may call themselves Spartans.'],
     [8.3, 10, 'Only the hard.'],
     // ...
   ];
   ```

   Each entry means: "between 3.4 and 7 seconds into the video, show this exact sentence." That's it — there's no fancy subtitle file format involved, just a plain array of `[startTime, endTime, text]`.
2. While the video plays, the browser fires a `timeupdate` event many times per second — basically the video tapping the code on the shoulder every so often to say "hey, I've moved forward, in case you care." Each time that happens, a function checks the video's current playback time against every cue in the list:

   ```js
   function renderSubs() {
     var t = video.currentTime;
     for (var i = 0; i < CUES.length; i++) {
       if (t >= CUES[i][0] && t <= CUES[i][1]) { subsEl.textContent = CUES[i][2]; return; }
     }
   }
   ```

   If the current time falls inside a cue's start/end window, that cue's text gets written into the subtitle box on screen. If it falls between cues, the subtitle box goes empty.
3. If you're viewing the page in a language other than English, the exact same list of `[startTime, endTime, text]` triples exists again, but with the third item translated — same timings, different words. The subtitle code doesn't need to know or care which language it's showing; it just always reads whichever `CUES` list is currently active, which the i18n system (Steps 1 and 2) swapped in for you.
4. This is also why the translation checking scripts (mentioned in the [README](../README.md#how-the-translations-were-made)) specifically check that every language's cue *timings* — the numbers, not the words — match the English original exactly. If a translated cue's start/end times drifted even slightly, the subtitles would show the wrong line at the wrong moment, out of sync with the actors' mouths.
5. There's also a custom progress bar under the video, drawn and animated by hand rather than using the browser's built-in video controls — its filled width is recalculated on every `timeupdate` too, using the same "how far through the video are we" math, just turned into a percentage instead of a subtitle lookup.

**The one-sentence version:** subtitles are just a stopwatch and a lookup table — "what time is it *in the video*, and what sentence is scheduled for that time?" — asked several times a second, for as long as the film plays.

---

*This walkthrough is a companion to [`README.md`](../README.md) and [`docs/WEBSITE.md`](WEBSITE.md), which cover the same ground more tersely for readers who already know how websites work. Repo: [github.com/paulfxyz/enki](https://github.com/paulfxyz/enki).*
