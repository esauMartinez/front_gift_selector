import React, { Fragment } from 'react'
import TableEmployees from "../../components/Employees/TableEmployees"

const Slider = ({ socket }) => {
    return (
        <Fragment>
            <TableEmployees socket={ socket }></TableEmployees>
        </Fragment>
    )
}

export default Slider