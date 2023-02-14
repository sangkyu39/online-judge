import React, { useState, useEffect } from "react";

import { dbService } from "../fbase";
import { addDoc, collection } from "firebase/firestore";

function Home () {
    const [problem, setProblem] = useState([]);

    
    return (
        <h1>
            hi
        </h1>
    )
};

export default Home;