import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, Column, useSortBy } from 'react-table';
import { User, COLUMNS } from './columns';
import './table.css';
import { Icon } from '@iconify/react';
import Paginate from './PaginationTable';


const TableHandler: React.FC = () => {
    const [data, setData] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('https://jsonplaceholder.typicode.com/users');
            const users = result.data.map((user: any) => {
                return {
                    ...user,
                    status: Math.random() < 0.5 ? 'Active' : 'Invited',
                    role: ['Admin', 'Sales Rep', 'Sales Lead'][Math.floor(Math.random() * 3)]
                };
            });
            setData(users);
        };
        fetchData();
    }, []);


    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [status, setStatus] = useState('Active');
    const [role, setRole] = useState('Sales Rep');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Generate a unique ID for the new user
        const newUserId = data.length + 1;

        // Create the new user object
        const newUser: User = {
            id: newUserId,
            name,
            email,
            image,
            status,
            role,
        };

        // Add the new user to the table
        // addUser(newUser);
        setData([...data, newUser]);
        console.log(data)
        // users.push(newUser);

        // Clear the form
        setName('');
        setEmail('');
        setStatus('Active');
        setRole('Sales Rep');

        // Close the form
        setIsOpen(false);
    };

    const handleDelete = (id: number) => {
        setData((prevData) => prevData.filter((user) => user.id !== id));
    };

    const handleEdit = (id: number, updatedData: Partial<User>) => {
        setData((prevData) =>
            prevData.map((user) => {
                if (user.id === id) {
                    return {
                        ...user,
                        ...updatedData
                    };
                }
                return user;
            })
        );
    };


    const downloadAsCsv = () => {
        // Convert the user data to CSV format
        const csvContent = [
            'Name,Email,Status,Role',
            ...data.map(user => `${user.name},${user.email},${user.status},${user.role}`),
        ].join('\n');

        // Create a Blob object with the CSV content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        // Create a temporary anchor element and set the CSV file as its href
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);

        // Set the filename for the download
        link.download = 'users.csv';

        // Trigger the download by simulating a click on the anchor element
        link.click();

        // Clean up the temporary anchor element
        URL.revokeObjectURL(link.href);
    };


    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const handleRowSelect = (rowId: number) => {
        setSelectedRows((prevSelectedRows: number[]) => {
            if (prevSelectedRows.includes(rowId)) {
                return prevSelectedRows.filter((id) => id !== rowId);
            } else {
                return [...prevSelectedRows, rowId];
            }
        });
    };


    const handleSelectAll = (event: { target: { checked: any; }; }) => {
        if (event.target.checked) {
            // Select all rows
            // Replace `rows` with your actual data array
            const allRowIds = rows.map((row) => parseInt(row.id));
            setSelectedRows(allRowIds);
        } else {
            // Deselect all rows
            setSelectedRows([]);
        }
    };


    const columns: Column<User>[] = React.useMemo(() => COLUMNS, []);

    const tableInstance = useTable<User>({ columns, data }, useSortBy);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    return (

        <div>
            <h1 className='mt-4 text-2xl heading font-semibold text-left'>Company Settings</h1>
            <div className='text-sm menu-box'>

                <div className="btn-group inline-flex rounded-md shadow-sm" role="group" aria-label="Basic example">
                    <button type="button" className="px-4 py-2 text-md font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-300 hover:text-black focus:z-10 focus:ring-2 focus:ring-black focus:text-black ">General</button>
                    <button type="button" className="px-4 py-2 text-md font-medium text-gray-900 bg-gray-300 border-t border-b border-gray-200 hover:bg-gray-300 hover:text-black focus:z-10 focus:ring-2   focus:ring-black focus:text-black ">Users</button>
                    <button type="button" className="px-4 py-2 text-md font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-300 hover:text-black focus:z-10 focus:ring-2   focus:ring-black focus:text-black ">Plan</button>
                    <button type="button" className="px-4 py-2 text-md font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-300 hover:text-black focus:z-10 focus:ring-2   focus:ring-black focus:text-black ">Billing</button>
                    <button type="button" className="px-4 py-2 text-md font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-300 hover:text-black focus:z-10 focus:ring-2 focus:ring-black focus:text-black ">Integration</button>
                </div>

            </div>
            <div className="table-container">
                <div>
                    <div className="container-header p-2">
                        <div className="header-title text-left">
                            <h1 className="header-name text-2xl font-bold align-middle">Users <span className='header-subtitle text-xs font-bold bg-gray-100 text-gray-400 ml-1'>Users</span></h1>
                            <p className='header-description font-medium text-gray-300 mt-1'>Manage your team members and their account permissions here.</p>
                        </div>

                        <div className="header-buttons">
                            <button onClick={downloadAsCsv} className='csv-btn text-xs md:text-lg py-2 px-4 my-1 text-black bg-white rounded-xl hover:rounded-3xl hover:bg-gray-100 transition-all duration-300 border-2'><i className="uil uil-cloud-download"></i> Download CSV</button>
                            <button onClick={() => setIsOpen(true)} className='text-white text-xs md:text-lg my-1 bg-blue-500 rounded-xl hover:rounded-3xl hover:bg-black transition-all duration-300'> <i className="uil uil-plus"></i>Add User</button>
                            <div>
                                {isOpen && (
                                    <div className="popup wrapper">
                                        <div className="popup-inner modal-dialog">
                                            <div className="modal-content">

                                                <div className="modal-header flex justify-between">


                                                    <h1 className="modal-title fs-5 text-xl font-bold " id="exampleModalLabel">Add User</h1>
                                                    <button type="button" onClick={() => setIsOpen(false)} className="bg-white rounded-full  inline-flex items-center justify-center text-gray-400 hover:text-gray-800 hover:bg-gray-200 focus:outline-none">
                                                        <span className="sr-only">Close menu</span>
                                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg></button>
                                                </div>
                                                <hr className='my-3' />

                                                <div>
                                                    <form onSubmit={handleSubmit} className="modal-body flex-col justify-evenly h-full">
                                                        <div className=' my-5'>
                                                            <label className='text-left block justify-start'>
                                                                Name:</label>
                                                            <input
                                                                type="text"
                                                                value={name}
                                                                className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500'

                                                                onChange={(event) => setName(event.target.value)}
                                                                required
                                                            />

                                                        </div>
                                                        <div className='my-5'>
                                                            <label className='text-left block justify-start'>Email:</label>

                                                            <input
                                                                type="email"
                                                                value={email}
                                                                className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500'
                                                                onChange={(event) => setEmail(event.target.value)}
                                                                required
                                                            />

                                                        </div>
                                                        <div className='my-5'>
                                                            <label className='text-left flex justify-between w-auto'>
                                                                Status:
                                                                <select value={status} onChange={(event) => setStatus(event.target.value)} className='form-control'>
                                                                    <option value="Active">Active</option>
                                                                    <option value="Invited">Invited</option>
                                                                </select>
                                                            </label>

                                                        </div>
                                                        <div className='my-5'>
                                                            <label className='text-left flex justify-between'>
                                                                Role:
                                                                <select value={role} onChange={(event) => setRole(event.target.value)} className='form-control'>
                                                                    <option value="Sales Rep">Sales Rep</option>
                                                                    <option value="Sales Leader">Sales Leader</option>
                                                                    <option value="Admin">Admin</option>
                                                                </select>
                                                            </label>

                                                        </div>
                                                        <hr className='my-6' />
                                                        <div className="modal-footer flex justify-end">
                                                            <button onClick={() => setIsOpen(false)} className="px-3 mx-2 py-2 border rounded ">Cancel</button>
                                                            <button type="submit" className="bg-blue-500 rounded-xl hover:rounded-3xl hover:bg-black transition-all duration-300 text-white">Add</button>
                                                        </div>
                                                    </form>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <hr />

                </div>
                <div className='myTable mt-2 pl-4'>
                    <table {...getTableProps()} className='w-full text-sm text-left'>
                        <thead className='text-l text-gray-500'>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()} >
                                    <th>
                                        <input className='w-4 h-4'
                                            type="checkbox"
                                            checked={selectedRows.length === rows.length}
                                            onChange={handleSelectAll}
                                        />
                                    </th>
                                    {headerGroup.headers.map((column: any) => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>

                                            <div className='flex table-head'>{column.render('Header')}
                                                <span>
                                                    {column.isSorted ? (column.isSortedDesc ? <Icon icon="uil:arrow-down" className='ml-2 text-2xl' /> : <Icon icon="uil:arrow-down" rotate={2} className='ml-2 text-2xl' />) : <Icon icon="uil:arrow-down" rotate={3} className='ml-2 text-2xl' />}
                                                </span ></div>
                                        </th>
                                    ))}
                                    <th></th>

                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} className='border-b items-center cursor-pointer hover:bg-slate-50'>
                                        <td key={row.id}>
                                            <input className='w-4 h-4'
                                                type="checkbox"
                                                checked={selectedRows.includes(parseInt(row.id))}
                                                onChange={() => handleRowSelect(parseInt(row.id))}
                                            />
                                        </td>
                                        {row.cells.map((cell) => {
                                            console.log(row)
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                        })}
                                        <td>
                                            <div className='edit-delete flex items-center justify-center'>
                                                <button onClick={() => handleDelete(row.original.id)}
                                                    className="inline-flex items-center justify-center w-8 h-8 mr-2 text-black-100 transition-colors duration-150  rounded-3xl focus:shadow-outline hover:bg-red-600 hover:text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg></button>
                                                <button
                                                    onClick={() =>
                                                        handleEdit(row.original.id, {
                                                            status: Math.random() < 0.5 ? 'Active' : 'Invited',
                                                            role: ['Admin', 'Sales Rep', 'Sales Lead'][Math.floor(Math.random() * 3)]
                                                        })
                                                    }
                                                    className="inline-flex items-center justify-center w-8 h-8 mr-2 text-black-100 transition-colors duration-150  rounded-3xl focus:shadow-outline hover:bg-black hover:text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>
                </div>

            </div>

        </div>
    );
};


export default TableHandler;
