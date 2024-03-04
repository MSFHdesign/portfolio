//action
import { authenticator } from "../services/auth.server";

export async function action({ request }) {
  return await authenticator.logout(request, { redirectTo: "/login" });
}
