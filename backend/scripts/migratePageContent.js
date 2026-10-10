const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const ContentEntry = require("../models/ContentEntry");

dotenv.config();

const entries = {
  services: [
    ["market-research-audits", "Market Research & Audits", "Understand competitors, location demand, buyer intent, pricing signals and SEO opportunities before spending on campaigns.", "/supporting-services#market-research-audits"],
    ["seo-geo-performance", "SEO, GEO & Performance Marketing", "Improve Google visibility, AI-search readiness, Google Ads performance, Meta Ads planning and lead quality.", "/supporting-services#seo-geo-performance"],
    ["website-crm-automation", "Website, CRM & Automation", "Build SEO-ready websites, landing pages, CRM workflows, WhatsApp automation and lead tracking systems.", "/supporting-services#website-crm-automation"],
  ].map(([key,title,desc,link]) => ({ key,title,data:{ kind:"service",title,desc,link } })),
  strategy: [
    ["brand-strategy", "Brand Strategy", "Position your project clearly with identity, messaging, trust-building and buyer-focused communication.", "/strategy-consulting#brand-strategy"],
    ["digital-strategy", "Digital Strategy", "Plan websites, SEO, GEO content, landing pages, campaigns and automation before execution.", "/strategy-consulting#digital-strategy"],
    ["marketing-sales", "Marketing & Sales", "Connect lead generation, CRM, follow-ups and sales actions into one growth funnel.", "/strategy-consulting#marketing-sales"],
  ].map(([key,title,desc,link]) => ({ key,title,data:{ kind:"pillar",title,desc,link } })),
  products: [
    ["whatsapp-business-api","WhatsApp Business API","Automate buyer conversations, template messages, enquiry responses and CRM-connected follow-ups.","/product-solutions#whatsapp-business-api"],
    ["google-sheet-automations","Google Sheet Automations","Trigger WhatsApp messages, emails, CRM updates and workflows from Google Sheet entries.","/product-solutions#google-sheet-automations"],
    ["email-marketing","Email Marketing","Send project updates, lead nurturing emails, campaign sequences and automated follow-up communication.","/product-solutions#email-marketing"],
    ["ivr-voice","IVR & Voice","Manage inbound calls, route enquiries, track call leads and improve sales team response.","/product-solutions#ivr-voice"],
    ["integrations","Integrations","Connect websites, CRMs, Google Sheets, forms and communication tools into one workflow.","/product-solutions#integrations"],
  ].map(([key,title,desc,link]) => ({ key,title,data:{ kind:"product",title,desc,link } })),
  about: [
    ["mission","Our Mission","To help real estate businesses grow with clear strategy, stronger visibility, better lead systems and measurable execution."],
    ["vision","Our Vision","To become a trusted growth route for builders, developers and lead-driven businesses across India and global markets."],
    ["commitment","Our Commitment","We focus on transparent planning, practical execution and growth systems that support real business outcomes."],
  ].map(([key,title,desc]) => ({ key,title,data:{ kind:"pillar",title,desc } })),
  careers: [
    ["growth-culture","Growth-Focused Culture","Work with a team that values learning, ownership and practical execution across strategy, marketing and technology."],
    ["collaborative-team","Collaborative Team","We encourage open communication, shared ideas and teamwork across projects, campaigns and client growth systems."],
    ["real-projects","Real Projects","Work on websites, SEO, campaigns, automation, CRM and digital systems for real businesses."],
  ].map(([key,title,desc]) => ({ key,title,data:{ kind:"culture",title,desc } })),
};

(async () => {
  try {
    await connectDB();
    for (const [section, items] of Object.entries(entries)) {
      for (let index = 0; index < items.length; index += 1) {
        const item = items[index];
        await ContentEntry.updateOne(
          { section, key: item.key },
          { $setOnInsert: { section, key: item.key, title: item.title, data: item.data, isActive: true, sortOrder: index } },
          { upsert: true }
        );
      }
      console.log(`Migrated ${items.length} ${section} records.`);
    }
  } catch (error) {
    console.error("Page content migration failed:", error);
    process.exitCode = 1;
  } finally { await mongoose.connection.close(); }
})();
