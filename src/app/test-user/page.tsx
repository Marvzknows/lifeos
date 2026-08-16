// "use client";

// import { useState } from "react";

// type User = {
//   id: number;
//   email: string;
//   name: string | null;
// };

// export default function TestUsersPage() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleFetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch("/api/users");
//       if (!res.ok) throw new Error(`Request failed: ${res.status}`);
//       const data = await res.json();
//       setUsers(data.users);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 space-y-4">
//       <button
//         onClick={handleFetchUsers}
//         disabled={loading}
//         className="px-4 py-2 rounded-md bg-black text-white disabled:opacity-50"
//       >
//         {loading ? "Loading..." : "Fetch Users"}
//       </button>

//       {error && <p className="text-red-500">{error}</p>}

//       <ul className="space-y-1">
//         {users.map((user) => (
//           <li key={user.id} className="text-sm">
//             {user.name ?? "(no name)"} — {user.email}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
