import { Link } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const logout = () => {

        localStorage.clear();
        window.location = "/";

    };

    return (

        <nav
            style={{
                display: "flex",
                gap: "20px",
                padding: "15px",
                background: "#1976d2"
            }}
        >

            {
                token &&

                <Link
                    to="/dashboard"
                    style={{ color: "white" }}
                >
                    Dashboard
                </Link>

            }

            {
                role === "admin" &&

                <Link
                    to="/create-course"
                    style={{ color: "white" }}
                >
                    Create Course
                </Link>

            }

            {
                role === "student" &&

                <Link
                    to="/my-enrollments"
                    style={{ color: "white" }}
                >
                    My Enrollments
                </Link>

            }
            {
                 role === "admin" &&

                <Link
                   to="/all-enrollments"
                   style={{ color: "white" }}
               >
                  Student Enrollments
                 </Link>
            }


            {

                token &&

                <button
                    onClick={logout}
                >

                    Logout

                </button>

            }

        </nav>

    );

};

export default Navbar;