import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import './table.css'

const Paginate = () => {
    const [page, setPage] = useState(1)

    return <PaginationControl
        page={page}
        // between={4}
        total={30}
        limit={10}
        changePage={(page) => {
            setPage(page);
            console.log(page)
        }}
        ellipsis={1}
    />
}

export default Paginate;