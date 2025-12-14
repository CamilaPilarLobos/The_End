import { Link } from "react-router-dom";
// import styles from './../css/Header.module.css'

const Header = ({login,logOut}) => {

    return(
        <>
            <header className={styles.header} >
                <h1>albums</h1>
                <div className={styles.options}>
                {login ? (
                    <>
                        <div>
                            <Link to={"/albums"}>Listado Completo</Link>{" "}
                        </div>
                        <div>
                            <Link to={"/albums/new"}>Agregar albums </Link>
                        </div>                    
                        <button onClick={logOut}>Log out</button>
                    </>
                ) : (
                    <>
                        <div>
                            <Link to={"/login"}>Login</Link>
                        </div>
                        <div>
                            <Link to={"/register"}>Registro </Link>
                        </div>
                        
                    </>
                )}
                </div>
            </header>
        </>
    )

}


export default Header;