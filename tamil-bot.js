/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║              TAMIL TRANSLATION BOT  v1.0.0                   ║
 * ║   Type /translate in any comment box to scan page content     ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * HOW IT WORKS
 *   1. Detects all non-Tamil words in page content or custom text
 *   2. Shows Tamil translation + English bridge meaning
 *   3. Plays each word in its native accent (Microsoft Natural voices)
 *   4. Inline Correct / Wrong feedback with live correction
 *
 * COMMANDS (type in any comment box, press Enter)
 *   /translate              -> scans current page content
 *   /translate <your text>  -> scans the text you provide
 *
 * SUPPORTED LANGUAGES
 *   Indian  : Hindi, Tamil, Telugu, Malayalam, Kannada, Marathi,
 *             Gujarati, Bengali, Punjabi, Urdu
 *   European: English, German, French, Spanish, Italian, Portuguese,
 *             Russian, Polish, Swedish, Danish, Dutch, Norwegian
 *   Asian   : Japanese, Korean, Chinese, Thai, Vietnamese, Indonesian
 *   Other   : Arabic, Turkish
 *
 * VOICE ENGINE
 *   Web Speech API - 100% free, no API key, runs on-device
 *   Uses Microsoft Natural voices installed via Windows Settings
 *
 * LICENSE : MIT
 * VERSION : 1.0.0
 */

