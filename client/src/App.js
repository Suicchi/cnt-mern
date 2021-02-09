//#region imports
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Import local files
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
//#endregion

//#region component App
function App() {
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
