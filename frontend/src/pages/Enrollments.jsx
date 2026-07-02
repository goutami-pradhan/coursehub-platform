import { useEffect, useState } from "react";

import {
    getEnrollments,
    updateEnrollment
} from "../services/enrollmentService";

const Enrollments = () => {

    const [enrollments, setEnrollments] = useState([]);

    const role = localStorage.getItem("role");

    const loadEnrollments = async () => {

        try {

            const response = await getEnrollments();

            setEnrollments(response.data.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        loadEnrollments();

    }, []);

    const changeStatus = async (id, status) => {

        try {

            await updateEnrollment(id, status);

            alert("Status Updated Successfully");

            loadEnrollments();

        }

        catch (error) {

            alert(error.response?.data?.message);

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h1>

                {role === "admin"

                    ? "Student Enrollments"

                    : "My Enrollments"}

            </h1>

            <hr />

            {

                enrollments.map((enrollment) => (

                    <div

                        key={enrollment._id}

                        style={{

                            border: "1px solid gray",

                            padding: "20px",

                            marginBottom: "20px",

                            borderRadius: "8px"

                        }}

                    >

                        <h3>

                            {enrollment.course.title}

                        </h3>

                        <p>

                            Student :

                            {enrollment.student.name}

                        </p>

                        <p>

                            Instructor :

                            {enrollment.course.instructor}

                        </p>

                        <p>

                            Status :

                            <b>

                                {enrollment.status}

                            </b>

                        </p>

                        {

                            role === "admin" &&

                            <>

                                <button

                                    onClick={() =>

                                        changeStatus(

                                            enrollment._id,

                                            "Approved"

                                        )

                                    }

                                >

                                    Approve

                                </button>

                                {" "}

                                <button

                                    onClick={() =>

                                        changeStatus(

                                            enrollment._id,

                                            "Rejected"

                                        )

                                    }

                                >

                                    Reject

                                </button>

                            </>

                        }

                    </div>

                ))

            }

        </div>

    );

};

export default Enrollments;