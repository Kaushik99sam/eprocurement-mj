// import NavBar from './components/NavBar';
import "../styles.css";
import { Route, Routes } from 'react-router-dom';
import ListOfRfp from './pages/ListOfRfp';
import Tenders from './pages/Tenders';
import Contact from './pages/Contact';
import About from './pages/About';
import Footer from './components/Footer';
import Suppliers from './pages/Suppliers';
import Login from './pages/Login';
import './App.css';
import NavBar2 from './components/NavBar';

function App() {
  return (
    <>
      <NavBar2 />
      <div className='container'>
        <Routes>
          <Route path='/' element={<ListOfRfp/>}/>
          <Route path='/suppliers/:id' element={<Suppliers/>}/>
          <Route path='/tenders' element={<Tenders/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;
