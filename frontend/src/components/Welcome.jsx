import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import Logo from "../assets/logo.png";
export default function Welcome({ currentUser }) {
  return (
    <Container>
      <img src={Logo} alt="logo" />
      {currentUser && <h1>Welcome, {currentUser.username}</h1>}
      <h2>Please select a chat to Start messaging.</h2>
    </Container>
  );
}

const Container = styled.div`
  color: #007aff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    margin-top: 1.5rem;
  }
  h2 {
    margin-top: 0.6rem;
  }
  img {
    height: 10rem;
  }
`;