(function () {
  'use strict';

  if (window.__tamilBotLoaded) return;
  window.__tamilBotLoaded = true;

  /* ─────────────────────────────────────────────────────────────
     1. CONFIGURATION
  ───────────────────────────────────────────────────────────── */
  var CFG = {
    command    : '/translate',
    speechRate : 0.82,
    speechGap  : 60,

    voicePriority: {
      'en-US': ['Aria','Jenny','Guy','Zira','David'],
      'hi-IN': ['Madhur','Swara'],
      'ta-IN': ['Pallavi','Valluvar'],
      'te-IN': ['Chitra','Mohan'],
      'ml-IN': ['Sobhana','Midhun'],
      'kn-IN': ['Sapna','Gagan'],
      'mr-IN': ['Aarohi','Manohar'],
      'gu-IN': ['Dhwani','Niranjan'],
      'bn-IN': ['Tanishaa','Bashkar'],
      'pa-IN': ['Ojas','Vaani'],
      'ur-PK': ['Uzma','Asad'],
      'de-DE': ['Ingrid','Katja','Conrad','Hedda'],
      'fr-FR': ['Hortense','Denise','Henri','Julie'],
      'es-ES': ['Elvira','Helena','Alvaro'],
      'it-IT': ['Elsa','Isabella','Diego'],
      'pt-PT': ['Helia','Duarte','Raquel'],
      'ru-RU': ['Svetlana','Dmitry','Irina'],
      'pl-PL': ['Zofia','Marek','Paulina'],
      'sv-SE': ['Hillevi','Mattias','Bengt'],
      'da-DK': ['Christel','Jeppe'],
      'nl-NL': ['Colette','Fenna','Maarten'],
      'nb-NO': ['Pernille','Finn','Iselin'],
      'ja-JP': ['Nanami','Keita','Haruka'],
      'ko-KR': ['SunHi','InJoon','Heami'],
      'zh-CN': ['Xiaoxiao','Yunxi','Huihui'],
      'ar-SA': ['Zariyah','Naayf'],
      'tr-TR': ['Emel','Ahmet','Tolga'],
      'th-TH': ['Achara','Niwat','Pattara'],
      'vi-VN': ['HoaiMy','NamMinh','An'],
      'id-ID': ['Gadis','Ardi','Andika'],
    },

    langCode: {
      'English'    :'en-US','Hindi'     :'hi-IN','Tamil'     :'ta-IN',
      'Telugu'     :'te-IN','Malayalam' :'ml-IN','Kannada'   :'kn-IN',
      'Marathi'    :'mr-IN','Gujarati'  :'gu-IN','Bengali'   :'bn-IN',
      'Punjabi'    :'pa-IN','Urdu'      :'ur-PK','German'    :'de-DE',
      'French'     :'fr-FR','Spanish'   :'es-ES','Italian'   :'it-IT',
      'Portuguese' :'pt-PT','Russian'   :'ru-RU','Polish'    :'pl-PL',
      'Swedish'    :'sv-SE','Danish'    :'da-DK','Dutch'     :'nl-NL',
      'Norwegian'  :'nb-NO','Japanese'  :'ja-JP','Korean'    :'ko-KR',
      'Chinese'    :'zh-CN','Arabic'    :'ar-SA','Turkish'   :'tr-TR',
      'Thai'       :'th-TH','Vietnamese':'vi-VN','Indonesian':'id-ID',
    },
  };

  /* ─────────────────────────────────────────────────────────────
     2. DICTIONARY
  ───────────────────────────────────────────────────────────── */
  var BASE = {
    /* ENGLISH */
    'machine learning'        :{t:'இயந்திர கற்றல்',         l:'English',meaning:'automated learning from data'},
    'neural network'          :{t:'நரம்பியல் வலைப்பின்னல்',  l:'English',meaning:'brain-inspired computing model'},
    'artificial intelligence' :{t:'செயற்கை நுண்ணறிவு',       l:'English',meaning:'machine-simulated intelligence'},
    'deep learning'           :{t:'ஆழமான கற்றல்',            l:'English',meaning:'multi-layer neural learning'},
    'gradient descent'        :{t:'சாய்வு இறக்கம்',           l:'English',meaning:'optimization technique'},
    'data science'            :{t:'தரவு அறிவியல்',            l:'English',meaning:'extracting insights from data'},
    'state-of-the-art'        :{t:'அத்யாதுனிக நிலை',          l:'English',meaning:'best current standard'},
    'algorithm'               :{t:'கணக்கீட்டு முறை',          l:'English',meaning:'step-by-step problem-solving method'},
    'benchmark'               :{t:'மதிப்பீட்டு அளவுகோல்',     l:'English',meaning:'standard for comparison'},
    'optimization'            :{t:'உகந்தாக்கல்',              l:'English',meaning:'making something most efficient'},
    'performance'             :{t:'செயல்திறன்',               l:'English',meaning:'how well something works'},
    'network'                 :{t:'வலைப்பின்னல்',             l:'English',meaning:'interconnected system'},
    'internet'                :{t:'இணையம்',                  l:'English',meaning:'global computer network'},
    'computer'                :{t:'கணினி',                   l:'English',meaning:'electronic computing device'},
    'software'                :{t:'மென்பொருள்',              l:'English',meaning:'programs and code'},
    'hardware'                :{t:'வன்பொருள்',               l:'English',meaning:'physical computer parts'},
    'database'                :{t:'தரவுத்தளம்',              l:'English',meaning:'structured data store'},
    'technology'              :{t:'தொழில்நுட்பம்',           l:'English',meaning:'applied science and tools'},
    'programming'             :{t:'நிரலாக்கம்',              l:'English',meaning:'writing computer code'},
    'model'                   :{t:'மாதிரி',                  l:'English',meaning:'simplified representation'},
    'data'                    :{t:'தரவு',                    l:'English',meaning:'raw facts or information'},
    'system'                  :{t:'அமைப்பு',                 l:'English',meaning:'set of connected parts'},
    'process'                 :{t:'செயல்முறை',               l:'English',meaning:'series of steps'},
    'interesting'             :{t:'சுவாரஸ்யமான',             l:'English',meaning:'engaging or notable'},
    'important'               :{t:'முக்கியமான',              l:'English',meaning:'of great significance'},
    'future'                  :{t:'எதிர்காலம்',              l:'English',meaning:'time yet to come'},
    'language'                :{t:'மொழி',                    l:'English',meaning:'system of communication'},
    'translation'             :{t:'மொழிபெயர்ப்பு',           l:'English',meaning:'converting between languages'},
    'pronunciation'           :{t:'உச்சரிப்பு',              l:'English',meaning:'how a word is spoken'},
    'vocabulary'              :{t:'சொல்லகராதி',              l:'English',meaning:'set of words in a language'},
    'grammar'                 :{t:'இலக்கணம்',                l:'English',meaning:'rules of a language'},
    /* GERMAN */
    'künstliche intelligenz'  :{t:'செயற்கை நுண்ணறிவு',       l:'German', en:'artificial intelligence',meaning:'machine-simulated intelligence'},
    'künstliche'              :{t:'செயற்கை',                 l:'German', en:'artificial',             meaning:'man-made, not natural'},
    'intelligenz'             :{t:'நுண்ணறிவு',               l:'German', en:'intelligence',           meaning:'ability to learn and reason'},
    'modell'                  :{t:'மாதிரி',                  l:'German', en:'model',                  meaning:'simplified representation'},
    'wichtig'                 :{t:'முக்கியமான',              l:'German', en:'important',              meaning:'of great significance'},
    'verwendet'               :{t:'பயன்படுத்துகிறது',         l:'German', en:'uses',                   meaning:'makes use of'},
    'wurde'                   :{t:'ஆனது',                   l:'German', en:'was / became',           meaning:'past tense of to be'},
    'trainiert'               :{t:'பயிற்றுவிக்கப்பட்டது',     l:'German', en:'trained',                meaning:'taught through practice'},
    'ist'                     :{t:'உள்ளது',                 l:'German', en:'is',                     meaning:'third-person singular to be'},
    'gut'                     :{t:'நல்லது',                  l:'German', en:'good',                   meaning:'of high quality'},
    'lernen'                  :{t:'கற்றல்',                  l:'German', en:'learning',               meaning:'acquiring knowledge'},
    /* FRENCH */
    'le réseau neuronal'      :{t:'நரம்பியல் வலைப்பின்னல்',  l:'French', en:'the neural network',    meaning:'brain-inspired computing model'},
    'réseau'                  :{t:'வலைப்பின்னல்',            l:'French', en:'network',               meaning:'interconnected system'},
    'neuronal'                :{t:'நரம்பியல்',               l:'French', en:'neural',                meaning:'relating to nerve cells'},
    'traite'                  :{t:'செயலாக்குகிறது',           l:'French', en:'processes',             meaning:'handles and transforms'},
    'données'                 :{t:'தரவுகள்',                 l:'French', en:'data',                  meaning:'raw facts or information'},
    'automatiquement'         :{t:'தானாகவே',                 l:'French', en:'automatically',         meaning:'without human intervention'},
    'précision'               :{t:'துல்லியம்',               l:'French', en:'precision',             meaning:'exactness and accuracy'},
    'bonjour'                 :{t:'வணக்கம்',                 l:'French', en:'hello',                 meaning:'greeting'},
    'merci'                   :{t:'நன்றி',                   l:'French', en:'thank you',             meaning:'expression of gratitude'},
    'monde'                   :{t:'உலகம்',                  l:'French', en:'world',                 meaning:'the earth or everyone'},
    'langue'                  :{t:'மொழி',                   l:'French', en:'language',              meaning:'system of communication'},
    /* DANISH */
    'kunstig intelligens'     :{t:'செயற்கை நுண்ணறிவு',       l:'Danish', en:'artificial intelligence',meaning:'machine-simulated intelligence'},
    'kunstig'                 :{t:'செயற்கை',                 l:'Danish', en:'artificial',            meaning:'man-made, not natural'},
    'intelligens'             :{t:'நுண்ணறிவு',               l:'Danish', en:'intelligence',          meaning:'ability to learn and reason'},
    'maskinlæring'            :{t:'இயந்திர கற்றல்',          l:'Danish', en:'machine learning',      meaning:'automated learning from data'},
    'netværk'                 :{t:'வலைப்பின்னல்',            l:'Danish', en:'network',               meaning:'interconnected system'},
    'læring'                  :{t:'கற்றல்',                  l:'Danish', en:'learning',              meaning:'acquiring knowledge'},
    'hej'                     :{t:'வணக்கம்',                 l:'Danish', en:'hello / hi',            meaning:'casual greeting'},
    'tak'                     :{t:'நன்றி',                   l:'Danish', en:'thank you',             meaning:'expression of gratitude'},
    'god'                     :{t:'நல்லது',                  l:'Danish', en:'good',                  meaning:'of high quality'},
    'sprog'                   :{t:'மொழி',                   l:'Danish', en:'language',              meaning:'system of communication'},
    'oversættelse'            :{t:'மொழிபெயர்ப்பு',           l:'Danish', en:'translation',           meaning:'converting between languages'},
    'udtale'                  :{t:'உச்சரிப்பு',              l:'Danish', en:'pronunciation',         meaning:'how a word is spoken'},
    'verden'                  :{t:'உலகம்',                  l:'Danish', en:'world',                 meaning:'the earth or everyone'},
    'vigtig'                  :{t:'முக்கியமான',              l:'Danish', en:'important',             meaning:'of great significance'},
    'fremtid'                 :{t:'எதிர்காலம்',              l:'Danish', en:'future',                meaning:'time yet to come'},
    'teknologi'               :{t:'தொழில்நுட்பம்',           l:'Danish', en:'technology',            meaning:'applied science and tools'},
    'system'                  :{t:'அமைப்பு',                 l:'Danish', en:'system',                meaning:'set of connected parts'},
    /* HINDI (Devanagari) */
    'यह'                      :{t:'இது',                    l:'Hindi',  en:'this / it',             meaning:'referring to something nearby'},
    'बहुत'                    :{t:'மிகவும்',                 l:'Hindi',  en:'very / much',           meaning:'to a great degree'},
    'है'                      :{t:'உள்ளது',                 l:'Hindi',  en:'is',                    meaning:'present tense of to be'},
    'हैं'                     :{t:'உள்ளன',                  l:'Hindi',  en:'are',                   meaning:'plural present of to be'},
    'और'                      :{t:'மற்றும்',                 l:'Hindi',  en:'and',                   meaning:'connecting two things'},
    'का'                      :{t:'இன்',                    l:'Hindi',  en:'of',                    meaning:'possessive connector'},
    'में'                     :{t:'இல்',                    l:'Hindi',  en:'in',                    meaning:'location marker'},
    'एक'                      :{t:'ஒரு',                    l:'Hindi',  en:'a / one',               meaning:'indefinite article or number'},
    'डेटा'                    :{t:'தரவு',                   l:'Hindi',  en:'data',                  meaning:'raw facts or information'},
    'उपयोगी'                  :{t:'பயனுள்ள',                l:'Hindi',  en:'useful',                meaning:'serving a practical purpose'},
    'नमस्ते'                  :{t:'வணக்கம்',                 l:'Hindi',  en:'hello / namaste',       meaning:'respectful greeting'},
    'धन्यवाद'                 :{t:'நன்றி',                   l:'Hindi',  en:'thank you',             meaning:'expression of gratitude'},
    'भाषा'                    :{t:'மொழி',                   l:'Hindi',  en:'language',              meaning:'system of communication'},
  };

  /* ─────────────────────────────────────────────────────────────
     3. SCAN
  ───────────────────────────────────────────────────────────── */
  var corrections = {};
  var TAMIL_RE  = /[\u0B80-\u0BFF]/;
  var HINDI_RE  = /[\u0900-\u097F]/;
  var DANISH_SET = new Set(['hej','tak','god','sprog','læring','netværk','verden',
    'vigtig','fremtid','teknologi','oversættelse','udtale','maskinlæring',
    'kunstig','intelligens']);
  var SKIP = new Set(['a','an','the','is','in','on','of','to','for','and','or',
    'but','with','by','this','that','was','were','are','has','have','had','it',
    'be','at','as','from','not','all','its','they','we','he','she','i','my',
    'your','our','how','what','well','also','some','many','most','very','each',
    'both','more','into','over','after','about','than','then','when','where',
    'which','who','will','can','do','does','did','been','so','just','even','up',
    'out','off','no','don','t','les','die','der','den','det','og','er','en','et']);

  function resolve(k) { return corrections[k.toLowerCase()] || BASE[k.toLowerCase()] || null; }

  function scan(text) {
    var found = [], lower = text.toLowerCase();
    var allKeys = Object.keys(BASE).concat(Object.keys(corrections));
    allKeys = allKeys.filter(function(v,i,a){ return a.indexOf(v)===i; });
    var phrases = allKeys.filter(function(k){ return k.indexOf(' ')>-1; })
                         .sort(function(a,b){ return b.length-a.length; });
    var used = [];
    for (var pi=0; pi<phrases.length; pi++) {
      var p=phrases[pi], idx=lower.indexOf(p);
      while (idx>-1) {
        var e=idx+p.length;
        var overlap=used.some(function(r){ return idx<r[1]&&e>r[0]; });
        if (!overlap) {
          used.push([idx,e]);
          var r=resolve(p);
          if (r) found.push({original:text.slice(idx,e),key:p,t:r.t,l:r.l,en:r.en,meaning:r.meaning,corrected:!!corrections[p]});
        }
        idx=lower.indexOf(p,idx+1);
      }
    }
    var words = text.match(/[\u0900-\u097F]+|[a-zA-Z\u00C0-\u024F\u00E6\u00F8\u00E5\u00C6\u00D8\u00C5]+/g)||[];
    var seen = {};
    found.forEach(function(f){ seen[f.key]=1; });
    for (var wi=0; wi<words.length; wi++) {
      var w=words[wi], wl=w.toLowerCase();
      if (seen[wl]||TAMIL_RE.test(w)||SKIP.has(wl)||w.length<=1) continue;
      var wpos=lower.indexOf(wl);
      if (used.some(function(r){ return wpos>=r[0]&&wpos+wl.length<=r[1]; })) continue;
      seen[wl]=1;
      var wr=resolve(wl);
      if (wr) { found.push({original:w,key:wl,t:wr.t,l:wr.l,en:wr.en,meaning:wr.meaning,corrected:!!corrections[wl]}); continue; }
      if (!HINDI_RE.test(w)) {
        var dl = DANISH_SET.has(wl)?'Danish':'English';
        found.push({original:w,key:wl,t:'(மொழிபெயர்ப்பு தேவை)',l:dl,meaning:'translation needed'});
      }
    }
    var hw=text.match(/[\u0900-\u097F]+/g)||[];
    for (var hi=0; hi<hw.length; hi++) {
      var h=hw[hi];
      if (seen[h]) continue; seen[h]=1;
      var hr=resolve(h);
      if (hr) found.push({original:h,key:h,t:hr.t,l:hr.l,en:hr.en,meaning:hr.meaning,corrected:!!corrections[h]});
      else    found.push({original:h,key:h,t:'(மொழிபெயர்ப்பு தேவை)',l:'Hindi',en:'unknown word',meaning:'translation needed'});
    }
    return found;
  }

  /* ─────────────────────────────────────────────────────────────
     4. VOICE
  ───────────────────────────────────────────────────────────── */
  var voiceMap = {}, currentBtn = null;

  function buildVoiceMap() {
    var all = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    if (!all.length) return;
    Object.keys(CFG.langCode).forEach(function(lang) {
      var code = CFG.langCode[lang];
      var cands = all.filter(function(v){ return v.lang===code||v.lang.indexOf(code.split('-')[0])===0; });
      var plist = CFG.voicePriority[code]||[];
      var preferred = null;
      for (var i=0; i<plist.length; i++) {
        preferred = cands.find(function(v){ return v.name.indexOf(plist[i])>-1; });
        if (preferred) break;
      }
      voiceMap[lang] = preferred || cands[0] || null;
    });
  }

  if ('speechSynthesis' in window) {
    buildVoiceMap();
    window.speechSynthesis.onvoiceschanged = buildVoiceMap;
    setTimeout(buildVoiceMap, 800);
  }

  function stopSpeech() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (currentBtn) { currentBtn.classList.remove('tb-speaking'); currentBtn=null; }
  }

  function speak(text, lang, btn) {
    if (!('speechSynthesis' in window)) return;
    if (btn===currentBtn) { stopSpeech(); return; }
    stopSpeech();
    var utt = new SpeechSynthesisUtterance(text);
    utt.lang  = CFG.langCode[lang]||'en-US';
    utt.rate  = CFG.speechRate;
    var v = voiceMap[lang];
    if (v) utt.voice=v;
    btn.classList.add('tb-speaking');
    currentBtn=btn;
    utt.onend=utt.onerror=function(){ btn.classList.remove('tb-speaking'); if(currentBtn===btn)currentBtn=null; };
    window.speechSynthesis.cancel();
    setTimeout(function(){ window.speechSynthesis.speak(utt); }, CFG.speechGap);
  }

  /* ─────────────────────────────────────────────────────────────
     5. STYLES
  ───────────────────────────────────────────────────────────── */
  function injectStyles() {
    if (document.getElementById('__tb-styles')) return;
    var s=document.createElement('style'); s.id='__tb-styles';
    s.textContent=[
      '.tb-card{background:#E1F5EE;border:.5px solid #9FE1CB;border-radius:10px;padding:12px 14px;font-size:13px;color:#085041;font-family:system-ui,sans-serif;margin:8px 0;line-height:1.6}',
      '.tb-table{width:100%;border-collapse:collapse;margin-top:8px;font-size:12px;table-layout:fixed}',
      '.tb-table th{background:#9FE1CB;color:#085041;padding:5px 8px;text-align:left;font-weight:500}',
      '.tb-table th:nth-child(1){width:22%}.tb-table th:nth-child(2){width:12%}.tb-table th:nth-child(3){width:34%}.tb-table th:nth-child(4){width:32%}',
      '.tb-table td{padding:6px 8px;border-bottom:.5px solid #9FE1CB;vertical-align:middle;word-break:break-word}',
      '.tb-table tr:last-child td{border-bottom:none}',
      '.tb-badge{display:inline-block;font-size:10px;padding:1px 7px;border-radius:99px;font-weight:500}',
      '.tb-en{background:#B5D4F4;color:#0C447C}.tb-hi{background:#FAC775;color:#633806}',
      '.tb-de{background:#F4C0D1;color:#4B1528}.tb-fr{background:#C0DD97;color:#3B6D11}',
      '.tb-da{background:#CECBF6;color:#3C3489}.tb-xx{background:#D3D1C7;color:#2C2C2A}',
      '.tb-bridge{font-size:10px;opacity:.7;display:block;margin-top:1px}',
      '.tb-meaning{font-size:10px;opacity:.6;display:block;margin-top:1px}',
      '.tb-vrow{display:flex;align-items:center;gap:5px;margin-top:4px}',
      '.tb-vbtn{width:24px;height:24px;border-radius:50%;border:.5px solid #5DCAA5;background:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;padding:0;transition:background .12s,transform .1s}',
      '.tb-vbtn:hover{background:#9FE1CB}.tb-vbtn:active{transform:scale(.9)}',
      '.tb-vbtn.tb-speaking{background:#5DCAA5;animation:tb-rpl .8s ease-out infinite}',
      '.tb-vbtn svg{width:11px;height:11px;fill:none;stroke:#085041;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;pointer-events:none}',
      '.tb-vbtn.tb-speaking svg{stroke:#fff}',
      '.tb-vlabel{font-size:10px;color:#085041;opacity:.65}',
      '.tb-fbrow{display:flex;gap:4px;margin-top:5px;flex-wrap:wrap}',
      '.tb-fb{font-size:10px;padding:2px 7px;border-radius:99px;border:.5px solid #9FE1CB;background:transparent;color:#085041;cursor:pointer}',
      '.tb-fb:hover{background:#9FE1CB}.tb-fbw{border-color:#F7C1C1;color:#A32D2D}.tb-fbw:hover{background:#F7C1C1}',
      '.tb-fbok{background:#9FE1CB;cursor:default}',
      '.tb-cb{margin-top:5px;display:none;flex-direction:column;gap:4px}.tb-cb.tb-open{display:flex}',
      '.tb-ci{border:.5px solid #9FE1CB;border-radius:6px;padding:4px 8px;font-size:12px;background:#fff;color:#111;outline:none;width:100%;font-family:inherit}',
      '.tb-ci:focus{border-color:#1D9E75}',
      '.tb-cbtns{display:flex;gap:4px}',
      '.tb-csave{font-size:11px;padding:3px 10px;border-radius:6px;background:#1D9E75;color:#fff;border:none;cursor:pointer}',
      '.tb-ccancel{font-size:11px;padding:3px 10px;border-radius:6px;background:transparent;border:.5px solid #9FE1CB;color:#085041;cursor:pointer}',
      '.tb-upd{display:inline-block;font-size:10px;padding:1px 6px;border-radius:99px;background:#9FE1CB;color:#085041;font-weight:500;margin-left:4px}',
      '.tb-corr{display:inline-block;font-size:10px;padding:1px 6px;border-radius:99px;background:#FAC775;color:#633806;font-weight:500;margin-left:4px}',
      '@keyframes tb-rpl{0%{box-shadow:0 0 0 0 rgba(29,158,117,.45)}100%{box-shadow:0 0 0 7px rgba(29,158,117,0)}}',
    ].join('');
    document.head.appendChild(s);
  }

  /* ─────────────────────────────────────────────────────────────
     6. CARD BUILDER
  ───────────────────────────────────────────────────────────── */
  var LANG_CLS = {English:'tb-en',Hindi:'tb-hi',German:'tb-de',French:'tb-fr',Danish:'tb-da'};
  function badge(l){ return '<span class="tb-badge '+(LANG_CLS[l]||'tb-xx')+'">'+l+'</span>'; }
  function spkIcon(){ return '<svg viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>'; }

  var rid=0;
  function buildCard(results) {
    if (!results.length) return '<div class="tb-card">&#10003; <strong>&#2984;&#2994;&#3021;&#2994;&#2980;&#3009;!</strong> No non-Tamil words found. All content is in Tamil.</div>';
    var lc={};
    results.forEach(function(r){ lc[r.l]=(lc[r.l]||0)+1; });
    var summary=Object.keys(lc).map(function(l){ return badge(l)+' \xd7'+lc[l]; }).join(' ');
    var voiceOk='speechSynthesis' in window;
    var rows=results.map(function(r) {
      var id='tb'+(++rid);
      var corrB=r.corrected?'<span class="tb-corr">corrected</span>':'';
      var engL=(r.l!=='English'&&r.en)?'<span class="tb-bridge">\u2261 '+r.en+' (English)</span>':'';
      var meanL=r.meaning?'<span class="tb-meaning">'+r.meaning+'</span>':'';
      var so=JSON.stringify(r.original), sl=JSON.stringify(r.l), st=JSON.stringify(r.t||'');
      var ov=voiceOk?'<div class="tb-vrow"><button class="tb-vbtn" onclick="window.__tbSpeak('+so+','+sl+',this)" title="Hear in '+r.l+'">'+spkIcon()+'</button><span class="tb-vlabel">'+r.l+'</span></div>':'';
      var tv=(voiceOk&&r.t&&r.t[0]!=='(')?'<div class="tb-vrow"><button class="tb-vbtn" onclick="window.__tbSpeak('+st+',\'Tamil\',this)" title="Hear in Tamil">'+spkIcon()+'</button><span class="tb-vlabel">Tamil</span></div>':'';
      var ke=r.key.replace(/'/g,"\\'"), oe=r.original.replace(/'/g,"\\'"), ee=(r.en||'').replace(/'/g,"\\'");
      return '<tr id="tbrow-'+id+'"><td><strong>'+r.original+'</strong>'+ov+'</td><td>'+badge(r.l)+'</td>'
        +'<td><span id="tbt-'+id+'" style="font-weight:500">'+r.t+'</span>'+corrB+engL+meanL+tv+'</td>'
        +'<td><div class="tb-fbrow"><button class="tb-fb" id="tbok-'+id+'" onclick="window.__tbOk(\''+id+'\')">&#10003; Correct</button>'
        +'<button class="tb-fb tb-fbw" id="tbwr-'+id+'" onclick="window.__tbOpenCorr(\''+id+'\')">&#10007; Wrong</button></div>'
        +'<div class="tb-cb" id="tbcb-'+id+'"><input class="tb-ci" id="tbci-'+id+'" placeholder="Enter correct Tamil translation..." />'
        +'<div class="tb-cbtns"><button class="tb-csave" onclick="window.__tbSave(\''+id+'\',\''+ke+'\',\''+oe+'\',\''+r.l+'\',\''+ee+'\')">Save</button>'
        +'<button class="tb-ccancel" onclick="window.__tbCloseCorr(\''+id+'\')">Cancel</button></div></div></td></tr>';
    }).join('');
    return '<div class="tb-card"><div style="margin-bottom:6px">Found <strong>'+results.length+'</strong> non-Tamil term'+(results.length>1?'s':'')+': '+summary+'</div>'
      +'<div style="font-size:11px;margin-bottom:7px;opacity:.8">Click speaker to hear native accent + Tamil. Flag wrong translations with &#10007; Wrong.</div>'
      +'<table class="tb-table"><thead><tr><th>Word + voice</th><th>Language</th><th>Tamil + voice</th><th>Feedback</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
  }

  /* ─────────────────────────────────────────────────────────────
     7. GLOBAL CALLBACKS
  ───────────────────────────────────────────────────────────── */
  window.__tbSpeak = speak;
  window.__tbOk = function(id) {
    var ob=document.getElementById('tbok-'+id), wb=document.getElementById('tbwr-'+id);
    if(ob){ob.textContent='Confirmed';ob.className='tb-fb tb-fbok';ob.disabled=true;}
    if(wb)wb.style.display='none';
  };
  window.__tbOpenCorr = function(id) {
    var cb=document.getElementById('tbcb-'+id);
    if(cb){cb.classList.add('tb-open');var ci=document.getElementById('tbci-'+id);if(ci)ci.focus();}
  };
  window.__tbCloseCorr = function(id) {
    var cb=document.getElementById('tbcb-'+id); if(cb)cb.classList.remove('tb-open');
  };
  window.__tbSave = function(id,key,original,lang,en) {
    var ci=document.getElementById('tbci-'+id), val=ci?ci.value.trim():'';
    if(!val){if(ci)ci.focus();return;}
    var old=BASE[key]||{t:'(unknown)'};
    corrections[key]={t:val,l:lang,en:en||old.en||'',meaning:old.meaning||''};
    var tc=document.getElementById('tbt-'+id);
    var bridge=(lang!=='English'&&en)?'<span class="tb-bridge">\u2261 '+en+' (English)</span>':'';
    if(tc)tc.outerHTML='<span id="tbt-'+id+'" style="font-weight:500">'+val+'</span><span class="tb-upd">updated</span>'+bridge;
    window.__tbCloseCorr(id);
    var ob=document.getElementById('tbok-'+id),wb=document.getElementById('tbwr-'+id);
    if(ob){ob.textContent='Saved';ob.className='tb-fb tb-fbok';ob.disabled=true;}
    if(wb)wb.style.display='none';
  };

  /* ─────────────────────────────────────────────────────────────
     8. INJECTION
  ───────────────────────────────────────────────────────────── */
  function getPageText() {
    var sel=['article','main','.post-content','.entry-content','#content','.blog-post','[class*="article"]','[class*="content"]'];
    for(var i=0;i<sel.length;i++){var el=document.querySelector(sel[i]);if(el)return el.innerText.slice(0,5000);}
    return document.body.innerText.slice(0,5000);
  }

  function insertResult(html, inputEl) {
    var container=inputEl.closest('[class*="comment"]')||inputEl.closest('form')||inputEl.parentElement;
    var div=document.createElement('div'); div.innerHTML=html;
    container.appendChild(div);
    div.scrollIntoView({behavior:'smooth',block:'nearest'});
  }

  function attachBot(el) {
    if(el.dataset.tamilBot) return; el.dataset.tamilBot='1';
    el.addEventListener('keydown',function(e) {
      if(e.key!=='Enter'||e.shiftKey) return;
      var raw=(el.value||el.textContent||'').trim();
      if(raw.toLowerCase().indexOf(CFG.command)!==0) return;
      e.preventDefault();
      var custom=raw.slice(CFG.command.length).trim();
      var text=custom||getPageText();
      insertResult(buildCard(scan(text)),el);
      if(el.tagName==='TEXTAREA'||el.tagName==='INPUT') el.value='';
      else el.textContent='';
    });
  }

  function findAndAttach() {
    var sel='textarea[placeholder*="comment" i],textarea[name*="comment" i],input[placeholder*="comment" i],[contenteditable="true"],textarea';
    document.querySelectorAll(sel).forEach(attachBot);
  }

  injectStyles();
  findAndAttach();
  new MutationObserver(findAndAttach).observe(document.body,{childList:true,subtree:true});
  console.log('[Tamil Bot v1.0.0] Ready. Type /translate in any comment box.');

})();
