import React, { useState, useEffect } from "react";

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
  let [language, setLanguage] = useState();
  let [result, setResult] = useState("미채점");

  console.log(input);
  async function scoring() {
    setResult("채점 중...");
    for (let i = 0; i < location.state.input.length; i++) {
      console.log(input);
      console.log(language);
      console.log(code);
      const JUDGEAPI = process.env.REACT_APP_JUDGEAPI;
      console.log(JUDGEAPI);
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

        console.log(
          `Results :\n${codeOutput}\nExecution Time : ${jsonGetSolution.time} Secs Expected_output : ${jsonGetSolution.message} `
        );
        codeOutput === output[i] || codeOutput === output[i] + "\n"
          ? setResult("정답")
          : setResult("오답");
      } else if (jsonGetSolution.stderr) {
        const error = atob(jsonGetSolution.stderr);

        console.log(error);
      } else {
        const compilation_error = atob(jsonGetSolution.compile_output);
        console.log(compilation_error);
      } 
    }
  }

  return (
    <div>
      <h1
        onClick={() => {
          console.log(input);
        }}
      >
        Problem
      </h1>
      <h5>{title}</h5>
      <h6>{detail}</h6>
      <div className="col-md-2">
        <select
          id="language-box"
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        >
          <option value="50">C</option>
          <option value="71">Python</option>
        </select>
        <button
          type="button"
          className="btn btn-primary submit-btn"
          onClick={() => {
            console.log("submitted");
            scoring();
          }}
        >
          제출
        </button>
      </div>
      <textarea
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></textarea>
      <h6>{ result }</h6>
    </div>
  );
}

export default Problem;
