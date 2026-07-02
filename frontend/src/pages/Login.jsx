import { useState } from "react";

import { loginUser } from "../services/authService";

const Login = () => {

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

        try {

            const response = await loginUser(form);

            localStorage.setItem(

                "token",

                response.data.token

            );

            localStorage.setItem(

                "role",

                response.data.user.role

            );

            alert("Login Successful");

            window.location = "/dashboard";

        }

        catch (error) {

            alert(error.response?.data?.message || "Login Failed");

        }

    }

    return (

        <div style={{ padding: "30px" }}>

            <h2>CourseHub Login</h2>

            <form onSubmit={handleSubmit}>

                <input

                    name="email"

                    placeholder="Email"

                    onChange={handleChange}

                />

                <br /><br />

                <input

                    type="password"

                    name="password"

                    placeholder="Password"

                    onChange={handleChange}

                />

                <br /><br />

                <button>

                    Login

                </button>

            </form>

            <br />

            <a href="/register">

                Create Account

            </a>

        </div>

    );

}

export default Login;