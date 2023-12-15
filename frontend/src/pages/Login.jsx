import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  //  toast options
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // validations
  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  // post request to loginRoute API
  const handleSubmit = async event => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={event => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Text-Tango</h1>
          </div>
          <input
            type="text"
            placeholder="Enter your username"
            name="username"
            onChange={e => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={e => handleChange(e)}
          />
          <button type="submit">LOGIN</button>
          <span>
            DON'T HAVE AN ACCOUNT ? <Link to="/register">REGISTER</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #f1f1f1;
  color: #007aff;
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .brand {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      img {
        height: 5rem;
      }
      h1 {
        font-size: 2.5rem;
      }
    }
    input {
      padding: 1rem;
      border: 0.1rem solid #007aff;
      border-radius: 0.4rem;
      width: 100%;
      font-size: 1rem;
      &:focus {
        outline: none;
        border: 0.1rem solid #4e0eff;
        box-shadow: 0 0 0.3rem #007aff;
      }
    }
    button {
      border: none;
      background-color: #007aff;
      color: white;
      padding: 1rem 2rem;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      &:hover {
        border-color: #4e0eff;
        box-shadow: 0 0 0.3rem #007aff;
      }
    }
    span {
      a {
        color: #007aff;
        text-decoration: none;
        font-weight: bold;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
