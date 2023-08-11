import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function logout() {
  Cookies.remove("AYAYA");
  window.location.reload();
}

export default function Auth() {
  return (
    <>
      <div className="flex flex-col gap-2 border border-gray">
        <div className="my-4 mx-2">
          {Cookies.get("AYAYA") && (
            <button className="rounded bg-gray py-2 px-4" onClick={logout}>
              Odhlasit
            </button>
          )}
          {!Cookies.get("AYAYA") && (
            <Link className="rounded bg-gray py-2 px-4" to="/login">
              Go to Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
