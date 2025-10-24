import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Style/Signin.css";

function Signin({ setUser }) {
  const usenavigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        usenavigate("/");
      } else {
        console.log("no user exist");
        const data = await res.json();
        setError(data.error || "login failed");
      }
    } catch (error) {
      setError("Something went wrong please try  again");
      usenavigate("/signin");
    }
  };
  return (
    <>
      <div className="signin">
        <Form onSubmit={handleSubmit} className="signInform">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="signinItem" controlId="formPlaintextEmail">
            <h3 className="signInform-title">LOGIN👋</h3>
            <Form.Control
              type="email"
              placeholder="example@gmail.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="signinItem" controlId="formPlaintextPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Button  type="submit"  variant="light" className="signIn-btn">
            Submit
          </Button>
        </Form>
      </div>
    </>

  );
}

export default Signin;
