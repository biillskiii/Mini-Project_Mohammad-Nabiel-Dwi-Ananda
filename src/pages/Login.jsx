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

    if (!username || !password) {
      setErrorMessage("Username and password are required.");
      return;
    }

    if (loginAsAdmin) {
      const adminCredentials = {
        username: "admin",
        password: "admin123",
      };

      if (
        adminCredentials.username === username &&
        adminCredentials.password === password
      ) {
        localStorage.setItem("isLoggedIn", "admin");
        Swal.fire({
          icon: "success",
          title: "Admin Successfully Logged In!",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.isConfirmed) {
            navigate("/admin/dashboard");
          }
        });
      } else {
        setErrorMessage("Invalid admin credentials");
      }
    } else {
      const userCredentials = {
        username: "nabiel",
        password: "password123",
      };

      if (
        userCredentials.username === username &&
        userCredentials.password === password
      ) {
        localStorage.setItem("isLoggedIn", "user");
        Swal.fire("Berhasil Login!", `Hello ${username}`, "success");
        navigate("/");
      } else {
        setErrorMessage("Invalid username or password");
      }
    }
  };

  return (
    <div className="bg-green-600">
      <div className="flex justify-center items-center h-screen shadow-5xl">
        <form
          onSubmit={handleLogin}
          className="w-96 bg-white p-4 rounded-md text-white shadow-md"
        >
          <h1 className="text-3xl text-center mt-2 mb-4 font-bold text-black">
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
          <div className="my-3">
            <label
              htmlFor="password"
              className="block text-black font-semibold text-sm"
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
                id="loginAsAdmin"
                onChange={() => setLoginAsAdmin(!loginAsAdmin)}
              />
              <label htmlFor="loginAsAdmin" className="text-black">
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
