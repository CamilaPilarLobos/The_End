import axios from 'axios'
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from "react-router-dom";

const AlbumsApi =  ({setlistaAlbums, setLogin, setMe,listaAlbums,logOut, login})=> {
    const getData = ()=>{
        const URL = 'http://localhost:8090/api/albums'
        axios(URL, {headers : {token_user : localStorage.getItem("token")}}).then(
            response => {
                setlistaAlbums(response.data)
                setLogin(true)
                setMe(jwtDecode(localStorage.getItem("token")))
            }   
        ).catch(
            e=> {
                logOut()
            }
        )
    }

    useEffect(()=>{
        getData()
    }, [])

    return(
        <div className={styles.table_main} style={{borderCollapse: "collapse"} }>
            <table >
                <thead>
                    <tr>
                        <th className={styles.title} >
                            Titulo
                        </th>
                        <th className={styles.extra}>
                            Detalle
                        </th>
                        <th className={styles.extra}>
                            Modificar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listaAlbums.map((foro,index)=> (
                        <tr key={index} >
                            <td className={styles.title}>{album.title}</td>
                            <td className={styles.extra}> <Link to={`/albums/${foro._id}`}>Ver</Link></td>
                            <td className={styles.extra}> <Link to={`/albums/editar/${foro._id}`}>Editar</Link></td>
                        </tr>
                    ) )}
                </tbody>
            </table>
        </div>
    )
}

export default AlbumsApi;