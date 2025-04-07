# 🌍 Mahaprabhu's I18n Auto-Translate

A powerful and graceful CLI tool to auto-translate your `common.json` i18n files into multiple languages using Google Translate (unofficial API).

Built with love for multilingual developers and compassionate global software 🌸

---

## 📦 Features

✅ Smart merge — only translates missing keys, keeps existing ones safe  
✅ Recursively supports nested JSON structures  
✅ Backs up previous translations before overwriting  
✅ Gracefully skips broken or empty files  
✅ Fully customizable: choose your languages, source folder, etc.

---

## 📁 Folder Structure

```bash
mahaprabhus-i18n-autotranslate/
├── locales/
│   ├── en/
│   │   └── common.json         # 🔤 Source reference file
│   ├── hi/
│   │   └── common.json         # 🌐 Will be translated
│   └── ...                     # 🌍 Add more as needed
├── translate-common-json.js    # 🚀 Main translation script
├── .gitignore                  # 🚫 node_modules, backups
├── LICENSE                     # 📜 MIT license
└── README.md                   # 📘 You're reading it
```

> 💡 You may remove all language folders except `en/` when publishing if you want a clean start.

---

## 🚀 How to Use

### 1️⃣ Install Dependencies

```bash
npm install
```

> If you run into peer dependency issues, use:
> ```bash
> npm install --legacy-peer-deps
> ```

### 2️⃣ Set Your Source Translations
- Put your English translations inside: `locales/en/common.json`
- Use **nested structure** if needed.

### 3️⃣ Run the Script

```bash
node translate-common-json.js
```

Or

```bash
npm run translate
```

It will:
- Loop through all target languages
- Create language folders if missing
- Translate missing keys only
- Backup previous translations

---

## 🌐 Default Target Languages

```js
["hi", "bn", "sw", "ar", "de", "fr", "es", "id", "ja", "ru", "pt", "tr"]
```

You can change this list in `translate-common-json.js`.

---

## ✨ Example Output

```bash
🔁 Translating to hi...
✅ [hi] Skipped existing: homepage.welcome
✨ [hi] Translated: homepage.tagline
✅ hi/common.json updated successfully.
```

---

## 🧠 Why This Exists

This project was born from real-world SaaS needs in emerging markets.  
Many users operate better in their native tongue. This tool helps you empower them with local translations at scale — without expensive translation services.

> "Do less, do best, then grow." — Mahaprabhu

---

## 🕊 License

MIT License — Use freely. Attribute if you can. Spread love if you will.

---

## 👤 Creator

This is a humble offering from the **Limofair** project, a platform empowering small transport operators with better tech.  
Maintained by a lone dasa (devotee) who believes technology should lift people up.

GitHub: [github.com/StanPalantinis](https://github.com/StanPalantinis)

---

## ❤️ Want to Contribute?

Issues and PRs are most welcome. Especially:
- Improvements to fallback logic
- Language code validation
- CLI tool packaging (coming soon)

Let’s build inclusive tools for the world, one key at a time.

🙏 Jai Mahaprabhu.



🔄 v1.1 Update – Intelligent Merge Engine
As of version v1.1, the script now:

🧠 Skips re-translating values already present in existing translation files.

🪶 Ensures translation consistency for production apps (no accidental rewordings).

🗃️ Translates only new keys added to the English source (en/common.json).

This makes it ideal for growing multilingual projects where preserving earlier translations is important.

🌍 Let this help teams, solo devs, and underserved regions bring apps to life in their own languages — with zero cost and maximum grace.

“Language should never be a barrier to dignity.” – Mahaprabhu
