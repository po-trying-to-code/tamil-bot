# Tamil Translation Bot

Detects non-Tamil words on any webpage and translates them to Tamil — with native-accent voice playback using Microsoft Natural voices. Free, no API key, no backend.

---

## Quick start

Type `/translate` in any comment box on any website and press **Enter**.

---

## Files in this package

| File | Purpose |
|------|---------|
| `src/tamil-bot.js` | Core script — drop into any `<script>` tag |
| `bookmarklet/bookmarklet.js` | One-click activation for any site |
| `userscript/tamil-bot.user.js` | Tampermonkey auto-activation on every site |
| `README.md` | This file |

---

## Installation — choose one method

### Method 1 · Embed in your own website

Add one line before `</body>` in your HTML:

```html
<script src="tamil-bot.js"></script>
```

Or inline the entire script between `<script>` tags. The bot auto-discovers all comment inputs on the page and listens for `/translate`.

---

### Method 2 · Bookmarklet (activate on any site with one click)

**Step 1** — Upload `src/tamil-bot.js` to a public URL.
The easiest free option is GitHub Pages:

```
1. Create a repo at github.com (e.g. "tamil-bot")
2. Upload tamil-bot.js to the repo
3. Go to Settings → Pages → Source: main branch
4. Your script URL will be:
   https://YOUR-USERNAME.github.io/tamil-bot/tamil-bot.js
```

**Step 2** — Create the bookmarklet.
Copy this line, replacing YOUR-SCRIPT-URL with your actual URL:

```
javascript:(function(){var s=document.createElement('script');s.src='YOUR-SCRIPT-URL';document.head.appendChild(s);})();
```

**Step 3** — Save as a browser bookmark:
- Chrome/Edge: Press `Ctrl+D`, name it "Tamil Bot", paste the line as the URL
- Firefox: Bookmarks menu → New Bookmark, paste as Location

**Step 4** — Click the bookmark on any webpage to activate the bot.

---

### Method 3 · Tampermonkey userscript (auto-activates on every website)

**Step 1** — Install the Tampermonkey extension

| Browser | Link |
|---------|------|
| Chrome  | https://chrome.google.com/webstore/detail/tampermonkey |
| Edge    | https://microsoftedge.microsoft.com/addons/detail/tampermonkey |
| Firefox | https://addons.mozilla.org/en-US/firefox/addon/tampermonkey |
| Safari  | https://apps.apple.com/app/tampermonkey/id1482490089 |

**Step 2** — Create a new script

1. Click the Tampermonkey icon in your browser toolbar
2. Select **Create new script**
3. Delete all the default placeholder content

**Step 3** — Paste the script

1. Open `userscript/tamil-bot.user.js`
2. Copy its full contents
3. Open `src/tamil-bot.js`
4. Copy its full contents
5. Paste the `tamil-bot.js` content at the bottom of `tamil-bot.user.js` (below the comment that says "paste here")
6. Press `Ctrl+S` to save

**Step 4** — Verify it is active

The Tampermonkey icon should show a badge number (e.g. "1") on any webpage, indicating one active script.

---

## Voice setup — installing Microsoft Natural voices

The bot plays each word in its native accent using Microsoft Natural voices installed on your OS. The better the voices installed, the better the pronunciation.

### Windows (recommended — best voice quality)

**Step 1** — Open Voice Settings

```
Windows key → Settings → Time & language → Speech
→ Manage voices → Add voices
```

Or press `Windows + R`, type:
```
ms-settings:speech
```

**Step 2** — Search and install each language

Type the language name in the search box and click **Add**. Each voice downloads once (~50–150 MB) and works offline forever.

| Language | Search for | Voice name after install |
|----------|-----------|--------------------------|
| Tamil | `Tamil (India)` | Microsoft Pallavi Online (Natural) |
| Hindi | `Hindi (India)` | Microsoft Madhur Online (Natural) |
| Telugu | `Telugu (India)` | Microsoft Chitra Online (Natural) |
| Malayalam | `Malayalam (India)` | Microsoft Sobhana Online (Natural) |
| Kannada | `Kannada (India)` | Microsoft Sapna Online (Natural) |
| Marathi | `Marathi (India)` | Microsoft Aarohi Online (Natural) |
| Gujarati | `Gujarati (India)` | Microsoft Dhwani Online (Natural) |
| Bengali | `Bengali (India)` | Microsoft Tanishaa Online (Natural) |
| German | `German (Germany)` | Microsoft Ingrid Online (Natural) |
| French | `French (France)` | Microsoft Hortense Online (Natural) |
| Spanish | `Spanish (Spain)` | Microsoft Elvira Online (Natural) |
| **Danish** | `Danish (Denmark)` | Microsoft Christel Online (Natural) |
| Swedish | `Swedish (Sweden)` | Microsoft Hillevi Online (Natural) |
| Japanese | `Japanese (Japan)` | Microsoft Nanami Online (Natural) |
| Korean | `Korean (Korea)` | Microsoft SunHi Online (Natural) |
| Chinese | `Chinese (China)` | Microsoft Xiaoxiao Online (Natural) |
| Arabic | `Arabic (Saudi Arabia)` | Microsoft Zariyah Online (Natural) |

