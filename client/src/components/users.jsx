import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Users() {
  const { status, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axios
        .get("http://localhost:8080/users", {
          withCredentials: true,
        })
        .then((res) => res.data),
  });

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  // also status === 'success', but "else" logic works, too
  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.email}</li>
      ))}
    </ul>
  );
}
