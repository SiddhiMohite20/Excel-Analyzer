import DashboardLayout from "../../layouts/DashboardLayout";
import StatsSection from "../../components/dashboard/StatsSection";
import RecentUploads from "../../components/dashboard/RecentUploads";

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Heading */}
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Dashboard 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back! Here's a quick overview of your Excel Analytics.
          </p>
        </div>

        {/* Statistics */}
        <StatsSection />

        {/* Recent Uploads */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <RecentUploads />
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;