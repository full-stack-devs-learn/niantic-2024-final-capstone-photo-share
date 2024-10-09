
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Header from './components/shared/header/Header'
import Login from './components/authentication/login/Login'
import Register from './components/authentication/register/Register'
import ProfilePage from './components/profile/ProfilePage'
import AlbumDetails from './components/album/AlbumDetails/AlbumDetails'

export default function App() {
    return (
        <Router>
        <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile/:profileId" element={<ProfilePage/>} />
                <Route path="/profile/:profileId/albums" element={<ProfilePage />} />
                <Route path="/albums/:albumId" element={<AlbumDetails />} />
            </Routes>
        </Router>
    );
}