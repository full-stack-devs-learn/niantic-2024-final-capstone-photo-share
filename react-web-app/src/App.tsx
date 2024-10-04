
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Header from './components/shared/header/Header'
import Login from './components/authentication/login/Login'
import Register from './components/authentication/register/Register'
import PostCreationModal from './components/post-creation-modal/PostCreationModal'

export default function App() {
    return (
        <Router>
        <Header />

        <main className="container mt-4">
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            </Routes>
        </main>
        <PostCreationModal></PostCreationModal>
        </Router>
    );
}