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
      <div className="border border-gray-400 rounded my-4 mx-2">
        <div className="">
          {Cookies.get("AYAYA") && (
            <button
              className="mx-auto bg-gray-100 w-full py-2 px-4 hover:bg-gray-200"
              onClick={logout}
            >
              Logout
            </button>
          )}
          {!Cookies.get("AYAYA") && (
            <>
              <Link to="/login">
                <button className="mx-auto bg-gray-100 border-b w-full py-2 px-4 hover:bg-gray-200">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="mx-auto bg-gray-100 w-full py-2 px-4 hover:bg-gray-200">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
