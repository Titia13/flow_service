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
      <main className="min-h-screen p-10 pt-24 antialiased" style={{ backgroundColor: '#fffaf7' }}>
        {children}
      </main>
    </div>
  );
}
