import { NavLink } from "react-router-dom"
import styles from "./Landing.module.css"

const Landing = () => {

    return (
        <div className= {styles.page}>
            <div className= {styles.container}>
                <h1 className= {styles.title}>Welcome to ProGamer Market </h1>
                <NavLink to="/home" className={styles.link}>Home</NavLink>
            </div>
        </div>
    )
}

export default Landing