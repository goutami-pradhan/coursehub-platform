import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import CourseCard from "../components/CourseCard";
import { getCourses } from "../services/courseService";
import { getEnrollments } from "../services/enrollmentService";
import "../styles/dashboard.css";



const Dashboard = () => {

    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [enrollments, setEnrollments] = useState([]);

    const role = localStorage.getItem("role");
    const userName = localStorage.getItem("name");

    const loadCourses = async () => {

        try {

            const response = await getCourses();

            setCourses(response.data.data);

        }

        catch (error) {

            console.log(error);

        }

    };

 useEffect(() => {

    loadCourses();

    if (role === "student") {

        loadEnrollments();

    }

}, []);

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase())
    );

    const loadEnrollments = async () => {

    try {

        const response = await getEnrollments();

        setEnrollments(response.data.data);

    } catch (error) {

        console.log(error);

    }

};

    return (

        <>

            <Sidebar />

            <div className="dashboard">

                <div className="dashboard-header">

                    <div>

                        <h2>

                            Welcome,

                            {userName}

                        </h2>

                        <p>

                            Manage your learning journey

                        </p>

                    </div>

                </div>

                <div className="stats">

                    <div className="stat-card">

                        <i className="bi bi-book stat-icon"></i>

                        <h3>

                            {courses.length}

                        </h3>

                        <p>Total Courses</p>

                    </div>

                    <div className="stat-card">

                        <i className="bi bi-person-fill stat-icon"></i>

                        <h3>

                            {role === "admin" ? "Admin" : "Student"}

                        </h3>

                        <p>Logged In As</p>

                    </div>

                    <div className="stat-card">

                        <i className="bi bi-mortarboard-fill stat-icon"></i>

                        <h3>

                            {courses.length}

                        </h3>

                        <p>Available Courses</p>

                    </div>

                    <div className="stat-card">

                        <i className="bi bi-award-fill stat-icon"></i>

                        <h3>

                            0%

                        </h3>

                        <p>Completion</p>

                    </div>

                </div>

                <div className="search-section">

                    <input

                        type="text"

                        placeholder="Search Courses..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                </div>

                <div className="course-grid">

                    {

                        filteredCourses.map(course => (

                            <CourseCard

                                key={course._id}

                                course={course}

                                loadCourses={loadCourses}

                                enrollments={enrollments}

                            />

                        ))

                    }

                </div>

            </div>

        </>

    );

};

export default Dashboard;