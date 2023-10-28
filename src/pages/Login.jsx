import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginAsAdmin, setLoginAsAdmin] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    const dummyUser = { username: "nabiel", password: "password123" };
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (loginAsAdmin) {
      const dummyAdmin = { username: "admin", password: "admin123" };
      const admin = JSON.parse(localStorage.getItem("admin"));
  
      if (admin && admin.username === username && admin.password === password) {
        localStorage.setItem("isLoggedIn", "admin");
        Swal.fire("Berhasil Login!", `Hello ${username}`, "success");
        navigate("/admin/dashboard");
      } else if (
        admin === null &&
        username === dummyAdmin.username &&
        password === dummyAdmin.password
      ) {
        localStorage.setItem("admin", JSON.stringify(dummyAdmin));
        localStorage.setItem("isLoggedIn", "admin");
        Swal.fire("Berhasil Login!", `Hello ${username}`, "success");
        navigate("/admin/dashboard");
      } else {
        setErrorMessage("Invalid admin credentials");
      }
    } else {
      if (user && user.username === username && user.password === password) {
        localStorage.setItem("isLoggedIn", true);
        Swal.fire("Berhasil Login!", `Hello ${username}`);
        navigate("/");
      } else if (
        username === dummyUser.username &&
        password === dummyUser.password
      ) {
        localStorage.setItem("user", JSON.stringify(dummyUser));
        localStorage.setItem("isLoggedIn", true);
        Swal.fire("Berhasil Login!", `Hello ${username}`, "success");
        navigate("/");
      } else {
        setErrorMessage("Invalid username or password");
      }
    }
  };
  
  return (
    <div className="bg-green-600">
      <img src="" alt="" />
      <div className="flex justify-center items-center h-screen shadow-5xl">
        <form
          onSubmit={handleLogin}
          className="w-96 bg-white p-4 rounded-md text-white shadow-md"
        >
          <h1 className="text-3xl text-center mt-2 mb-14 font-bold text-black">
            {loginAsAdmin ? "Admin Login" : "Login"}
          </h1>
          <div className="mb-3">
            <label
              htmlFor="username"
              className="block text-black font-semibold text-sm"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 rounded-md focus:outline-none border-2 bg-white text-black"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="my-5">
            <label
              htmlFor="password"
              className="block  text-black font-semibold text-sm"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full focus:outline-none border-2 p-2 rounded-md bg-white text-black"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                id="rememberMe"
                onChange={() => setLoginAsAdmin(!loginAsAdmin)}
              />
              <label htmlFor="rememberMe" className="text-black">
                Login as Admin
              </label>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 w-full rounded-md hover:bg-green-800 my-5"
            >
              Submit
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-600 text-center mt-3">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
