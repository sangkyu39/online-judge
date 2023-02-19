import React, { useState, useEffect } from "react";
import "./Add.css";
import { dbService } from "../fbase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

function Add(params) {
  const [problemCnt, setProblemCnt] = useState(0);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const userObj = params.userObj;
  const [inputArr, setInputArr] = useState([]);
  const [outputArr, setOutputArr] = useState([]);

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

  function addArr(event) {
    console.log("clicked");
    setInput("");
    setOutput("");
    const copyInputArr = [...inputArr, input];
    setInputArr(copyInputArr);
    const copyOutputArr = [...outputArr, output];
    setOutputArr(copyOutputArr);
  }

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "problem"), {
        title,
        detail,
        inputArr,
        outputArr,
        makerId: userObj.email,
      });
      console.log("Document written with ID: ", docRef.id);

      setTitle("");
      setDetail("");
      setInput("");
      setOutput("");
    } catch (error) {
      console.log(error);
    }
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
      <div className="row">
        <div className="col">
          <h5>입력 예시</h5>
          {inputArr.map(function (input) {
            return (
              <div key={input + Date.now}>
                <h6>{input}</h6>
              </div>
            );
          })}
        </div>
        <div className="col">
          <h5>출력 예시</h5>
          {outputArr.map(function (output) {
            return (
              <div key={output + Date.now}>
                <h6>{output}</h6>
              </div>
            );
          })}
        </div>
      </div>
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
      <button className="btn btn-light" onClick={addArr}>
        예제 추가
      </button>
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
