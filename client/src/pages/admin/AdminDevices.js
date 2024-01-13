import React, { useEffect, useState } from "react";
import { UseAuth } from "../../context/auth";
import "../style.css"
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDevices = () => {
    const [auth, setAuth] = UseAuth();
    const [devices, setDevices] = useState();
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [name1, setName1] = useState("");
    const [type1, setType1] = useState("");
    const [status1, setStatus1] = useState("");
    const [edit, setEdit] = useState(false)
    const navigate = useNavigate("");
    const Host = "http://localhost:8000"


    //get all devices
    const getAllDevices = async () => {
        try {
            const { data } = await axios.get(`${Host}/api/v1/device/get-devices`);
            if (data?.success) {
                setDevices(data?.devices);
                setEdit(false)
            }
        } catch (error) {
            toast.error("Something went wrong in getting catgeory");
        }
    };

    useEffect(() => {
        getAllDevices();
    }, [edit]);


    //create device function
    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${Host}/api/v1/device/create-device`, {
                name, type, status
            });
            if (res.data.success) {
                toast.success(res.data.message)
                setName("")
                setType("")
                setStatus("")
                setEdit(true)
            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
            toast.error('Something Went Wrong!')

        }
    }

    //delete device function
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${Host}/api/v1/device/delete-device/${id}`);
            if (res.data.success) {
                toast.success(res.data.message);
                setEdit(true)
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Something Went Wrong!");
        }
    };

    const handleEdit = async (id, e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${Host}/api/v1/device/update-device/${id}`, {
                name1, type1, status1
            });
            if (data?.success) {
                toast.success(data.message);
                setEdit(true)


            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something Went Wrong!");
        }
    };

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
        navigate("/");
    };

    return (
        <div>
            {/* ======= Header ======= */}
            <header id="header" className="header fixed-top d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-between">
                    <a href="index.html" className="logo d-flex align-items-center">

                        <span className="d-none d-lg-block">Welcome: {auth.user.name}</span>
                    </a>
                    <i className="bi bi-list toggle-sidebar-btn" />
                </div>{/* End Logo */}
                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">
                        <li className="nav-item d-block d-lg-none">
                            <a className="nav-link nav-icon search-bar-toggle " href="#">
                                <i className="bi bi-search" />
                            </a>

                        </li>{/* End Messages Nav */}
                        <li className="nav-item dropdown pe-3">
                            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                                {/* <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle" /> */}
                                <span className="d-none d-md-block dropdown-toggle ps-2">{auth.user.name}</span>
                            </a>{/* End Profile Iamge Icon */}
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li className="dropdown-header">
                                    <h6>{auth.user.name}</h6>
                                    <span>{auth.user.role === 1 ? "admin" : "user"}</span>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item d-flex align-items-center">
                                        <i className="bi bi-person" />
                                        <span>My Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <button className="dropdown-item d-flex align-items-center" onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-right" />
                                        <span>Sign Out</span>
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>{/* End Icons Navigation */}
            </header>{/* End Header */}
            {/* ======= Sidebar ======= */}
            <aside id="sidebar" className="sidebar">
                <AdminMenu />
            </aside>
            {/* End Sidebar*/}
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Devices</h1>
                </div>{/* End Page Title */}
                <section className="section dashboard">
                    <div className="row">
                        {/* Left side columns */}
                        <div >


                            <div >
                                <div className="card recent-sales overflow-auto">
                                    <div className="card-body">
                                        <div>
                                            {/* Button trigger modal */}
                                            <button type="button" className="btn btn-primary m-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                Create New Devices
                                            </button>
                                            {/* Modal */}
                                            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Create Device</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                                        </div>
                                                        <div className="modal-body">
                                                            <form onSubmit={handleCreate} className="row g-3">
                                                                <div className="col-12">
                                                                    <label htmlFor="inputName" className="form-label">Name</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="inputName"
                                                                        placeholder="Write a name"
                                                                        value={name}
                                                                        onChange={(e) => setName(e.target.value)}
                                                                    />
                                                                </div>



                                                                <div className="col-md-6">
                                                                    <div className="form-floating">
                                                                        <select
                                                                            name="type"
                                                                            value={type}
                                                                            onChange={(e) => setType(e.target.value)}
                                                                            className="form-select"
                                                                            id="floatingSelectGrid11"
                                                                        >
                                                                            <option defaultValue />
                                                                            <option value="Web">
                                                                                Web
                                                                            </option>
                                                                            <option value="Android">
                                                                                Android
                                                                            </option>
                                                                            <option value="iOS">
                                                                                iOS
                                                                            </option>

                                                                        </select>
                                                                        <label htmlFor="floatingSelectGrid">Type</label>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <div className="form-floating">
                                                                        <select
                                                                            name="status"
                                                                            value={status}
                                                                            onChange={(e) => setStatus(e.target.value)}
                                                                            className="form-select"
                                                                            id="floatingSelectGrid11"
                                                                        >
                                                                            <option defaultValue />
                                                                            <option value="Active">
                                                                                Active
                                                                            </option>
                                                                            <option value="Deactive">
                                                                                Deactive
                                                                            </option>

                                                                        </select>
                                                                        <label htmlFor="floatingSelectGrid">Status</label>
                                                                    </div>
                                                                </div>




                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                                                                </div>
                                                            </form>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <table className="table table-borderless datatable">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Devices</th>
                                                    <th scope="col">type</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {devices?.map((d) => (
                                                    <tr key={d._id}>
                                                        <th scope="row">{d.index}</th>
                                                        <td>{d.name}</td>
                                                        <td>{d.type}</td>
                                                        <td> <span className={d.status === "Active" ? "badge bg-success" : "badge bg-danger"}>
                                                            {d.status}
                                                        </span></td>
                                                        <td>
                                                            <button
                                                                key={d._id}
                                                                type="button"
                                                                className="btn btn-danger btn-sm ms-1"
                                                                onClick={() => handleDelete(d._id)}
                                                            >

                                                                Delete

                                                            </button>

                                                            <button
                                                                key={d._id}
                                                                type="button"
                                                                className="btn btn-primary btn-sm ms-1"
                                                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                                            >

                                                                Edit

                                                            </button>
                                                            {/* Modal */}
                                                            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                                <div className="modal-dialog">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            <form onSubmit={(e) => handleEdit(d._id, e)} className="row g-3">
                                                                                <div className="col-12">
                                                                                    <label htmlFor="inputName" className="form-label">Name</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        id="inputName"
                                                                                        placeholder="Write a name"
                                                                                        value={name1}
                                                                                        onChange={(e) => setName1(e.target.value)}
                                                                                        required
                                                                                    />
                                                                                </div>



                                                                                <div className="col-md-6">
                                                                                    <div className="form-floating">
                                                                                        <select
                                                                                            name="type1"
                                                                                            value={type1}
                                                                                            onChange={(e) => setType1(e.target.value)}
                                                                                            className="form-select"
                                                                                            id="floatingSelectGrid11"
                                                                                            required
                                                                                        >
                                                                                            <option defaultValue />
                                                                                            <option value="Web">
                                                                                                Web
                                                                                            </option>
                                                                                            <option value="Android">
                                                                                                Android
                                                                                            </option>
                                                                                            <option value="iOS">
                                                                                                iOS
                                                                                            </option>

                                                                                        </select>
                                                                                        <label htmlFor="floatingSelectGrid">Type</label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-md-6">
                                                                                    <div className="form-floating">
                                                                                        <select
                                                                                            name="status1"
                                                                                            value={status1}
                                                                                            onChange={(e) => setStatus1(e.target.value)}
                                                                                            className="form-select"
                                                                                            id="floatingSelectGrid11"
                                                                                            required
                                                                                        >
                                                                                            <option defaultValue />
                                                                                            <option value="Active">
                                                                                                Active
                                                                                            </option>
                                                                                            <option value="Deactive">
                                                                                                Deactive
                                                                                            </option>

                                                                                        </select>
                                                                                        <label htmlFor="floatingSelectGrid">Status</label>
                                                                                    </div>
                                                                                </div>




                                                                                <div className="modal-footer">
                                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update</button>
                                                                                </div>

                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))

                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>{/* End Left side columns */}
                    {/* Right side columns */}
                    <div className="col-lg-4">
                        {/* Recent Activity */}

                    </div>{/* End Right side columns */}

                </section >
            </main > {/* End #main */}
            {/* ======= Footer ======= */}
            <footer id="footer" className="footer">
                <div className="copyright">
                    © Copyright <strong><span>Device Manager</span></strong>. All Rights Reserved
                </div>
            </footer>{/* End Footer */}
        </div >

    );
};

export default AdminDevices;