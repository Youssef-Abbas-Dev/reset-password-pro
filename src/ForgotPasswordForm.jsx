import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Email is required");

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/forgot-password",
        { email }
      );
      setSuccessMessage(data?.message);
      setEmail("");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      {successMessage && (
        <div className="text-center my-4">
          <Alert variant="success">
            <Alert.Heading>Success</Alert.Heading>
            <p>{successMessage}</p>
          </Alert>
        </div>
      )}
      <Form
        onSubmit={formSubmitHandler}
        className="w-50 border p-4 rounded mx-auto"
      >
        <h1 className="text-secondary text-center mb-5">Forgot Password?</h1>
        <Form.Group className="mb-4" controlId="email-address">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            size="lg"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" size="lg" className="w-100">
          Reset Password
        </Button>
      </Form>
    </>
  );
};

export default ForgotPasswordForm;
