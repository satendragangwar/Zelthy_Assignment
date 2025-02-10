import { CiGlobe } from "react-icons/ci";
import { extractTimezoneText } from "../utils/helper";
import { BsThreeDots } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ListComponent = ({
  availibilty,
  deleteItem,
  toggleDefault,
  duplicateAvailability,
}) => {
  const navigate = useNavigate();
  return (
    // <Link to={`${availibilty.id}`}>
    <div
      className="border-b border-gray-200 dark:border-gray-700 cursor-pointer" 
      onClick={() => navigate(`${availibilty.id}`)}
    >
      <div className="flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
        <div className="flex flex-col gap-2">
          <p>
            <span className="text-gray-900 dark:text-white font-semibold text-xl mr-3">
              {" "}
              {availibilty.name}
            </span>
            {availibilty.isDefault && (
              <span className="badge badge-success gap-2">
                Default
              </span>
            )}
          </p>
          <p className="flex gap-3 items-center text-gray-600 dark:text-gray-400 text-lg">
            {availibilty?.message}
          </p>
          <p className="flex gap-3 items-center text-gray-600 dark:text-gray-400 text-lg">
            <CiGlobe /> {extractTimezoneText(availibilty.timezone)}
          </p>
        </div>
        <details
          className="dropdown dropdown-end overflow-visible z-[7]"  
          onClick={(e) => e.stopPropagation()}
        >
          <summary className="  btn btn-ghost btn-square text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <BsThreeDots className="text-xl" />
          </summary>
          <ul
            className="dropdown-content menu menu-sm bg-white dark:bg-gray-800 rounded-box w-48 p-2 shadow-xl border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {!availibilty.isDefault && (
              <li onClick={() => toggleDefault(availibilty.id)}>
                <a className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <FaRegStar />
                  Set as default
                </a>
              </li>
            )}

            <li>
              <a
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => duplicateAvailability(availibilty.id)}
              >
                <MdContentCopy />
                Duplicate
              </a>
            </li>
            <li onClick={() => deleteItem(availibilty.id)}>
              <a className="text-error hover:bg-gray-100 dark:hover:bg-gray-700">
                <MdDeleteOutline />
                Delete
              </a>
            </li>
          </ul>
        </details>
      </div>
    </div>
    // </Link>
  );
};

export default ListComponent;
