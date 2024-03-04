import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import styles from "./tailwind.css";
import Nav from "./components/Nav";
export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];


export async function loader({ request }) {

  let user = await authenticator.isAuthenticated(request);

  return json({ isAuthenticated: user ? true : false });
}

export function meta() {
  return [{ title: "Work Journal" }];
}
import { useRouteError, Link } from "@remix-run/react";
import { authenticator } from "./services/auth.server";

export function ErrorBoundary() {
  let error = useRouteError();

  console.log(error);
  const { isAuthenticated } = useLoaderData();
  return (
    <html lang="en" className="h-full">
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col h-full">
      <Nav authenticated={isAuthenticated} />
        <div className="flex flex-col items-center justify-center flex-1">
          <p className="text-3xl">
            {error.status} : {error.statusText}
          </p>
          <p className="text-red-500">Bro - {error.data}</p>{" "}
          {/* Vis fejlmeddelelsen på skærmen */}
          <Link
            to="/"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Go back
          </Link>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { isAuthenticated } = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Nav authenticated={isAuthenticated} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
