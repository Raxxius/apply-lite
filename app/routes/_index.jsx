import authenticator from "../services/auth.server.jsx";
import { json, useLoaderData, Form } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

/** Redirect */
export let loader = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return json({ user });
};

/** Logout request */

export const action = async ({ request }) => {
  console.log("initiating logout");
  await authenticator.logout(request, { redirectTo: "/login" });
};

/** Client return */
export default function Index() {
  const user = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Apply Lite</h1>
      <p>Welcome {user.user.name}</p>
      <p>You have logged in</p>
      <Form method="post">
        <button>Logout</button>
      </Form>
    </div>
  );
}
