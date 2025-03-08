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
    <div className="min-h-screen flex items-center justify-center "
      style={{ backgroundImage: `url(/LandingPage.webp)`, backgroundPosition: "center", backgroundSize: "cover" }}
    >
      <div className="max-w-md w-full mx-4
       rounded-lg shadow-lg md:p-8 p-4 opacity-85 bg-white">
        <div className="text-center mb-4 md:mb-8">
          <h2 className="md:text-3xl text-xl font-semibold leading-10"
          >
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-black ">
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
              className="block md:text-base text-sm font-semibold"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-600 text-black text-lg placeholder-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block md:text-base text-sm font-semibold text-black"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-600 text-black text-lg placeholder-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-1/2 flex justify-center  py-3 px-6 border border-transparent rounded-lg bg-black
              text-base md:text-lg font-semibold  text-white hover:text-
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              transition duration-150 ease-in-out"
            >
              LogIn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;