import { combineReducers, createSlice, current } from '@reduxjs/toolkit'
import { transition } from "../../hooks/transition"
import { getEmployees, postEmployees, updateArrayEmployeesXLSX, getEmployeesAdmin, selectNewWinner } from "./giftAction"

const initialState = {
	employees: [],
	employeesXLSX: [],
	isButtonDisabled: false,
	isNavbarHidden: false,
	lengthArrayEmployees: 0
}

export const giftSlice = createSlice({
	name: 'gift',
	initialState,
	reducers: {
		hideNavbar: (state, { payload }) => {
			state.isNavbarHidden = payload
		},
		disableBodyScroll: () => {
			document.getElementsByTagName('body')[0].style.overflow = 'hidden'
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getEmployees.fulfilled, (state, { payload }) => {
				const join_array = []
				for (let i = 0; i <= 0; i++) {
					for (let j = 0; j < payload.length; j++) {
						const element = payload[j]
						join_array.push(element)
					}
				}
				state.employees = join_array
			})
			.addCase(getEmployeesAdmin.fulfilled, (state, { payload }) => {
				state.employees = payload
			})
			.addCase(updateArrayEmployeesXLSX.fulfilled, (state, { payload }) => {
				payload.forEach(({ name, department }) => {
					if (name === null || department === null) {
						state.isButtonDisabled = true
					}
				});
				state.employeesXLSX = payload
			})
			.addCase(postEmployees.fulfilled, (state) => {
				state.employeesXLSX = []
			})
			.addCase(selectNewWinner.fulfilled, (state, { payload }) => {
				// var employees = current(state.employees)				
				// state.employees = employees.filter(x => +x.idr !== +payload)
				// console.log(state.employees)
			})
	}
})

export const { hideNavbar, disableBodyScroll, eliminateEmployee } = giftSlice.actions

export default giftSlice.reducer