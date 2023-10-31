import React, { useState } from "react";
import axios from "axios";
import "./styling/styles.css";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        userOtp: "",
        newPassword: "",
    });

    const [step, setStep] = useState("email"); // Initial step is 'email'
    const [otp, setOtp] = useState(null);

    const [error, setError] = useState(null);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError(null);
        setShowErrorMessage(false); // Clear any previous error messages
    };

    const validateEmail = (email) => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return regex.test(email);
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        const { email } = formData;

        try {
            const userResponse = await axios.get(
                `http://localhost:8080/mj/user/byEmail/${email}`
            );

            if (userResponse.status === 200) {
                setStep("otp");
                const response = await axios.get(
                    `http://localhost:8080/mj/api/email/send/${email}`
                );
                setOtp(response.data);
            } else {
                // User not found, show an error message
                setError("User not found. Please check your email.");
                setShowErrorMessage(true);
            }
        } catch (error) {
            console.error("Error while checking user:", error);
        }
    };

    const handleOTPSubmit = async (e) => {
        e.preventDefault();
        const { userOtp } = formData;
        try {
            if (userOtp == otp) {
                setShowErrorMessage(false); // Clear any previous error messages
                setStep("newPassword");
            } else {
                // User not found, show an error message
                setError("Invalid OTP!!!!");
                setShowErrorMessage(true);
            }
        } catch (error) {
            console.error("Error while checking user:", error);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        const { email, newPassword } = formData;

        try {
            // Send a request to update the password
            const userResponse = await axios.get(
                `http://localhost:8080/mj/user/byEmail/${email}`
            );
            const user = userResponse.data;
            const userData = {
                userId: user.userId,
                userName: email,
                password: newPassword,
                role: {
                    roleId: user.role.roleId,
                    isActive: 1,
                    createdBy: "Vishwa",
                    createdAt: new Date(),
                    modifiedBy: "Vishwa",
                    modifiedAt: new Date(),
                },
            };
            userData.isActive = 1;
            userData.createdBy = "Vishwa";
            userData.createdAt = new Date();
            userData.modifiedBy = "Vishwa";
            userData.modifiedAt = new Date();

            const response = await axios.put(
                "http://localhost:8080/mj/user",
                userData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.status === 200) {
                console.log("Password reset successful");
                navigate("/");
            } else {
                console.error("Password reset failed");
            }
        } catch (error) {
            console.error("Error during password reset:", error);
        }
    };

    return (
        <div className="container" style={{ maxWidth: "400px" }}>
            <div className="card p-4" style={{ marginTop: "38%" }}>
                <h2 className="card-title text-center">Forgot Password</h2>
                {step === "email" && (
                    <form onSubmit={handleEmailSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email <span className="text-danger">*</span>
                            </label>
                            <input
                                type="email"
                                className={`form-control form-control-sm ${
                                    error ? "is-invalid" : ""
                                }`}
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {error && (
                                <div className="invalid-feedback">{error}</div>
                            )}
                        </div>
                        <button type="submit" className="btn btnn btn-primary">
                            Next
                        </button>
                    </form>
                )}

                {step === "otp" && (
                    <form onSubmit={handleOTPSubmit}>
                        <div className="mb-3">
                            {/* {showErrorMessage && <p className="text-danger">Invalid OTP.</p>} */}
                            <label htmlFor="userOtp" className="form-label">
                                OTP <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text" // Change to "text" for OTP input
                                className={`form-control form-control-sm ${
                                    error ? "is-invalid" : ""
                                }`}
                                id="otp"
                                name="userOtp"
                                value={formData.userOtp}
                                onChange={handleChange}
                                required
                            />
                            {error && (
                                <div className="invalid-feedback">{error}</div>
                            )}
                        </div>
                        <button type="submit" className="btn btnn btn-primary">
                            Next
                        </button>
                    </form>
                )}

                {step === "newPassword" && (
                    <form onSubmit={handlePasswordUpdate}>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">
                                New Password{" "}
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                type="password"
                                className={`form-control form-control-sm ${
                                    error ? "is-invalid" : ""
                                }`}
                                id="newPassword"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                            />
                            {error && (
                                <div className="invalid-feedback">{error}</div>
                            )}
                        </div>
                        <button type="submit" className="btn btnn btn-primary">
                            Reset Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;
