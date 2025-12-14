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
        const URL = `http://localhost:8090/api/albumes/${id}`
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
        const URL = `http://localhost:8090/api/albumes/destroy/${id}`
        axios.delete(URL, {headers: {token_user : localStorage.getItem("token")}}).then(
            response => {
                setlistAlbums(listaAlbums.filter( album => album._id != id))
                setLogin(true)
                navigate('/albumes')
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
                <p className={styles.titles}>Album creado por:</p>
                <p>{albumsData.title}</p>

                <p className={styles.titles}>Artista:</p>
                <p>{albumsData.artist}</p>

                <p className={styles.titles}>Año de lanzamiento:</p>
                <p>{albumsData.yearOfRelease}</p>

                <p className={styles.titles}>genero</p>
                <p>{albumsData.genero}</p>

                <p className={styles.titles}>cantidad de canciones:</p>
                <p>{albumsData.amount}</p>
            </div>
            <button className={styles.delete} onClick={deleteAlbum}>Eliminar</button>
        </>
    )
}

export default OneAlbums;