import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import { User } from "lucide-react";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    fetchProfile(loggedInUser);
  }, []);

  const fetchProfile = async (loggedInUser) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/profile"
      );

      setProfile({
        ...response.data.profile,
        name: loggedInUser?.name,
        email: loggedInUser?.email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!profile) {
    return (
      <DashboardLayout>
        <h2 className="text-2xl font-semibold">
          Loading...
        </h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center">
              <User
                size={50}
                className="text-white"
              />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                {profile.name}
              </h1>

              <p className="text-gray-600 mt-1">
                {profile.email}
              </p>

              <span className="inline-block mt-3 bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full font-medium">
                Excel Analytics User
              </span>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

            <div className="bg-blue-50 rounded-xl p-6 text-center">

              <h3 className="text-gray-500">
                Total Uploads
              </h3>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                {profile.totalUploads}
              </p>

            </div>

            <div className="bg-green-50 rounded-xl p-6 text-center">

              <h3 className="text-gray-500">
                Total Rows
              </h3>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {profile.totalRows}
              </p>

            </div>

            <div className="bg-yellow-50 rounded-xl p-6 text-center">

              <h3 className="text-gray-500">
                Last Upload
              </h3>

              <p className="font-semibold mt-2">
                {profile.lastUpload || "No Upload Yet"}
              </p>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Profile;