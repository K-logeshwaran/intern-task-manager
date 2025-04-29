import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./lauouts/layout";
import ProtectedRoute from "./routes/Protected";
import CheckLoggedin from "./components/redirect";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <CheckLoggedin>
                <Signup />
              </CheckLoggedin>
            }
          />{" "}
          {/* <- default = Signup */}
          <Route
            path="signup"
            element={
              <CheckLoggedin>
                <Signup />
              </CheckLoggedin>
            }
          />
          <Route
            path="login"
            element={
              <CheckLoggedin>
                <Login />
              </CheckLoggedin>
            }
          />
        </Route>

        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="projects/:projectId" element={<ProjectDetails />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

// import { Routes, Route, Navigate } from 'react-router-dom';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import { useAuth } from './contexts/AuthContext';

// function App() {
//   const { user } = useAuth();

//   return (
//     <Routes>
//       <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
//       <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
//       <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
//     </Routes>
//   );
// }

// export default App;
