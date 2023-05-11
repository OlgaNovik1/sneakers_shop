import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Drawer from "./Drawer";
import Card from "./components/Card";
import Header from "./components/Header";
import axios from "axios";
import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";
import AppContext from './context';




function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const cartResponse = await axios.get('https://644e444e4e86e9a4d8f4926f.mockapi.io/cart');
      const favoritesResponse = await axios.get('https://644e444e4e86e9a4d8f4926f.mockapi.io/favorites');
      const itemsResponse = await axios.get('https://644e444e4e86e9a4d8f4926f.mockapi.io/items');

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    console.log(obj);
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://644e444e4e86e9a4d8f4926f.mockapi.io/cart/${obj.id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
    } else {
      axios.post('https://644e444e4e86e9a4d8f4926f.mockapi.io/cart', obj)
        .then(res => setCartItems((prev) => [...prev, res.data]));
    }



  };

  const onRemoveItem = (id) => {
    axios.delete(`https://644e444e4e86e9a4d8f4926f.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item => item.id !== id)));
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(fav => Number(fav.id) === Number(obj.id))) {
        axios.delete(`https://644e444e4e86e9a4d8f4926f.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
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

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, setCartOpened, setCartItems }}>
      <div className="wrapper clear">
        {cartOpened &&
          <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}


        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route path="/" element=
            {<Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchValue={onChangeSearchValue}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />} ></Route>

          <Route path="/favorites" element=
            {<Favorites
              onAddToFavorite={onAddToFavorite}
            />} ></Route>

        </Routes>

      </div >
    </AppContext.Provider>
  );
}

export default App;
