import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import FormFile from "../../components/admin/FormFile"
import { getEmployeesAdmin, postEmployees } from "../../features/gift/giftAction"
import "./Admin.css"

const Admin = () => {

    const { employees, employeesXLSX, isButtonDisabled } = useSelector(state => state.gift)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getEmployeesAdmin())        
	}, [getEmployeesAdmin])


    return (
        <div className="container container-admin">
            <div className="row">
                <div className="col-lg-6">
                    <div className="card card-file mb-3">
                        <div className="card-body">
                            <FormFile />                            
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card mb-3">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>IDR</th>
                                        <th>Nombre</th>
                                        <th>Departamento</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        employeesXLSX.length === 0 ? 
                                            employees.map((x, index) => (
                                                <tr
                                                    key={ index } 
                                                    style={{ 
                                                        'backgroundColor': 
                                                                    x.name === null ||
                                                                    x.idr === null || 
                                                                    x.department === null
                                                                    ? 'tomato' : '' }}>
                                                    <td>{ x.idr }</td>
                                                    <td>{ x.name }</td>
                                                    <td>{ x.department }</td>
                                                </tr>
                                            )) : employeesXLSX.map((x, index) => (
                                                <tr 
                                                    className="table-secondary"
                                                    key={ index } 
                                                    style={{ 
                                                        'backgroundColor': 
                                                                    x.name === null ||
                                                                    x.idr === null || 
                                                                    x.department === null
                                                                    ? 'tomato' : '' }}>
                                                    <td>{ x.idr }</td>
                                                    <td>{ x.name }</td>
                                                    <td>{ x.department }</td>
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                            
                            {
                                employeesXLSX.length !== 0 ? (
                                    <div className="d-flex justify-content-end">
                                        <button 
                                            className="btn btn-primary" 
                                            disabled={ isButtonDisabled } 
                                            onClick={ () => dispatch( postEmployees(employeesXLSX) ) }>
                                                Guardar
                                        </button>
                                    </div>
                                ) : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin