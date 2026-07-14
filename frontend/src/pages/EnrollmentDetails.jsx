import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./EnrollmentDetails.css";

import {
    getEnrollmentById,
    addComment,
    uploadDocument,
    deleteDocument
} from "../services/enrollmentService";

const EnrollmentDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [enrollment, setEnrollment] = useState(null);

    const [comment, setComment] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);

    const loadEnrollment = async () => {

        try {

            const response = await getEnrollmentById(id);

            setEnrollment(response.data.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        loadEnrollment();

    }, []);

    const submitComment = async () => {

        if (!comment.trim()) return;

        try {

            await addComment(
                enrollment._id,
                comment
            );

            setComment("");

            loadEnrollment();

        }

        catch (err) {

            console.log(err);

        }

    };

    const uploadNewDocument = async () => {

        if (!selectedFile) return;

        try {

            const formData = new FormData();

            formData.append(
                "file",
                selectedFile
            );

            await uploadDocument(
                enrollment._id,
                formData
            );

            setSelectedFile(null);

            loadEnrollment();

        }

        catch (err) {

            console.log(err);

        }

    };

    const removeDocument = async (documentId) => {

        try {

            await deleteDocument(
                enrollment._id,
                documentId
            );

            loadEnrollment();

        }

        catch (err) {

            console.log(err);

        }

    };

    if (!enrollment) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="details-container">

            <button
                className="back-btn"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>

            <h1>Student Enrollment Details</h1>

            <div className="details-grid">

                <div className="info-card">

                    <h3>👤 Student Details</h3>

                    <p><b>Name :</b> {enrollment.student?.name}</p>

                    <p><b>Email :</b> {enrollment.student?.email}</p>

                    <p><b>Role :</b> {enrollment.student?.role}</p>

                </div>

                <div className="info-card">

                    <h3>📚 Course Details</h3>

                    <p><b>Course :</b> {enrollment.course?.title}</p>

                    <p><b>Instructor :</b> {enrollment.course?.instructor}</p>

                    <p><b>Duration :</b> {enrollment.course?.duration}</p>

                    <p><b>Level :</b> {enrollment.course?.level}</p>

                    <p><b>Price :</b> ₹{enrollment.course?.price}</p>

                </div>

            </div>

            <div className="progress-card">

                <h3>Course Progress</h3>

                <div className="progress">

                    <div
                        className="progress-bar"
                        style={{
                            width: `${enrollment.progress || 0}%`
                        }}
                    >

                        {enrollment.progress || 0}%

                    </div>

                </div>

                <h5>

                    Status :

                    <span className="badge bg-primary ms-2">

                        {enrollment.status}

                    </span>

                </h5>

            </div>

            <div className="action-card">

                <h2>Upload Document</h2>

                <input
                    type="file"
                    onChange={(e) =>
                        setSelectedFile(e.target.files[0])
                    }
                />

                <button
                    className="btn btn-primary mt-3"
                    onClick={uploadNewDocument}
                >
                    Upload
                </button>

            </div>

            <div className="history-card">

                <h2>Uploaded Documents</h2>

                {

                    enrollment.documents?.length === 0 ?

                        <p>No documents uploaded.</p>

                        :

                        enrollment.documents.map(doc => (

                            <div
                                key={doc._id}
                                className="history-item"
                            >

                                <b>{doc.fileName}</b>

                                <br />

                                <small>

                                    {new Date(doc.createdAt).toLocaleString()}

                                </small>

                                <br /><br />

                                <a
                                    href={`http://localhost:5000/uploads/${doc.filePath}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >

                                    Download

                                </a>

                                <button
                                    className="btn btn-danger btn-sm ms-3"
                                    onClick={() =>
                                        removeDocument(doc._id)
                                    }
                                >

                                    Delete

                                </button>

                            </div>

                        ))

                }

            </div>

            <div className="history-card">

                <h2>Comments</h2>

                <textarea

                    rows="4"

                    placeholder="Write your comment..."

                    value={comment}

                    onChange={(e) =>
                        setComment(e.target.value)
                    }

                />

                <button
                    className="btn btn-success mt-3"
                    onClick={submitComment}
                >

                    Send Comment

                </button>

                <hr />

                {

                    enrollment.comments?.length === 0 ?

                        <p>No comments yet.</p>

                        :

                        enrollment.comments.map(c => (

                            <div
                                key={c._id}
                                className="history-item"
                            >

                                <b>{c.user}</b>

                                <p>{c.message}</p>

                                <small>

                                    {new Date(c.createdAt).toLocaleString()}

                                </small>

                            </div>

                        ))

                }

            </div>

        </div>

    );

};

export default EnrollmentDetails;