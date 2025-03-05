import  { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa"; 
import Homes from "./Components/Home/Homes";
import Contact from "./Components/Contact/Contact";
import Collections from "./Components/Work/Collections";
import About from "./Components/About/About";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import Layout from "./Layout";
import AllWork from "./Components/AdminPanel/AllWork";
import AddWork from "./Components/AdminPanel/AddWork";
import ArtworkPage from "./Components/Work/ArtworkPage";
import Aboutadmin from "./Components/AdminPanel/Aboutadmin";
import LoginPage from "./Components/Login";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";
  const authToken = localStorage.getItem("adminAuthToken");
  
  // Check both authentication status and valid token
  if (!isAuthenticated || !authToken) {
    return <Navigate to="/login" />;
  }

  return children;
};
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div>
      <BrowserRouter>
        {/* Theme toggle button */}
        <button onClick={toggleTheme} className={`p-2 rounded-full absolute top-5 right-1 
          ${isDarkMode ? "bg-black text-white" : "bg-white text-black border border-gray-400"}
          transition-colors duration-300 ease-in-out flex items-center gap-2`}>
          {isDarkMode ? <FaMoon /> : <FaSun />}
        </button>

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout isDarkMode={isDarkMode} />}>
            <Route index element={<Homes isDarkMode={isDarkMode} />} />
            <Route path="collections" element={<Collections />} />
            <Route path="about" element={<About isDarkMode={isDarkMode} />} />
            <Route path="contact" element={<Contact isDarkMode={isDarkMode} />} />
            <Route path="artwork/:id" element={<ArtworkPage isDarkMode={isDarkMode}/>} />
          </Route>

          {/* Login Route */}
          <Route path="/login" element={<LoginPage isDarkMode={isDarkMode}/>} />

          {/* Protected Admin Routes - using a more generic path */}
          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <Routes>
                <Route index element={<AdminPanel isDarkMode={isDarkMode}/>} />
                <Route path="works" element={<AllWork isDarkMode={isDarkMode}/>} />
                <Route path="add" element={<AddWork isDarkMode={isDarkMode}/>} />
                <Route path="profile" element={<Aboutadmin isDarkMode={isDarkMode} />} />
              </Routes>
            </ProtectedRoute>
          } />

          {/* Catch all undefined routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
