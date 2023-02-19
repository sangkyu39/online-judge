import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Add from "../routes/Add";
import Home from "../routes/Home";
import Login from "../routes/Login";
import Problem from "../routes/Problem";
import Problems from "../routes/Problems";
import User from "../routes/User";
import Navigation from "./Navigation";

function AppRouter(params) {
  return (
    <>
      <Navigation isLoggedIn={params.isLoggedIn} />
      <Routes>
        {/* main home */}
        <Route path="/" element={<Home  />} />
        {/* problems */}
        <Route path="/problems" element={<Problems />} />
        <Route path="/problem/:id" element={<Problem />} />

        <Route path="/add" element={<Add userObj={params.userObj}/>} />
        {params.isLoggedIn ? (
          <Route path="/user" element={<User />} />
        ) : (
          <Route path="/user" element={<Login />} />
        )}
      </Routes>
    </>
  );
}

export default AppRouter;
