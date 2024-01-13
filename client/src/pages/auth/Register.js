import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'

const Register = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const Host = "http://localhost:8000"

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${Host}/api/v1/auth/register`, {
                username,name, phone, email, password
            });
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
            toast.error('Something Went Wrong!')

        }
    }
    return (
        <div className='register ms-auto mt-3'>
            <h1>
                <NavLink className="navbar-brand text-primary" to="/">
                    Device Manager
                </NavLink>
            </h1>
            <form className='border p-5 shadow bg-white m-1' onSubmit={handleSubmit} >
                <h1 className='heading p-2 text-center'>Sign Up</h1>
                <div className="row g-2 mb-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="floatingInputGrid1" placeholder="name@example.com" required />
                            <label htmlFor="floatingInputGrid">Username</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="floatingInputGrid2" placeholder="name@example.com" required />
                            <label htmlFor="floatingInputGrid">name</label>
                        </div>
                    </div>
                </div>
                <div className="row g-2 mb-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="floatingInputGrid5" placeholder="name@example.com" required />
                            <label htmlFor="floatingInputGrid">Phone</label>
                        </div>
                    </div>
                </div>
                <div className="row g-2 mb-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="floatingInputGrid5" placeholder="name@example.com" required />
                            <label htmlFor="floatingInputGrid">Email</label>
                        </div>
                        <div className="form-floating">
                            <div className="form-floating">
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="floatingInputGrid6" placeholder="name@example.com" required />
                                <label htmlFor="floatingInputGrid">Password</label>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-sm">Submit</button>
            </form>

        </div>
    )
}

export default Register
