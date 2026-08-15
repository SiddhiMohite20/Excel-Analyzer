import { useEffect, useState } from "react";
import axios from "axios";
import {
  UploadCloud,
  Rows3,
  Columns3,
  FileSpreadsheet,
} from "lucide-react";

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
      console.error("Dashboard stats error:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      <DashboardCard
        title="Total Uploads"
        value={stats.totalUploads}
        icon={<UploadCloud size={19} strokeWidth={1.8} />}
        color="bg-red-500/10 text-red-400"
      />

      <DashboardCard
        title="Total Rows"
        value={stats.totalRows}
        icon={<Rows3 size={19} strokeWidth={1.8} />}
        color="bg-rose-500/10 text-rose-400"
      />

      <DashboardCard
        title="Total Columns"
        value={stats.totalColumns}
        icon={<Columns3 size={19} strokeWidth={1.8} />}
        color="bg-orange-500/10 text-orange-400"
      />

      <DashboardCard
        title="Last Upload"
        value={
          stats.lastUpload?.length > 20
            ? `${stats.lastUpload.substring(0, 20)}...`
            : stats.lastUpload
        }
        icon={<FileSpreadsheet size={19} strokeWidth={1.8} />}
        color="bg-red-950/60 text-red-300"
      />

    </div>
  );
}

export default StatsSection;