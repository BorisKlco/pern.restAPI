import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingUsers from "./loadingUsers";

export default function Users() {
  const fetchUsers = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axios
        .get("http://localhost:8080/users", {
          withCredentials: true,
        })
        .then((res) => res.data),
  });

  if (fetchUsers.status === "loading") {
    return <LoadingUsers />;
  }

  if (fetchUsers.status === "error") {
    return <span>Error: {fetchUsers.error.message}</span>;
  }

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
          {fetchUsers.data.map((user) => (
            <tr
              key={user.id}
              className="bg-gray-600 border-b border-gray-400 text-gray-400 hover:text-white"
            >
              <th className="px-4 py-1 truncate bg-gray-500 w-[6rem]">
                {user.username}
              </th>
              <td className="px-6 py-1 w-[8rem]">{user.email}</td>
              <td className="px-6 py-1 truncate bg-gray-500 w-[4rem]">Edit</td>
              <td className="text-center py-1 truncate w-[2rem]">
                <input type="checkbox" name="" id="" value={user.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
