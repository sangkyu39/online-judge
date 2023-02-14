import React, { useState, useEffect } from "react";
import "./Add.css";
import { dbService } from "../fbase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

function Add() {
  const [problemCnt, setProblemCnt] = useState(0);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "title") {
      setTitle(value);
    } else if (name === "detail") {
      setDetail(value);
    } else if (name === "input") {
      setInput(value);
    } else if (name === "output") {
      setOutput(value);
    }
  };

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "problem"), {
        title,
        detail,
        input,
        output,
      });
      console.log("Document written with ID: ", docRef.id);

      setTitle("");
      setDetail("");
      setInput("");
      setOutput("");
    } catch (error) {
      console.log(error);
    }
    return console.log("clicked");
  }

  return (
    <div className="container">
      <h4>문제 추가</h4>
      <h5>문제 제목</h5>
      <input
        type="text"
        value={title}
        onChange={onChange}
        name="title"
        required
      />
      <br />
      <h5>문제 설명</h5>
      <textarea
        value={detail}
        onChange={onChange}
        name="detail"
        className="text-area"
        required
      />
      <br />
      <h5>입력</h5>
      <textarea
        value={input}
        onChange={onChange}
        name="input"
        className="text-area"
      />
      <br />
      <h5>출력</h5>
      <textarea
        value={output}
        onChange={onChange}
        name="output"
        className="text-area"
        required
      />
      <input
        type="button"
        className="btn btn-primary"
        value="추가"
        onClick={onSubmit}
      ></input>
    </div>
  );
}

export default Add;
