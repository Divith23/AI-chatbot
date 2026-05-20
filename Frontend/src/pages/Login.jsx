import { useState } from "react";

import {useNavigate, Link} from "react-router-dom";

function Login({ setToken }) {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await fetch("http://127.0.0.1:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password,}),
                }
            );

            const data = await response.json();

            if (data.access_token){
                localStorage.setItem("token", data.access_token);
                setToken(data.access_token);
                navigate("/");
            }
            else{
                alert(data.message);
            }
            }
            catch(error){
                console.error(error);
            }
        }

        return (

    <div

      style={{

        height: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        backgroundColor: "#343541",

      }}
    >

      <form

        onSubmit={handleLogin}

        style={{

          display: "flex",

          flexDirection: "column",

          width: "300px",

          gap: "15px",

          backgroundColor: "#202123",

          padding: "30px",

          borderRadius: "10px",

        }}
      >

        <h2 style={{ color: "white" }}>

          Login

        </h2>



        <input

          type="email"

          placeholder="Email"

          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }

          style={{
            padding: "10px",
          }}
        />



        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }

          style={{
            padding: "10px",
          }}
        />



        <button

          type="submit"

          style={{
            padding: "10px",
            cursor: "pointer",
          }}
        >

          Login

        </button>



        <p style={{ color: "white" }}>

          Don't have an account?{" "}

          <Link to="/signup">

            Signup

          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;