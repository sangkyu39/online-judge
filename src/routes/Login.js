import React, { useState, useEffect } from "react";

import { dbService } from "../fbase";
import { addDoc, collection } from "firebase/firestore";

function Login () {
    const [problem, setProblem] = useState([]);

    
    return (
        <h1>
            login
        </h1>
    )
};

export default Login;