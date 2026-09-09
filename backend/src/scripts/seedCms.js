import mongoose from "mongoose";
import connectDB from "../config/db.js";
import SiteSettings from "../models/SiteSettings.js";
import Header from "../models/Header.js";
import Hero from "../models/Hero.js";
import About from "../models/About.js";
import Footer from "../models/Footer.js";
import Skill from "../models/Skill.js";
import Experience from "../models/Experience.js";
import Service from "../models/Service.js";
import Project from "../models/Project.js";
import SocialLink from "../models/SocialLink.js";
import BlogPost from "../models/BlogPost.js";

const seedSingletonIfEmpty = async (Model, data, label) => {
  const existing = await Model.findOne({});

  if (existing) {
    console.log(`${label} already exists. Skipping.`);
    return;
  }

  await Model.create(data);
  console.log(`${label} seeded.`);
};

const seedCollectionIfEmpty = async (Model, data, label) => {
  const count = await Model.countDocuments({});

  if (count > 0) {
    console.log(`${label} already has ${count} document(s). Skipping.`);
    return;
  }

  await Model.insertMany(data);
  console.log(`${label} seeded with ${data.length} document(s).`);
};

const seedCms = async () => {
  await connectDB();

  await seedSingletonIfEmpty(
    SiteSettings,
    {
      siteName: "Sample Portfolio",
      siteTitle: "Sample Portfolio | CMS Demo",
      siteDescription: "Placeholder site settings content for development.",
      email: "hello@example.com",
      location: "Remote",
      defaultSeoTitle: "Sample Portfolio",
      defaultSeoDescription: "Development seed data for the CMS.",
    },
    "SiteSettings"
  );

  await seedSingletonIfEmpty(
    Header,
    {
      logo: "",
      navigationItems: [
        { label: "Home", href: "#home", order: 1, isVisible: true },
        { label: "About", href: "#about", order: 2, isVisible: true },
        { label: "Projects", href: "#projects", order: 3, isVisible: true },
        { label: "Contact", href: "#contact", order: 4, isVisible: true },
      ],
      cta: { label: "Contact Me", href: "#contact", isVisible: true },
      isVisible: true,
    },
    "Header"
  );

  await seedSingletonIfEmpty(
    Hero,
    {
      badge: "Available for work",
      heading: "Building thoughtful digital experiences",
      subheading: "Full-Stack Developer",
      description: "Placeholder hero description for local development.",
      primaryButton: { label: "View Projects", href: "#projects", isVisible: true },
      secondaryButton: { label: "Contact", href: "#contact", isVisible: true },
      isVisible: true,
    },
    "Hero"
  );

  await seedSingletonIfEmpty(
    About,
    {
      title: "About Me",
      subtitle: "A short placeholder subtitle",
      description: "Placeholder about description for local development.",
      statistics: [
        { label: "Years Experience", value: "3+", order: 1 },
        { label: "Projects Completed", value: "20+", order: 2 },
      ],
      highlights: [{ title: "Clean Architecture", description: "Placeholder highlight.", order: 1 }],
      isVisible: true,
    },
    "About"
  );

  await seedSingletonIfEmpty(
    Footer,
    {
      description: "Placeholder footer description.",
      copyrightText: `© ${new Date().getFullYear()} Sample Portfolio. All rights reserved.`,
      columns: [],
      socialLinks: [],
      isVisible: true,
    },
    "Footer"
  );

  await seedCollectionIfEmpty(
    Skill,
    [
      { name: "JavaScript", category: "Languages", proficiency: 85, order: 1 },
      { name: "React", category: "Frontend", proficiency: 80, order: 2 },
      { name: "Node.js", category: "Backend", proficiency: 75, order: 3 },
    ],
    "Skills"
  );

  await seedCollectionIfEmpty(
    Experience,
    [
      {
        company: "Sample Company",
        position: "Full-Stack Developer",
        description: "Placeholder experience entry for local development.",
        startDate: new Date("2023-01-01"),
        current: true,
        technologies: ["React", "Node.js", "MongoDB"],
        order: 1,
      },
    ],
    "Experience"
  );

  await seedCollectionIfEmpty(
    Service,
    [
      {
        title: "Web Development",
        description: "Placeholder service description.",
        features: ["Responsive design", "REST APIs", "CMS integration"],
        order: 1,
      },
    ],
    "Services"
  );

  await seedCollectionIfEmpty(
    Project,
    [
      {
        title: "Sample Project",
        slug: "sample-project",
        shortDescription: "A placeholder project for development.",
        description: "Placeholder project description for local development seeding.",
        technologies: ["React", "Node.js"],
        featured: true,
        order: 1,
      },
    ],
    "Projects"
  );

  await seedCollectionIfEmpty(
    SocialLink,
    [
      { platform: "GitHub", url: "https://github.com/example", order: 1 },
      { platform: "LinkedIn", url: "https://linkedin.com/in/example", order: 2 },
    ],
    "SocialLinks"
  );

  await seedCollectionIfEmpty(
    BlogPost,
    [
      {
        title: "Sample Blog Post",
        slug: "sample-blog-post",
        excerpt: "Placeholder excerpt for development seeding.",
        content: "This is placeholder blog content used only for local development.",
        status: "draft",
        readingTime: 1,
      },
    ],
    "BlogPosts"
  );

  console.log("CMS seed process complete.");
  await mongoose.disconnect();
  process.exit(0);
};

seedCms().catch((error) => {
  console.error("Failed to seed CMS data:", error.message);
  process.exit(1);
});