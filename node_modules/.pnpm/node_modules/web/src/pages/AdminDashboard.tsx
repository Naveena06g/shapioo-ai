// import { useQuery } from "@tanstack/react-query";
// import { apiRequest } from "../lib/api";
// import Layout from "../components/Layout";
// import { Users, Store, Sprout, ShoppingCart } from "lucide-react";

// export default function AdminDashboard() {
//   const { data: stats, isLoading } = useQuery({
//     queryKey: ["admin-stats"],
//     queryFn: () => apiRequest<any>("/admin/stats"),
//   });

//   return (
//     <Layout>
//       <div className="mb-6">
//         <h2 className="text-3xl font-display mb-1">Platform Overview</h2>
//         <p className="text-mute text-sm">Monitor activity across SHAPIOO AI.</p>
//       </div>

//       {isLoading ? (
//         <div className="text-center py-10 text-mute">Loading stats...</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="kpi flex items-center gap-4">
//             <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><Users size={24}/></div>
//             <div><span className="text-sm font-bold text-mute">Total Users</span><b className="text-2xl block">{stats.users}</b></div>
//           </div>
//           <div className="kpi flex items-center gap-4">
//             <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><Store size={24}/></div>
//             <div><span className="text-sm font-bold text-mute">Active Shops</span><b className="text-2xl block">{stats.shops}</b></div>
//           </div>
//           <div className="kpi flex items-center gap-4">
//             <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center"><Sprout size={24}/></div>
//             <div><span className="text-sm font-bold text-mute">Crop Listings</span><b className="text-2xl block">{stats.crops}</b></div>
//           </div>
//           <div className="kpi flex items-center gap-4">
//             <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center"><ShoppingCart size={24}/></div>
//             <div><span className="text-sm font-bold text-mute">Total Orders</span><b className="text-2xl block">{stats.orders}</b></div>
//           </div>
//         </div>
//       )}
//     </Layout>
//   );
// }

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import Layout from "../components/Layout";
import { Users, Store, Sprout, ShoppingCart, Briefcase } from "lucide-react";

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const [showJobForm, setShowJobForm] = useState(false);
  
  const [jobData, setJobData] = useState({
    title: "",
    organization: "",
    location: "",
    type: "Full-time",
    category: "Technology"
  });

  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => apiRequest<any>("/admin/stats"),
  });

  const postJob = useMutation({
    mutationFn: () => apiRequest("/jobs", { method: "POST", body: JSON.stringify(jobData) }),
    onSuccess: () => {
      alert("Job posted successfully! It is now live for Job Seekers.");
      setShowJobForm(false);
      setJobData({ title: "", organization: "", location: "", type: "Full-time", category: "Technology" });
    },
    onError: (err: any) => alert(err.message),
  });

  return (
    <Layout>
      {/* Header with Post Job Button */}
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-display mb-1">Platform Overview</h2>
          <p className="text-mute text-sm">Monitor activity across SHAPIOO AI.</p>
        </div>
        <button 
          onClick={() => setShowJobForm(!showJobForm)} 
          className="btn btn-s flex items-center gap-2"
        >
          <Briefcase size={18} /> Post a Job
        </button>
      </div>

      {/* Post Job Form (Toggles on button click) */}
      {showJobForm && (
        <form onSubmit={(e) => { e.preventDefault(); postJob.mutate(); }} className="card mb-8 bg-sage/20 border-leaf/30">
          <h3 className="font-bold text-lg mb-4 text-forest">Post a New Job Opportunity</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold mb-1">Job Title</label>
              <input 
                required 
                type="text" 
                className="input-field" 
                value={jobData.title} 
                onChange={e => setJobData({...jobData, title: e.target.value})} 
                placeholder="e.g. Delivery Partner" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Organization</label>
              <input 
                required 
                type="text" 
                className="input-field" 
                value={jobData.organization} 
                onChange={e => setJobData({...jobData, organization: e.target.value})} 
                placeholder="e.g. SHAPIOO Logistics" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Location</label>
              <input 
                required 
                type="text" 
                className="input-field" 
                value={jobData.location} 
                onChange={e => setJobData({...jobData, location: e.target.value})} 
                placeholder="e.g. Gandhi Nagar" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Category</label>
              <select 
                className="input-field" 
                value={jobData.category} 
                onChange={e => setJobData({...jobData, category: e.target.value})}
              >
                <option>Technology</option>
                <option>Shops</option>
                <option>Logistics</option>
                <option>Support</option>
                <option>Farmer Market</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Job Type</label>
              <select 
                className="input-field" 
                value={jobData.type} 
                onChange={e => setJobData({...jobData, type: e.target.value})}
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={() => setShowJobForm(false)} className="btn btn-l">Cancel</button>
            <button type="submit" disabled={postJob.isPending} className="btn btn-d">
              {postJob.isPending ? "Posting..." : "Post Job"}
            </button>
          </div>
        </form>
      )}

      {/* KPI Cards */}
      {isLoading ? (
        <div className="text-center py-10 text-mute">Loading stats...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="kpi flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><Users size={24}/></div>
            <div><span className="text-sm font-bold text-mute">Total Users</span><b className="text-2xl block">{stats?.users || 0}</b></div>
          </div>
          <div className="kpi flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><Store size={24}/></div>
            <div><span className="text-sm font-bold text-mute">Active Shops</span><b className="text-2xl block">{stats?.shops || 0}</b></div>
          </div>
          <div className="kpi flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center"><Sprout size={24}/></div>
            <div><span className="text-sm font-bold text-mute">Crop Listings</span><b className="text-2xl block">{stats?.crops || 0}</b></div>
          </div>
          <div className="kpi flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center"><ShoppingCart size={24}/></div>
            <div><span className="text-sm font-bold text-mute">Total Orders</span><b className="text-2xl block">{stats?.orders || 0}</b></div>
          </div>
        </div>
      )}
    </Layout>
  );
}