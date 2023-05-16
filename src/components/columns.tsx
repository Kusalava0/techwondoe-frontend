import { Column } from 'react-table';

export type User = {
    id: number;
    name: string;
    email: string;
    image: string;
    status: string;
    role: string;
};


export const COLUMNS: Column<User>[] = [
    // {
    //     Header: 'Name',

    //     accessor: 'name',
    //     Cell: ({ value }) => <>{value}</>
    // },
    // {
    //     Header: 'Email',
    //     accessor: 'email',
    //     Cell: ({ value }) => <>{value}</>
    // },
    {
        Header: "Name",
        id: "name",
        accessor: (id) => (
            <span>
                <div className='flex'>
                    <img
                        className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsUyy9XD74WIQ_pOsLaC3x9DPiFGyM9a9jwkS3EzDTTQ&usqp=CAU&ec=48665701"
                        alt={id.image} />
                    <div className='ml-3'>
                        <div className=' text-black font-bold'>{id.name}</div>
                        <div>{id.email}</div>
                    </div>
                </div>
            </span>
        )
        // accessor: d => customCell(d.date, d.date)
    },
    {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => (
            <span className={'`badge` bg-slate-100 inline-block justify-center text-xs font-bold'} id={value === "Active" ? "active-user" : "inactive-user"}>
                <span className='rounder-dot pr-1'></span>
                {value}
            </span>
        ),
    },
    {
        Header: 'Role',
        accessor: 'role',
        Cell: ({ value }) => <>{value}</>
    },
    // {
    //     Header: "Delete",
    //     id: "delete",
    //     accessor: (str) => "delete",

    //     Cell: (tableProps: { row: { index: number; }; }) => (
    //         <span onClick={(data) => {
    //                 // ES6 Syntax use the rvalue if your data is an array.
    //                 const dataCopy = [...data];
    //                 // It should not matter what you name tableProps. It made the most sense to me.
    //                 dataCopy.splice(tableProps.row.index, 1);
    //                 setData(dataCopy);
    //             }}
    //         >
    //             Delete
    //         </span>
    //     )
    // }
];



