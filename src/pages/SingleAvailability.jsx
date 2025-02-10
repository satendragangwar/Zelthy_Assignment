import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineInfo } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import DayAvailibility from "../components/DayAvailibility";
import Overrides from "../components/Overrides";

const timezoneOptions = [
  "Pacific/Midway -11:00 GMT",
  "Pacific/Pago_Pago -11:00 GMT",
  "Pacific/Honolulu -10:00 GMT",
  "America/Anchorage -9:00 GMT",
  "America/Los_Angeles -8:00 GMT",
  "America/Denver -7:00 GMT",
  "America/Chicago -6:00 GMT",
  "America/New_York -5:00 GMT",
  "America/Halifax -4:00 GMT",
  "America/Sao_Paulo -3:00 GMT",
  "Atlantic/South_Georgia -2:00 GMT",
  "Atlantic/Azores -1:00 GMT",
  "Europe/London +0:00 GMT",
  "Europe/Paris +1:00 GMT",
  "Europe/Athens +2:00 GMT",
  "Europe/Moscow +3:00 GMT",
  "Asia/Dubai +4:00 GMT",
  "Asia/Kolkata +5:30 GMT",
  "Asia/Bangkok +7:00 GMT",
  "Asia/Hong_Kong +8:00 GMT",
  "Asia/Tokyo +9:00 GMT",
  "Australia/Sydney +10:00 GMT",
  "Pacific/Noumea +11:00 GMT",
  "Pacific/Fiji +12:00 GMT",
  "Pacific/Tongatapu +13:00 GMT",
];

const SingleAvailability = () => {
  const { id } = useParams();
  const [availability, setAvailability] = useState(null);
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();
  const [selectedTimezone, setSelectedTimezone] = useState("");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("dataList"));
    if (savedData) {
      const item = savedData.find((item) => item.id === id);
      setAvailability(item);
    }
  }, [id]);

  const syncMessage = () => {
    const savedData = JSON.parse(localStorage.getItem("dataList"));
    console.log(availability);

    const newDataItem = savedData.find((a) => a.id === id);
    console.log(newDataItem);

    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } =
      newDataItem;
    if (newDataItem) {
      const monMessage =
        monday.length > 0 ? `Mon ${monday[0].start} - ${monday[0].end} ` : "";
      const tueMessage =
        tuesday.length > 0
          ? `Tue ${tuesday[0].start} - ${tuesday[0].end} `
          : "";
      const wedMessage =
        wednesday.length > 0
          ? `Wed ${wednesday[0].start} - ${wednesday[0].end} `
          : "";
      const thuMessage =
        thursday.length > 0
          ? `Thu ${thursday[0].start} - ${thursday[0].end} `
          : "";
      const friMessage =
        friday.length > 0 ? `Fri ${friday[0].start} - ${friday[0].end} ` : "";
      const satMessage =
        saturday.length > 0
          ? `Sat ${saturday[0].start} - ${saturday[0].end} `
          : "";
      const sunMessage =
        sunday.length > 0 ? `Sun ${sunday[0].start} - ${sunday[0].end} ` : "";

      const message =
        monMessage +
        tueMessage +
        wedMessage +
        thuMessage +
        friMessage +
        satMessage +
        sunMessage;
      newDataItem.message = message;
      let updatedDataList = savedData.filter((item) => item.id !== id);
      updatedDataList = [...updatedDataList, newDataItem];
      localStorage.setItem("dataList", JSON.stringify(updatedDataList));
    }
  };

  const handleTimezoneChange = (event) => {
    const newTimezone = event.target.value;
    const updatedDataList = dataList.map((item) =>
      item.id === availability.id ? { ...item, timezone: newTimezone } : item
    );
    setDataList(updatedDataList);
    localStorage.setItem("dataList", JSON.stringify(updatedDataList));
    setSelectedTimezone(newTimezone);
    toast.success("Schedule updated successfully", {
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
    }
  );
  };

  const deleteAvailability = (id) => {
    const updatedDataList = dataList.filter((item) => item.id !== id);
    setDataList(updatedDataList);
    localStorage.setItem("dataList", JSON.stringify(updatedDataList));
    toast.success("Availability deleted successfully", {
      position: "bottom-center",
      style: {
        borderRadius: "10px",
      },
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              className="btn btn-ghost btn-circle text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => navigate("/")}
            >
              <FaArrowLeft className="text-xl" />
            </button>
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                {availability?.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-4xl">
                {availability?.message}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <span className="text-gray-700 dark:text-gray-200 text-lg font-medium">
                Set to Default
              </span>
              <input
                type="checkbox"
                className="toggle"
                defaultChecked={availability?.isDefault}
                onChange={() => toggleDefault(availability?.id)}
              />
            </div>

            <div className="divider divider-horizontal"></div>

            <button
              onClick={() => document.getElementById("my_modal_4").showModal()}
              className="btn btn-ghost btn-square text-error hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <MdDeleteOutline className="text-2xl" />
            </button>

            <div className="divider divider-horizontal"></div>

            <button
              onClick={() => {
                syncMessage();
                toast.success("Schedule updated successfully", {
                  position: "bottom-center",
                  style: { borderRadius: "10px" },
                });
              }}
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-3 space-y-8">
            <div className="card bg-white dark:bg-gray-800 shadow-xl">
              <div className="card-body">
                <DayAvailibility />
              </div>
            </div>
            <div className="card bg-white dark:bg-gray-800 shadow-xl">
              <div className="card-body">
                <Overrides availability={availability} />
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="card bg-white dark:bg-gray-800 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-gray-900 dark:text-white">
                  Timezone
                </h2>
                <select
                  className="select select-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  value={selectedTimezone}
                  onChange={handleTimezoneChange}
                >
                  <option value={availability?.timezone}>
                    {availability?.timezone}
                  </option>
                  {timezoneOptions.map((timezone, index) => (
                    <option key={index} value={timezone}>
                      {timezone}
                    </option>
                  ))}
                </select>

                <div className="divider"></div>

                <h2 className="card-title text-gray-900 dark:text-white">
                  Something doesn't look right?
                </h2>
                <button className="btn btn-outline border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
                  Launch Troubleshooter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Modal */}
        <dialog id="my_modal_4" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-white dark:bg-gray-800">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="p-3 bg-error/10 text-error rounded-full">
                  <MdOutlineInfo className="text-3xl" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  Delete schedule
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Deleting a schedule will remove it from all event types. This
                  action cannot be undone.
                </p>
              </div>
            </div>

            <div className="modal-action">
              <form method="dialog" className="flex gap-4">
                <button className="btn btn-ghost text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Cancel
                </button>
                <button
                  onClick={() => deleteAvailability(availability?.id)}
                  className="btn btn-error"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default SingleAvailability;
