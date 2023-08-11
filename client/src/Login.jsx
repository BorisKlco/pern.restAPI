import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

async function postLogin({ queryKey }) {
  console.log("hi");
  const loginInfo = queryKey[1];

  const res = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  });

  if (!res.ok) {
    throw new Error("fetch not ok");
  }

  console.log(res.headers);
  return res;
}

export default function Login() {
  const [login, setLogin] = useState();
  const submitLogin = useQuery(["loginData", login], postLogin, {
    enabled: !!login,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="flex flex-col my-8 p-4">
        <form
          className="flex flex-col gap-2 border border-gray"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const obj = {
              email: formData.get("email") ?? "",
              password: formData.get("password") ?? "",
            };
            setLogin(obj);
          }}
        >
          <label htmlFor="email">
            Email: <input type="email" name="email" />
          </label>
          <label htmlFor="password">
            Password: <input type="password" name="password" />
          </label>
          <button>Submit</button>
        </form>
      </div>
      {submitLogin.isFetching && "Loading..."}
      <h2>
        <Link to="/">Go to HomePage Page</Link>
      </h2>
    </>
  );
}
