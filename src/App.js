import { useEffect, useState } from "react";
import Drawer from "./Drawer";
import Card from "./components/Card";
import Header from "./components/Header";
import axios from "axios";


function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);


  useEffect(() => {
    axios.get('https://644e444e4e86e9a4d8f4926f.mockapi.io/items')
      .then((res) => setItems(res.data));

    axios.get('https://644e444e4e86e9a4d8f4926f.mockapi.io/cart')
      .then((res) => setCartItems(res.data));
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://644e444e4e86e9a4d8f4926f.mockapi.io/cart', obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://644e444e4e86e9a4d8f4926f.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item => item.id !== id)));
  }

  const onAddToFavorite = (obj) => {
    axios.post('https://644e444e4e86e9a4d8f4926f.mockapi.io/favorites', obj);
    setFavorites((prev) => [...prev, obj]);
  };

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  }


  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кросоовки"}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="search"></img>
            {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg" alt="clear"></img>}
            <input onChange={onChangeSearchValue} value={searchValue} placeholder="поиск..."></input>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {
            items
              .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
              .map((item, index) =>
                <Card
                  key={index}
                  title={item.title}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  onFavorite={(obj) => onAddToFavorite(obj)}
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
