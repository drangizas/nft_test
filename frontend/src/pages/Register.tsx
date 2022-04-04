import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert, Button, Form } from "react-bootstrap";

import { appTokenHolder } from "../token";

type Inputs = {
    email: string;
    password: string;
};

export default function RegisterPage() {
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
        try {
            const res = await fetch("/auth/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: inputs.email,
                    password: inputs.password,
                }),
            });
            const data = await res.json();

            if (res.status === 201) {
                appTokenHolder.setToken(data.token);
                navigate("/");
            } else {
                throw new Error(data);
            }
        } catch (error) {
            console.error(error);
            setError("An error has occured. Try again");
        }
    };

    return (
        <div
            className="d-flex flex-col justify-content-center align-items-center vw-100 vh-100"
            style={{ backgroundColor: "#f3f3f3" }}
        >
            <Form
                noValidate
                className="p-5 bg-white rounded shadow"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="mb-4">Register</h1>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        {...register("email")}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-2">
                    Register
                </Button>
            </Form>
        </div>
    );
}
