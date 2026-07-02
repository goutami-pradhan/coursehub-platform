import api from "../api/api";

export const enrollCourse = (courseId) =>
    api.post("/enrollments", { courseId });

export const getEnrollments = () =>
    api.get("/enrollments");

export const updateEnrollment = (id, status) =>
    api.put(`/enrollments/${id}`, { status });