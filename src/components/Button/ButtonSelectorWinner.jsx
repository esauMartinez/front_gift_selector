import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getEmployees, getEmployeesAdmin } from "../../features/gift/giftAction"
import "./ButtonSelector.scss"

const ButtonSelectorWinner = ({ socket }) => {

    const { employees } = useSelector(state => state.gift)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getEmployees())
    }, [employees])
    
    const selectNewWinner = () => {
        socket.emit('start selector', employees)
    }

    return (
        <div className="div-selector">
            <button 
                className="btn-selector" 
                type="button"
                onClick={ () => selectNewWinner() }>
                Iniciar
            </button>
        </div>
    )
}

export default ButtonSelectorWinner