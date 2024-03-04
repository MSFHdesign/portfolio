import PropTypes from "prop-types";
import EditDeleteButtons from "./EditDeleteButtons";

function TextFielt({ prompt, isAuthenticated }) {
  const { title, text, image } = prompt;

  return (
    <>
      <div className="text-5xl font-bold text-center text-gray-100">
        {title}
      </div>
      <div className="max-w-md mx-auto mt-8 p-4 max-h-auto bg-gray-100 rounded-lg shadow-md">
        {image && <img src={image} alt={title} className="mx-auto mb-4" />}
        <div className="mt-4 text-gray-800">
          <p>{text}</p>
        </div>
        {isAuthenticated && <EditDeleteButtons path="text" id={prompt._id} />}
      </div>
    </>
  );
}

TextFielt.propTypes = {
  prompt: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default TextFielt;
