import { redirect, json } from "@remix-run/node";
import mongoose from "mongoose";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }) {
  let user = await authenticator.isAuthenticated(request);
  
  // Hvis brugeren ikke er logget ind, send en fejlmeddelelse
  if (!user) {
    redirect("/login");
    return json({ error: "LOGIN FØR DU PRØVER NOGET PUNK !!" }, { status: 401 });
  }

  // Hvis brugeren er logget ind, returner brugeroplysninger til brug i komponenten
  return { user };
}

export async function action({ params }) {
  // Udfør sletningshandling
  await mongoose.models.Skill.findByIdAndDelete(params.skillId);
  
  // Returner en omdirigering til startsiden efter sletning
  return redirect("/about");
}
