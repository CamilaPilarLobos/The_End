import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const NewAlbum = ({me, listaAlbums, setlistAlbums,logOut,login}) => {
    const navigate = useNavigate()
    const [data,setData] = useState({
        title : "",
        artist : "",
        yearOfRelease : "",
        genero : "",
        amount : ""
    })
    const [errors,setErrors] = useState({})

    const sendData = (e) => {
        e.preventDefault()
        const URL = 'http://localhost:8090/api/albumes/new'
        axios.post(URL,data, {headers : {token_user : localStorage.getItem("token")}}).then(
            response => {
                setlistAlbums([...listaAlbums, response.data])
                navigate('/album')
            }

        ).catch(
            e => {
                if(e.status == 406){
                    logOut()
                }
                setErrors(e.response.data.errors)
            }
        )
    }

    const updateState = (e) =>{
        setData({...data,[e.target.name]: e.target.value})
    }

    useEffect(()=>{
        if(!login){
            logOut()
        }
    },[login])
    
    return(
        <>
            <form onSubmit={ e=> sendData(e)}>
                <div>
                    <label htmlFor="title">Titulo: </label>
                    <input type="text" name='title' value={data.title} onChange={e=> updateState(e)} />
                    {errors?.title && <p style={{color: "red"}}>{errors.title}</p>}
                </div>
                <div>
                    <label htmlFor="artist">Artista: </label>
                    <input type="text" name='artist' value={data.artist} onChange={e=> updateState(e)} />
                    {errors?.artist && <p style={{color: "red"}}>{errors.artist}</p>}
                </div>
                <div>
                    <label htmlFor="yearOfRelease">año en que salio el album: </label>
                    <input type="date" name='yearOfRelease' value={data.yearOfRelease} onChange={e=> updateState(e)} />
                    {errors?.yearOfRelease && <p style={{color: "red"}}>{errors.yearOfRelease}</p>}
                </div>
                <div>
                    <label htmlFor="genero">Genero: </label>
                    <input type="text" name='genero' value={data.genero} onChange={e=> updateState(e)} />
                    {errors?.genero && <p style={{color: "red"}}>{errors.genero}</p>}
                </div>
                <div>
                    <label htmlFor="amount">cantidad de canciones: </label>
                    <input type="number" name='amount' value={data.amount} onChange={e=> updateState(e)} />
                    {errors?.amount && <p style={{color: "red"}}>{errors.amount}</p>}
                </div>
                <button>Agregar</button>
            </form>
        </>
    )}

    export default NewAlbum;