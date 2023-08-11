import { Link } from "react-router-dom";
export default function Login() {
  return (
    <>
      <div>
        <form>
          <label htmlFor="email">
            Email: <input type="email" name="email" />
          </label>
          <label htmlFor="password">
            Email: <input type="password" name="password" />
          </label>
          <button>Submit</button>
        </form>
      </div>
      <h2>
        <Link to="/">Go to HomePage Page</Link>
      </h2>
    </>
  );
}
