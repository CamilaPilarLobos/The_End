import { useState } from 'react'
import './App.css'
import NotFound from "./components/NotFound"
import Header from "./components/Header.jsx"
import Login from "./views/Login"
import Register from './views/Register'
import AlbumsApi from './views/AlbumsApi'
import NewAlbum from "./views/NewAlbum"
import UpdateAlbum from "./views/UpdateAlbums"
import OneAlbums from './views/OneAlbums'
import {  Routes, Route, useNavigate  } from 'react-router-dom';


function App() {
  const [listaAlbums,setListaAlbums] = useState([]);
  const [login, setLogin]= useState ([]);
  const [me, setMe] = useState({});
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    setLogin(false);
    navigate("/login");
  };

  return (
    <>
      <Header login={login} logOut={logOut}/>
      <Routes>
        <Route path="/login" element={<Login setLogin={setLogin} />} />
        <Route path="/register" element={<Register setLogin={setLogin} />} />
        <Route path="/albumes" element={ < AlbumsApi setListaAlbums={setListaAlbums} setLogin={setLogin} setMe={setMe} listaAlbums={listaAlbums} logOut={logOut}/> }/>
        <Route path="/albumes/new" element={ < NewAlbum me={me} setListaAlbums={setListaAlbums}  listaAlbums={listaAlbums} logOut={logOut} login={login}/> }/>
        <Route path="/albumes/update/:id" element={ <UpdateAlbum setListaAlbums={setListaAlbums}  listaAlbums={listaAlbums} logOut={logOut} setLogin={setLogin}/>} />
        <Route path="/albumes/:id" element={ <OneAlbums setListaAlbums={setListaAlbums} setLogin={setLogin} logOut={logOut} listaAlbums={listaAlbums} />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
