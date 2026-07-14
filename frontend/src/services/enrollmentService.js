import api from "../api/api";

export const enrollCourse = (courseId) =>
    api.post("/enrollments", { courseId });

export const getEnrollments = () =>
    api.get("/enrollments");

export const updateEnrollment = (id, status) =>
    api.put(`/enrollments/${id}`, { status });

export const updateEnrollmentStatus = (id, status) => {

    return api.put(

        `/enrollments/status/${id}`,

        {

            status

        }

    );

};

export const addComment = (id, message) => {

    return api.post(

        `/enrollments/comment/${id}`,

        {

            message

        }

    );

};

export const uploadDocument = (id, file) => {

    const formData = new FormData();

    formData.append("file", file);

    return api.post(

        `/enrollments/document/${id}`,

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data"

            }

        }

    );

};

export const getDocuments = (id) => {

    return api.get(

        `/enrollments/document/${id}`

    );

};

export const deleteDocument = (enrollmentId, documentId) => {

    return api.delete(

        `/enrollments/document/${enrollmentId}/${documentId}`

    );

};

export const getEnrollmentById = (id) => {

    return api.get(

        `/enrollments/${id}`

    );

};
