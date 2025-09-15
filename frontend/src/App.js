import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './Navbar';
import Home from './Home';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddUser from './Users/AddUser';
import EditUser from './Users/EditUser';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/edituser/:id" element={<EditUser/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
