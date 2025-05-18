import { Delete, Edit } from "lucide-react";
import { ICategoryData } from "../Categories";
import { useAppDispatch } from "../../../../store/hooks";
import { handleCategoryDelete } from "../../../../store/adminCategorySlice";

const Table = ({ data }: { data: ICategoryData[] }) => {
  const dispatch = useAppDispatch();

  const deleteCategory = async (id: string) => {
    id && dispatch(handleCategoryDelete(id))
    
  };


  return (
    <table className=" min-w-full rounded-xl">
      <thead>
        <tr className="bg-gray-50">
          <th
            scope="col"
            className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
          >
            Name
          </th>
          <th
            scope="col"
            className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
          >
            Created At
          </th>
          <th
            scope="col"
            className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
          >
            Category Id
          </th>
          <th
            scope="col"
            className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
          >
            Updated At
          </th>
          <th
            scope="col"
            className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
          >
            Actions
          </th>
        </tr>
      </thead>
      {data.length > 0 &&
        data.map((category) => {
          return (
            <tbody className="divide-y divide-gray-300 ">
              <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                  {category.categoryName}
                </td>
                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                  {new Date(category.createdAt).toLocaleDateString()}
                </td>
                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                  {category.id}
                </td>
                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                  {new Date(category?.updatedAt).toLocaleDateString()}
                </td>
                <td className=" p-5 ">
                  <div className="flex items-center gap-1">
                    <button className="p-2  rounded-full  group transition-all duration-500  flex item-center">
                      <Edit
                        // onClick={() => editCategory(category?.id)}
                        className="text-blue-500"
                      />
                    </button>
                    <button className="p-2 rounded-full  group transition-all duration-500  flex item-center">
                      <Delete
                        onClick={() => deleteCategory(category?.id)}
                        className="text-red-500"
                      />
                    </button>
                    <button className="p-2 rounded-full  group transition-all duration-500  flex item-center"></button>
                  </div>
                </td>
              </tr>
            </tbody>
          );
        })}
    </table>
  );
};

export default Table