// import Navbar from "@/components/molecules/Navbar";

// export default function Layout() {
//     return (
//         <>
//             <Navbar />
//         </>
//     );
// }


import Navbar from "@/components/molecules/Navbar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> 
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
