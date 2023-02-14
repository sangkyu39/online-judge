import React, { useState, useEffect } from "react";

import { dbService } from "../fbase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import "./Problems.css";

function Problems() {
  const [problems, setProblems] = useState([]);
  let navigate = useNavigate();
  async function getProblems() {
    const dbProblems = await getDocs(query(collection(dbService, "problem")));
    dbProblems.forEach((document) => {
      const problemObject = {
        ...document.data(),
        id: document.id,
      };
      setProblems((prev) => [problemObject, ...prev]);
    });
  }

  useEffect(() => {
    getProblems();
  }, []);

  return (
    <div className="container">
      <h1 id='title'>Problems</h1>
      <div className="problems-list">
        {problems.map(function (problem) {
          return (
            <div key={problem.id} className="problem">
              <h5
                onClick={() => {
                  navigate(`/problem/${problem.id}`, {
                    state: {
                      title: problem.title,
                      detail: problem.detail,
                      input: problem.input,
                      output: problem.output,
                    },
                  });
                }}
                className="problem-title"
              >
                {problem.title}
              </h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Problems;
