import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import MyAvailibility from "../components/MyAvailibility";
import TeamAvailibilty from "../components/TeamAvailibilty";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const AvailabilityPage = () => {
  const [availabilityType, setAvailabilityType] = useState("my");
  const [name, setName] = useState("");
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();
  const localDataList = localStorage.getItem("dataList");

  useEffect(() => {
    if (localDataList) {
      const savedData = JSON.parse(localDataList);
      setDataList(savedData);
    }
  }, [localDataList]);

  const submitName = () => {
    const uuid = uuidv4();
    const newDataItem = {
      id: uuid,
      name: name,
      sunday: [],
      monday: [{ start: "9:00am", end: "5:00pm" }],
      tuesday: [{ start: "9:00am", end: "5:00pm" }],
      wednesday: [{ start: "9:00am", end: "5:00pm" }],
      thursday: [{ start: "9:00am", end: "5:00pm" }],
      friday: [{ start: "9:00am", end: "5:00pm" }],
      saturday: [],
      isDefault: dataList.length > 0 ? false : true,
      timezone: "Asia/Kolkata +5:30 GMT",
      overrides: [],
      message:
        "Mon 9:00am - 5:00pm Tue 9:00am - 5:00pm Wed 9:00am - 5:00pm Thu 9:00am - 5:00pm Fri 9:00am - 5:00pm",
    };
    const updatedDataList = [...dataList, newDataItem];
    setDataList(updatedDataList);
    localStorage.setItem("dataList", JSON.stringify(updatedDataList));
    setName("");
    navigate(`/${uuid}`);
    toast(name + " schedule created successfully", {
      position: "bottom-center",
      style: {
        borderRadius: "10px",
      },
    });
  };

  const duplicateAvailability = (id) => {
    const av = dataList.filter((a) => a.id === id);
    const uuid = uuidv4();
    const newDataItem = {
      id: uuid,
      name: `${av[0].name}(Copy)`,
      sunday: [],
      monday: [{ start: "9:00am", end: "5:00pm" }],
      tuesday: [{ start: "9:00am", end: "5:00pm" }],
      wednesday: [{ start: "9:00am", end: "5:00pm" }],
      thursday: [{ start: "9:00am", end: "5:00pm" }],
      friday: [{ start: "9:00am", end: "5:00pm" }],
      saturday: [],
      isDefault: false,
      timezone: "Asia/Kolkata +5:30 GMT",
      overrides: [],
      message:
        "Mon 9:00am - 5:00pm Tue 9:00am - 5:00pm Wed 9:00am - 5:00pm Thu 9:00am - 5:00pm Fri 9:00am - 5:00pm",
    };
    const updatedDataList = [...dataList, newDataItem];
    setDataList(updatedDataList);
    localStorage.setItem("dataList", JSON.stringify(updatedDataList));
    setName("");
    navigate(`/${uuid}`);
    toast(`${av[0].name}(Copy)` + " schedule created successfully", {
      position: "bottom-center",
      style: {
        borderRadius: "10px",
      },
    });
  };

  const deleteItem = (id) => {
    const updatedDataList = dataList.filter((item) => item.id !== id);
    setDataList(updatedDataList);
    localStorage.setItem("dataList", JSON.stringify(updatedDataList));
    console.log("deleted");
    toast("Schedule deleted successfully", {
      position: "bottom-center",
      style: {
        borderRadius: "10px",
      },
    });
  };

  const toggleDefault = (id) => {
    const updatedDataList = dataList.map((item) =>
      item.id === id
        ? { ...item, isDefault: !item.isDefault }
        : { ...item, isDefault: false }
    );
    setDataList(updatedDataList);
    localStorage.setItem("dataList", JSON.stringify(updatedDataList));
    toast.success("Default status updated!", {
      position: "bottom-center",
      style: {
        borderRadius: "10px",
      },
    });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Availability
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Configure times when you are available for bookings.
          </p>
        </div>
        <div className="flex gap-5 items-center">
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-2 bg-white dark:bg-gray-800">
            <div className="flex gap-2">
              <button
                className={`px-5 py-2 text-lg rounded-md transition-colors duration-200 ${
                  availabilityType === "my"
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                onClick={() => setAvailabilityType("my")}
              >
                My Availability
              </button>
              <button
                className={`px-5 py-2 text-lg rounded-md transition-colors duration-200 ${
                  availabilityType === "team"
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                onClick={() => setAvailabilityType("team")}
              >
                Team Availability
              </button>
            </div>
          </div>
          <button
            onClick={() => document.getElementById("my_modal_1").showModal()}
            className="flex bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-xl font-semibold items-center gap-3 rounded-lg transition-colors duration-200"
          >
            <FaPlus />
            <span>New</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {availabilityType === "my" ? (
          <MyAvailibility
            data={dataList}
            deleteItem={deleteItem}
            toggleDefault={toggleDefault}
            duplicateAvailability={duplicateAvailability}
          />
        ) : (
          <TeamAvailibilty />
        )}
      </div>

      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white dark:bg-gray-800 max-w-2xl">
          <h3 className="font-bold text-3xl text-gray-900 dark:text-white mb-5">
            Add a new schedule
          </h3>
          <div>
            <label className="text-xl font-semibold text-gray-900 dark:text-white mb-2 block">
              Name
            </label>
            <input
              type="text"
              placeholder="Working Hours"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 text-lg rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                       focus:border-transparent outline-none transition-colors duration-200"
            />
          </div>
          <div className="modal-action mt-10">
            <form method="dialog" className="flex gap-4">
              <button
                className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                              text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 
                              text-xl font-semibold transition-colors duration-200"
              >
                Close
              </button>
              <button
                onClick={submitName}
                className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 
                         text-white text-xl font-semibold transition-colors duration-200"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AvailabilityPage;
