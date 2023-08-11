import { Link, Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

import axios from "axios";

export default function Loginpage() {
  const mutation = useMutation({
    mutationFn: (formData) => {
      return axios.post("http://localhost:8080/auth/login", formData, {
        withCredentials: true,
      });
    },
  });

  if (Cookies.get("AYAYA")) {
    return <Navigate to="/" />;
  }

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
            mutation.mutate(obj);
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
      {mutation.isLoading && "Loading..."}
      {mutation.isError && mutation.error.response["data"]}
      <h2>
        <Link to="/">Go to HomePage Page</Link>
      </h2>
    </>
  );
}