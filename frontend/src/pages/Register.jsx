import { useState } from "react";

import { registerUser } from "../services/authService";

const Register = () => {

    const [form, setForm] = useState({

        name: "",

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

            await registerUser(form);

            alert("Registration Successful");

            window.location = "/";

        }

        catch (error) {

            alert(error.response?.data?.message || "Registration Failed");

        }

    }

    return (

        <div style={{ padding: "30px" }}>

            <h2>Create Account</h2>

            <form onSubmit={handleSubmit}>

                <input

                    name="name"

                    placeholder="Name"

                    onChange={handleChange}

                />

                <br /><br />

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

                    Register

                </button>

            </form>

        </div>

    )

}

export default Register;