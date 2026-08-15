import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  User,
  UploadCloud,
  Rows3,
  FileSpreadsheet,
} from "lucide-react";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("user")
    );

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
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="text-sm text-zinc-500">
            Loading profile...
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-5xl space-y-5">

        {/* Header */}
        <section className="rounded-2xl border border-zinc-800 bg-[#151518] px-5 py-5 shadow-lg shadow-black/10 md:px-6 md:py-6">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
              <User size={19} />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-400">
                Account
              </p>

              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
                Profile
              </h1>
            </div>
          </div>

          <p className="mt-3 text-sm text-zinc-500">
            Manage your account information and view your activity.
          </p>

        </section>

        {/* Profile Card */}
        <section className="rounded-2xl border border-zinc-800 bg-[#151518] p-5 shadow-lg shadow-black/10 md:p-6">

          {/* User Info */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              {/* Avatar */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
                <User size={30} strokeWidth={1.7} />
              </div>

              {/* Details */}
              <div className="min-w-0">

                <h2 className="truncate text-xl font-semibold text-white">
                  {profile.name || "User"}
                </h2>

                <p className="mt-1 truncate text-sm text-zinc-500">
                  {profile.email || "No email available"}
                </p>

                <span className="mt-3 inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[11px] font-medium text-violet-300">
                  Excel Analytics User
                </span>

              </div>

            </div>

            {/* Status */}
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Active account
            </div>

          </div>

          {/* Divider */}
          <div className="my-6 border-t border-zinc-800" />

          {/* Statistics */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* Total Uploads */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 transition-all duration-200 hover:border-violet-500/20">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-medium text-zinc-500">
                    Total Uploads
                  </p>

                  <p className="mt-2 text-2xl font-semibold text-white">
                    {profile.totalUploads ?? 0}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
                  <UploadCloud size={18} />
                </div>

              </div>

            </div>

            {/* Total Rows */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 transition-all duration-200 hover:border-violet-500/20">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-medium text-zinc-500">
                    Total Rows
                  </p>

                  <p className="mt-2 text-2xl font-semibold text-white">
                    {profile.totalRows ?? 0}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
                  <Rows3 size={18} />
                </div>

              </div>

            </div>

            {/* Last Upload */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 transition-all duration-200 hover:border-violet-500/20">

              <div className="flex items-center justify-between gap-3">

                <div className="min-w-0">
                  <p className="text-xs font-medium text-zinc-500">
                    Last Upload
                  </p>

                  <p
                    className="mt-2 truncate text-sm font-semibold text-white"
                    title={profile.lastUpload || "No Upload Yet"}
                  >
                    {profile.lastUpload || "No Upload Yet"}
                  </p>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400">
                  <FileSpreadsheet size={18} />
                </div>

              </div>

            </div>

          </div>

        </section>

      </div>
    </DashboardLayout>
  );
}

export default Profile;