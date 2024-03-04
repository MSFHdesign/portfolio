import { useState } from "react";
import { Form, redirect, useFetcher, useLoaderData } from "@remix-run/react";
import mongoose from "mongoose";
import { json } from "@remix-run/node";

export async function loader({ params }) {
  const aboutText = await mongoose.models.About.findById(params.textId);
  return json({ aboutText });
}

export default function EditaboutText() {
  const fetcher = useFetcher();
  const { aboutText } = useLoaderData();

  const [title, setTitle] = useState(aboutText.title);
  const [text, setText] = useState(aboutText.text);
  const [image, setImage] = useState(aboutText.image);

  return (
    <div className="page">
      <div className="flex justify-center mb-8 mt-4">
        <h1 className="text-3xl font-bold">About Text</h1>
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-lg w-full mx-4 my-8 p-6 bg-gray-100 rounded-lg shadow-md">
          <Form method="post">
            <fieldset
              className="disabled:opacity-70"
              disabled={fetcher.state === "submitting"}
            >
              <div className="flex flex-col mb-4">
                <label htmlFor="title" className="text-sm text-gray-700">
                  Title
                </label>
                <input
                  id="title"
                  defaultValue={title}
                  name="title"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="text" className="text-sm text-gray-700">
                  Text
                </label>
                <textarea
                  id="text"
                  defaultValue={text}
                  name="text"
                  onChange={(e) => setText(e.target.value)}
                  required
                  className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black"
                ></textarea>
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="image" className="text-sm text-gray-700">
                  Image URL
                </label>
                <input
                  id="image"
                  defaultValue={image}
                  name="image"
                  type="text"
                  onChange={(e) => setImage(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black"
                />
                {image && (
                  <div className="mt-2">
                    <img
                      src={image}
                      alt="Preview"
                      className="max-w-full h-auto"
                    />
                  </div>
                )}
              </div>
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
  const aboutData = Object.fromEntries(formData);

  await mongoose.models.About.findByIdAndUpdate(params.textId, aboutData);

  return redirect(`/about`);
}
