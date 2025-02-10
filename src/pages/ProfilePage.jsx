import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [availabilityList, setAvailabilityList] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("dataList"));
    if (savedData) {
      setAvailabilityList(savedData);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto pt-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Profile
      </h1>

      {/* User Info Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          User Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Name:
            </label>
            <p className="text-gray-900 dark:text-white">John Doe</p>
          </div>
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Email:
            </label>
            <p className="text-gray-900 dark:text-white">
              john.doe@example.com
            </p>
          </div>
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Time Zone:
            </label>
            <p className="text-gray-900 dark:text-white">
              UTC-5 (Eastern Time)
            </p>
          </div>
        </div>
      </div>

      {/* Availability Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          My Availability Schedules
        </h2>
        <div className="space-y-4">
          {availabilityList.map((schedule) => (
            <div
              key={schedule.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {schedule.name}
                  {schedule.isDefault && (
                    <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {schedule.message}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Timezone: {schedule.timezone}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
