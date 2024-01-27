import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  const pathname = new URL(request.url).pathname
  const isLoggedIn = localStorage.getItem("loggedIn")
  if (!isLoggedIn) {
    // throw redirect("/login"), throw calls our errorElement prop that we have described about in app.jsx
    const response = redirect("/login?message=You must login first&redirectTo=${pathname}")
    response.body = true
    throw response
  }
  return null
}