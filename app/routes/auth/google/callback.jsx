// app/routes/auth/google/callback.tsx
import { authenticator } from '../services/auth.server'

export let loader = (request) => {
  return authenticator.authenticate('google', request, {
    successRedirect: '/',
    failureRedirect: '/login',
  })
}