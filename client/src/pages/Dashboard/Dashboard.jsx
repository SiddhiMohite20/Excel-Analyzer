import DashboardLayout from "../../layouts/DashboardLayout";
import StatsSection from "../../components/dashboard/StatsSection";
import RecentUploads from "../../components/dashboard/RecentUploads";

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-7">

        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl border border-red-900/40 bg-gradient-to-br from-[#1a0b0d] via-[#160d10] to-[#0f0f12] p-6 shadow-lg md:p-7">

          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-600/10 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
                Overview
              </p>

              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Dashboard
              </h1>

              <p className="mt-2 text-sm text-zinc-400">
                Monitor your uploads and explore your spreadsheet data.
              </p>
            </div>

            <a
              href="/upload"
              className="w-fit rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-red-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-red-900/50"
            >
              + Upload File
            </a>

          </div>
        </div>

        {/* Statistics */}
        <StatsSection />

        {/* Recent Uploads */}
        <div className="rounded-2xl border border-zinc-800 bg-[#151518] p-5 shadow-xl shadow-black/20 md:p-6">
          <RecentUploads />
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;