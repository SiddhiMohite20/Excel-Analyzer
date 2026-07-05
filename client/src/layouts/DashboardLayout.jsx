import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {

  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar
        open={open}
        setOpen={setOpen}
      />

      <div className="flex-1 flex flex-col lg:ml-0">

        <Navbar setOpen={setOpen} />

        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;