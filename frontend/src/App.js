import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import CreateCourse from "./pages/CreateCourse";
import Enrollments from "./pages/Enrollments";
import CourseDetails from "./pages/CourseDetails";
import EditCourse from "./pages/EditCourse";
import AdminBoard from "./pages/AdminBoard";
import EnrollmentDetails from "./pages/EnrollmentDetails";

function App() {

  return (

    <BrowserRouter>

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
<Route

path="/course/:id"

element={<CourseDetails/>}

/>
<Route
    path="/admin-board"
    element={
        <ProtectedRoute>
            <AdminBoard />
        </ProtectedRoute>
    }
/>

<Route
    path="/enrollment/:id"
    element={
        <ProtectedRoute>
            <EnrollmentDetails />
        </ProtectedRoute>
    }
/>


      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="colored"
      />

    </BrowserRouter>

  );

}

export default App;