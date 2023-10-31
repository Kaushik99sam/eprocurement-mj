import React, { useState, useEffect } from "react";
import Date from "../../util/Date";
import "./styling/styles.css";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";

const EditIndent = (props) => {
    // Assume you have an indent ID, description, and net price as parameters
    const [description, setDescription] = useState("");
    const [netPrice, setNetPrice] = useState(0);
    const [createdBy, setCreatedBy] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIndentHeader = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/mj/indentheader/${props.headerId}`
                );
                setDescription(response.data.description);
                setNetPrice(response.data.netprice);
                setCreatedBy(response.data.createdBy);
                setCreatedAt(response.data.createdAt);
                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
            }
        };
        fetchIndentHeader();
    }, []);

    const handleUpdate = async () => {
        console.log("Hii");
        try {
            const response = await fetch(
                "http://localhost:8080/mj/indentheader",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        indentHeaderId: props.headerId,
                        description: description,
                        netprice: netPrice,
                        isActive: 1,
                        createdBy: createdBy,
                        createdAt: createdAt,
                        modifiedBy: createdBy,
                        modifiedAt: Date(),
                        user: user,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update data");
            }
        } finally {
            console.log("done");
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate();
        window.location.reload();
    };

    return (
        <>
            <div className="card">
                <div className="card-body">
                    {/* <h2
                        className="card-title mb-4"
                        style={{ textAlign: "center" }}
                    >
                        Edit Indent
                    </h2> */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">
                                Indent Header ID:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={props.headerId}
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Net Price:</label>
                            <input
                                type="number"
                                className="form-control"
                                value={netPrice}
                                onChange={(e) =>
                                    setNetPrice(parseFloat(e.target.value))
                                }
                            />
                        </div>
                        <button type="submit" className="btn btnn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            <div className="mt-4">
                <p></p>
                <p></p>
            </div>
        </>
    );
};

export default EditIndent;
