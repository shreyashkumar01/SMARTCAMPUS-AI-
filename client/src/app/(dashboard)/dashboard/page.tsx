// "use client";

// import { auth } from "@/lib/firebase-config";


// const page = ()=>{
//     return(
//       <div>
//         Create Other page in dashboard for use
//         <button onClick={async ()=>{
//         await  auth.signOut()
//         }}>
//           SignOut</button>
//       </div>
//     )
// }

// export default page;

"use client";

import { useAuth } from "@/components/providers/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dynamic from 'next/dynamic';

// Dynamically import the chart to avoid SSR issues
const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

const DashboardPage = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Hardcoded Data for the frontend demo
  const hardcodedIssues = [
    {
      id: 1,
      category: "Infrastructure",
      description: "Water cooler on 2nd floor leaking badly.",
      status: "In Progress",
      severity: "Medium",
      date: "2 hours ago",
    },
    {
      id: 2,
      category: "Safety",
      description: "Street light near the library entrance is broken.",
      status: "Open",
      severity: "Critical",
      date: "5 hours ago",
    },
    {
      id: 3,
      category: "Cleanliness",
      description: "Overflowing dustbins in the cafeteria.",
      status: "Resolved",
      severity: "Low",
      date: "1 day ago",
    },
  ];

  // Fake progress data for the graph
  const progressData = [
    { month: 'Jan', resolved: 12, pending: 8 },
    { month: 'Feb', resolved: 19, pending: 6 },
    { month: 'Mar', resolved: 15, pending: 10 },
    { month: 'Apr', resolved: 25, pending: 5 },
    { month: 'May', resolved: 22, pending: 7 },
    { month: 'Jun', resolved: 30, pending: 3 },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleFakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Fake loading delay
    setTimeout(() => {
      alert("Issue Reported Successfully! (Frontend Demo)");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">SMARTCAMPUS AI</h1>
          <p className="text-sm text-gray-500">Student Dashboard</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition"
        >
          Sign Out
        </button>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Total Issues</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">47</p>
            <p className="text-sm text-gray-500">+12% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Resolved</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">32</p>
            <p className="text-sm text-gray-500">68% resolution rate</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">In Progress</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">10</p>
            <p className="text-sm text-gray-500">21% of total</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Critical</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">5</p>
            <p className="text-sm text-gray-500">Needs immediate attention</p>
          </div>
        </div>

        {/* Progress Report with Graph */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            📊 Progress Report
          </h2>
          <div className="h-80 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} name="Resolved Issues" />
                <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} name="Pending Issues" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Real-time progress tracking of issue resolution over the past 6 months.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
          {/* LEFT SIDE: Report Issue Form */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              📝 Report New Issue
            </h2>

            <form onSubmit={handleFakeSubmit} className="space-y-5">
              {/* Category Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Category
                </label>
                <select className="w-full p-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Infrastructure (Broken items, leaks)</option>
                  <option>Cleanliness (Garbage, washrooms)</option>
                  <option>Safety (Hazards, lighting)</option>
                  <option>Energy (Wastage)</option>
                </select>
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Describe the Issue
                </label>
                <textarea
                  rows={4}
                  placeholder="Explain what is wrong..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              {/* Image Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Photo (Optional)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">SVG, PNG, JPG</p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "🚀 Submit Report"}
              </button>
            </form>
          </section>

          {/* RIGHT SIDE: Issue List */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              📋 Recent Reports
            </h2>

            <div className="space-y-4">
              {hardcodedIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="p-4 border border-gray-100 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition duration-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{issue.category}</h3>
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded-full ${
                        issue.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : issue.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{issue.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-200 pt-2">
                    <span>{issue.date}</span>
                    <span className="font-medium text-gray-500">
                      Severity: {issue.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;