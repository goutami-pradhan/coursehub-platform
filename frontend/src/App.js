import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import CreateCourse from "./pages/CreateCourse";
import Enrollments from "./pages/Enrollments";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route

    path="/create-course"

    element={

        <ProtectedRoute>

            <CreateCourse />

        </ProtectedRoute>

    }

/>

        <Route

          path="/dashboard"

          element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>

          }

        />
        <Route
    path="/my-enrollments"
    element={
        <ProtectedRoute>
            <Enrollments />
        </ProtectedRoute>
    }
/>

<Route
    path="/all-enrollments"
    element={
        <ProtectedRoute>
            <Enrollments />
        </ProtectedRoute>
    }
/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;