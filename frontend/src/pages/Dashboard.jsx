import { useEffect, useState } from "react";

import { getCourses } from "../services/courseService";

import CourseCard from "../components/CourseCard";

const Dashboard = () => {

    const [courses,setCourses]=useState([]);

    const role=localStorage.getItem("role");

    const loadCourses=async()=>{

        try{

            const response=await getCourses();

            setCourses(response.data.data);

        }

        catch(error){

            console.log(error);

        }

    };

    useEffect(()=>{

        loadCourses();

    },[]);

    return(

        <div style={{padding:"30px"}}>

            <h1>

                CourseHub Dashboard

            </h1>

            <h3>

                Logged in as {role}

            </h3>

            <hr/>

            <div style={{

                display:"flex",

                flexWrap:"wrap",

                gap:"20px"

            }}>

            {

                courses.map(course=>(

                    <CourseCard

                        key={course._id}

                        course={course}

                        loadCourses={loadCourses}

                    />

                ))

            }

            </div>

        </div>

    );

}

export default Dashboard;