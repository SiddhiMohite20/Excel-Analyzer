function DashboardCard({
  title,
  value,
  icon,
  color = "bg-red-500/10 text-red-400",
}) {
  return (
    <div className="group rounded-2xl border border-zinc-800 bg-[#151518] p-5 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-red-900/50 hover:shadow-xl hover:shadow-red-950/10">

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">
          <p className="text-xs font-medium text-zinc-500">
            {title}
          </p>

          <h2
            className={`mt-3 font-semibold tracking-tight text-white ${
              title === "Last Upload"
                ? "max-w-[180px] truncate text-lg"
                : "text-3xl"
            }`}
            title={value}
          >
            {value}
          </h2>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/5 ${color} transition-all duration-300 group-hover:scale-105`}
        >
          {icon}
        </div>

      </div>

      <div className="mt-5 border-t border-zinc-800 pt-3">
        <p className="text-[11px] text-zinc-600">
          Updated from your analytics
        </p>
      </div>

    </div>
  );
}

export default DashboardCard;