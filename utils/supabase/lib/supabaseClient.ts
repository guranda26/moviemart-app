// import { createServerClient } from "@supabase/ssr";

// export const getSupabaseClient = (
//   url: string,
//   anonKey: string,
//   cookieStore: any
// ) => {
//   return createServerClient(url, anonKey, {
//     cookies: {
//       getAll: () => cookieStore.getAll(),
//       setAll: (cookiesToSet) => {
//         try {
//           cookiesToSet.forEach(({ name, value, options }) => {
//             cookieStore.set(name, value, options);
//           });
//         } catch (error) {
//           console.warn("Supabase cookie set error:", error);
//         }
//       },
//     },
//   });
// };
