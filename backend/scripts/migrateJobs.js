const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Job = require("../models/Job");

dotenv.config();

const jobs = [
  { slug: "digital-marketing-executive", title: "Digital Marketing Executive", department: "Marketing", location: "Hyderabad / Remote", employmentType: "Full Time", workMode: "Hybrid", summary: "Support SEO, Google Ads, Meta Ads, social media planning and campaign reporting for client projects.", skills: ["SEO", "Google Ads", "Meta Ads", "Reporting"], status: "Active", displayOrder: 1 },
  { slug: "frontend-developer", title: "Frontend Developer", department: "Technology", location: "Hyderabad / Remote", employmentType: "Full Time / Internship", workMode: "Hybrid", summary: "Build responsive websites, landing pages and business dashboards using React, CSS and modern frontend practices.", skills: ["React", "CSS", "Responsive UI", "API Integration"], status: "Active", displayOrder: 2 },
  { slug: "business-development-executive", title: "Business Development Executive", department: "Business Development", location: "Hyderabad", employmentType: "Full Time", workMode: "On-site", summary: "Connect with businesses, understand requirements, coordinate demos and support growth consultation conversations.", skills: ["Communication", "Lead Follow-up", "Sales", "CRM"], status: "Active", displayOrder: 3 },
];

(async () => {
  try {
    await connectDB();
    for (const job of jobs) {
      const existing = await Job.findOne({ slug: job.slug });
      if (!existing) await Job.create({ ...job, publishedAt: new Date() });
    }
    console.log(`Migrated ${jobs.length} career openings.`);
  } catch (error) {
    console.error("Job migration failed:", error);
    process.exitCode = 1;
  } finally { await mongoose.connection.close(); }
})();
