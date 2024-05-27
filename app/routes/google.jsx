import {
  useActionData,
  useLoaderData,
  redirect,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import authenticator from "../services/auth.server";
import { sessionStorage } from "../services/session.server";

export const loader = async ({ request }) => {
  const isAuthenticated = await authenticator.isAuthenticated(request);
  if (isAuthenticated) {
    return redirect("/");
  }
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const error = session.get("sessionErrorKey");
  return json({ error });
};

export const action = async ( {request} ) => {
  const resp = await authenticator.authenticate('google', request)
  return resp
}

