import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";
import { useParams } from "react-router-dom";
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

const DayAvailability = () => {
  const [data, setData] = useState([]);
  // const [availability, setAvailability] = useState({});
  const { id } = useParams();
  const [monday, setMonday] = useState([]);

  const [sunday, setSunday] = useState([]);
  const [tuesday, setTuesday] = useState([]);
  const [wednesday, setWednesday] = useState([]);
  const [thursday, setThursday] = useState([]);
  const [friday, setFriday] = useState([]);
  const [saturday, setSaturday] = useState([]);

  const [sundayStart, setSundayStart] = useState("");
  const [sundayEnd, setSundayEnd] = useState("");
  const [mondayStart, setMondayStart] = useState("");
  const [mondayEnd, setMondayEnd] = useState("");
  const [tuesdayStart, setTuesdayStart] = useState("");
  const [tuesdayEnd, setTuesdayEnd] = useState("");
  const [wednesdayStart, setWednesdayStart] = useState("");
  const [wednesdayEnd, setWednesdayEnd] = useState("");
  const [thursdayStart, setThursdayStart] = useState("");
  const [thursdayEnd, setThursdayEnd] = useState("");
  const [fridayStart, setFridayStart] = useState("");
  const [fridayEnd, setFridayEnd] = useState("");
  const [saturdayStart, setSaturdayStart] = useState("");
  const [saturdayEnd, setSaturdayEnd] = useState("");

  const [sundayEnabled, setSundayEnabled] = useState(true);
  const [mondayEnabled, setMondayEnabled] = useState(true);
  const [tuesdayEnabled, setTuesdayEnabled] = useState(true);
  const [wednesdayEnabled, setWednesdayEnabled] = useState(true);
  const [thursdayEnabled, setThursdayEnabled] = useState(true);
  const [fridayEnabled, setFridayEnabled] = useState(true);
  const [saturdayEnabled, setSaturdayEnabled] = useState(true);

  const syncMessage = () => {
    const newData = [...data];
    const targetAvailability = newData.find((a) => a.id === id);
    if (targetAvailability) {
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
      targetAvailability.message = message;
      setData(newData);
      localStorage.setItem("dataList", JSON.stringify(newData));
    }
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("dataList"));
    setData(storedData || []);
    const availability = storedData.find((item) => item.id === id);
    console.log(availability);
    setSunday(availability.sunday);
    setMonday(availability.monday);
    setTuesday(availability.tuesday);
    setWednesday(availability.wednesday);
    setThursday(availability.thursday);
    setFriday(availability.friday);
    setSaturday(availability.saturday);

    // setAvailability(availability);
    if (availability) {
      setSundayEnabled(availability.sunday.length > 0);
      setMondayEnabled(availability.monday.length > 0);
      setTuesdayEnabled(availability.tuesday.length > 0);
      setWednesdayEnabled(availability.wednesday.length > 0);
      setThursdayEnabled(availability.thursday.length > 0);
      setFridayEnabled(availability.friday.length > 0);
      setSaturdayEnabled(availability.saturday.length > 0);
    }
  }, []);

  const handleTimeChange = (day, start, end) => {
    if (times.indexOf(end) > times.indexOf(start)) {
      const newData = [...data];
      const targetAvailability = newData.find((a) => a.id === id);
      if (targetAvailability) {
        targetAvailability[day][0] = { start, end };
        setData(newData);
        localStorage.setItem("dataList", JSON.stringify(newData));
      }
      syncMessage();
    } else {
      alert("End time must be after start time");
    }
  };

  const handleToggleChange = (day, enabled) => {
    const newData = [...data];
    const targetAvailability = newData.find((a) => a.id === id);
    if (targetAvailability) {
      targetAvailability[day] = enabled ? [] : [];
      setData(newData);
      localStorage.setItem("dataList", JSON.stringify(newData));
    }
    syncMessage();
  };

  useEffect(() => {
    if (sundayStart && sundayEnd) {
      handleTimeChange("sunday", sundayStart, sundayEnd);
      toast.success("Schedule updated successfully", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
        },
      });
    }
    syncMessage();
  }, [sundayEnd]);

  useEffect(() => {
    if (mondayStart && mondayEnd) {
      handleTimeChange("monday", mondayStart, mondayEnd);
      toast.success("Schedule updated successfully", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
        },
      });
    }
    syncMessage();
  }, [mondayEnd]);

  useEffect(() => {
    if (tuesdayStart && tuesdayEnd) {
      handleTimeChange("tuesday", tuesdayStart, tuesdayEnd);
      toast.success("Schedule updated successfully", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
        },
      });
    }
    syncMessage();
  }, [tuesdayEnd]);

  useEffect(() => {
    if (wednesdayStart && wednesdayEnd) {
      handleTimeChange("wednesday", wednesdayStart, wednesdayEnd);
      toast.success("Schedule updated successfully", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
        },
      });
    }
    syncMessage();
  }, [wednesdayEnd]);

  useEffect(() => {
    if (thursdayStart && thursdayEnd) {
      handleTimeChange("thursday", thursdayStart, thursdayEnd);
      toast.success("Schedule updated successfully", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
        },
      });
    }
    syncMessage();
  }, [thursdayEnd]);

  useEffect(() => {
    if (fridayStart && fridayEnd) {
      handleTimeChange("friday", fridayStart, fridayEnd);
      toast.success("Schedule updated successfully", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
        },
      });
    }
    syncMessage();
  }, [fridayEnd]);

  useEffect(() => {
    if (saturdayStart && saturdayEnd) {
      handleTimeChange("saturday", saturdayStart, saturdayEnd);
      toast.success("Schedule updated successfully", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
        },
      });
    }
    syncMessage();
  }, [saturdayEnd]);
  useEffect(() => {
    handleToggleChange("sunday", sundayEnabled);
    syncMessage();
  }, [sundayEnabled]);

  useEffect(() => {
    handleToggleChange("monday", mondayEnabled);
    syncMessage();
  }, [mondayEnabled]);

  useEffect(() => {
    handleToggleChange("tuesday", tuesdayEnabled);
    syncMessage();
  }, [tuesdayEnabled]);

  useEffect(() => {
    handleToggleChange("wednesday", wednesdayEnabled);
    syncMessage();
  }, [wednesdayEnabled]);

  useEffect(() => {
    handleToggleChange("thursday", thursdayEnabled);
    syncMessage();
  }, [thursdayEnabled]);

  useEffect(() => {
    handleToggleChange("friday", fridayEnabled);
    syncMessage();
  }, [fridayEnabled]);

  useEffect(() => {
    handleToggleChange("saturday", saturdayEnabled);
    syncMessage();
  }, [saturdayEnabled]);
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Set your weekly hours</h2>

      {/* Sunday */}
      <div className="card bg-white dark:bg-gray-800 shadow-sm">
        <div className="card-body px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={sundayEnabled}
                  onChange={(e) => {
                    setSundayEnabled(e.target.checked);
                    handleToggleChange("sunday", e.target.checked);
                  }}
                />
                <span className="label-text ml-2 text-lg font-medium text-gray-700 dark:text-gray-200">
                  Sunday
                </span>
              </label>
            </div>
            {sundayEnabled && (
              <div className="flex items-center gap-2">
                <select
                  className="select select-bordered select-sm w-32 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  value={sundayStart}
                  onChange={(e) => setSundayStart(e.target.value)}
                >
                  <option value="">Start Time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <span className="text-gray-600 dark:text-gray-400">to</span>
                <select
                  className="select select-bordered select-sm w-32 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  value={sundayEnd}
                  onChange={(e) => setSundayEnd(e.target.value)}
                >
                  <option value="">End Time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-ghost btn-sm btn-square text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    // Copy functionality
                  }}
                >
                  <LuCopy className="w-4 h-4" />
                </button>
                <button
                  className="btn btn-ghost btn-sm btn-square text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    // Add time slot functionality
                  }}
                >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Monday */}
      <div className="card bg-white dark:bg-gray-800 shadow-sm">
        <div className="card-body px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={mondayEnabled}
                  onChange={(e) => {
                    setMondayEnabled(e.target.checked);
                    handleToggleChange("monday", e.target.checked);
                  }}
                />
                <span className="label-text ml-2 text-lg font-medium text-gray-700 dark:text-gray-200">
                  Monday
                </span>
              </label>
            </div>
            {mondayEnabled && (
              <div className="flex items-center gap-2">
                <select
                  className="select select-bordered select-sm w-32 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  value={mondayStart}
                  onChange={(e) => setMondayStart(e.target.value)}
                >
                  <option value="">Start Time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <span className="text-gray-600 dark:text-gray-400">to</span>
                <select
                  className="select select-bordered select-sm w-32 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  value={mondayEnd}
                  onChange={(e) => setMondayEnd(e.target.value)}
                >
                  <option value="">End Time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-ghost btn-sm btn-square text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    // Copy functionality
                  }}
                >
                  <LuCopy className="w-4 h-4" />
                </button>
                <button
                  className="btn btn-ghost btn-sm btn-square text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    // Add time slot functionality
                  }}
                >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tuesday */}
      <div className="card bg-white dark:bg-gray-800 shadow-sm">
        <div className="card-body px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={tuesdayEnabled}
                  onChange={(e) => {
                    setTuesdayEnabled(e.target.checked);
                    handleToggleChange("tuesday", e.target.checked);
                  }}
                />
                <span className="label-text ml-2 text-lg font-medium text-gray-700 dark:text-gray-200">
                  Tuesday
                </span>
              </label>
            </div>
            {tuesdayEnabled && (
              <div className="flex items-center gap-2">
                <select
                  className="select select-bordered select-sm w-32 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  value={tuesdayStart}
                  onChange={(e) => setTuesdayStart(e.target.value)}
                >
                  <option value="">Start Time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <span className="text-gray-600 dark:text-gray-400">to</span>
                <select
                  className="select select-bordered select-sm w-32 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  value={tuesdayEnd}
                  onChange={(e) => setTuesdayEnd(e.target.value)}
                >
                  <option value="">End Time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-ghost btn-sm btn-square text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    // Copy functionality
                  }}
                >
                  <LuCopy className="w-4 h-4" />
                </button>
                <button
                  className="btn btn-ghost btn-sm btn-square text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    // Add time slot functionality
                  }}
                >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Wednesday */}
      <div className="card bg-white dark:bg-gray-800 shadow-sm">
        <div className="card-body px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={wednesdayEnabled}
                  onChange={(e) => {
                    setWednesdayEnabled(e.target.checked);
                    handleToggleChange("wednesday", e.target.checked);
                  }}
                />
                <span className="label-text ml-2 text-lg font-medium text-gray-700 dark:text-gray-200">
                  Wednesday
                </span>
              </label>
            </div>
            {wednesdayEnabled && (
              <div className="flex items-center gap-2">
                <select
                  className="select select-bordered select-sm w-32 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  value={wednesdayStart}
                  onChange={(e) => setWednesdayStart(e.target.value)}
                >
                  <option value="">Start Time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <span className="text-gray-600 dark:text-gray-400">to</span>
                <select
                  className="select select-bordered select-sm w-32 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  value={wednesdayEnd}
                  onChange={(e) => setWednesdayEnd(e.target.value)}
                >
                  <option value="">End Time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-ghost btn-sm btn-square text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    // Copy functionality
                  }}
                >
                  <LuCopy className="w-4 h-4" />
                </button>
                <button
                  className="btn btn-ghost btn-sm btn-square text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    // Add time slot functionality
                  }}
                >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Thursday */}
      <div className="card bg-white dark:bg-gray-800 shadow-sm">
        <div className="card-body px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={thursdayEnabled}
                  onChange={(e) => {
                    setThursdayEnabled(e.target.checked);
                    handleToggleChange("thursday", e.target.checked);
                  }}
                />
                <span className="label-text ml-2 text-lg font-medium text-gray-700 dark:text-gray-200">
                  Thursday
                </span>
              </label>
            </div>
            {thursdayEnabled && (
              <div className="flex items-center gap-2">
                <select
                  className="select select-bordered select-sm w-32 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  value={thursdayStart}
                  onChange={(e) => setThursdayStart(e.target.value)}
                >
                  <option value="">Start Time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <span className="text-gray-600 dark:text-gray-400">to</span>
                <select
                  className="select select-bordered select-sm w-32 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  value={thursdayEnd}
                  onChange={(e) => setThursdayEnd(e.target.value)}
                >
                  <option value="">End Time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-ghost btn-sm btn-square text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    // Copy functionality
                  }}
                >
                  <LuCopy className="w-4 h-4" />
                </button>
                <button
                  className="btn btn-ghost btn-sm btn-square text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    // Add time slot functionality
                  }}
                >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Friday */}
      <div className="card bg-white dark:bg-gray-800 shadow-sm">
        <div className="card-body px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={fridayEnabled}
                  onChange={(e) => {
                    setFridayEnabled(e.target.checked);
                    handleToggleChange("friday", e.target.checked);
                  }}
                />
                <span className="label-text ml-2 text-lg font-medium text-gray-700 dark:text-gray-200">
                  Friday
                </span>
              </label>
            </div>
            {fridayEnabled && (
              <div className="flex items-center gap-2">
                <select
                  className="select select-bordered select-sm w-32 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  value={fridayStart}
                  onChange={(e) => setFridayStart(e.target.value)}
                >
                  <option value="">Start Time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <span className="text-gray-600 dark:text-gray-400">to</span>
                <select
                  className="select select-bordered select-sm w-32 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  value={fridayEnd}
                  onChange={(e) => setFridayEnd(e.target.value)}
                >
                  <option value="">End Time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-ghost btn-sm btn-square text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    // Copy functionality
                  }}
                >
                  <LuCopy className="w-4 h-4" />
                </button>
                <button
                  className="btn btn-ghost btn-sm btn-square text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    // Add time slot functionality
                  }}
                >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Saturday */}
      <div className="card bg-white dark:bg-gray-800 shadow-sm">
        <div className="card-body px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={saturdayEnabled}
                  onChange={(e) => {
                    setSaturdayEnabled(e.target.checked);
                    handleToggleChange("saturday", e.target.checked);
                  }}
                />
                <span className="label-text ml-2 text-lg font-medium text-gray-700 dark:text-gray-200">
                  Saturday
                </span>
              </label>
            </div>
            {saturdayEnabled && (
              <div className="flex items-center gap-2">
                <select
                  className="select select-bordered select-sm w-32 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  value={saturdayStart}
                  onChange={(e) => setSaturdayStart(e.target.value)}
                >
                  <option value="">Start Time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <span className="text-gray-600 dark:text-gray-400">to</span>
                <select
                  className="select select-bordered select-sm w-32 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  value={saturdayEnd}
                  onChange={(e) => setSaturdayEnd(e.target.value)}
                >
                  <option value="">End Time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-ghost btn-sm btn-square text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    // Copy functionality
                  }}
                >
                  <LuCopy className="w-4 h-4" />
                </button>
                <button
                  className="btn btn-ghost btn-sm btn-square text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    // Add time slot functionality
                  }}
                >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayAvailability;
