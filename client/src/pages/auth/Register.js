import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, SetName] = useState("")
    const [address, SetAddress] = useState("")
    const [phone, SetPhone] = useState("")
    const [answer, SetAnswer] = useState("")
    const [email, SetEmail] = useState("")
    const [password, SetPassword] = useState("")
    const navigate = useNavigate()

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/v1/auth/register', {
                name, address, phone ,answer, email, password
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
            <img
              src="/image/tl.png"
              alt="Logo"
              width={50}
              height={35}
              className="d-inline-block align-text-top ms-auto "
            />
            MegaMart
          </NavLink>
        </h1>
            <form className='border p-5 shadow bg-white m-1' onSubmit={handleSubmit} >
            <h1 className='heading p-2 text-center'>Registration</h1>
                <div className="row g-2 mb-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" value={name} onChange={(e) => SetName(e.target.value)} className="form-control" id="floatingInputGrid1" placeholder="name@example.com" required />
                            <label htmlFor="floatingInputGrid">Name</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" value={address} onChange={(e) => SetAddress(e.target.value)} className="form-control" id="floatingInputGrid2" placeholder="name@example.com" required />
                            <label htmlFor="floatingInputGrid">Address</label>
                        </div>
                    </div>
                </div>
                <div className="row g-2 mb-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" value={phone} onChange={(e) => SetPhone(e.target.value)} className="form-control" id="floatingInputGrid3" placeholder="name@example.com" required />
                            <label htmlFor="floatingInputGrid">Phone Number</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <div className="form-floating">
                                <input type="text" value={answer} onChange={(e) => SetAnswer(e.target.value)} className="form-control" id="floatingInputGrid4" placeholder="name@example.com" required />
                                <label htmlFor="floatingInputGrid">What is your Fav Colour?</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-2 mb-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="email" value={email} onChange={(e) => SetEmail(e.target.value)} className="form-control" id="floatingInputGrid5" placeholder="name@example.com" required />
                            <label htmlFor="floatingInputGrid">Email</label>
                        </div>
                        <div className="form-floating">
                            <div className="form-floating">
                                <input type="password" value={password} onChange={(e) => SetPassword(e.target.value)} className="form-control" id="floatingInputGrid6" placeholder="name@example.com" required />
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
