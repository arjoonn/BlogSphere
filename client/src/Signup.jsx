import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "./Style/Signup.css";

function Signup() {
  const usenavigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
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
      const res = await fetch("http://localhost:3000/user/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        console.log(res);
        usenavigate("/");
      } else {
        alert("error while signup");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };
  return (
    <>
      <div className="signup">
        <Form onSubmit={handleSubmit} className="signUpform">
          <h3 className="signupform-title">SignUp</h3>
          <Form.Group className="signupItem" controlId="formPlaintextName">
            <Form.Label>
              Full Name
            </Form.Label>
            <Form.Control
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="signupItem" controlId="formPlaintextEmail">
            <Form.Label>
              Email
            </Form.Label>

            <Form.Control
              type="email"
              placeholder="example@gmail.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="signupItem" controlId="formPlaintextPassword">
            <Form.Label>
              Password
            </Form.Label>

            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Button  type="submit" variant="light" className="signUp-btn">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Signup;
