import { useEffect, useState } from "react";

import {
    getEnrollments,
    updateEnrollment
} from "../services/enrollmentService";
import { toast } from "react-toastify";
import AdminBoard from "./AdminBoard";

const Enrollments = () => {

    const [enrollments, setEnrollments] = useState([]);
    console.log("Enrollment State:", enrollments);

    const role = localStorage.getItem("role");

    const loadEnrollments = async () => {

        try {

            const response = await getEnrollments();

            console.log("Enrollments API Response:", response.data);


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

            toast.success("Status Updated Successfully");

            loadEnrollments();

        }

        catch (error) {

            toast.error(error.response?.data?.message);

        }

    };

    return (

    role === "admin"

        ? (

            <AdminBoard

                enrollments={enrollments}

                loadEnrollments={loadEnrollments}

            />

        )

        : (

            <div style={{ padding: "30px" }}>

                <h1>My Enrollments</h1>

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

                            <h3>{enrollment.course.title}</h3>

                            <p>Instructor : {enrollment.course.instructor}</p>

                            <p>

                                Status :

                                <b>{enrollment.status}</b>

                            </p>

                        </div>

                    ))

                }

            </div>

        )

);

};

export default Enrollments;