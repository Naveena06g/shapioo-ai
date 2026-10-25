import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import Layout from "../components/Layout";
import { Briefcase } from "lucide-react";

export default function AdminPostJob() {
  const [jobData, setJobData] = useState({
    title: "", organization: "", location: "", type: "Full-time", category: "Technology"
  });

  const postJob = useMutation({
    mutationFn: () => apiRequest("/jobs", { method: "POST", body: JSON.stringify(jobData) }),
    onSuccess: () => {
      alert("Job posted successfully!");
      setJobData({ title: "", organization: "", location: "", type: "Full-time", category: "Technology" });
    },
    onError: (err: any) => alert(err.message),
  });

  return (
    <Layout>
      <div className="mb-6 flex items-center gap-2">
        <Briefcase size={28} className="text-saffron" />
        <div>
          <h2 className="text-3xl font-display mb-0">Post a Job</h2>
          <p className="text-mute text-sm">Create new opportunities for youth employment.</p>
        </div>
      </div>

      <div className="card bg-paper max-w-2xl">
        <form onSubmit={(e) => { e.preventDefault(); postJob.mutate(); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-bold mb-1">Job Title</label>
              <input required type="text" className="input-field" value={jobData.title} onChange={e => setJobData({...jobData, title: e.target.value})} placeholder="e.g. Delivery Partner" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Organization</label>
              <input required type="text" className="input-field" value={jobData.organization} onChange={e => setJobData({...jobData, organization: e.target.value})} placeholder="e.g. SHAPIOO Logistics" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Location</label>
              <input required type="text" className="input-field" value={jobData.location} onChange={e => setJobData({...jobData, location: e.target.value})} placeholder="e.g. Gandhi Nagar" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Category</label>
              <select className="input-field" value={jobData.category} onChange={e => setJobData({...jobData, category: e.target.value})}>
                <option>Technology</option>
                <option>Shops</option>
                <option>Logistics</option>
                <option>Support</option>
                <option>Farmer Market</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Job Type</label>
              <select className="input-field" value={jobData.type} onChange={e => setJobData({...jobData, type: e.target.value})}>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={postJob.isPending} className="btn btn-d w-full">
            {postJob.isPending ? "Posting..." : "Publish Job"}
          </button>
        </form>
      </div>
    </Layout>
  );
}