export default function LoadingUsers() {
  return (
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
        {Array.from({ length: 12 }, (item, i) => (
          <tr
            key={i}
            className="animate-pulse bg-gray-600 border-b border-gray-400 text-gray-400 hover:text-white"
          >
            <th className="px-4 py-1 bg-gray-500 w-[6rem]">Loading...</th>
            <td className="px-6 py-1 w-[8rem]">Loading...</td>
            <td className="px-6 py-1 truncate bg-gray-500 w-[4rem]">Edit</td>
            <td className="animate-pulse text-center py-1 truncate w-[2rem]">
              <input type="checkbox" name="" id="" />
            </td>
          </tr>
        ))}
        <tr className="bg-gray-600 border-b border-gray-400 text-gray-400 hover:text-white">
          <th className="px-4 py-1 bg-gray-500 w-[6rem]">Loading...</th>
          <td className="px-6 py-1 w-[8rem]">Loading...</td>
          <td className="px-6 py-1 truncate bg-gray-500 w-[4rem]">Edit</td>
          <td className="text-center py-1 truncate w-[2rem]">
            <input type="checkbox" name="" id="" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
