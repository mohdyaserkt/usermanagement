
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {SignupSection} from './pages/Authentication/signupPage';
import { SignIn } from './pages/Authentication/signInPage';
import { AdminTab } from './pages/homePage';
import { AdminProtectedRoute } from './pages/Authentication/adminProtectedRoute';
import { ProtectedRoute } from './pages/Authentication/protectedRoute';
import { UserHome } from './pages/userHome';
function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/signup" element={<SignupSection />} />
        <Route path="/" element={<SignupSection />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/user" element={<ProtectedRoute><UserHome /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminProtectedRoute> <AdminTab /></AdminProtectedRoute>} />
       
      </Routes>
    </Router>
    
      </>
  )
}

export default App
