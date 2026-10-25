// import { useState } from "react";
// import Layout from "../components/Layout";
// import { CheckCircle } from "lucide-react";

// export default function Courses() {
//   const [enrolled, setEnrolled] = useState<string[]>([]);
//   const courses = [
//     { id: "c1", name: "Digital Shop Management", mods: 4, icon: "🏪" },
//     { id: "c2", name: "AI & Computer Skills", mods: 4, icon: "💻" },
//     { id: "c3", name: "Digital Marketing", mods: 4, icon: "📣" },
//     { id: "c4", name: "Agricultural Digital Services", mods: 4, icon: "🌾" },
//   ];

//   return (
//     <Layout>
//       <div className="mb-6">
//         <h2 className="text-3xl font-display mb-1">Skill Development</h2>
//         <p className="text-mute text-sm">Build practical capabilities for digital work and local jobs.</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {courses.map(c => (
//           <div key={c.id} className="card flex flex-col">
//             <div className="text-4xl mb-3">{c.icon}</div>
//             <h3 className="font-bold text-lg mb-1">{c.name}</h3>
//             <p className="text-sm text-mute mb-4">{c.mods} modules · Certificate on completion</p>
            
//             {enrolled.includes(c.id) ? (
//               <div className="bg-sage/50 p-3 rounded-lg flex items-center justify-between mt-auto">
//                 <span className="text-sm font-bold text-leaf flex items-center gap-1"><CheckCircle size={16}/> Enrolled</span>
//                 <button className="text-xs font-bold underline text-forest">Continue</button>
//               </div>
//             ) : (
//               <button onClick={() => setEnrolled([...enrolled, c.id])} className="btn btn-d mt-auto">Enrol Now</button>
//             )}
//           </div>
//         ))}
//       </div>
//     </Layout>
//   );
// }

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import Layout from "../components/Layout";
import { CheckCircle } from "lucide-react";

export default function Courses() {
  const queryClient = useQueryClient();

  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => apiRequest<any[]>("/courses"),
  });

  const enroll = useMutation({
    mutationFn: (courseId: string) => apiRequest(`/courses/${courseId}/enroll`, { method: "POST" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      alert("Successfully enrolled!");
    },
    onError: (err: any) => alert(err.message),
  });

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-3xl font-display mb-1">Skill Development</h2>
        <p className="text-mute text-sm">Build practical capabilities for digital work and local jobs.</p>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-mute">Loading courses...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses?.map((c) => (
            <div key={c.id} className="card flex flex-col">
              <div className="text-4xl mb-3">{c.icon}</div>
              <h3 className="font-bold text-lg mb-1">{c.title}</h3>
              <p className="text-sm text-mute mb-6">{c.modules} modules · Certificate on completion</p>
              
              {c.enrolled ? (
                <div className="bg-sage/50 p-3 rounded-lg flex items-center justify-between mt-auto">
                  <span className="text-sm font-bold text-leaf flex items-center gap-1">
                    <CheckCircle size={16}/> Enrolled
                  </span>
                  <button className="text-xs font-bold underline text-forest">Continue</button>
                </div>
              ) : (
                <button 
                  onClick={() => enroll.mutate(c.id)} 
                  disabled={enroll.isPending}
                  className="btn btn-d mt-auto"
                >
                  {enroll.isPending ? "Enrolling..." : "Enrol Now"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}