import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "./../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  // toast options
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  // validations
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  // post request to registerRoute API while successfully submitting the register form
  const handleSubmit = async event => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
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
          />
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={e => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Enter a new password"
            name="password"
            onChange={e => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            onChange={e => handleChange(e)}
          />
          <button type="submit">REGISTER</button>
          <span>
            ALREADY HAVE AN ACCOUNT ? <Link to="/login">LOGIN</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  color: #007aff;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #f1f1f1;
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .brand {
      display: flex;
      justify-content: center;
      align-items: center;
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
