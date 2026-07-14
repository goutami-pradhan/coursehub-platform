import { enrollCourse } from "../services/enrollmentService";
import { deleteCourse } from "../services/courseService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./CourseCard.css";


const CourseCard = ({
    course,
    loadCourses,
    enrollments
}) => {

    const role = localStorage.getItem("role");
    const navigate = useNavigate();
    const enrollment = enrollments?.find(

    e => e.course._id === course._id

);
console.log("Course:", course._id);
console.log("Enrollments:", enrollments);
console.log("Matched:", enrollment);

    const enroll = async () => {

        try {

            await enrollCourse(course._id);

            toast.success("Course Enrolled Successfully");
           setTimeout(() => {

    window.location.reload();

}, 500);

        }

        catch (error) {

            toast.error(
                error.response?.data?.message || "Enrollment Failed"
            );

        }

    };

    const removeCourse = async () => {

        if (!window.confirm("Delete this course?")) return;

        try {

            await deleteCourse(course._id);

            toast.success("Course Deleted Successfully");

            loadCourses();

        }

        catch (error) {

            toast.error(
                error.response?.data?.message || "Delete Failed"
            );

        }

    };

    return (

       <div className="course-card">

<div className="course-image">

📘

</div>

<div className="course-body">

            {/* Course Title */}

<h3 className="course-title">
                {course.title}

            </h3>

            {/* Description */}

            <p className="course-desc">

                {course.description}

            </p>

            {/* Level */}

            <div className="course-info">

<span className="badge-level">

{course.level}

</span>

<span>

⭐ 4.8

</span>

</div>

            {/* Instructor */}

            <p>

👨 {course.instructor}

</p>

            {/* Duration */}

           <p>

⏰ {course.duration}

</p>

            {/* Price */}
<div className="price">

₹ {course.price}

</div>

            <hr />

            {/* Buttons */}

            {
                role === "student" ? (

                        <div className="button-group">
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate(`/course/${course._id}`)}
                        >
                            View Details
                        </button>

                       {
    enrollment ?

    <button
        className="btn btn-secondary"
        disabled
    >

        ✅ {enrollment.status}

    </button>

    :
 (

        <button
            className="btn btn-success"
            onClick={enroll}
        >
            Enroll Course
        </button>

    )
}


                    </div>

                ) : (

                   <div className="d-grid gap-2">

    <button
        className="btn btn-primary"
        onClick={() => navigate(`/course/${course._id}`)}
    >
        View Details
    </button>

    <button
        className="btn btn-warning"
        onClick={() => navigate(`/edit-course/${course._id}`)}
    >
        Edit Course
    </button>

    <button
        className="btn btn-danger"
        onClick={removeCourse}
    >
        Delete Course
    </button>

</div>

                )
            }

    </div>

</div>

    );

};

export default CourseCard;