import React, { useState, useEffect } from "react";

import { dbService } from "../fbase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

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
    <>
      <h1>Problems</h1>
      {problems.map(function (problem) {
        return (
          <div key={problem.id}>
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
            >
              {problem.title}
            </h5>
          </div>
        );
      })}
    </>
  );
}

export default Problems;
