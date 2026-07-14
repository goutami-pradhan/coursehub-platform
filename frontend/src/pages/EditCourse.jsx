import { useEffect, useState } from "react";

const EditCourse = () => {

    const [course, setCourse] = useState({

        title: "",

        description: "",

        instructor: "",

        duration: "",

        level: "",

        price: ""

    });

    useEffect(() => {

        // API will be added later

    }, []);

    const handleChange = (e) => {

        setCourse({

            ...course,

            [e.target.name]: e.target.value

        });

    };

    const updateCourse = (e) => {

        e.preventDefault();

        alert("Course Updated Successfully");

    };

    return (

        <div className="container mt-5">

            <div className="card shadow p-4">

                <h2>Edit Course</h2>

                <br/>

                <form onSubmit={updateCourse}>

                    <input
                        className="form-control mb-3"
                        placeholder="Course Title"
                        name="title"
                        value={course.title}
                        onChange={handleChange}
                    />

                    <textarea
                        className="form-control mb-3"
                        placeholder="Description"
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Instructor"
                        name="instructor"
                        value={course.instructor}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Duration"
                        name="duration"
                        value={course.duration}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Level"
                        name="level"
                        value={course.level}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Price"
                        name="price"
                        value={course.price}
                        onChange={handleChange}
                    />

                    <button className="btn btn-primary">

                        Update Course

                    </button>

                </form>

            </div>

        </div>

    );

};

export default EditCourse;