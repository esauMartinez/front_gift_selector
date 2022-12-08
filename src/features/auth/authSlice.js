import { createSlice } from "@reduxjs/toolkit"
import { authUser, logout } from "./authAction"

const initialState = {
    isUserAuthenticated: false,
    permissions: [],
    roles: [],
    errorUser: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(authUser.fulfilled, (state, { payload }) => {
                if (payload) {
                    state.isUserAuthenticated = true
                    state.permissions = payload.permissions
                    state.roles = payload.roles
                } else {
                    state.errorUser = true
                }
            })
            .addCase(logout.fulfilled, (state) => {
                state.isUserAuthenticated = false
                state.permissions = []
                state.roles = []
            })
    }
})


export default authSlice.reducer
