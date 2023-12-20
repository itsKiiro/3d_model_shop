import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Layout/Navbar';
import ArticleOverview from './pages/ArticleOverview';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SuccessPage from './pages/SuccessPage';

function App() {


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/article/:id' element={<ArticleOverview />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/success' element={<SuccessPage />} />
      </Routes>
    </Router>
  )
}

export default App
