function DashboardCard({
  title,
  value,
  icon,
  color = "bg-blue-600",
}) {
  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

      <div className="flex justify-between items-start">

        <div>
          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2
            className={`mt-4 font-bold text-slate-800 ${
              title === "Last Upload"
                ? "text-lg truncate max-w-[180px]"
                : "text-4xl"
            }`}
            title={value}
          >
            {value}
          </h2>
        </div>

        <div
          className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default DashboardCard;