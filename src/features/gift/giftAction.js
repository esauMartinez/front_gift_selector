import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { onSnapshot } from "firebase/firestore"
import { collection, getDocs, query, where, addDoc, getDoc, updateDoc, doc, setDoc } from "firebase/firestore/lite"
import Swal from "sweetalert2"
import { db } from "../../context/firebase"
import { transition } from "../../hooks/transition"

export const getEmployees = createAsyncThunk(
    'gift/getEmployees',
    async () => {
        try {
            const { data } = await axios.get('/api/employees')
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const getEmployeesAdmin = createAsyncThunk(
    'gift/getEmployeesAdmin',
    async () => {
        try {
            const { data } = await axios.get('/api/employees')
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const updateArrayEmployeesXLSX = createAsyncThunk(
    'gift/updateArrayEmployeesXLSX',
    async (employees) => {

        for (let i = 0; i < employees.length; i++) {
            const employee = employees[i];

            employee['idr'] = employee['idr'] === undefined ? null : employee['idr']
            employee['name'] = employee['nombre_a'] === undefined ? null : employee['nombre_a']
            employee['dep'] = employee['dep'] === undefined ? null : employee['dep']
            employee['department'] = employee['nombre_b'] === undefined ? null : employee['nombre_b']
            employee['gift'] = false
        }

        return employees
    }
)


export const postEmployees = createAsyncThunk(
    'gift/postEmployees',
    async (payload, { dispatch }) => {
        try {
            await axios.post('/api/employee', payload)

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Empleados guardados correctamente',
                showConfirmButton: false,
                timer: 1500
            })

            dispatch(getEmployees())
            return true
        } catch (error) {
            console.log(error)
        }
    }
)


export const selectNewWinner = createAsyncThunk(
    'gift/selectedWinner',
    async (selector) => {
        try {

            const container = document.getElementById('slider-wrapper')
            container.style.transform = `translate3d(-${selector}00%, 0px, 0px)`
            container.style.transitionDuration = `15s`

            const { id, idr } = await transition(container, selector)
            
            const { data } = await axios.put(`/api/employee/${id}`)
            console.log(data)

            return idr
        } catch (error) {
            console.log(error)
        }
    }
)
