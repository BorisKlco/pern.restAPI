import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function logout() {
  Cookies.remove("AYAYA");
  window.location.reload();
}

export default function Homepage() {
  return (
    <>
      {Cookies.get("AYAYA") && <button onClick={logout}>Odhlasit</button>}

      <h2>
        AYAYA
        {!Cookies.get("AYAYA") && <Link to="/login">Go to Login</Link>}
      </h2>
    </>
  );
}
