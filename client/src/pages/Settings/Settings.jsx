import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

function Settings() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);
  }, []);

  const handleSave = () => {
    alert("Settings updated successfully!");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-3xl font-bold mb-8">
            Settings
          </h1>

          <div className="space-y-8">

            <div>
              <h2 className="font-semibold text-xl mb-3">
                User Information
              </h2>

              <p className="mb-2">
                <strong>Name:</strong> {user?.name}
              </p>

              <p>
                <strong>Email:</strong> {user?.email}
              </p>
            </div>

            <hr />

            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Save Preferences
            </button>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Settings;