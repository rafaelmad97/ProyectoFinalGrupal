// import React from "react";
import { Card } from "../Card/Card";
import styles from "./CardsContainer.module.css"

export const CardsContainer = ({allProducts}) => {
  return (
    
    <div className={styles.container}>
      {allProducts.map(prod => {
        return <Card 
                id = {prod.id}
                name = {prod.name}
                description = {prod.description}
                urlImage = {prod.urlImage}
                price = {prod.price}
                stock = {prod.stock}
          />
      })}
    </div>
  )
};
