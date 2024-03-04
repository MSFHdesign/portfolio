import { useFetcher } from "@remix-run/react";
import PropTypes from "prop-types";

export default function AddNewEntry({ author }) {
  const fetcher = useFetcher();

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <fetcher.Form className="space-y-4" method="post">
        <fieldset
          className="disabled:opacity-70"
          disabled={fetcher.state === "submitting"}
        >
          <div className="flex flex-col">
            <label htmlFor="date" className="text-sm text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
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
              <option value="work">Work</option>
              <option value="learning">Learning</option>
              <option value="interesting-thing">Interesting Thing</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="text" className="text-sm text-gray-700">
              Text
            </label>
            <textarea
              id="text"
              name="text"
              required
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="author" className="text-sm text-gray-700">
              author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              readOnly // gør feltet ikke-redigerbart
              value={author}
              placeholder={author}
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
      </fetcher.Form>
    </div>
  );
}

// Definer PropTypes
AddNewEntry.propTypes = {
  author: PropTypes.string.isRequired,
};
