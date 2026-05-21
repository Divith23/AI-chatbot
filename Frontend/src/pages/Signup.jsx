import { useState } from "react";

import { useNavigate, Link }
from "react-router-dom";



function Signup() {

  const navigate = useNavigate();



  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");



  async function handleSignup(e) {

    e.preventDefault();



    try {

      const response = await fetch(

        "https://ai-chatbot-6g4t.onrender.com/signup",

        {

          method: "POST",

          headers: {
            "Content-Type":
            "application/json",
          },

          body: JSON.stringify({

            username,

            email,

            password,

          }),
        }
      );



      const data = await response.json();



      alert(data.message);



      if (
        data.message ===
        "User created successfully"
      ) {

        navigate("/login");

      }

    }

    catch (error) {

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

        onSubmit={handleSignup}

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

          Signup

        </h2>



        <input

          type="text"

          placeholder="Username"

          value={username}

          onChange={(e) =>
            setUsername(e.target.value)
          }

          style={{
            padding: "10px",
          }}
        />



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

          Signup

        </button>



        <p style={{ color: "white" }}>

          Already have an account?{" "}

          <Link to="/login">

            Login

          </Link>

        </p>

      </form>

    </div>
  );
}

export default Signup;