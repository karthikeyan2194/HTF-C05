import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Infrastructure from './components/Infrastructure';
import Construction from './components/Construction';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
	return (
		<BrowserRouter>
			<div>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/services/infrastructure" element={<Infrastructure />} />
					<Route path="/services/construction" element={<Construction />} />
					<Route path="/about" element={<About />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;

