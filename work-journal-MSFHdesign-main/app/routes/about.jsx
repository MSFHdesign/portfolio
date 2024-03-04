// About.jsx

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import mongoose from "mongoose";
import AddNewSkill from "~/components/AddNewSkill";
import AddNewText from "~/components/AddNewText"; // Importer AddNewText-komponenten
import TextFielt from "~/components/TextFielt";
import SkillBar from "~/components/Skillbar";

import { authenticator } from "~/services/auth.server";

export async function loader({ request }) {
  const skills = await mongoose.models.Skill.find({});
  let user = await authenticator.isAuthenticated(request);
  const userData = await mongoose.models.User.find({});
  const texts = await mongoose.models.About.find({});
  return json({
    skills,
    isAuthenticated: user ? true : false,
    userData,
    texts,
  });
}

export default function About() {
  const { skills } = useLoaderData();
  const { isAuthenticated } = useLoaderData();
  const { texts } = useLoaderData();

  return (
    <div className="p-4">
      <div>
        <h1 className="text-5xl font-bold text-center my-8"> About </h1>
        {isAuthenticated && (
          <>
            <div className="flex">
              <div className="my-8 w-2/3">
                <AddNewSkill />
              </div>
              <div className="my-8 w-1/3">
                <AddNewText />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex">
        <div className="w-2/3">
          {skills.map((skill) => (
            <SkillBar
              isAuthenticated={isAuthenticated}
              id={skill._id}
              key={skill._id}
              name={skill.name}
              description={skill.description}
              barColor={skill.barColor}
              type={skill.type}
              links={skill.links}
            />
          ))}
        </div>

        <div className="w-1/3 justify-center">
          {texts.map((text) => (
            <TextFielt
              key={text._id}
              prompt={text}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const action = async ({ request }) => {
  const Skill = mongoose.models.Skill; // Importer Skill-modelen direkte
  const AboutText = mongoose.models.About; // Importer About-modelen direkte

  try {
    const formData = await request.formData();

    // Check om formulardata indeholder felter relateret til Skill
    if (
      formData.has("name") &&
      formData.has("description") &&
      formData.has("barColor") &&
      formData.has("type")
    ) {
      const { name, description, barColor, type, links } =
        Object.fromEntries(formData);

      // Opret en ny Skill i MongoDB
      const newSkill = await Skill.create({
        name,
        description,
        barColor,
        type,
        links: Array.isArray(links) ? links : [links],
      });

      // Returner den nye Skill som respons
      return json({ newSkill });
    }

    // Check om formulardata indeholder felter relateret til About
    if (
      formData.has("title") &&
      formData.has("text") &&
      formData.has("image")
    ) {
      const { title, text, image } = Object.fromEntries(formData);

      // Opret en ny About-post i MongoDB
      const newAbout = await AboutText.create({
        title,
        text,
        image,
      });

      // Returner den nye About-post som respons
      return json({ newAbout });
    }

    // Returner en fejl, hvis formulardataen ikke indeholder de nødvendige felter for hverken Skill eller About
    throw new Error(
      "Formulardataen mangler de nødvendige felter til oprettelse af enten Skill eller About.",
    );
  } catch (error) {
    // Håndter eventuelle fejl
    console.error("Fejl ved oprettelse af Skill eller About:", error);
    throw new Error("Kunne ikke oprette Skill eller About.");
  }
};
