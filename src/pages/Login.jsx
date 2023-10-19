import React, { useState } from "react";
import Swal from "sweetalert2";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const isAdmin = username === "admin";

    try {
      if (isAdmin) {
        const dummyUser = { username: "admin", password: "admin123" };
        if (password === dummyUser.password) {
          localStorage.setItem("isLoggedIn", true);
          Swal.fire("Berhasil Login!", `Hello ${username}`, "success");
          navigate("/");
        } else {
          setErrorMessage("Invalid password for admin");
        }
      } else {
        const response = await axios.post("https://reqres.in/api/login", {
          email: username,
          password: password,
        });
        if (response.status === 200) {
          localStorage.setItem("isLoggedIn", true);
          Swal.fire("Berhasil Login!", `Hello ${username}`, "success");
          navigate("/");
        } else {
          setErrorMessage("Invalid username or password");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  return (
    <section className="flex justify-center items-center w-screen h-screen">
      <form onSubmit={handleLogin} className="flex flex-col gap-y-3">
        <label>username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 w-60 h-10 rounded-md bg-white border border-orange-500 focus:outline-none"
        />
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 w-60 h-10 rounded-md bg-white border border-orange-500 focus:outline-none"
        />
        <div className="h-10 mt-10">
          <Button label="Login" type="submit" />
        </div>
      </form>
    </section>
  );
}

export default Login;
