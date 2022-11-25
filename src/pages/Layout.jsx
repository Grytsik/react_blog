import {NavLink ,Link, Outlet } from "react-router-dom"

export default function Layout() {
	return (
		<div>
			<header>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/posts'>Blog</NavLink>
				<NavLink to='/about'>About</NavLink>
			</header>

			<Outlet/>
		</div>
	)
}