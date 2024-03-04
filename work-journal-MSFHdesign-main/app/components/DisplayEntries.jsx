import { useLoaderData } from "@remix-run/react";
import { getISOWeek, format } from "date-fns";

import EditDeleteButtons from "./EditDeleteButtons";

export default function DisplayEntries() {
  const { entries, isAuthenticated } = useLoaderData();

  const entriesByYear = entries.reduce((acc, entry) => {
    const year = new Date(entry.date).getFullYear();
    const weekNumber = getISOWeek(new Date(entry.date));

    if (!acc[year]) {
      acc[year] = {};
    }

    if (!acc[year][weekNumber]) {
      acc[year][weekNumber] = [];
    }

    acc[year][weekNumber].push(entry);
    return acc;
  }, {});

  return (
    <>
      <h1 className="text-5xl font-bold text-center">Tidslinje</h1>
      {Object.entries(entriesByYear)
        .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
        .map(([year, weeks]) => (
          <div key={year}>
            <h2 className="text-4xl font-bold mt-8 mb-4 text-center">
              {" "}
              År: {year}
            </h2>
            {Object.entries(weeks).map(([weekStart, entries]) => (
              <div key={`${year}-${weekStart}`} className="mt-4">
                <div className="flex justify-center items-start">
                  <h2 className="text-xl font-bold mb-4 mr-4">
                    {" "}
                    Uge: {weekStart}
                  </h2>
                  <div className="w-1/2 mr-4 relative">
                    {entries.map((entry) => (
                      <div
                        key={entry._id}
                        className="bg-white rounded-lg shadow-md p-6 mb-6 flex items-start"
                      >
                        <div className="flex flex-col mr-6">
                          <p className="text-gray-800 font-semibold mb-2">
                            {format(new Date(entry.date), "dd.MM.yyyy")}
                          </p>
                          <p className="text-gray-600 text-sm">
                            Af:{" "}
                            {entry.author
                              ? entry.author.charAt(0).toUpperCase() +
                                entry.author.slice(1)
                              : "Default author"}
                          </p>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800">{entry.text}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {isAuthenticated && (
                            <>
                              <EditDeleteButtons
                                path="entries"
                                id={entry._id}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
    </>
  );
}
