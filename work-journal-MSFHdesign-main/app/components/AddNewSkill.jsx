import { useFetcher } from "@remix-run/react";


export default function AddNewSkill() {
  const fetcher = useFetcher();

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <fetcher.Form className="space-y-4" method="post">
        <fieldset
          className="disabled:opacity-70"
          disabled={fetcher.state === "submitting"}
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="barColor" className="text-sm text-gray-700">
              Bar Color
            </label>
            <input
              type="color"
              id="barColor"
              name="barColor"
              required
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="type" className="text-sm text-gray-700">
              Type
            </label>
            <select
              id="type"
              name="type"
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

