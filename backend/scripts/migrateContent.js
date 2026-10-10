const path = require("path");
const { pathToFileURL } = require("url");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const ContentEntry = require("../models/ContentEntry");

dotenv.config();

const sources = [
  ["case-studies", "caseStudiesData.js", "caseStudies"],
  ["success-stories", "successStoriesData.js", "successStories"],
  ["client-stories", "clientStories.js", "clientStories"],
  ["reviews", "reviewsData.js", "reviews"],
];

const getKey = (item, index) =>
  String(item.slug || item.id || item.client || item.title || `item-${index + 1}`)
    .replace(/^\/success-stories\//, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

(async () => {
  try {
    await connectDB();
    for (const [section, filename, exportName] of sources) {
      const location = path.resolve(__dirname, "../../frontend/src/data", filename);
      const module = await import(pathToFileURL(location).href);
      const items = module[exportName] || [];
      for (let index = 0; index < items.length; index += 1) {
        const item = items[index];
        const key = getKey(item, index);
        const title = String(item.title || item.client || item.hero?.title || item.cover?.title || key);
        await ContentEntry.updateOne(
          { section, key },
          { $setOnInsert: { section, key, title, data: item, isActive: true, sortOrder: index } },
          { upsert: true }
        );
      }
      console.log(`Migrated ${items.length} ${section} records.`);
    }
  } catch (error) {
    console.error("Content migration failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
})();
