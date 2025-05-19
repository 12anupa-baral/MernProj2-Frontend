import { ArrowRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { addCategory, resetStatus } from "../../../../store/adminCategorySlice";
import { Status } from "../../../../globals/types/type";
import { toast } from "react-toastify";

const Modal = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((store) => store.category);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      dispatch(addCategory(categoryName));
    } catch (error) {
      toast.error("Error adding category.");
    }
  };

  useEffect(() => {
    if (status === Status.SUCCESS) {
      setLoading(false);
      onClose();
      dispatch(resetStatus());
    }
  }, [status]);

  return (
    <div
      id="modal"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/50" />
      <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add Category
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="category_name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Category Name
            </label>
            <input
              name="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              type="text"
              id="category_name"
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Enter category"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Adding..." : "Add"}
              {!loading && <ArrowRight className="size-4 ml-2" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
