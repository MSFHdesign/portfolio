// app/services/auth.server.ts
import { FormStrategy } from "remix-auth-form";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { AuthorizationError } from "remix-auth";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session

export let authenticator = new Authenticator(sessionStorage, {
  sessionErrorKey: "sessionErrorKey",
});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let mail = form.get("mail");
    let password = form.get("password");

    // Find brugeren baseret på mail
    const user = await mongoose.models.User.findOne({ username: mail }).select(
      "+password",
    );

    if (!user) {
      throw new AuthorizationError("Bad Credentials");
    }

    // Sammenlign det indtastede password med det hashe password fra databasen
    const match = bcrypt.compare(password, user.password);

    if (match) {
      let session = await sessionStorage.commitSession({
        isAuthenticated: true,
        userId: user._id,
      });

      // Returnér brugeren hvis passwords matcher sammen med sessionen
      return { user, session };
    } else {
      throw new AuthorizationError("Bad Credentials");
    }
  }),
  "user-pass",
);
