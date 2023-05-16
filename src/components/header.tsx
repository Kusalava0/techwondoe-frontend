// import React, { useState } from "react";
import './header.css';

export default function Header() {

    // const [addUserModalshow, setAddUserModalShow] = useState(false);
    // const [updateUserModalShow, setUpdateUserModalShow] = useState(false);
    return <div>
        <h1 className='mt-4 text-2xl heading font-extrabold text-left'>Company Settings</h1>
        <div className='flex text-xs justify-left menu-box'>

            <div className="header-buttons btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-outline-secondary border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-200 hover:text-black font-semibold">General</button>
                <button type="button" className="btn btn-outline-secondary border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-200 hover:text-black font-semibold bg-gray-100 text-black">Users</button>
                <button type="button" className="btn btn-outline-secondary border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-200 hover:text-black font-semibold">Plan</button>
                <button type="button" className="btn btn-outline-secondary border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-200 hover:text-black font-semibold">Billing</button>
                <button type="button" className="btn btn-outline-secondary border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-200 hover:text-black font-semibold">Integration</button>
            </div>

        </div>

        <div className="table-container">
            <div className="container-header p-2">
                <div className="header-title text-left">
                    <h1 className="header-name text-2xl font-bold align-middle">Users <span className='header-subtitle text-xs font-bold bg-gray-100 text-gray-400 ml-1'>Users</span></h1>
                    <p className='header-description font-semibold text-gray-300 mt-1'>Manage your team members and their account permissions here.</p>
                </div>

                <div className="header-buttons">
                    <button className='csv-btn text-xs md:text-lg py-2 px-4 my-1'><i className="uil uil-cloud-download"></i> Download CSV</button>
                    <button className='text-white text-xs md:text-lg my-1 bg-blue-500'> <i className="uil uil-plus"></i> Add User</button>
                </div>
            </div>
            <hr />

        </div>
    </div>
}