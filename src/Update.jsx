import React, {useState} from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch ,useSelector } from 'react-redux'
import { updateUser } from './UserReducer'

function Update() {
    const {id} = useParams();
    const users = useSelector((state) => state.users);
    const existingUser = users.filter(f => f.id == id);
    const {name, email} = existingUser[0];

    const [uname, setName] =useState(name)
    const [uemail, setEmail] = useState(email)

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleUpdate = (event) => {
        event.preventDefault();
        dispatch(updateUser({
            id: id,
            name: uname,
            email: uemail
        }))
        navigate('/')
    }

    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
            <div className="w-50 border bg-secondary text-white p-5">
                <h1>Update Users</h1>
                <form onSubmit={handleUpdate}>
                    <div>
                        <label htmlFor="name">Name :</label>
                        <input type="text" name="name" className="form-control" placeholder="enter name" value={uname} onChange={e => setName(e.target.value)} />
                    </div>
                    <div>
                    <label htmlFor="email">Email :</label>
                        <input type="email" name="email" className="form-control" placeholder="enter email" value={uemail} onChange={e => setEmail(e.target.value)} />
                        <br />
                        <button className="btn btn-info">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Update;