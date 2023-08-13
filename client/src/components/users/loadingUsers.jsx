export default function LoadingUsers({ size }) {
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
          {Array.from({ length: size }, (item, i) => (
            <tr
              key={i}
              className="bg-gray-300 border-b border-gray-400 text-gray-500 hover:text-black"
            >
              <th className="px-4 py-1 truncate bg-gray-200 w-[6rem] max-w-[6rem]">
                Loading...
              </th>
              <td className="px-6 py-1 truncate w-[8rem] max-w-[8rem]">
                Loading...
              </td>
              <td className="text-center px-6 py-1 truncate bg-gray-200 w-[5rem] max-w-[5rem]">
                Edit
              </td>
              <td className="text-center py-1 truncate w-[2rem] max-w-[2rem]">
                <input type="checkbox" name="" id="" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="">
        <button
          disabled
          className="mx-auto bg-gray-200 w-full py-2 px-4 hover:bg-gray-300 bg-gray-100 text-gray-200"
        >
          Delete
        </button>
      </div>
    </>
  );
}
