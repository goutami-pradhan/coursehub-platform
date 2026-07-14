import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import "./EnrollmentCard.css";
import CommentModal from "./CommentModal";
import DocumentModal from "./DocumentModal";
import { useNavigate } from "react-router-dom";

const EnrollmentCard = ({
    enrollment,
    index,
    loadEnrollments
}) => {

    const [showComment, setShowComment] = useState(false);
    const [showDocument, setShowDocument] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();


    return (

        <Draggable
            draggableId={String(enrollment._id)}
            index={index}
        >

            {(provided, snapshot) => (

                <>

                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        
    
    className={`enrollment-card ${
        snapshot.isDragging ? "dragging" : ""
    }`}
    onDoubleClick={() =>
        navigate(`/enrollment/${enrollment._id}`)
    }
                    >

                        {/* Top */}

                        <div className="card-top">

                            <div className="avatar">

                                {enrollment.student?.name
                                    ?.charAt(0)
                                    .toUpperCase()}

                            </div>

                            <div>

                                <h4>

                                    {enrollment.student?.name}

                                </h4>

                                <small>

                                    {enrollment.student?.email}

                                </small>

                            </div>

                        </div>

                        {/* Course */}

                        <div className="course-name">

                            📚 {enrollment.course?.title}

                        </div>

                        {/* Progress */}

                        <div className="progress-section">

                            <div className="progress-header">

                                <span>

                                    Progress

                                </span>

                                <span>

                                    {enrollment.progress || 0}%

                                </span>

                            </div>

                            <div className="progress-bar">

                                <div
                                    className="progress-fill"
                                    style={{
                                        width: `${enrollment.progress || 0}%`
                                    }}
                                />

                            </div>

                        </div>

                        {/* Status */}

                        <div className="status-badge">

                            {enrollment.status}

                        </div>

                        {/* Expanded Section */}

                        {

                            expanded && (

                                <div
                                    className="expanded-section"
                                    onClick={(e) => e.stopPropagation()}
                                >

                                    <hr />

                                    <h4>

                                        👤 Student Details

                                    </h4>

                                    <p>

                                        <strong>Name :</strong>{" "}

                                        {enrollment.student?.name}

                                    </p>

                                    <p>

                                        <strong>Email :</strong>{" "}

                                        {enrollment.student?.email}

                                    </p>

                                    <hr />

                                    <h4>

                                        📚 Course Details

                                    </h4>

                                    <p>

                                        <strong>Course :</strong>{" "}

                                        {enrollment.course?.title}

                                    </p>

                                    <p>

                                        <strong>Instructor :</strong>{" "}

                                        {enrollment.course?.instructor}

                                    </p>

                                    <p>

                                        <strong>Duration :</strong>{" "}

                                        {enrollment.course?.duration}

                                    </p>

                                    <p>

                                        <strong>Price :</strong> ₹

                                        {enrollment.course?.price}

                                    </p>

                                    <div className="expanded-buttons">

                                        <button
                                            className="btn btn-primary"
                                            onClick={(e) => {

                                                e.stopPropagation();

                                                setShowDocument(true);

                                            }}
                                        >

                                            📎 Documents

                                        </button>

                                        <button
                                            className="btn btn-success"
                                            onClick={(e) => {

                                                e.stopPropagation();

                                                setShowComment(true);

                                            }}
                                        >

                                            💬 Comments

                                        </button>

                                    </div>

                                </div>

                            )

                        }

                    </div>

                    {

                        showComment && (

                            <CommentModal

                                enrollment={enrollment}

                                loadEnrollments={loadEnrollments}

                                closeModal={() => setShowComment(false)}

                            />

                        )

                    }

                    {

                        showDocument && (

                            <DocumentModal

                                enrollment={enrollment}

                                loadEnrollments={loadEnrollments}

                                closeModal={() => setShowDocument(false)}

                            />

                        )

                    }

                </>

            )}

        </Draggable>

    );

};

export default EnrollmentCard;