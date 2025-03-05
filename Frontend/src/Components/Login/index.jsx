import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ isDarkMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const validPassword = import.meta.env.VITE_ADMIN_PASSWORD;
  
    
    // Add console logs to debug (remove these in production)
    console.log('Entered email:', email);
    console.log('Valid email:', validEmail);
    console.log('Entered password:', password);
    console.log('Valid password:', validPassword);
  
    if (email === validEmail && password === validPassword) {
      // Generate a random token
      const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
      
      // Store both authentication status and token
      localStorage.setItem("isAdminAuthenticated", "true");
      localStorage.setItem("adminAuthToken", token);
      
      // Set expiration time (e.g., 2 hours)
      const expirationTime = Date.now() + (2 * 60 * 60 * 1000);
      localStorage.setItem("tokenExpiration", expirationTime.toString());
      
      // Navigate to the dashboard
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    }`}>
      <div className={`max-w-md w-full mx-4 ${
        isDarkMode ? "bg-white" : "bg-white"
      } rounded-lg shadow-lg p-8`}>
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold ${
            isDarkMode ? "text-black" : "text-black"
          }`}>
            Admin Login
          </h2>
          <p className={`mt-2 text-sm ${
            isDarkMode ? "text-black" : "text-black"
          }`}>
           
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="email" 
              className={`block text-sm font-medium ${
                isDarkMode ? "text-black" : "text-black"
              }`}
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-lg 
                ${isDarkMode 
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className={`block text-sm font-medium ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-lg 
                ${isDarkMode 
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg
              text-sm font-medium text-white text-black hover:text- 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              transition duration-150 ease-in-out`}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;