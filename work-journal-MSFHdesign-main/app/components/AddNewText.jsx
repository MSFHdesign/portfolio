import { useFetcher } from "@remix-run/react";
import { useState } from "react";

export default function AddNewAbout() {
  const fetcher = useFetcher();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const handleResetForm = () => {
    setTitle("");
    setText("");
    setImage("");
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "title") setTitle(value);
    else if (name === "text") setText(value);
    else if (name === "image") setImage(files[0]);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <fetcher.Form className="space-y-4" method="post" onSubmit={handleResetForm}>
        <fieldset
          className="disabled:opacity-70"
          disabled={fetcher.state === "submitting"}
        >
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={title}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="text" className="text-sm text-gray-700">
              Text
            </label>
            <textarea
              id="text"
              name="text"
              required
              value={text}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="image" className="text-sm text-gray-700">
              Image
            </label>
            <input
            
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
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
      </fetcher.Form>
    </div>
  );
}
