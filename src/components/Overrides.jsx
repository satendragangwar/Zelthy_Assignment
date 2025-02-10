import { MdInfoOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import toast from "react-hot-toast";

const times = [
  "12:00am",
  "12:15am",
  "12:30am",
  "12:45am",
  "1:00am",
  "1:15am",
  "1:30am",
  "1:45am",
  "2:00am",
  "2:15am",
  "2:30am",
  "2:45am",
  "3:00am",
  "3:15am",
  "3:30am",
  "3:45am",
  "4:00am",
  "4:15am",
  "4:30am",
  "4:45am",
  "5:00am",
  "5:15am",
  "5:30am",
  "5:45am",
  "6:00am",
  "6:15am",
  "6:30am",
  "6:45am",
  "7:00am",
  "7:15am",
  "7:30am",
  "7:45am",
  "8:00am",
  "8:15am",
  "8:30am",
  "8:45am",
  "9:00am",
  "9:15am",
  "9:30am",
  "9:45am",
  "10:00am",
  "10:15am",
  "10:30am",
  "10:45am",
  "11:00am",
  "11:15am",
  "11:30am",
  "11:45am",
  "12:00pm",
  "12:15pm",
  "12:30pm",
  "12:45pm",
  "1:00pm",
  "1:15pm",
  "1:30pm",
  "1:45pm",
  "2:00pm",
  "2:15pm",
  "2:30pm",
  "2:45pm",
  "3:00pm",
  "3:15pm",
  "3:30pm",
  "3:45pm",
  "4:00pm",
  "4:15pm",
  "4:30pm",
  "4:45pm",
  "5:00pm",
  "5:15pm",
  "5:30pm",
  "5:45pm",
  "6:00pm",
  "6:15pm",
  "6:30pm",
  "6:45pm",
  "7:00pm",
  "7:15pm",
  "7:30pm",
  "7:45pm",
  "8:00pm",
  "8:15pm",
  "8:30pm",
  "8:45pm",
  "9:00pm",
  "9:15pm",
  "9:30pm",
  "9:45pm",
  "10:00pm",
  "10:15pm",
  "10:30pm",
  "10:45pm",
  "11:00pm",
  "11:15pm",
  "11:30pm",
  "11:45pm",
  "11:59pm",
];

const Overrides = ({ availability }) => {
  const [overrides, setOverrides] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("dataList"));
    if (storedData) {
      setData(storedData);
      const currentAvailability = storedData.find(
        (item) => item.id === availability?.id
      );
      if (currentAvailability) {
        setOverrides(currentAvailability.overrides || []);
      }
    }
  }, [availability]);

  const addOverride = () => {
    if (!selectedDate || !startTime || !endTime) {
      toast.error("Please fill in all fields", {
        position: "bottom-center",
      });
      return;
    }

    const newOverride = {
      date: selectedDate,
      startTime,
      endTime,
    };

    const updatedOverrides = [...overrides, newOverride];
    setOverrides(updatedOverrides);

    const updatedData = data.map((item) =>
      item.id === availability?.id
        ? { ...item, overrides: updatedOverrides }
        : item
    );

    setData(updatedData);
    localStorage.setItem("dataList", JSON.stringify(updatedData));
    toast.success("Override added successfully", {
      position: "bottom-center",
    });

    // Reset form
    setSelectedDate(null);
    setStartTime("");
    setEndTime("");
    document.getElementById("my_modal_3").close();
  };

  const deleteOverride = (index) => {
    const updatedOverrides = overrides.filter((_, i) => i !== index);
    setOverrides(updatedOverrides);

    const updatedData = data.map((item) =>
      item.id === availability?.id
        ? { ...item, overrides: updatedOverrides }
        : item
    );

    setData(updatedData);
    localStorage.setItem("dataList", JSON.stringify(updatedData));
    toast.success("Override deleted successfully", {
      position: "bottom-center",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Date Overrides</h2>
          <div
            className="tooltip"
            data-tip="Overrides allow you to set different hours for specific dates"
          >
            <MdInfoOutline className="text-gray-500 dark:text-gray-400 text-xl" />
          </div>
        </div>
        <button
          className="btn btn-primary btn-sm gap-2"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          <FaPlus />
          Add an override
        </button>
      </div>

      {overrides.length > 0 ? (
        <div className="space-y-4">
          {overrides.map((override, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
              <div>
                <p className="text-gray-900 dark:text-white font-medium">
                  {new Date(override.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {override.startTime} - {override.endTime}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-ghost btn-sm btn-square text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <MdOutlineEdit className="text-lg" />
                </button>
                <button
                  className="btn btn-ghost btn-sm btn-square text-error hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => deleteOverride(index)}
                >
                  <RiDeleteBinLine className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-600 dark:text-gray-400">
          No overrides set. Add an override to customize your availability for specific dates.
        </div>
      )}

      {/* Add Override Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white dark:bg-gray-800 max-w-3xl">
          <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-6">
            Add Date Override
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  sx={{
                    "& .MuiPickersDay-root": {
                      color: "var(--fallback-bc,oklch(var(--bc)))",
                      backgroundColor: "var(--fallback-b2,oklch(var(--b2)))",
                    },
                    "& .MuiPickersDay-root:hover": {
                      backgroundColor: "var(--fallback-b3,oklch(var(--b3)))",
                    },
                    "& .MuiPickersDay-root.Mui-selected": {
                      backgroundColor: "var(--fallback-p,oklch(var(--p)))",
                      color: "var(--fallback-pc,oklch(var(--pc)))",
                    },
                    "& .MuiDayCalendar-weekDayLabel": {
                      color: "var(--fallback-bc,oklch(var(--bc)))",
                    },
                    "& .MuiPickersCalendarHeader-label": {
                      color: "var(--fallback-bc,oklch(var(--bc)))",
                    },
                    "& .MuiPickersArrowSwitcher-button": {
                      color: "var(--fallback-bc,oklch(var(--bc)))",
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="space-y-6">
              <div>
                <label className="label">
                  <span className="label-text text-gray-900 dark:text-white font-medium">
                    Start Time
                  </span>
                </label>
                <select
                  className="select select-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                >
                  <option value="">Select start time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-gray-900 dark:text-white font-medium">
                    End Time
                  </span>
                </label>
                <select
                  className="select select-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                >
                  <option value="">Select end time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="modal-action mt-8">
            <form method="dialog" className="flex gap-2">
              <button className="btn btn-ghost text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={addOverride}
              >
                Add Override
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Overrides;
