import Auth from "./components/auth";
import Users from "./components/users/users";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

import Cookies from "js-cookie";

export default function Homepage() {
  const [showUser, setShowUser] = useState(false);
  const [createUser, setCreateUser] = useState(false);
  const [userLogs, setUserLogs] = useState(false);
  const [sliderValue, setSliderValue] = useState(6);

  const mutation = useMutation({
    mutationFn: (number) => {
      return axios.get(`http://localhost:8080/create/${number}`, {
        withCredentials: true,
      });
    },
  });

  const handleReq = () => {
    mutation.mutate(sliderValue);
  };

  const handleUsers = () => {
    mutation.reset();
    setUserLogs(false);
    setCreateUser(false);
    setShowUser(!showUser);
  };
  const handleCreate = () => {
    mutation.reset();
    setUserLogs(false);
    setShowUser(false);
    setCreateUser(!createUser);
  };
  const handleLogs = () => {
    mutation.reset();
    setCreateUser(false);
    setShowUser(false);
    setUserLogs(!userLogs);
  };

  const handleSliderValue = (e) => {
    console.log(e.target.value);
    setSliderValue(+e.target.value);
  };

  if (mutation.isSuccess) {
    console.log(mutation);
  }

  return (
    <>
      <div className="py-2 px-2 bg-gray-50 border border-black">
        <h1 className="my-2 text-xl">
          Wellcum {Cookies.get("username") && Cookies.get("username")}
        </h1>
        {Cookies.get("username") && (
          <div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleUsers}
                className={`py-1 px-4 my-2 border transition border-gray-400 hover:bg-gray-200 ${
                  showUser && "bg-gray-200 shadow-inner text-gray-600"
                }`}
              >
                Users List
              </button>
              <button
                onClick={handleCreate}
                className={`py-1 px-4 my-2 border transition border-gray-400 hover:bg-gray-200 ${
                  createUser && "bg-gray-200 shadow-inner text-gray-600"
                }`}
              >
                Create Users
              </button>
              <button
                onClick={handleLogs}
                className={`py-1 px-4 my-2 border transition border-gray-400 hover:bg-gray-200 ${
                  userLogs && "bg-gray-200 shadow-inner text-gray-600"
                }`}
              >
                User Logs
              </button>
            </div>
            {showUser && <Users />}
            {createUser && (
              <div className="mt-4 flex flex-col gap-4">
                <h1 className="font-semibod text-lg">Create random users:</h1>
                <div className="flex justify-between">
                  <span>Number of users: </span>
                  <div className="flex items-center gap-4">
                    <span>{sliderValue}</span>
                    <input
                      type="range"
                      min="2"
                      max="12"
                      onChange={handleSliderValue}
                      value={sliderValue}
                      step="1"
                    />
                  </div>
                </div>
                <p className="mx-auto text-green-400 font-bold">
                  {mutation.isSuccess && "Users created"}
                </p>
                <button
                  onClick={handleReq}
                  className="mx-auto bg-gray-200 w-full py-2 px-4 hover:bg-gray-300 hover:text-black text-gray-400"
                >
                  Create
                </button>
              </div>
            )}
            {userLogs && "Wo0oking 0n it! 👷‍♂️"}
          </div>
        )}
      </div>
      <Auth />
    </>
  );
}
