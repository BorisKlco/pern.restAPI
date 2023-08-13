import Auth from "./components/auth";
import Users from "./components/users/users";
import { useState } from "react";

import Cookies from "js-cookie";

export default function Homepage() {
  const [showUser, setShowUser] = useState(false);
  const [createUser, setCreateUser] = useState(false);
  const [userLogs, setUserLogs] = useState(false);
  return (
    <>
      <div className="py-2 px-2 bg-gray-50 border border-black">
        <h1 className="my-2 px-2 text-xl">
          Wellcum {Cookies.get("username") && Cookies.get("username")}
        </h1>
        {Cookies.get("username") && (
          <div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowUser(!showUser)}
                className={`py-1 px-4 my-2 border transition border-gray-400 hover:bg-gray-200 ${
                  showUser && "bg-gray-200 shadow-inner text-gray-600"
                }`}
              >
                Users List
              </button>
              <button
                onClick={() => setCreateUser(!createUser)}
                className={`py-1 px-4 my-2 border transition border-gray-400 hover:bg-gray-200 ${
                  createUser && "bg-gray-200 shadow-inner text-gray-600"
                }`}
              >
                Create User
              </button>
              <button
                onClick={() => setUserLogs(!userLogs)}
                className={`py-1 px-4 my-2 border transition border-gray-400 hover:bg-gray-200 ${
                  userLogs && "bg-gray-200 shadow-inner text-gray-600"
                }`}
              >
                User Logs
              </button>
            </div>
            {showUser && <Users />}
          </div>
        )}
      </div>
      <Auth />
    </>
  );
}
