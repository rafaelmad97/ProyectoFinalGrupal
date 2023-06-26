import { NavLink } from "react-router-dom"
import styles from "./Landing.module.css"


const Landing = () => {

    return (
        <div className= {styles.page}>
            <div className= {styles.container}>
                <NavLink to="/home" className={styles.link}>Go To The Store</NavLink>
            </div>
        </div>
    )
}

export default Landing