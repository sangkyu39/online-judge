import React, { useState, useEffect } from "react";
import "./Add.css";
import { dbService } from "../fbase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
function Add(params) {
  const [problemCnt, setProblemCnt] = useState(0);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const userObj = params.userObj;
  const [inputArr, setInputArr] = useState([]);
  const [outputArr, setOutputArr] = useState([]);
  let navigate = useNavigate();
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

      setTitle("");
      setDetail("");
      setInput("");
      setOutput("");
    } catch (error) {
      console.log(error);
    }
    navigate("/problems");
  }

  return (
    <div id="add" className="container">
      <h1 className="index">문제 출제</h1>
      <div className="row add-div">
        {/* 문제 제목과 설명 공간 */}
        <div className="q-div col">
          <input
            placeholder="문제 이름을 입력해주세요"
            className="q-title"
            type="text"
            value={title}
            onChange={onChange}
            name="title"
            required
          />
          <textarea
            placeholder="문제 설명을 입력해주세요"
            value={detail}
            onChange={onChange}
            name="detail"
            className="q-detail"
            required
          />
        </div>
        {/* 입력과 출력 예시 공간 */}
        <div className="ex-div col">
          <div className="show-ex">
            <div className="row">
              <h5 className="ex-title col">입력 예시</h5>
              <h5 className="ex-title col">출력 예시</h5>
              <div>
                {inputArr.map(function (input, i) {
                  return (
                    <div className="ex-value-div row" key={i}>
                      <pre className="ex-value col ">{input}</pre>
                      <pre className="ex-value col">{outputArr[i]}</pre>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="row ex-put-div">
            <textarea
              placeholder="채점할 입력을 입력해주세요"
              value={input}
              onChange={onChange}
              name="input"
              className="ex-put col"
            />
            <textarea
              placeholder="채점할 출력을 입력해주세요"
              value={output}
              onChange={onChange}
              name="output"
              className="ex-put col"
              required
            />
          </div>
          <div className="ex-btn-div">
            <button className="row ex-btn" onClick={addArr}>
              예제 추가
            </button>
          </div>
        </div>
      </div>
      <div className="submit-btn-div">
        <input
          type="button"
          className="submit-btn"
          value="추가"
          onClick={onSubmit}
        ></input>
      </div>
    </div>
  );
}

export default Add;
