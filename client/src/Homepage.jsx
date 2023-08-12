import Auth from "./components/auth";
import Users from "./components/users/users";

import Cookies from "js-cookie";

export default function Homepage() {
  return (
    <>
      <div className="py-2 px-2 bg-gray-50 border border-black">
        <h1 className="my-2 px-2 text-xl">
          Wellcum {Cookies.get("username") && Cookies.get("username")}
        </h1>
        {Cookies.get("username") && <Users />}
      </div>
      <Auth />
    </>
  );
}
