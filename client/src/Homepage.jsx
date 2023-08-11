import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <h2>
      <Link to="/login">Go to Login</Link>
    </h2>
  );
}
