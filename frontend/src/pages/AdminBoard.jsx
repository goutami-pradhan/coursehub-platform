import { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";

import BoardColumn from "../components/admin/BoardColumn";

import {
    getEnrollments,
    updateEnrollmentStatus
} from "../services/enrollmentService";

import "../styles/adminBoard.css";

const AdminBoard = () => {

    const [enrollments, setEnrollments] = useState([]);

    const navigate = useNavigate();

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

    const onDragEnd = async (result) => {

        if (!result.destination) return;

        const enrollmentId = result.draggableId;

        const newStatus = result.destination.droppableId;

        try {

            await updateEnrollmentStatus(
                enrollmentId,
                newStatus
            );

            loadEnrollments();

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="board-container">

            {/* Header */}

            <div className="board-header">

                <button
                    className="back-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Dashboard
                </button>

                <h1 className="board-title">
                    Student Enrollments
                </h1>

            </div>

            <DragDropContext onDragEnd={onDragEnd}>

                <div className="board">

                    <BoardColumn
                        title="Pending"
                        status="Pending"
                        enrollments={enrollments}
                        loadEnrollments={loadEnrollments}
                    />

                    <BoardColumn
                        title="Approved"
                        status="Approved"
                        enrollments={enrollments}
                        loadEnrollments={loadEnrollments}
                    />

                    <BoardColumn
                        title="In Progress"
                        status="In Progress"
                        enrollments={enrollments}
                        loadEnrollments={loadEnrollments}
                    />

                    <BoardColumn
                        title="Completed"
                        status="Completed"
                        enrollments={enrollments}
                        loadEnrollments={loadEnrollments}
                    />

                </div>

            </DragDropContext>

        </div>

    );

};

export default AdminBoard;