**Step 3** — Refresh your browser tab. No code changes needed — the bot detects new voices automatically.

---

### macOS

1. Open **System Preferences** → **Accessibility** → **Spoken Content**
2. Click **System Voice** → **Customise**
3. Search for each language and check the box next to the voice you want
4. Click **OK** — voices download in the background

Recommended voices on macOS:
- Tamil: `Pallavi`
- Hindi: `Lekha`
- German: `Anna`
- French: `Thomas`
- Danish: `Magnus` or `Sara`

---

### Linux / ChromeOS

Install `espeak-ng` for basic support:
```bash
sudo apt install espeak-ng
```

For better quality, install `festival` with language packs:
```bash
sudo apt install festival festvox-don
```

Note: Linux voices are lower quality than Microsoft Natural voices. For best results, use a Windows or macOS device.

---

## Usage

### Scan page content
Type in any comment box and press Enter:
```
/translate
```
The bot scans the article or blog post on the current page.

### Scan custom text
```
/translate Künstliche Intelligenz ist wichtig für die Zukunft
```
Scans only the text you provide — useful for testing individual words.

### Hear a word
After results appear, click the **speaker button** next to any word:
- First button: plays the word in its **original language** (German, French, Danish, Hindi, etc.)
- Second button: plays the **Tamil translation**

Click the same button again to stop playback.

### Fix a wrong translation
1. Click **✗ Wrong** on any result row
2. Type the correct Tamil translation
3. Click **Save**

The correction is remembered for the rest of your session. All future `/translate` runs will use your corrected version.

---

## Supported languages and their detection method

| Language | Script / Detection | Voice locale |
|----------|--------------------|-------------|
| English | Latin script | `en-US` |
| Hindi | Devanagari Unicode range U+0900–U+097F | `hi-IN` |
| Tamil | Tamil Unicode range U+0B80–U+0BFF (native — not translated) | `ta-IN` |
| Telugu | Telugu script U+0C00–U+0C7F | `te-IN` |
| German | Dictionary match + Latin script | `de-DE` |
| French | Dictionary match + Latin script | `fr-FR` |
| **Danish** | Dictionary match (æ/ø/å characters + known Danish words) | `da-DK` |
| Swedish | Dictionary match | `sv-SE` |
| Spanish | Dictionary match | `es-ES` |
| Japanese | Hiragana/Katakana/Kanji Unicode ranges | `ja-JP` |
| Korean | Hangul Unicode range | `ko-KR` |
| Chinese | CJK Unified Ideographs | `zh-CN` |
| Arabic | Arabic script U+0600–U+06FF | `ar-SA` |

---

## Adding Danish words to the dictionary

Open `src/tamil-bot.js` and find the `/* DANISH */` section inside the `BASE` object. Add new entries following this pattern:

```javascript
'din nye ord'  :{ t:'உங்கள் தமிழ் மொழிபெயர்ப்பு',
                  l:'Danish',
                  en:'your english meaning',
                  meaning:'short description in English' },
```

Key rules:
- The dictionary key must be **lowercase**
- Multi-word phrases are matched before single words (longest-match-first)
- `en` is the English bridge word shown below the Tamil translation
- `meaning` is the short English description shown in italics

---

## Browser compatibility

| Browser | Voice quality | Notes |
|---------|--------------|-------|
| Chrome (Windows) | Excellent | Picks up all Microsoft Natural voices |
| Edge (Windows) | Excellent | Same voice engine as Chrome |
| Safari (macOS) | Good | Uses macOS system voices |
| Firefox (Windows) | Basic | Fewer voices available via Web Speech API |
| Chrome (Android) | Basic | Limited to Google TTS voices |
| Safari (iOS) | Good | Uses iOS system voices |

---

## Cost

**Zero.** The Web Speech API is a browser standard — it uses OS-installed voices and requires no server, no API key, and no internet connection once voices are downloaded. There is no rate limit and no usage cap regardless of how many users run the bot.

---

## How the voice matching works

When the bot loads, it calls `window.speechSynthesis.getVoices()` and builds a priority map. For Danish it searches for voices in this order:

```
1. Microsoft Christel (female)  — da-DK
2. Microsoft Jeppe (male)       — da-DK
3. Any voice with lang = "da-DK"
4. Any voice with lang starting with "da"
5. Falls back silently (no error thrown)
```

This means the bot works even if only the older non-Natural voices are installed — it just uses the best available option.

---

## License

MIT License — free to use, modify, and distribute for any purpose including commercial use. Attribution appreciated but not required.
