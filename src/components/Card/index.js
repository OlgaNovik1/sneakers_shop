import React, { Fragment, useContext, useEffect, useState } from "react";
import ContentLoader from "react-content-loader"
import styles from "./Card.module.scss";
import AppContext from "../../context";



const Card = ({
    id,
    title,
    imageUrl,
    price,
    onFavorite,
    onPlus,
    favorited = false,
    loading = false
}) => {

    const { isItemAdded } = useContext(AppContext);
    const [isFavorite, setIsFavorite] = useState(favorited);


    const onClickPlus = () => {
        onPlus({ id, title, imageUrl, price });
    }

    const onClickFavorite = () => {
        onFavorite({ id, title, imageUrl, price });
        setIsFavorite(!isFavorite);
    }

    return (
        <div className={styles.card}>
            {loading
                ?
                <ContentLoader
                    speed={0}
                    width={161}
                    height={210}
                    viewBox="0 0 150 210"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="96" y="106" rx="0" ry="0" width="0" height="2" />
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
                    <rect x="0" y="103" rx="5" ry="5" width="150" height="15" />
                    <rect x="1" y="129" rx="5" ry="5" width="93" height="15" />
                    <rect x="2" y="166" rx="8" ry="8" width="80" height="24" />
                    <rect x="119" y="159" rx="10" ry="10" width="32" height="32" />
                </ContentLoader>
                :
                <Fragment>
                    <div className={styles.favorite}>
                        <img src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} onClick={onClickFavorite} alt="unliked"></img>
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
                            src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
                            alt="plus">
                        </img>
                    </div>
                </Fragment>
            }
        </div>
    );
};

export default Card;