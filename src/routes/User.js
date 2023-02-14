import React, { useState, useEffect } from "react";

import { getAuth, signOut } from "firebase/auth";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

function User () {
    const [problem, setProblem] = useState([]);
    const navigate = useNavigate();
    const auth = getAuth();

    function onLogOut () {
        signOut(auth);
        navigate("/")
    }
    return (
        <div>
            <h1>
                User
            </h1>
            <button onClick={onLogOut}>Log Out</button>
        </div>
    )
};

export default User;