export default function RowItem({ props }) {
  console.log(props);
  return (
    <>
      <tr className="bg-gray-600 border-b border-gray-400 text-gray-400 hover:text-white">
        <th className="px-4 py-1 truncate bg-gray-500 w-[6rem]">
          {props.username}
        </th>
        <td className="px-6 py-1 w-[8rem]">{props.email}</td>
        <td className="px-6 py-1 truncate bg-gray-500 w-[4rem]">Edit</td>
        <td className="text-center py-1 truncate w-[2rem]">
          <input type="checkbox" name="" id="" value={props.id} />
        </td>
      </tr>
    </>
  );
}
