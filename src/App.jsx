import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from "./pages/Admin/Admin"
import Slider from "./pages/Employees/Slider"
import Login from "./pages/Login/Login"
import io from 'socket.io-client'
import ButtonSelectorWinner from "./components/Button/ButtonSelectorWinner"
import { useSelector } from "react-redux"
import Navbar from "./layout/Navbar"
import ProtectedRoute from "./router/ProtectedRoute"


const App = () => {
    const socket = io('/gift-raffle')
    const { isUserAuthenticated, permissions, roles } = useSelector(state => state.auth)

    socket.on('connect', () => {
        socket.emit('join to room', 'gift selector')
    })

    return (
        <BrowserRouter>
            {
                isUserAuthenticated ? <Navbar /> : ''
            }

            <Routes>
                <Route path="/" element={<Slider socket={socket} />} />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute isAllowed={!!isUserAuthenticated && permissions.includes('SELECTOR')} redirectTo={'/login'} />}>
                    <Route path="/selector" element={<ButtonSelectorWinner socket={socket} />} />
                </Route>
                <Route path="/admin" element={
                    <ProtectedRoute
                        isAllowed={!!isUserAuthenticated && roles.includes('ADMIN')}
                        redirectTo={'/login'}
                    >
                        <Admin />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default App