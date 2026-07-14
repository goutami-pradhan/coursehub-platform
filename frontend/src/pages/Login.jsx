import { useState } from "react";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const Login = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({

        email: "",

        password: ""

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!form.email || !form.password) {

            toast.error("Please fill all fields");

            return;

        }

        setLoading(true);

        try {

            const response = await loginUser(form);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.user.role);
            localStorage.setItem("name", response.data.user.name);

            toast.success("Welcome " + response.data.user.name);

            navigate("/dashboard");

        }

        catch (error) {

            toast.error(
                error.response?.data?.message || "Login Failed"
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

                <h2>

                    Welcome Back

                </h2>

                <form onSubmit={handleSubmit}>

                    <input

                        type="email"

                        placeholder="Email"

                        name="email"

                        value={form.email}

                        onChange={handleChange}

                    />

                    <div className="password-box">

                        <input

                            type={showPassword ? "text" : "password"}

                            placeholder="Password"

                            name="password"

                            value={form.password}

                            onChange={handleChange}

                        />

                        <span

                            onClick={() => setShowPassword(!showPassword)}

                        >

                            {showPassword ? "🙈" : "👁"}

                        </span>

                    </div>

                    <button

                        className="login-btn"

                        disabled={loading}

                    >

                        {

                            loading

                            ?

                            "Logging in..."

                            :

                            "Login"

                        }

                    </button>

                </form>

                <p>

                    Don't have an account?

                    <Link to="/register">

                        Register

                    </Link>

                </p>

            </div>

        </div>

    );

};

export default Login;