import { enrollCourse } from "../services/enrollmentService";
import { deleteCourse } from "../services/courseService";

const CourseCard = ({ course, loadCourses }) => {

    const role = localStorage.getItem("role");

    const enroll = async () => {

        try {

            await enrollCourse(course._id);

            alert("Course Enrolled Successfully");

        }

        catch (error) {

            alert(error.response?.data?.message);

        }

    };

    const removeCourse = async () => {

        if (!window.confirm("Delete this course?")) return;

        try {

            await deleteCourse(course._id);

            alert("Course Deleted");

            loadCourses();

        }

        catch (error) {

            alert(error.response?.data?.message);

        }

    };

    return (

        <div style={{

            border:"1px solid gray",

            borderRadius:"10px",

            padding:"20px",

            marginBottom:"20px",

            width:"350px"

        }}>

            <h2>{course.title}</h2>

            <p>{course.description}</p>

            <p>

                <b>Instructor :</b>

                {course.instructor}

            </p>

            <p>

                <b>Duration :</b>

                {course.duration}

            </p>

            <p>

                <b>Level :</b>

                {course.level}

            </p>

            <p>

                <b>Price :</b>

                ₹ {course.price}

            </p>

            {

                role==="student"

                ?

                <button onClick={enroll}>

                    Enroll Now

                </button>

                :

                <button onClick={removeCourse}>

                    Delete

                </button>

            }

        </div>

    );

};

export default CourseCard;