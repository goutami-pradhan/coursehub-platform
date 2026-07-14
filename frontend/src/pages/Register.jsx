import { useState } from "react";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const Register = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "student"
    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!form.name || !form.email || !form.password) {

            toast.error("Please fill all fields");

            return;

        }

        if (form.password !== form.confirmPassword) {

            toast.error("Passwords do not match");

            return;

        }

        setLoading(true);

        try {

            const payload = {

                name: form.name,

                email: form.email,

                password: form.password,

                role: form.role

            };

            await registerUser(payload);

            toast.success("Registration Successful");

            navigate("/");

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Registration Failed"

            );

        }

        setLoading(false);

    };

    return (

        <div className="auth-page">

            <div className="auth-card">

                <h1 className="logo">

                    🎓 CourseHub LMS

                </h1>

                <p className="subtitle">

                    Learn • Track • Grow

                </p>

                <h2>Create Account</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <div className="password-box">

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                        />

                        <span
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁"}
                        </span>

                    </div>

                    <div className="password-box">

                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                        />

                        <span
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? "🙈" : "👁"}
                        </span>

                    </div>

                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="role-select"
                    >

                        <option value="student">

                            Student

                        </option>

                        <option value="admin">

                            Admin

                        </option>

                    </select>

                    <button
                        className="login-btn"
                        disabled={loading}
                    >

                        {

                            loading

                                ?

                                "Creating Account..."

                                :

                                "Register"

                        }

                    </button>

                </form>

                <p>

                    Already have an account?

                    <Link to="/">

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );

};

export default Register;