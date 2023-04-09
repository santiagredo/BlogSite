import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { Auth_provider } from './auth';
import { Header } from './Header/Header';
import { Home_Page } from './HomePage';
import { Blog_page } from './Blog/BlogPage';
import { Blog_post } from './Blog/BlogPost';
import { Blog_creator } from './Blog/BlogCreator';
import { Search_results } from './Header/SearchBar';
import { Search_provider } from './Header/SearchContext';
import { Profile_page } from './Profile/ProfilePage';
import { Login_modal_provider, Logout_modal_provider, Signup_modal_provider } from './Session/ModalContext';

interface Props {
  children: React.ReactNode;
};

function App_providers ({ children }: Props) {
  return (
    <Login_modal_provider>
    <Logout_modal_provider>
    <Signup_modal_provider>
    <Auth_provider>
    <Search_provider>

      {children}

    </Search_provider>
    </Auth_provider>
    </Signup_modal_provider>
    </Logout_modal_provider>
    </Login_modal_provider>
  );
};


function App() {

  return (
    <React.Fragment>
      <HashRouter>
        <App_providers>
          <Header/>
          
            <Routes>
              <Route path='/home' element={<Home_Page/>}/>
              <Route path='/blog' element={<Blog_page/>}/>
              <Route path='/post/:slug' element={<Blog_post/>}/>
              <Route path='/profile' element={<Profile_page/>}/>
              <Route path='/search/' element={<Home_Page/>}/>
              <Route path='/search/:slug' element={<Search_results/>}/>
              <Route path='/create' element={<Blog_creator/>}/>
            </Routes>

        </App_providers>
      </HashRouter>
    </React.Fragment>
  )
};

export default App;



//Done  1.  Arreglar modal de login y logout, tienen que ser un pop up con botón para cancelar
//Done  1.01 Arreglar los modales para que no cambien las rutas al abrirlos 
//Done  1.1 Crear el modal de usuario
//Done  1.2 Crear el modal para crear posts
//Done  2.  Arreglar home, muestra todos los blogs y su contenido
//Done  3.  Arreglar blog, muestra solo los nombres de los blogs disponibles
//Done  4.  Agregar la opcion de eliminar perfil propio
//Done  5.  Agregar la opcion para crear usuarios como admin
//Done  5.1 Agregar la opcion para editar usuarios
//Done  6.  Agregar la opción para ver todos los usuarios, como admin y eliminarlos
//Done  6.1. Arreglar el boton de enter en la barra de busqueda
//Done  7.  Agregar paginación
//Done  8.  Pasar los posts por defecto a ingles, y que sean mas detallados
//Done  9.  Arreglar el redireccionamiento de profile si el user no esta logged in
//Done  9.1 Agregar confirmación antes de borrar un post
//Done  9.2 Arreglar el modal para iniciar sesion, no se cierra automaticamente al hacer click en otra pantalla
//Done  9.3 Agregar la opcion de editar blogs para el autor
//Done  10. Darle estilos
//Done  10.1  Darle estilo a los botones
//Done  11. Hacer que el dropdown menu se cierre al oprimir fuera de este
//Done  12. Hacer que el respectivo boton de paginacion se muestre diferente al estar disabled
//  13. Hacer una página para 404
//  14. Arreglar la creación de usuarios en admin panel, no se boran los camppos al crear usuario
//  15. Es necesario agregar IDs a los posts y los usuarios, para que pueden modificarse sin errores
//  16. Arreglar search, al hacer búsqueda se muestra todo el contenido del post