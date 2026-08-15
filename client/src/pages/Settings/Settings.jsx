import { useEffect, useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Mail,
  Save,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";

function Settings() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("user")
    );

    setUser(loggedInUser);
  }, []);

  const handleSave = () => {
    alert("Settings updated successfully!");
  };

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-4xl space-y-5">

        {/* Header */}
        <section className="rounded-2xl border border-zinc-800 bg-[#151518] px-5 py-5 shadow-lg shadow-black/10 md:px-6 md:py-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
              <SettingsIcon size={19} />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-400">
                Preferences
              </p>

              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
                Settings
              </h1>
            </div>

          </div>

          <p className="mt-3 text-sm text-zinc-500">
            Manage your account information and application preferences.
          </p>

        </section>

        {/* Settings Card */}
        <section className="rounded-2xl border border-zinc-800 bg-[#151518] p-5 shadow-lg shadow-black/10 md:p-6">

          {/* Section Heading */}
          <div className="mb-5">
            <h2 className="text-base font-semibold text-white">
              User Information
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              Your account details from the current session.
            </p>
          </div>

          {/* User Information */}
          <div className="space-y-3">

            {/* Name */}
            <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-400">
                <User size={17} />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-600">
                  Name
                </p>

                <p className="mt-1 truncate text-sm font-medium text-zinc-200">
                  {user?.name || "Not available"}
                </p>
              </div>

            </div>

            {/* Email */}
            <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
                <Mail size={17} />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-600">
                  Email
                </p>

                <p className="mt-1 truncate text-sm font-medium text-zinc-200">
                  {user?.email || "Not available"}
                </p>
              </div>

            </div>

          </div>

          {/* Divider */}
          <div className="my-6 border-t border-zinc-800" />

          {/* Save Button */}
          <div className="flex justify-end">

            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-violet-900/30"
            >
              <Save size={16} />
              Save Preferences
            </button>

          </div>

        </section>

      </div>
    </DashboardLayout>
  );
}

export default Settings;