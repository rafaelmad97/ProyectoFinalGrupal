import { NavLink } from "react-router-dom"
import styles from "./NavBar.module.css"

export const NavBar = () => {
  return (
    <div className={styles.container}>
            <div className= {styles.bloque}>
                <ul>
                    <li>
                        <NavLink to = "/">
                            <p><b>Go Back</b></p> 
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to = "/home">
                        <p><b>Home</b></p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to = "/login">
                            <p><b>Login</b></p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to = "/form">
                            <p><b>Form</b></p>
                        </NavLink>
                    </li>
                </ul>

            </div>

        </div>
  )
};
