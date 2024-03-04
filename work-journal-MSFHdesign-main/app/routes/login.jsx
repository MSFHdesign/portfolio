import { Form, json, useLoaderData } from "@remix-run/react";
import { authenticator } from "../services/auth.server";
import { sessionStorage } from "~/services/session.server";

export async function loader({ request }) {
  let user = await authenticator.isAuthenticated(request);
   // Retrieve error message from session if present
   const session = await sessionStorage.getSession(request.headers.get("Cookie"));
   // Get the error message from the session
   const error = session.get("sessionErrorKey");

  return json({ isAuthenticated: user ? true : false, error });
}

export default function LoginPage() {
  const { isAuthenticated } = useLoaderData();
  const loaderData = useLoaderData();

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-md">

<div className="text-red-700">{loaderData?.error ? <p>{loaderData?.error?.message}</p> : null}</div>
        
      {!isAuthenticated ? (
        <Form method="POST">
          <div className="flex flex-col">
            <label htmlFor="mail" className="text-sm text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="mail"
              name="mail"
              required
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Log ind
          </button>
        </Form>
      ) : (
        <div>
          <p className="text-gray-700">Du er allerede logget ind!</p>
          <Form action="/logout" method="POST">
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Log ud
            </button>
          </Form>
        </div>
      )}
    </div>
  );
}

export async function action({ request }) {
  await authenticator.authenticate("user-pass", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
}
