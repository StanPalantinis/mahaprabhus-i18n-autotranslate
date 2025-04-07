// mahaprabhus-i18n-autotranslate/translate-common-json.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceLang = "en";
const translationDir = path.join(__dirname, "locales");
const sourcePath = path.join(translationDir, sourceLang, "common.json");
const targetLanguages = [
  "hi",
  "bn",
  "sw",
  "ar",
  "de",
  "fr",
  "es",
  "id",
  "ja",
  "ru",
  "pt",
  "tr",
];

// 🌐 Translate a single string using Google Translate API (Unofficial)
async function translateText(text, toLang) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(
    text
  )}`;
  const response = await fetch(url);
  const result = await response.json();
  return result[0][0][0];
}

// 🌳 Recursively translate missing values in an object
async function translateObject(sourceObj, existingObj = {}, toLang) {
  const translated = { ...existingObj };

  for (const key in sourceObj) {
    const value = sourceObj[key];

    if (typeof value === "string") {
      const existingValue = existingObj?.[key];

      if (typeof existingValue === "string" && existingValue.trim() !== "") {
        console.log(
          `✅ [${toLang}] Skipped existing: "${key}" = "${existingValue}"`
        );
        translated[key] = existingValue;
        continue;
      }

      try {
        const translatedText = await translateText(value, toLang);
        translated[key] = translatedText;
        console.log(`✨ [${toLang}] Translated: ${key}`);
      } catch (err) {
        console.error(
          `⚠️ [${toLang}] Failed to translate ${key}:`,
          err.message
        );
        translated[key] = value; // fallback
      }
    } else if (typeof value === "object" && value !== null) {
      translated[key] = await translateObject(
        value,
        existingObj[key] || {},
        toLang
      );
    }
  }

  return translated;
}

// 🚀 Start Translating
async function runTranslation() {
  if (!fs.existsSync(sourcePath)) {
    console.error("❌ English source file not found:", sourcePath);
    return;
  }

  const sourceData = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

  for (const lang of targetLanguages) {
    console.log(`\n🔁 Translating to ${lang}...`);
    const langDir = path.join(translationDir, lang);
    const outputPath = path.join(langDir, "common.json");

    if (!fs.existsSync(langDir)) fs.mkdirSync(langDir, { recursive: true });

    let existingData = {};
    if (fs.existsSync(outputPath)) {
      try {
        const fileContent = fs.readFileSync(outputPath, "utf8").trim();
        if (fileContent) {
          existingData = JSON.parse(fileContent);
          const backupPath = path.join(langDir, "common.backup.json");
          fs.copyFileSync(outputPath, backupPath);
          console.log(`📦 Backup created at: ${backupPath}`);
        } else {
          console.log(
            `⚠️ [${lang}] common.json was empty. Proceeding with translation.`
          );
        }
      } catch (err) {
        console.error(
          `❌ [${lang}] Skipping due to JSON parse error:`,
          err.message
        );
        continue;
      }
    } else {
      console.log(`🆕 Creating new common.json for ${lang}`);
    }

    const merged = await translateObject(sourceData, existingData, lang);
    fs.writeFileSync(outputPath, JSON.stringify(merged, null, 2), "utf8");
    console.log(`✅ ${lang}/common.json updated successfully.`);
  }

  console.log("\n🌍 All translations completed successfully.");
}

runTranslation();
