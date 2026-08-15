import DashboardLayout from "../../layouts/DashboardLayout";
import ChartsSection from "../../components/dashboard/ChartsSection";

function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-5">

        {/* Header */}
        <section className="rounded-2xl border border-zinc-800 bg-[#151518] px-5 py-5 shadow-lg shadow-black/10 md:px-6 md:py-6">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
              📊
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-400">
                Insights
              </p>

              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Analytics
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
            Analyze your uploaded Excel files using interactive charts and
            graphical insights.
          </p>

        </section>

        {/* Charts */}
        <ChartsSection />

      </div>
    </DashboardLayout>
  );
}

export default Analytics;