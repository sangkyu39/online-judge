import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { authService, dbService } from "../fbase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import "./Login.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const auth = getAuth();
  // email, password 분류
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "username") {
      setUserName(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      //newAccount 를 통해 생성, 로그인 구분
      if (newAccount) {
        // 이메일과 비밀번호를 통해 새 계정 생성
        data = await createUserWithEmailAndPassword(auth, email, password);
        authService.onAuthStateChanged((user)=> {
          if (user) {
            addUser(user);
          }
        });
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="submit-title">로그인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container" id="login-modal">
          <div className="text-div">
          <input
            name="email"
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
            className="text-area"
          />
          </div>
          <div className="text-div">
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={onChange}
            className="text-area"
          />
          </div>
          <div className="text-div">
          <input
            type="button"
            className="submit-btn text-area"
            onClick={onSubmit}
            value={newAccount ? "계정 생성" : "로그인"}
          />
          </div>
          {error}
          <h6 onClick={toggleAccount} className="select-mode">
            {newAccount ? "로그인" : "새로운 계정 만들기"}
          </h6>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
