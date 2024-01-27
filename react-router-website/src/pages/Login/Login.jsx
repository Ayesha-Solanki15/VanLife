import React, { useState } from "react";
import {
  useLoaderData,
  useNavigate,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { loginUser } from "../../apis";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  // console.log(request)
  //used to get whatever data we have entered while submitting
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"
  // console.log(email, password)
  try {
    const data = await loginUser({ email, password });
    // console.log(data)
    localStorage.setItem("loggedIn", "true");
    return redirect(pathname);
  } catch (err) {
    return err.message
  }
}

export default function Login() {
  // const [loginFormData, setLoginFormData] = React.useState({
  //   email: "",
  //   password: "",
  // });
  const message = useLoaderData();
  // const [status, setStatus] = useState("idle")
  // const [error, setError] = useState(null);
  const errorMessage = useActionData();
  // const navigate = useNavigate();
  const navigation = useNavigation();
  // console.log(navigation)
  // the above statement logs an object with a state property which shows the status of form whether it's idle or submitting, so we no longer require the status state.

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   // console.log(loginFormData)
  //   setStatus("submitting");
  //   setError(null);
  //   loginUser(loginFormData)
  //     .then((data) => navigate("/host", { replace: true }))
  //     .catch((err) => setError(err))
  //     .finally(() => setStatus("idle"));
  // }

  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   setLoginFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // }

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {errorMessage && <h3 className="red">{errorMessage}</h3>}
      {/* <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button disabled={status === "submitting"}>
          {status === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </form> */}

      {/* here we can add an action prop the Form component but react-router provides us with a action function that runs whenever we submit the form and that request is then processed by the action function */}
      <Form className="login-form" method="post" replace>
        {/* replace prop will allow us to replace the current route from history stack so on form submission it will redirect us to '/host' and after pressing back button it won't redirect us again to '/login'  */}
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
