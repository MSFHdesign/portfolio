import { Link, Form } from "@remix-run/react";
import PropTypes from "prop-types";

export default function EditDeleteButtons({ path, id }) {
  function confirmDelete(event) {
    const response = confirm("Please confirm you want to delete this post.");
    if (!response) {
      event.preventDefault();
    }
  }
  return (
    <>
      <div className="flex gap-2">
        <Link
          to={`/${path}/${id}/edit`}
          className="text-blue-500 opacity-100 group-hover:opacity-10 hover:underline"
        >
          <button>Edit</button>
        </Link>
        <Form
          action={`/${path}/${id}/delete`}
          method="post"
          onSubmit={confirmDelete}
        >
          <button className="text-red-500 opacity-100 group-hover:opacity-10 hover:underline">
            Delete
          </button>
        </Form>
      </div>
    </>
  );
}

// Definér propTypes for komponenten
EditDeleteButtons.propTypes = {
  path: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
