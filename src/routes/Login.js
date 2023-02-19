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

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
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

  async function addUser(userObj) {
    try {
      const doc = await addDoc(collection(dbService,"user"),{
        userName,
        userId : userObj.id
      });
    } catch (err) {
      console.log(err);
    }
  }
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
        console.log("Document written with ID: ", doc.id);
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
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">로그인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {newAccount ? (
            <div>
            <input
              name="username"
              type="text"
              placeholder="이름"
              required
              value={userName}
              onChange={onChange}
            />
          </div>
          ) : (
            <>
            </>
          )}
          <input
            name="email"
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={onChange}
          />
          <input
            type="button"
            onClick={onSubmit}
            value={newAccount ? "Create Account" : "Sign In"}
          />
          {error}
          <span onClick={toggleAccount}>
            {newAccount ? "로그인" : "새로운 계정 만들기"}
          </span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Login;
