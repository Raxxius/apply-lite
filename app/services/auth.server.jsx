// app/services/auth.server.ts
import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage, User } from "../services/session.server";
import { GoogleStrategy } from 'remix-auth-google'
// import { OAuth2Strategy } from "remix-auth-oauth2";

// Create an instance of the authenticator, pass a Type, User,  with what
// strategies will return and will store in the session
const authenticator = new Authenticator(sessionStorage, {
  sessionKey: "sessionKey", // keep in sync
  sessionErrorKey: "sessionErrorKey", // keep in sync
});
console.log(authenticator);

// user authentication /

authenticator.use(
  // Form authentication
  new FormStrategy(async ({ form }) => {
    // get the data from the form...
    let email = form.get("email").toLocaleLowerCase();
    console.log(email);
    let password = form.get("password");

    // initiialize user
    let user = null;

    // basic form validation, errors are in the sessionErrorKey
    if (!email || email?.length === 0)
      throw new AuthorizationError("Bad Credentials: Email is required");
    if (typeof email !== "string")
      throw new AuthorizationError("Bad Credentials: Email must be a string");

    if (!password || password?.length === 0)
      throw new AuthorizationError("Bad Credentials: Password is required");
    if (typeof password !== "string")
      throw new AuthorizationError(
        "Bad Credentials: Password must be a string"
      );

    // login the user
    if (email === "raxxman@gmail.com" && password === "password") {
      user = {
        name: email,
        token: `${password}-${new Date().getTime()}`,
      };

      // the type of this user must match the type you pass to the Authenticator
      // the strategy will automatically inherit the type if you instantiate
      // directly inside the `use` method
      return await Promise.resolve({ ...user });
    } else {
      // if problem with user throw error AuthorizationError
      throw new AuthorizationError("Bad Credentials");
    }
  })
);

let googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'https://localhost:5173/google/callback',
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    return await Promise.resolve({ profile })
  }
)

authenticator.use(googleStrategy)


// authenticator.use(
//   new OAuth2Strategy(
//     User,
//     { providers: "provider-name" },
//     { id_token: "string" }
//   )(
//     {
//       clientId: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,

//       authorizationEndpoint: "https://provider.com/oauth2/authorize",
//       tokenEndpoint: "https://provider.com/oauth2/token",
//       redirectURI: "https://example.app/auth/callback",

//       tokenRevocationEndpoint: "https://provider.com/oauth2/revoke", // optional

//       codeChallengeMethod: "S256", // optional
//       scopes: ["openid", "email", "profile"], // optional

//       authenticateWith: "request_body", // optional
//     },
//     async ({ tokens, profile, context, request }) => {
//       // here you can use the params above to get the user and return it
//       // what you do inside this and how you find the user is up to you
//       return await getUser(tokens, profile, context, request);
//     }
//   ),
//   // this is optional, but if you setup more than one OAuth2 instance you will
//   // need to set a custom name to each one
//   "Google-provider"
// );

export default authenticator;
