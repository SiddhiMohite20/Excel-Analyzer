import { useEffect, useState } from "react";
import axios from "axios";
import DashboardCard from "./DashboardCard";

function StatsSection() {
  const [stats, setStats] = useState({
    totalUploads: 0,
    totalRows: 0,
    totalColumns: 0,
    lastUpload: "No File",
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <DashboardCard
        title="Total Uploads"
        value={stats.totalUploads}
      />

      <DashboardCard
        title="Total Rows"
        value={stats.totalRows}
      />

      <DashboardCard
        title="Total Columns"
        value={stats.totalColumns}
      />

      <DashboardCard
        title="Last Upload"
       value={
  stats.lastUpload.length > 20
    ? stats.lastUpload.substring(0, 20) + "..."
    : stats.lastUpload
}
      />

    </div>
  );
}

export default StatsSection;