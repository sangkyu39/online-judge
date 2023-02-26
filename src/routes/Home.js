import React, { useState, useEffect } from "react";

import { dbService } from "../fbase";
import { addDoc, collection } from "firebase/firestore";
import "./Home.css";
import mainLogo from "../main-logo.png";

function Home() {
  const [problem, setProblem] = useState([]);

  return (
    <div className="container">
      <div className="home-imp-div">
        <img className="home-img" src={mainLogo} />
      </div>
      <div className="home-detail-div">
          <p className="home-detail">Welcome to our online coding scoring site!</p>
          <p className="home-detail">
            Our site provides a wide range of coding challenges designed to test
            your programming knowledge and help you enhance your problem-solving
            abilities.
          </p>
      </div>
    </div>
  );
}

export default Home;
