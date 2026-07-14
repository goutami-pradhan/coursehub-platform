import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourse } from "../services/courseService";
import "./CourseDetails.css";

const CourseDetails = () => {

    const { id } = useParams();

    const [course, setCourse] = useState(null);

    const [status, setStatus] = useState("New");

    useEffect(() => {

        loadCourse();

    }, []);

    const loadCourse = async () => {

        try {

            const response = await getCourse(id);

            setCourse(response.data.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    if (!course) {

        return <h2 style={{ padding: "40px" }}>Loading...</h2>;

    }

    return (

        <div className="course-details">

            <div className="course-banner">

                <h1>{course.title}</h1>

                <span className="level">

                    {course.level}

                </span>

            </div>

            <div className="course-content">

                <div className="left">

                    <h3>Description</h3>

                    <p>{course.description}</p>

                    <h3>Instructor</h3>

                    <p>👨 {course.instructor}</p>

                    <h3>Duration</h3>

                    <p>⏰ {course.duration}</p>

                    <h3>Price</h3>

                    <p className="price">

                        ₹ {course.price}

                    </p>

                </div>

                <div className="right">

                    <div className="attachment-card">

                        <h3>📎 Course Materials</h3>

                        <ul>

                            <li>📄 SpringBootNotes.pdf</li>

                            <li>📄 REST_API_Guide.pdf</li>

                            <li>📊 SpringBootPPT.pptx</li>

                            <li>🎥 Introduction.mp4</li>

                            <li>📦 SourceCode.zip</li>

                        </ul>

                    </div>

                    <div className="progress-card">

                        <h3>Learning Progress</h3>

                        <select

                            value={status}

                            onChange={(e) => setStatus(e.target.value)}

                        >

                            <option>New</option>

                            <option>In Progress</option>

                            <option>Completed</option>

                        </select>

                        <br /><br />

                        {

                            status === "New" &&

                            <div className="badge blue">

                                New Course

                            </div>

                        }

                        {

                            status === "In Progress" &&

                            <div className="badge orange">

                                Learning...

                            </div>

                        }

                        {

                            status === "Completed" &&

                            <div className="badge green">

                                Completed

                            </div>

                        }

                    </div>

                </div>

            </div>

        </div>

    );

};

export default CourseDetails;