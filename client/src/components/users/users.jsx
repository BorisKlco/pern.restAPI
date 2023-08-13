import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import LoadingUsers from "./loadingUsers";

export default function Users() {
  const [deleteList, setDeleteList] = useState([]);
  const [holder, setHolder] = useState(8);

  const mutation = useMutation({
    mutationFn: (userList) => {
      return axios.post("http://localhost:8080/delete", userList, {
        withCredentials: true,
      });
    },
  });

  const fetchUsers = useQuery({
    queryKey: ["users", mutation.isSuccess],
    queryFn: () =>
      axios
        .get("http://localhost:8080/users", {
          withCredentials: true,
        })
        .then((res) => res.data),
  });

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setDeleteList([...deleteList, value]);
      console.log(deleteList);
    } else {
      const removeValue = deleteList.filter((item) => item !== value);
      setDeleteList([...removeValue]);
    }
  };

  const handleDelete = () => {
    const userList = { users: deleteList };

    mutation.mutate(userList);
    if (mutation.isSuccess) {
      setDeleteList([]);
      setHolder(fetchUsers.data.length);
    }
  };

  if (fetchUsers.status === "loading") {
    return <LoadingUsers size={holder} />;
  }

  if (fetchUsers.status === "error") {
    return <span>Error: {fetchUsers.error.message}</span>;
  }

  return (
    <>
      <table className="w-full text-sm text-left text-white">
        <thead className="text-xs uppercase bg-gray-300 border-b border-gray-400 text-black">
          <tr className="text-center">
            <th scope="col" className="px-4 py-3 bg-gray-200">
              Nick
            </th>
            <th scope="col" className="px-4 py-3">
              Email
            </th>
            <th scope="col" className="px-4 py-3 bg-gray-200">
              Edit
            </th>
            <th scope="col" className="px-2 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {fetchUsers.isFetched &&
            fetchUsers.data.map((user) => (
              <tr
                key={user.id}
                className="bg-gray-300 border-b border-gray-400 text-gray-500 hover:text-black"
              >
                <th className="px-4 py-1 truncate bg-gray-200 w-[6rem] max-w-[6rem]">
                  {user.username}
                </th>
                <td className="px-6 py-1 truncate w-[8rem] max-w-[8rem]">
                  {user.email}
                </td>
                <td className="text-center px-6 py-1 truncate bg-gray-200 w-[5rem] max-w-[5rem]">
                  Edit
                </td>
                <td className="text-center py-1 truncate w-[2rem] max-w-[2rem]">
                  <input
                    checked={deleteList.includes(user.id.toString())}
                    onChange={handleCheckboxChange}
                    type="checkbox"
                    name={user.id}
                    id={user.id}
                    value={user.id}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="">
        <button
          onClick={handleDelete}
          disabled={deleteList.length < 1}
          className={`mx-auto bg-gray-200 w-full py-2 px-4 hover:bg-gray-300 ${
            deleteList.length < 1 && "bg-gray-100 text-gray-200"
          }`}
        >
          Delete
        </button>
      </div>
    </>
  );
}
