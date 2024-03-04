import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import mongoose from "mongoose";
import { authenticator } from "~/services/auth.server";
import AddNewEntry from "~/components/AddNewEntry";
import DisplayEntries from "~/components/DisplayEntries";
import Placeholder from "~/components/Placeholder";
// import VideoPlayer from "~/components/VideoPlayer";
// import Video from "~/../public/videos/hero.mp4";

export async function loader({ request }) {
  const entries = await mongoose.models.Entry.find({});
  const userData = await mongoose.models.User.find({});

  let user = await authenticator.isAuthenticated(request);

  return json({ entries, isAuthenticated: user ? true : false, userData });
}

export default function Index() {
  const { isAuthenticated } = useLoaderData();
  const data = useLoaderData();
  const username = data.userData[0]?.username || "Unknown";

  return (
    <>
      <div className="w-full bg-gray-900 text-white py-12">
        <div className="w-full mx-auto relative">
          <h1 className="text-5xl font-bold text-center mb-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            Overskrift på noget her
          </h1>
          <div
            className="relative overflow-hidden"
            style={{ paddingTop: "56.25%" }}
          >
            <div className="absolute inset-0">
              {/* <VideoPlayer videoSource={Video} /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/2">
          <Placeholder />
        </div>
        <div className="w-1/2">
          {/* Indholdet til venstre */}
          <div>
            {isAuthenticated && <AddNewEntry author={username} />}
            <DisplayEntries />
          </div>
        </div>
      </div>
    </>
  );
}
export const action = async ({ request }) => {
  const formData = await request.formData();
  const { date, type, text, author } = Object.fromEntries(formData);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Save to MongoDB
  return await mongoose.models.Entry.create({ date, type, text, author });
};
