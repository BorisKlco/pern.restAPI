import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import RowItem from "./RowItem";

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
    <>
      <table className="w-full text-sm text-left text-white">
        <thead className="text-xs uppercase bg-gray-600 border-b border-gray-400 text-white">
          <tr className="text-center">
            <th scope="col" className="px-4 py-3 bg-gray-500">
              Nick
            </th>
            <th scope="col" className="px-4 py-3">
              Email
            </th>
            <th scope="col" className="px-4 py-3 bg-gray-500">
              Edit
            </th>
            <th scope="col" className="px-2 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <RowItem key={user.id} props={user} />
          ))}
        </tbody>
      </table>
    </>
  );
}
