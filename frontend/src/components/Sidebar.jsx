import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";


const Sidebar = () => {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const logout = () => {

        localStorage.clear();

        navigate("/");

    };

    return (

        <div className="sidebar">

            <h2 className="logo">

                🎓 CourseHub

            </h2>

            <Link to="/dashboard">

                🏠 Dashboard

            </Link>

            <Link to="/courses">

                📚 Courses

            </Link>

            {

                role === "admin" && (

                    <Link to="/create-course">

                        ➕ Create Course

                    </Link>

                )

            }

            {
    role === "student" ? (

        <Link to="/my-enrollments">

            🎓 My Learning

        </Link>

    ) : (

        <Link to="/admin-board">

    📋 Student Enrollments


</Link>

    )
}

            <button

                className="logout-btn"

                onClick={logout}

            >

                🚪 Logout

            </button>

        </div>

    );

};

export default Sidebar;