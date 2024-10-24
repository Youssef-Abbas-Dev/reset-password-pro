import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPasswordForm = () => {
  const { userId, resetPasswordToken } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/users/reset-password/${userId}/${resetPasswordToken}`
      )
      .then()
      .catch(() => navigate("/invalid-link"));
  }, [userId, resetPasswordToken]);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("Password is required");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/users/reset-password`,
        { newPassword: password, userId: parseInt(userId), resetPasswordToken }
      );
      setSuccessMessage(data?.message);
      setPassword("");
      setConfirmPassword("");
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
            <Alert.Heading>
              Your Password Has Been Changed Successfully
            </Alert.Heading>
            <p>{successMessage}</p>
          </Alert>
        </div>
      )}
      <Form
        onSubmit={formSubmitHandler}
        className="w-50 border p-4 rounded mx-auto"
      >
        <h1 className="text-success text-center mb-5">Reset Password</h1>
        <Form.Group className="mb-4" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            size="lg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="confirm-password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            size="lg"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" size="lg" variant="success" className="w-100">
          Save
        </Button>
      </Form>
    </>
  );
};

export default ResetPasswordForm;
