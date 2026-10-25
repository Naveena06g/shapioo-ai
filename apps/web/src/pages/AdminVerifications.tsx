import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import Layout from "../components/Layout";
import { CheckCircle, XCircle, User } from "lucide-react";

export default function AdminVerifications() {
  const queryClient = useQueryClient();

  const { data: pending, isLoading } = useQuery({
    queryKey: ["admin-verifications"],
    queryFn: () => apiRequest<any[]>("/admin/verifications"),
  });

  const approve = useMutation({
    mutationFn: (userId: string) => apiRequest(`/admin/verifications/${userId}/approve`, { method: "POST" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-verifications"] });
      alert("User approved!");
    },
  });

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-3xl font-display mb-1">Verification Requests</h2>
        <p className="text-mute text-sm">Approve new farmers and shopkeepers to join the platform.</p>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-mute">Loading requests...</div>
      ) : pending?.length === 0 ? (
        <div className="card text-center py-12 text-mute">No pending requests. Everyone is verified! ✅</div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f6f0e2] border-b border-line text-xs uppercase text-mute">
              <tr>
                <th className="p-4 font-bold">Name</th>
                <th className="p-4 font-bold">Role</th>
                <th className="p-4 font-bold">Phone</th>
                <th className="p-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {pending?.map((user) => (
                <tr key={user.id} className="border-b border-line last:border-0 hover:bg-sage/20">
                  <td className="p-4 font-bold flex items-center gap-2"><User size={16} /> {user.name}</td>
                  <td className="p-4 capitalize">{user.role}</td>
                  <td className="p-4 text-mute">{user.phone}</td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => approve.mutate(user.id)} className="btn btn-d btn-sm flex items-center gap-1">
                      <CheckCircle size={14} /> Approve
                    </button>
                    <button className="btn btn-r btn-sm flex items-center gap-1 opacity-50 cursor-not-allowed">
                      <XCircle size={14} /> Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}