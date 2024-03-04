import { useState } from "react";
import PropTypes from "prop-types";

import EditDeleteButtons from "./EditDeleteButtons";

function SkillBar({
  name,
  description,
  barColor,
  id,
  isAuthenticated,
  type,
  links,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center">
        <button
          className="w-2/3 relative bg-blue-200 h-8 rounded-md focus:outline-none"
          style={{ width: "100%" }}
          onClick={toggleExpand}
        >
          <div
            className="h-full rounded-md"
            style={{ backgroundColor: barColor }}
          >
            <span className="absolute inset-0 flex items-center justify-center font-bold text-white">
              {name}
            </span>
          </div>
        </button>
      </div>
      {isExpanded && (
        <>
          <div className="mt-2 bg-gray-700 p-2 rounded">
            <p className="text-gray-300 text-sm mt-2">Type: {type}</p>
            <p className="mt-2 bg-gray-700 p-2 rounded">{description}</p>
            {/*mapping all links if there are any*/}
            {links && links.length > 0 && (
              <div className="mt-2">
                <p className="text-gray-300 text-sm">Links:</p>
                {links.map((link, index) => (
                  <div key={index}>
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {link}
                    </a>
                    <br />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {isAuthenticated && <EditDeleteButtons path="skills" id={id} />}
          </div>
        </>
      )}
    </div>
  );
}

SkillBar.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  barColor: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.string),
};

export default SkillBar;
