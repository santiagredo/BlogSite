import './HeaderCreator.css';
import { Menu } from './Menu';
import { Routes, Route } from 'react-router-dom';


export function Header_Creator () {
  
    return (
        <header className='header_container'>
            <Menu/>
            <Routes>
              <Route path='/'/>
              <Route path='/blog'/>
            </Routes>
        </header>
    );
};