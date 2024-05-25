import {
  useActionData,
  useLoaderData,
  redirect,
} from "@remix-run/react";
import LoginBox from "../components/LoginBox";
import { json } from "@remix-run/node";
import authenticator from "../services/auth.server";
import { sessionStorage } from "../services/session.server";

// // Action function to handle form submission and authentication
// export const action = async ({ request, context }) => {
//   try {
//     // Call authenticator and handle success/failure
//     const resp = await authenticator.authenticate("form", request, {
//       successRedirect: "/",
//       failureRedirect: "/login",
//       throwOnError: true,
//       context,
//     });
//     console.log("Response", resp)
//     return resp;
//   } catch (error) {
//     // Log and return error message
//     console.log("Authentication error:", error.message);
//     return json({ error: error.message }, { status: 401 });
//   }
// };

export const action = async ({ request, context }) => {
  // call form authenticator
  const resp = await authenticator.authenticate("form", request, {
    successRedirect: "/",
    failureRedirect: "/login",
    throwOnError: true,
    context,
  });
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

  // Extract error messages and ensure they are strings
  const loaderError = loaderData?.error ? String(loaderData.error.message) : null;
  const actionError = actionData?.error ? String(actionData.error.message) : null;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Apply-lite</h1>
      <p>
        Please Login to continue
      </p>
      <LoginBox loaderError={loaderError} actionError={actionError}></LoginBox>
    </div>
  );
}
