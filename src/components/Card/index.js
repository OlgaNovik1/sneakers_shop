import React, { useEffect, useState } from "react";
import styles from "./Card.module.scss";



const Card = ({ title, imageUrl, price, onFavorite, onPlus }) => {
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        console.log('изменилась isAdded')
    }, [isAdded]);

    const onClickPlus = () => {
        onPlus({ title, imageUrl, price });
        setIsAdded(!isAdded);
    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onFavorite}>
                <img src="/img/heart-unliked.svg" alt="unliked"></img>
            </div>
            <img width={133} height={112} src={imageUrl} alt="sneakers"></img>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <img
                    className={styles.plus}
                    onClick={onClickPlus}
                    src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
                    alt="plus">
                </img>
            </div>
        </div>
    );
};

export default Card;