import { Link, Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Cookies from "js-cookie";

import axios from "axios";

export default function Loginpage() {
  const [user, setUser] = useState("user@User");
  const [password, setPassword] = useState("user@Useruser@Useruser@User");
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
      <div>
        <form
          className="py-4 px-4 flex flex-col gap-2 border border-gray-400 bg-gray-200"
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
          <div className="flex gap-2 justify-between">
            <label className="font-bold" htmlFor="email">
              Email:
            </label>
            <input
              className="px-2 outline-none focus:underline"
              type="email"
              name="email"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>

          <div className="flex gap-2 justify-between">
            <label className="font-bold" htmlFor="password">
              Password:
            </label>
            <input
              className="px-2 outline-none focus:underline"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="mx-auto text-red-400 font-bold">
            {mutation.isError && mutation.error.response["data"]}
          </p>
          {mutation.isLoading ? (
            <button className="animate-pulse mx-auto w-[50%] border border-black rounded disabled">
              Loading
            </button>
          ) : (
            <button className="mx-auto w-[50%] border border-gray-400 rounded hover:bg-gray-300">
              Submit
            </button>
          )}
        </form>
      </div>
      <div className="flex justify-between">
        <Link className="hover:underline" to="/register">
          Register
        </Link>
        <Link className="hover:underline" to="/">
          Homepage
        </Link>
      </div>
    </>
  );
}
