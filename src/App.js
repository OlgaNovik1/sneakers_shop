import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Drawer from "./Drawer";
import Card from "./components/Card";
import Header from "./components/Header";
import axios from "axios";
import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";


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

    axios.get('https://644e444e4e86e9a4d8f4926f.mockapi.io/favorites')
      .then((res) => setFavorites(res.data));

  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://644e444e4e86e9a4d8f4926f.mockapi.io/cart', obj)
      .then(res => setCartItems((prev) => [...prev, res.data]))
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://644e444e4e86e9a4d8f4926f.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item => item.id !== id)));
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(fav => fav.id === obj.id)) {
        axios.delete(`https://644e444e4e86e9a4d8f4926f.mockapi.io/favorites/${obj.id}`);
      } else {
        const { data } = await axios.post('https://644e444e4e86e9a4d8f4926f.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты!')
    }
  };

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  }


  return (
    <div className="wrapper clear">
      {cartOpened &&
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}


      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route path="/" element=
          {<Home
            items={items}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchValue={onChangeSearchValue}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
          />} ></Route>

        <Route path="/favorites" element=
          {<Favorites
            items={favorites}
            onAddToFavorite={onAddToFavorite}
          />} ></Route>

      </Routes>

    </div >
  );
}

export default App;
