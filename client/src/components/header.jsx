import { Link } from "react-router-dom";
import styles from '../css/Header.module.css'

const Header = ({login,logOut}) => {

    return(
        <>
            <header className={styles.header} >
                <h1>albums</h1>
                <div className={styles.options}>
                {login ? (
                    <>
                        <div>
                            <Link to={"/albumes"}>Listado Completo</Link>{" "}
                        </div>
                        <div>
                            <Link to={"/albumes/new"}>Agregar albums </Link>
                        </div>                    
                        <button onClick={logOut}>Log out</button>
                    </>
                ) : (
                    <>
                        <div>
                            <Link to={"/login"}>Login</Link>
                        </div>
                        <div>
                            <Link to={"/register"}>Registrarte </Link>
                        </div>
                        
                    </>
                )}
                </div>
            </header>
        </>
    )

}


export default Header;