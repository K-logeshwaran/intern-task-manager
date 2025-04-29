// Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import "../styles/auth.css";
function Layout() {
  return (
    <main className="auth-main">
      <section className="auth-info">
        <div className="container p-3">
          <h2>
            <a className="navbar-brand fs-3" href="#">
              Task Manager
            </a>
          </h2>
        </div>

        <div
          className="container d-flex justify-content-center  align-items-center"
          
        >
          <h1 style={{ fontSize: "4.5rem" }}>
            Your productivity, <br />
            redefined — one task <br />
            at a time
          </h1>
        </div>
      </section>
      <section className="auth-outlet">
        <Outlet />
      </section>
    </main>
  );
}

export default Layout;

