import { disableBodyScroll, hideNavbar } from "../../features/gift/giftSlice"
import React, { Fragment, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployees, selectNewWinner } from "../../features/gift/giftAction"
import arreglo from '../../assets/arreglo.png'
import "./Slider.scss"

const TableEmployees = ({ socket }) => {

	const { employees } = useSelector(state => state.gift)
	const dispatch = useDispatch()


	useEffect(() => {
		dispatch(getEmployees())
		dispatch(hideNavbar(true))
		dispatch(disableBodyScroll())

		socket.on('start selector', (selector) => {
			dispatch(selectNewWinner(selector))
		})

		particlesJS('particles-js', {
			particles: {
				number: {
					value: 78,
					density: {
						enable: true,
						value_area: 631.3280775270874
					}
				},
				color: {
					value: "#fff"
				},
				shape: {
					type: "circle",
					stroke: {
						width: 0,
						color: "#000000"
					},
					polygon: {
						nb_sides: 5
					},
					image: {
						src: "img/github.svg",
						width: 100,
						height: 100
					}
				},
				opacity: {
					value: 0.5,
					random: true,
					anim: {
						enable: false,
						speed: 1,
						opacity_min: 0.1,
						sync: false
					}
				},
				size: {
					value: 5,
					random: true,
					anim: {
						enable: false,
						speed: 40,
						size_min: 0.1,
						sync: false
					}
				},
				line_linked: {
					enable: false,
					distance: 500,
					color: "#ffffff",
					opacity: 0.4,
					width: 2
				},
				move: {
					enable: true,
					speed: 1.5,
					direction: "bottom",
					random: false,
					straight: false,
					out_mode: "out",
					bounce: false,
					attract: {
						enable: false,
						rotateX: 600,
						rotateY: 1200
					}
				}
			},
			interactivity: {
				detect_on: "canvas",
				events: {
					onhover: {
						enable: false,
						mode: "bubble"
					},
					onclick: {
						enable: true,
						mode: "repulse"
					},
					resize: true
				},
				modes: {
					grab: {
						distance: 400,
						line_linked: {
							opacity: 0.5
						}
					},
					bubble: {
						distance: 400,
						size: 4,
						duration: 0.3,
						opacity: 1,
						speed: 3
					},
					repulse: {
						distance: 200,
						duration: 0.4
					},
					push: {
						particles_nb: 4
					},
					remove: {
						particles_nb: 2
					}
				}
			},
			retina_detect: true
		})		
		
	}, [socket, getEmployees])

	return (
		<Fragment>
			<div id="particles-js"></div>
			<div className="slider-wrapper" id="slider-wrapper">
				{
					employees.map((x, index) => (
						<div
							className="slider-item"
							style={{ transform: `translate(${index}00%, -${index}00%)` }}
							key={index}
							id={'_' + index}>
							<div 
								className={'slider-card'}
								id={`card_${index}`}
								data-employee={x.idr}
								data-id={x.id}
								style={{ backgroundColor: x.gift ? '#f4f0bb': '' }}
							>
								
								{/* <img className="image-top" src={ arreglo } alt="" /> */}
								<h2 className="name-employee mt-2">{x.name.toLowerCase()}</h2>
								<h2 className="name-department mt-2">{x.department.toUpperCase()}</h2>
								<img className="image-employee" src={`${x.idr}.jpg`} alt={x.idr} />
								<p>{index}</p>
							</div>
						</div>
					))
				}
			</div>
		</Fragment>
	)
}

export default TableEmployees
