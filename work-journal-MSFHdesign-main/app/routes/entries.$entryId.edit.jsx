import { json } from "@remix-run/node";
import { Form, redirect, useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import mongoose from "mongoose";
import { format } from "date-fns";
import { authenticator } from "~/services/auth.server";

export async function loader({ params, request }) {
  const entry = await mongoose.models.Entry.findById(params.entryId);
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    // User is not authenticated, redirect to home page
    return redirect("/", { message: "You are not authenticated." });
  }
  // User is authenticated, proceed with loading the entry
  return json({ entry, isAuthenticated: user ? true : false });
}

export default function EditEntry() {
  const fetcher = useFetcher();
  const { entry } = useLoaderData();

  const [date, setDate] = useState(format(new Date(entry.date), "yyyy-MM-dd"));
  const [type, setType] = useState(entry.type);
  const [text, setText] = useState(entry.text);
  const [auther, setAuther] = useState(entry.author);

  return (
    <div className="page">
      <div className="flex justify-center mb-8 mt-4">
        <h1 className="text-3xl font-bold">Edit Entry</h1>
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-lg w-full mx-4 my-8 p-6 bg-gray-100 rounded-lg shadow-md">
          <Form method="post">
            <fieldset
              className="disabled:opacity-70"
              disabled={fetcher.state === "submitting"}
            >
              <div className="flex flex-col mb-4">
                <label htmlFor="date" className="text-sm text-gray-700">
                  Date
                </label>
                <input
                  id="date"
                  defaultValue={date}
                  name="date"
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
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
                  <option value="work">Work</option>
                  <option value="learning">Learning</option>
                  <option value="interesting-thing">Interesting Thing</option>
                </select>
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
                <label htmlFor="auther" className="text-sm text-gray-700">
                  Auther
                </label>
                <input
                  type="text"
                  defaultValue={auther}
                  id="auther"
                  name="auther"
                  placeholder="Your name"
                  onChange={(e) => setAuther(e.target.value)}
                  required
                  className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black"
                />
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
  const entry = Object.fromEntries(formData);

  // Hvis brugeren ikke er logget ind, send en fejlkode

  await mongoose.models.Entry.findByIdAndUpdate(params.entryId, {
    date: entry.date,
    type: entry.type,
    text: entry.text,
    auther: entry.auther,
  });

  return redirect(`/`);
}
