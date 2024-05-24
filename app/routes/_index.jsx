import authenticator from "../services/auth.server.jsx";
import { json, useLoaderData } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export let loader = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return json({ user });
};

export default function Index() {
  const user = useLoaderData();
  console.log(user)
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Apply Lite</h1>
      <p1>Welcome {user.user.name}</p1>
      <p>You have logged in</p>
    </div>
  );
}
