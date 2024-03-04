import { useState } from "react";
import { Form, redirect, useFetcher, useLoaderData } from "@remix-run/react";
import mongoose from "mongoose";

import { json } from "@remix-run/node";

export async function loader({ params }) {
  const skill = await mongoose.models.Skill.findById(params.skillId);
  return json({ skill });
}

export default function EditSkill() {
  const fetcher = useFetcher();
  const { skill } = useLoaderData();

  const [name, setName] = useState(skill.name);
  const [description, setDescription] = useState(skill.description);
  const [barColor, setBarColor] = useState(skill.barColor);
  const [type, setType] = useState(skill.type);
  const [links, setLinks] = useState(skill.links || [""]); // Initial state with one empty string for links

  const handleLinkChange = (index, value) => {
    const updatedLinks = [...links];
    updatedLinks[index] = value;
    setLinks(updatedLinks);
  };

  const addLinkInput = () => {
    setLinks([...links, ""]);
  };

  const removeLinkInput = (index) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  };

  return (
    <div className="page">
      <div className="flex justify-center mb-8 mt-4">
        <h1 className="text-3xl font-bold">Edit Skill</h1>
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-lg w-full mx-4 my-8 p-6 bg-gray-100 rounded-lg shadow-md">
          <Form method="post">
            <fieldset
              className="disabled:opacity-70"
              disabled={fetcher.state === "submitting"}
            >
              <div className="flex flex-col mb-4">
                <label htmlFor="name" className="text-sm text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  defaultValue={name}
                  name="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="description" className="text-sm text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  defaultValue={description}
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black"
                ></textarea>
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="barColor" className="text-sm text-gray-700">
                  Bar Color
                </label>
                <input
                  type="color"
                  defaultValue={barColor}
                  id="barColor"
                  name="barColor"
                  onChange={(e) => setBarColor(e.target.value)}
                  required
                  className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="type" className="text-sm text-gray-700">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  defaultValue={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                  className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="other">Other</option>
                  <option value="tool">Tool</option>
                  <option value="personal">Personal</option>
                  <option value="language">Language</option>
                  <option value="framework">Framework</option>
                  <option value="library">Library</option>
                  <option value="database">Database</option>
                  <option value="cloud">Cloud</option>
                </select>
              </div>
              {links.map((link, index) => (
                <div className="flex flex-col mb-4" key={index}>
                  <label
                    htmlFor={`link-${index}`}
                    className="text-sm text-gray-700"
                  >
                    Link {index + 1}
                  </label>
                  <div className="flex">
                    <input
                      id={`link-${index}`}
                      name={"links"}
                      type="text"
                      value={link}
                      onChange={(e) => handleLinkChange(index, e.target.value)}
                      required
                      className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black flex-grow"
                    />
                    <button
                      type="button"
                      onClick={() => removeLinkInput(index)}
                      className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addLinkInput}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
              >
                Add Link
              </button>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                disabled={fetcher.state === "submitting"}
              >
                {fetcher.state === "submitting" ? "Saving..." : "Save"}
              </button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const skillData = Object.fromEntries(formData);

  await mongoose.models.Skill.findByIdAndUpdate(params.skillId, skillData);

  return redirect(`/about`);
}
