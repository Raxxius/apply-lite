async function getUser(tokens, profile, context, request) {
    // Implement your logic to find or create a user based on the tokens and profile
    // For example, you can look up the user in your database using the profile information
  
    const user = await db.user.findUnique({ where: { oauthId: profile.id } });
  
    if (!user) {
      // Create a new user if not found
      const newUser = await db.user.create({
        data: {
          oauthId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
        },
      });
      return newUser;
    }
  
    return user;
  }