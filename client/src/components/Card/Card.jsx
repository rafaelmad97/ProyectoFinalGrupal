// import React from "react";
import styles from "./Card.module.css"
import { Link } from "react-router-dom"

export const Card = (props) => {

  return ( 
    <div className={styles.global}>
            <div className={styles.container}>
                <Link to = {`/detail/${props.id}`} >
                    <div className= {styles.card}>
                        <img src={props.urlImage} alt={props.name}/>
                    </div>
                    <div className={styles.containerInfo}>
                        <h2>{props.name}</h2>
                        <h4><b>precio:</b> {props.price}</h4>
                    </div>           
                </Link>
            </div> 
        </div>
  )
};
