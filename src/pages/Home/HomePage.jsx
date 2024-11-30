function HomePage() {
  return <div>Home Page</div>;
}

export default HomePage;

// import React, { useSHome Pagetate, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";

// import Header from "../../components/Header/Header";
// import Footer from "../../common/Footer/Footer";
// import BootcampSection from "./components/BootcampSection/BootcampSection";
// import IntroductionSection from "./components/IntroductionSection/IntroductionSection";
// import EducationStats from "./components/EducationStats/EducationStats";
// import InstructorSection from "./components/InstructorSection/InstructorSection";

// const HomePage = () => {
//   const [isLoginParams] = useSearchParams();
//   const [isLogin, setIsLogin] = useState(null);
//   const [user, setUser] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     const loginStatus = isLoginParams.get("isLogin");
//     setIsLogin(loginStatus);
//   }, []);

//   useEffect(() => {
//     const userParam = isLoginParams.get("user");

//     try {
//       setUser(userParam ? JSON.parse(decodeURIComponent(userParam)) : null);
//     } catch (error) {
//       console.error("Failed to parse user data:", error);
//       setUser(null);
//     }
//   }, [isLoginParams]);

//   return (
//     <>
//       {/* <div>
//         <h2>Welcome, {user?.name || "Guest"}!</h2>
//         <p>{user?.email ? `Email: ${user.email}` : "No email provided."}</p>
//       </div> */}

//       {/* <!-- ===== Content Area Start ===== --> */}
//       <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
//         {/* <!-- ===== Header Start ===== --> */}
//         <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//         {/* <!-- ===== Header End ===== --> */}

//         {/* <!-- ===== Main Content Start ===== --> */}
//         <main>
//           <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
//             <BootcampSection />
//             <IntroductionSection />
//             <EducationStats />
//             <InstructorSection />
//             <Footer />
//           </div>
//         </main>
//         {/* <!-- ===== Main Content End ===== --> */}
//       </div>
//       {/* <!-- ===== Content Area End ===== --> */}
//     </>
//   );
// };

// export default HomePage;
