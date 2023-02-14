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
        <input type="text" value={title} onChange={onChange} name="title" required/><br />
        <textarea value={detail} onChange={onChange} name="detail" className="text-area" required/> <br />
        <textarea value={input} onChange={onChange} name="input" className="text-area" /> <br />
        <textarea value={output} onChange={onChange} name="output" className="text-area" required />
        <input type="button" className="btn btn-primary" value="추가" onClick={onSubmit}></input>
    </div>
  );
}

export default Add;
