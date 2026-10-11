# How the website works

This is a guide to the website, not a description of a working Enki AI mesh. The pages explain the initiative and collect applications; the proposed device and standard are separate engineering work.

## Opening a page

Your browser downloads HTML, styles and scripts. A small startup script reads a saved language and theme from local storage; this storage is a browser preference, not an Enki account. A supported non-English choice loads its dictionary and, where appropriate, a right-to-left layout.

The English text is written into the HTML. Translations replace tagged content after the dictionary loads, and missing entries may fall back to English. The October 2026 audit deliberately updates only English, so existing translations must not be assumed to contain the same revised claims.

## Browsing models

The catalogue is data rendered into cards. English uses `registry-en.js`, while legacy translations still use their existing data. Each audited English entry links to publisher evidence; those descriptions are not Enki's own benchmark results.

Hosted rates are a dated catalogue snapshot with separate input and output prices. The website does not measure a visitor's hardware, calculate their electricity bill or establish self-hosting savings.

## Applying

The wizard keeps answers in memory as the applicant selects a lane, skills, a contribution example and contact details. Moving between steps does not send an application. Reloading or closing the page may lose unsent answers.

The final review screen shows what will be sent. Clicking Send transmits the answers and included attachments to the PHP endpoint. A success message requires the server to acknowledge storage; failure leaves the answers available for correction or retry.

The PHP endpoint checks the request, enforces size and rate limits, and stores a row in an SQLite database outside the web root. It does not automatically admit members or publish submissions. The intended human-review process does not guarantee a reply date.

## Audio and video

The simple explanation has prerecorded narration selected by language. Changing the page copy does not change the audio automatically, so a release needs an explicit narration update.

The intro film uses timed subtitle cues and custom playback controls. Film, soundtrack and third-party quotations have separate rights; the website's code licence does not relicense those materials.
