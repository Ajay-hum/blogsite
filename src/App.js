import './App.css';
import {Routes, BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './pages/Home';
import AddEditBlog from './pages/AddEditBlog';
import Blog from './pages/Blog';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Categories from './components/Categories';
import Contact from './pages/Contact';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from './components/Navbar';

function App() {
  return (
  <Router>
  <div className="App">
    <Navbar />
    <ToastContainer/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/addBlog" element={<AddEditBlog/>}/>
      <Route path="/editBlog/:id" element={<AddEditBlog/>}/>
      <Route path="/blog/:id" element={<Blog/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/categories" element={<Categories/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  </div>
  </Router>
  );
}

export default App;
