import React from "react";

const Card = () => {
    return (
        <div className="card">
            <div className="favorite">
                <img src="/img/heart-unliked.svg" alt="unliked"></img>
            </div>
            <img width={133} height={112} src="/img/sneakers/1.jpg" alt="sneakers"></img>
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>12 999 руб.</b>
                </div>
                <button className="button">
                    <img width={15} height={11} src="/img/plus.svg" alt="plus"></img>
                </button>
            </div>
        </div>
    );
};

export default Card;