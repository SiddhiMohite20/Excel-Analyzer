import DashboardLayout from "../../layouts/DashboardLayout";
import ChartsSection from "../../components/dashboard/ChartsSection";

function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-md p-8">

          <h1 className="text-4xl font-bold text-slate-800">
            📊 Analytics
          </h1>

          <p className="text-gray-500 mt-2">
            Analyze your uploaded Excel files using interactive charts and
            graphical insights.
          </p>

        </div>

        {/* Charts */}
        <ChartsSection />

      </div>
    </DashboardLayout>
  );
}

export default Analytics;