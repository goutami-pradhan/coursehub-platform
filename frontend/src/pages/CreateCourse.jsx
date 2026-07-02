import { useState } from "react";

import { createCourse } from "../services/courseService";

const CreateCourse = () => {

    const [course, setCourse] = useState({

        title: "",

        description: "",

        instructor: "",

        duration: "",

        price: "",

        level: "Beginner"

    });

    const handleChange = (e) => {

        setCourse({

            ...course,

            [e.target.name]: e.target.value

        });

    };

    const submit = async (e) => {

        e.preventDefault();

        try {

            await createCourse(course);

            alert("Course Created Successfully");

            window.location = "/dashboard";

        }

        catch (error) {

            alert(error.response?.data?.message);

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h2>Create Course</h2>

            <form onSubmit={submit}>

                <input

                    name="title"

                    placeholder="Course Title"

                    onChange={handleChange}

                />

                <br /><br />

                <textarea

                    name="description"

                    placeholder="Description"

                    onChange={handleChange}

                />

                <br /><br />

                <input

                    name="instructor"

                    placeholder="Instructor"

                    onChange={handleChange}

                />

                <br /><br />

                <input

                    name="duration"

                    placeholder="Duration"

                    onChange={handleChange}

                />

                <br /><br />

                <input

                    type="number"

                    name="price"

                    placeholder="Price"

                    onChange={handleChange}

                />

                <br /><br />

                <select

                    name="level"

                    onChange={handleChange}

                >

                    <option>Beginner</option>

                    <option>Intermediate</option>

                    <option>Advanced</option>

                </select>

                <br /><br />

                <button>

                    Create Course

                </button>

            </form>

        </div>

    );

};

export default CreateCourse;