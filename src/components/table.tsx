import React, { useState, useEffect } from "react";
import { useSortBy, useTable } from "react-table";
import { User, COLUMNS } from "./columns";
// import { DeleteRow } from "./add_delete"
import './table.css';


const getRandomStatus = () => {
    return Math.random() < 0.5 ? "Active" : "Invited";
};

const getRandomRole = () => {
    const roles = ["Sales Rep", "Sales Lead", "Admin"];
    return roles[Math.floor(Math.random() * roles.length)];
};

const generateUsers = (users: User[]) => {
    const updatedUsers = users.map((user) => {
        const status = getRandomStatus();
        const role =
            status === "Invited" ? "Sales Rep" : Math.random() < 0.2 ? "Admin" : getRandomRole();
        return { ...user, status, role };
    });
    return updatedUsers;
};

const Table = () => {
    const [users, setUsers] = useState<User[]>([]);



    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await response.json();
            setUsers(generateUsers(data));
        };
        fetchUsers();
    }, []);


    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable<User>({ columns: COLUMNS, data: users }, useSortBy);

    return (
        <div className="table-container">
            <table {...getTableProps()} className='w-full text-sm text-left'>
                <thead className='text-l text-gray-500'>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}
                                    </span >
                                </th >
                            ))}
                        </tr >
                    ))}
                </thead >
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>

                                        {cell.render("Cell")}
                                    </td>

                                ))}
                                {/* <td>
                                    <span>
                                        <button>Delete</button>
                                        <button>Edit</button>
                                    </span>
                                </td> */}
                            </tr>
                        );
                    })}
                </tbody>
            </table >
        </div >
    );
};

export default Table;


