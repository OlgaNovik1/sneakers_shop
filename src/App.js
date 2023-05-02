import { useEffect, useState } from "react";
import Drawer from "./Drawer";
import Card from "./components/Card";
import Header from "./components/Header";


function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);


  useEffect(() => {
    fetch('https://644e444e4e86e9a4d8f4926f.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);

  const onAddToCart = (obj) => {
    setCartItems(prev => [...prev, obj]);
  };


  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="search"></img>
            <input placeholder="поиск..."></input>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {
            items.map((item) =>
              <Card
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={() => console.log('добавили закладки')}
                onPlus={(obj) => onAddToCart(obj)}
              />
            )}



          {/* <div className="card">
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
          <div className="card">
            <img width={133} height={112} src="/img/sneakers/2.jpg" alt="sneakers"></img>
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
          </div>  <div className="card">
            <img width={133} height={112} src="/img/sneakers/3.jpg" alt="sneakers"></img>
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
          </div>  <div className="card">
            <img width={133} height={112} src="/img/sneakers/4.jpg" alt="sneakers"></img>
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
          </div> */}


        </div>
      </div>
    </div>
  );
}

export default App;
