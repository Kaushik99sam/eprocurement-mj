import React, { useEffect, useState } from "react";
import Date from "../../util/Date";
import "./styling/styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MultipleIndent from "./MultipleIndent";

const AddIndent2 = () => {
    const navigate = useNavigate();
    const [hid, sethid] = useState("");
    const [description, setDescription] = useState("");
    let indentHeaderId=-1;

    const handleSubmit = async () => {
        navigate("/multipleindent");
        const response = await fetch("http://localhost:8080/mj/indentheader", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: description,
                netprice:0,
                isActive: 1,
                createdBy: "Raj",
                createdAt: Date(),
                modifiedBy: "Raj",
                modifiedAt: Date(),
                user: {
                    userId: 1,
                    role: {
                        roleId: 1,
                    },
                },
            }),
        });
        handleNext();
    };

    const handleNext = async() => {
        const response1 = await fetch( "http://localhost:8080/mj/indentheader/desc", {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain",
                    },
                    body:description
                }
            );

        if (response1.ok) {
            const result = await response1.json();
            console.log(result);
            indentHeaderId=result.indentHeaderId;
            localStorage.setItem("hid", indentHeaderId);
            console.log(localStorage.getItem("hid"));
        }
        
    };

    return (
        <div className="container mb-5">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2
                                className="card-title mb-4"
                                style={{ textAlign: "center" }}
                            >
                                Add Indent
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="col mb-5">
                                    <label className="form-label">
                                        Description:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btnn btn-primary"
                                >
                                    Next
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddIndent2;
