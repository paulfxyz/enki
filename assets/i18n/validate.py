# -*- coding: utf-8 -*-
import json, re, os

base = os.path.dirname(os.path.abspath(__file__))

# 1. Parse the es.js object part
content = open(os.path.join(base, "es.js"), encoding="utf-8").read()
prefix = "window.ENKI_I18N = "
assert content.startswith(prefix)
assert content.endswith(";")
obj_str = content[len(prefix):-1]
obj = json.loads(obj_str)
print("JSON parses OK")

es_strings = obj["strings"]
es_cues = obj["cues"]

en = json.load(open(os.path.join(base, "en.json"), encoding="utf-8"))
en_strings = en["strings"]
en_cues = en["cues"]

# 2. Key set diff
en_keys = set(en_strings.keys())
es_keys = set(es_strings.keys())
diff1 = en_keys - es_keys
diff2 = es_keys - en_keys
print("Keys only in en:", len(diff1), sorted(diff1)[:20])
print("Keys only in es:", len(diff2), sorted(diff2)[:20])

# 3. HTML tags / svg tokens / placeholders parity
tag_re = re.compile(r'</?[a-zA-Z][^>]*>')
svg_re = re.compile(r'\{\{svg\d\}\}')
placeholder_re = re.compile(r'\{[a-zA-Z]+\}')

mismatches = []
for k in en_keys:
    ev = en_strings[k]
    sv = es_strings.get(k, "")
    if not isinstance(ev, str):
        continue
    e_tags = sorted(tag_re.findall(ev))
    s_tags = sorted(tag_re.findall(sv))
    e_svg = sorted(svg_re.findall(ev))
    s_svg = sorted(svg_re.findall(sv))
    e_ph = sorted(placeholder_re.findall(ev))
    s_ph = sorted(placeholder_re.findall(sv))
    if e_tags != s_tags or e_svg != s_svg or e_ph != s_ph:
        mismatches.append((k, e_tags, s_tags, e_svg, s_svg, e_ph, s_ph))

print("Mismatches:", len(mismatches))
for m in mismatches[:40]:
    print(m)

# 4. Cues check
print("Cue count en/es:", len(en_cues), len(es_cues))
timing_mismatch = 0
for i, (c_en, c_es) in enumerate(zip(en_cues, es_cues)):
    if c_en[0] != c_es[0] or c_en[1] != c_es[1]:
        timing_mismatch += 1
        print("Timing mismatch at", i, c_en, c_es)
print("Timing mismatches:", timing_mismatch)

print("\nFinal counts:")
print("Keys:", len(es_strings))
print("Cues:", len(es_cues))
print("File bytes:", os.path.getsize(os.path.join(base, "es.js")))
