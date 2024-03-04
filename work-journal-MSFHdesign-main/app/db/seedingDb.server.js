import mongoose from "mongoose";
import bcrypt from "bcrypt";

export default async function seedDb() {
  const entryCount = await mongoose.models.Entry.countDocuments();
  const userCount = await mongoose.models.User.countDocuments();
  const skillCount = await mongoose.models.Skill.countDocuments();
  const aboutCount = await mongoose.models.About.countDocuments();
  if (entryCount === 0 && userCount === 0 && skillCount === 0 && aboutCount === 0) {
    console.log("Seeding database...");
    await insertUser();
    await insertData();
    await insertSkill();
  }

  if (skillCount === 0) {
    console.log("Seeding skills...");
    await insertSkill();
  }
  if (userCount === 0) {
    console.log("Seeding user...");
    await insertUser();
  }
  if (entryCount === 0) {
    console.log("Seeding entries...");
    await insertData();
  }
  if (aboutCount === 0) {
    console.log("Seeding about...");
    await insertAbout();
  }
}


async function insertAbout() {
  const about = [
    {
      title: "About",
      text: "This is a simple app to keep track of your work, learning and interesting things. It's built with Remix, MongoDB and Mongoose.",
    },
  ];

  await mongoose.models.About.insertMany(about);

}

async function insertSkill() {
  const skills = [
    {
      name: "React",
      description: "A JavaScript library for building user interfaces",
      barColor: "#61DAFB",
      type: "frontend",
      links: ["https://reactjs.org/", "google.dk"],
    },
    {
      name: "Node.js",
      description:
        "A JavaScript runtime built on Chrome's V8 JavaScript engine",
      barColor: "#68A063",
      type: "backend",
    },
    {
      name: "MongoDB",
      description: "A general purpose, document-based, distributed database",
      barColor: "#4DB33D",
      type: "database",
    },
    {
      name: "Express",
      description: "Fast, unopinionated, minimalist web framework for Node.js",
      barColor: "#000000",
      type: "backend",
    },
    {
      name: "Remix",
      description: "A React framework for building web applications",
      barColor: "#000000",
      type: "frontend",
    },
  ];

  await mongoose.models.Skill.insertMany(skills);
}

async function insertUser() {
  const testUser = {
    username: "test@user.dk",
    password: await hashPassword("1"),
  };

  await mongoose.models.User.create(testUser);
}

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function insertData() {
  const entries = [
    {
      date: new Date("2024-01-01"),
      type: "work",
      text: "I'm working",
    },
    {
      date: new Date("2024-01-15"),
      type: "learning",
      text: "I'm learning",
    },
    {
      date: new Date("2024-02-01"),
      type: "interesting-thing",
      text: "I'm doing something interesting",
    },
    {
      date: new Date("2024-02-15"),
      type: "learning",
      text: "Remix Auth with FormStrategy and Post App",
    },
    {
      date: new Date("2024-02-22"),
      type: "work",
      text: "Remix Work Journal",
    },
  ];
  await mongoose.models.Entry.insertMany(entries);
}
