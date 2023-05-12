import React, { Fragment, useState, useContext } from 'react';
import axios from "axios";
import { useCart } from '../hooks/useCart';
import Info from '../Info';
import styles from './Drawer.module.scss';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
    const { cartItems, setCartItems, totalPrice } = useCart();
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://644e444e4e86e9a4d8f4926f.mockapi.io/orders', {
                items: cartItems,
            });
            setOrderId(data.id)
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://644e444e4e86e9a4d8f4926f.mockapi.io/cart/' + item.id);
                await delay(1000);
            }

        } catch (error) {
            alert('Не удалось сформировать заказ!')
        }
        setIsLoading(false);

    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30 ">
                    Корзина
                    <img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="remove"></img>
                </h2>

                {items.length > 0
                    ?
                    <Fragment>
                        <div className="items flex">
                            {items.map((obj) => (
                                <div key={obj.id} className="cardItem d-flex align-center mb-20">
                                    <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg"></div>
                                    <div className="mr-20 flex">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="remove"></img>
                                </div>
                            ))}
                        </div>

                        <div className="cartTotalBlock">
                            <ul >
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{totalPrice} руб. </b>
                                </li>
                                <li >
                                    <span>Налог 5%: </span>
                                    <div></div>
                                    <b>{totalPrice / 100 * 5} руб. </b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                                Оформить заказ <img src="/img/arrow.svg" alt="arrow"></img>
                            </button>
                        </div>
                    </Fragment>
                    : (
                        <Info
                            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                            image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
                            description={isOrderComplete ?
                                `Ваш заказ #${orderId} скоро будет передан курьерской доставке` :
                                "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                        />
                    )}
            </div>
        </div>
    );
};

export default Drawer;