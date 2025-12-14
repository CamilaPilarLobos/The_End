import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import styles from './../css/OneForo.module.css'


const OneAlbums = ({setlistAlbums, setLogin, logOut,listaAlbums, me}) => {
    const navigate = useNavigate()
    const {id} = useParams();
    const [albumsData, setAlbumsData] = useState({
        title : "",
        description : "",
        category : "",
        author : {}
    })
    const [error,setErrors] = useState('')


    const getData = ()=> {
        const URL = `http://localhost:8090/api/albums/${id}`
        axios(URL, {headers: {token_user : localStorage.getItem("token")}}).then(
            response => {
                setAlbumsData(response.data)
                setLogin(true)
            }
        ).catch(
            e => {
                setErrors(e)
                if(e.status == 406){
                    logOut()
                }
            }
        )
    }

    useEffect(()=>{
        getData()
    },[])

    const deleteAlbum = () => {
        const URL = `http://localhost:8090/api/albums/destroy/${id}`
        axios.delete(URL, {headers: {token_user : localStorage.getItem("token")}}).then(
            response => {
                setlistAlbums(listaAlbums.filter( album => album._id != id))
                setLogin(true)
                navigate('/albums')
            }
        ).catch(
            e => {
                if(e.status == 406) {
                    logOut()
                }
            }
        )
    }

    return(
        <>
            <h2>{albumsData.title}</h2>
            <br />
            <div className={styles.card}>
                <p className={styles.titles}>Foro creado por:</p>
                <p>{albumsData.author.firstName} {albumsData.author.lastName}</p>
                <p className={styles.titles}>Email:</p>
                <p>{albumsData.author.email}</p>
                <p className={styles.titles}>Categoria / tema</p>
                <p>{albumsData.category}</p>
                <p className={styles.titles}>Descripcion</p>
                <p>{albumsData.description}</p>
            </div>
            <button className={styles.delete} onClick={deleteForo}>Eliminar</button>
        </>
    )
}

export default OneAlbums;