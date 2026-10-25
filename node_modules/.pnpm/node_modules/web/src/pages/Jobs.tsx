import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import Layout from "../components/Layout";
import { Briefcase, MapPin } from "lucide-react";

export default function Jobs() {
  const queryClient = useQueryClient();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => apiRequest<any[]>("/jobs"),
  });

  const { data: myApplications } = useQuery({
    queryKey: ["my-applications"],
    queryFn: () => apiRequest<any[]>("/jobs/mine"),
  });

  const apply = useMutation({
    mutationFn: (jobId: string) => apiRequest(`/jobs/${jobId}/apply`, { method: "POST" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-applications"] });
      alert("Application sent successfully! 🎉");
    },
    onError: (err: any) => alert(err.message),
  });

  const appliedJobIds = myApplications?.map(app => app.jobId) || [];

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-3xl font-display mb-1">Jobs & Opportunities</h2>
        <p className="text-mute text-sm">Discover roles in local shops, delivery, and digital services.</p>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-mute">Loading jobs...</div>
      ) : jobs?.length === 0 ? (
        <div className="card text-center py-12 text-mute">No jobs posted yet. Check back soon!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs?.map((job) => {
            const hasApplied = appliedJobIds.includes(job.id);
            return (
              <div key={job.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{job.title}</h3>
                    <p className="text-sm text-mute">{job.organization}</p>
                  </div>
                  <span className="pill">{job.type}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-mute mb-6">
                  <MapPin size={16} /> {job.location}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-line">
                  <span className="text-xs font-bold text-leaf uppercase">{job.category}</span>
                  <button 
                    onClick={() => apply.mutate(job.id)}
                    disabled={hasApplied || apply.isPending}
                    className={`btn btn-sm ${hasApplied ? 'bg-sage text-forest cursor-not-allowed' : 'btn-d'}`}
                  >
                    {hasApplied ? "Applied ✓" : "Apply Now"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}