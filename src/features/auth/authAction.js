import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authUser = createAsyncThunk(
    'auth/auth',
    async (payload) => {
        try {
            const { data } = await axios.post('/api/login', payload)
            if (data === '') {
                return null
            } else {
                const user = {
                    permissions: ['ADMIN', 'SELECTOR'],
                    roles: ['ADMIN']                
                }
                return { ...user }
            }
        } catch(error) {
            console.log(error)
        }


        // if (username === 'admin@tsmconnect.com' && password === 'admin1234') {
        //     const user = {
        //         permissions: ['ADMIN', 'SELECTOR'],
        //         roles: ['ADMIN']                
        //     }
        //     return { ...user }
        // } else if (username === 'selector@tsmconnect.com' && password === 'selector123') {
        //     const user  = {
        //         permissions: ['SELECTOR'],
        //         roles: []
        //     }

        //     return { ...user }
        // } else {
        //     return false
        // }
    }
)



export const logout = createAsyncThunk(
    'auth/logout',
    async (navigate) => {
        navigate('/login')
    }
)