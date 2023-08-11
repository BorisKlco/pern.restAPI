import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function logout() {
  Cookies.remove("AYAYA");
  Cookies.remove("username");
  window.location.reload();
}

export default function Auth() {
  return (
    <>
      <div className="border border-gray-400 rounded my-2 mx-2">
        <div className="">
          {Cookies.get("AYAYA") && (
            <button
              className="rounded mx-auto w-full py-2 px-4"
              onClick={logout}
            >
              Logout
            </button>
          )}
          {!Cookies.get("AYAYA") && (
            <Link to="/login">
              <button className="rounded mx-auto w-full py-2 px-4">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
