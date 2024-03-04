import mongoose from "mongoose";

const { Schema } = mongoose;


// about text.
const aboutSchema = new Schema(
// everything an about page needs
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String },

  },
  { timestamps: true },
  
);


export const About = mongoose.model("About", aboutSchema);


// Define the Skill schema

const skillSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    barColor: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enums: [
        "frontend",
        "backend",
        "other",
        "tool",
        "personal",
        "language",
        "framework",
        "library",
        "database",
        "cloud",
      ],
    },
    links: [{type: String}]
  },
  { timestamps: true },
);


export const Skill = mongoose.model("Skill", skillSchema);


// Define the User schema
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true },
);

// Create the User model
const User = mongoose.model("User", userSchema);

// Export the User model
export default User;

// Define the Entry schema
const entrySchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: ["work", "learning", "interesting-thing"],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  // Automatically add `createdAt` and `updatedAt` timestamps:
  // https://mongoosejs.com/docs/timestamps.html
  { timestamps: true },
);

// For each model you want to create, please define the model's name, the
// associated schema (defined above), and the name of the associated collection
// in the database (which will be created automatically).
export const models = [
  {
    name: "Entry",
    schema: entrySchema,
    collection: "entries",
  },
];

// Skill
