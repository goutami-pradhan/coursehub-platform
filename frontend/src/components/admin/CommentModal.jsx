import { useState } from "react";
import { addComment } from "../../services/enrollmentService";
import "./CommentModal.css";

const CommentModal = ({
    enrollment,
    closeModal,
    loadEnrollments
}) => {

    const [message, setMessage] = useState("");

    const saveComment = async () => {

        if (!message.trim()) return;

        await addComment(
            enrollment._id,
            message
        );

        loadEnrollments();

        setMessage("");

        closeModal();

    };

    return (

        <div className="modal-overlay">

            <div className="comment-modal">

                <h2>Comments</h2>

                <div className="comment-list">

                    {
                        enrollment.comments?.map((comment, index) => (

                            <div
                                key={index}
                                className="comment-item"
                            >

                                <b>{comment.user}</b>

                                <p>{comment.message}</p>

                            </div>

                        ))
                    }

                </div>

                <textarea

                    placeholder="Write comment..."

                    value={message}

                    onChange={(e)=>setMessage(e.target.value)}

                />

                <div className="buttons">

                    <button
                        onClick={closeModal}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={saveComment}
                    >
                        Send
                    </button>

                </div>

            </div>

        </div>

    );

};

export default CommentModal;