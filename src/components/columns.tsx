import { Column } from 'react-table';

// defining the User type which we need in the table
export type User = {
    id: number;
    name: string;
    email: string;
    image: string;
    status: string;
    role: string;
};

// defining the column structure needed for the table
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
                    {/* Since the api i pulled the data from did not have an image property inside setting the image to a static user image */}
                    {/* in future if the api call and column structure are changed accordingly we can access the image */}
                    {/* by replacing the src with what i placed in the alt attribute which current;y returns an empty string */}
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
    },
    {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => (
            // stating logic for applying different styles on different values
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
];



