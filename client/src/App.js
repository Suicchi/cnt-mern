//#region imports
import React, { useEffect } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Redux

import { useDispatch } from 'react-redux'

// Import local files
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'

// Actions
import { getUser } from './Actions/user'

//#endregion

//#region component App
function App() {
	const dispatch = useDispatch()
	useEffect(() => {
		// Dispatch getUser to api
		dispatch(getUser())
	}, [dispatch])
	return (
		<BrowserRouter>
			<Navbar />
			<div>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
				</Switch>
			</div>
		</BrowserRouter>
	)
}

export default App
//#endregion
