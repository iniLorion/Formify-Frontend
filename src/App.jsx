import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateForm from './pages/CreateForm';
import DetailForm from './pages/DetailForm';
import SubmitForm from './pages/SubmitForm';
import Logout from './pages/Logout';


function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Home />} />
            <Route path="/create-form" element={<CreateForm />} />
            <Route path="/form/:id" element={<DetailForm />} />
            <Route path="/submit-form/:id" element={<SubmitForm />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;