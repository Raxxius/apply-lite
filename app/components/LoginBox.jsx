import { Form } from "@remix-run/react";

export default function LoginBox({loaderError, actionError}) {
  return (
    <div className="login-box">
      <Form method="post">
        <div>
          <label>
            Email:{" "}
            <input type="email" name="email" placeholder="email" required />
          </label>
        </div>
        <div>
          <label>
            Password:{" "}
            <input
              type="password"
              name="password"
              placeholder="password"
              autoComplete="current-password"
              required
            />
          </label>
        </div>
        <button type="submit">Sign In</button>
      </Form>
      {loaderError && <p style={{ color: "red" }}>ERROR: {loaderError}</p>}
      {actionError && <p style={{ color: "red" }}>ERROR: {actionError}</p>}
    </div>
  );
}
