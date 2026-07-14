import { useEffect, useState } from "react";
import {
    uploadDocument,
    getDocuments,
    deleteDocument
} from "../../services/enrollmentService";

import "./DocumentModal.css";

const DocumentModal = ({
    enrollment,
    closeModal
}) => {

    const [file, setFile] = useState(null);
    const [documents, setDocuments] = useState([]);

    const loadDocuments = async () => {

        try {

            const response = await getDocuments(
                enrollment._id
            );

            setDocuments(response.data.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        loadDocuments();

    }, []);

    const upload = async () => {

        if (!file) return;

        try {

            await uploadDocument(

                enrollment._id,

                file

            );

            setFile(null);

            loadDocuments();

        }

        catch (error) {

            console.log(error);

        }

    };

    const remove = async (docId) => {

        try {

            await deleteDocument(

                enrollment._id,

                docId

            );

            loadDocuments();

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="modal-overlay">

            <div className="document-modal">

                <div className="modal-header">

                    <h2>

                        📎 Course Documents

                    </h2>

                    <button
                        className="close-btn"
                        onClick={closeModal}
                    >

                        ✕

                    </button>

                </div>

                <div className="upload-section">

                    <input

                        type="file"

                        onChange={(e)=>setFile(e.target.files[0])}

                    />

                    <button

                        className="upload-btn"

                        onClick={upload}

                    >

                        Upload

                    </button>

                </div>

                <hr />

                {

                    documents.length === 0 ?

                    <p>

                        No documents uploaded.

                    </p>

                    :

                    documents.map(doc=>(

                        <div

                            key={doc._id}

                            className="document-card"

                        >

                            <div>

                                <h4>

                                    📄 {doc.fileName}

                                </h4>

                                <small>

                                    {

                                        new Date(

                                            doc.uploadedAt

                                        ).toLocaleString()

                                    }

                                </small>

                            </div>

                            <div className="document-buttons">

                                <a

                                    href={`http://localhost:5000/uploads/${doc.filePath}`}

                                    target="_blank"

                                    rel="noreferrer"

                                >

                                    View

                                </a>

                                <a

                                    href={`http://localhost:5000/uploads/${doc.filePath}`}

                                    download

                                >

                                    Download

                                </a>

                                <button

                                    onClick={()=>

                                        remove(doc._id)

                                    }

                                >

                                    Delete

                                </button>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

};

export default DocumentModal;