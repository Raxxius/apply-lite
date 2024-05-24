import {
  Form,
  useActionData,
  useLoaderData,
  redirect,
} from "@remix-run/react";
import { json } from "@remix-run/node"; // Import only necessary functions from node
import authenticator from "../services/auth.server";
import { sessionStorage } from "../services/session.server";

// Action function to handle form submission and authentication
export const action = async ({ request, context }) => {
  // call my authenticator
  const resp = await authenticator.authenticate("form", request, {
    successRedirect: "/",
    failureRedirect: "/login",
    throwOnError: true,
    context,
  });
  console.log(resp);
  return resp;
};

// Loader function to check for authentication and retrieve any errors
export const loader = async ({ request }) => {
  const isAuthenticated = await authenticator.isAuthenticated(request);
  if (isAuthenticated) {
    return redirect("/");
  }

  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const error = session.get("sessionErrorKey");
  return json({ error });
};

// LoginPage component to render the login form and display errors
export default function LoginPage() {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix-Auth Example</h1>
      <p>
        Based on the Form Strategy From{" "}
        <a href="https://github.com/sergiodxa/remix-auth" target="_blank" rel="noopener noreferrer">
          Remix-Auth Project
        </a>
      </p>
      <Form method="post">
        <div>
          <label>
            Email: <input type="email" name="email" placeholder="email" required />
          </label>
        </div>
        <div>
          <label>
            Password: <input type="password" name="password" placeholder="password" autoComplete="current-password" required />
          </label>
        </div>
        <button type="submit">Sign In</button>
      </Form>
      {loaderData?.error && <p style={{ color: "red" }}>ERROR: {loaderData.error}</p>}
      {actionData?.error && <p style={{ color: "red" }}>ERROR: {actionData.error}</p>}
    </div>
  );
}
