import React, { useState, useEffect } from "react";
import "./Problem.css";
import { dbService } from "../fbase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";

function Problem(props) {
  const location = useLocation();
  let { id } = useParams();
  const title = location.state.title;
  const detail = location.state.detail;
  const input = location.state.input;
  const output = location.state.output;
  let [code, setCode] = useState();
  let [language, setLanguage] = useState(50);
  let [result, setResult] = useState("미채점");

  console.log(input);
  async function scoring() {
    setResult("채점 중...");
    for (let i = 0; i < location.state.input.length; i++) {
      const JUDGEAPI = process.env.REACT_APP_JUDGEAPI;
      const response = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions",
        {
          method: "POST",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": JUDGEAPI,
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            source_code: code,
            stdin: input[i],
            language_id: language,
          }),
        }
      );
      let jsonGetSolution = {
        status: { description: "Queue" },
        stderr: null,
        compile_output: null,
      };
      const jsonResponse = await response.json();

      // token -> get
      if (jsonResponse.token) {
        let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;

        const getSolution = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": JUDGEAPI,
            "content-type": "application/json",
          },
        });

        jsonGetSolution = await getSolution.json();
      }

      if (jsonGetSolution.stdout) {
        const codeOutput = atob(jsonGetSolution.stdout);
        codeOutput === output[i] || codeOutput === output[i] + "\n"
          ? setResult("정답")
          : setResult("오답");
      } else if (jsonGetSolution.stderr) {
        const error = atob(jsonGetSolution.stderr);

        setResult(error);
      } else {
        const compilation_error = atob(jsonGetSolution.compile_output);
        setResult(compilation_error);
      }
    }
  }

  return (
    <div id="problem" className="container">
      <h1 className="title">{title}</h1>
      <h6 className="detail">{detail}</h6>

      <div className="submit-box row">
        <h6 className="col-md-8 result">{result}</h6>
        <div className="select-box-div col-md-2">
          <select
            className="select-box"
            id="language-box"
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
          >
            <option value="50">C</option>
            <option value="71">Python</option>
          </select>
        </div>
        <div className="button-div col-md-2">
          <button
            type="button"
            className="btn btn-primary submit-btn"
            onClick={() => {
              scoring();
            }}
          >
            제출
          </button>
        </div>
      </div>

      <textarea
        className="code"
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></textarea>
    </div>
  );
}

export default Problem;
