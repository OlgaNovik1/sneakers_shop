import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import axios from "axios";
import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";
import AppContext from './context';
import Orders from "./components/pages/Orders";


function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://644e444e4e86e9a4d8f4926f.mockapi.io/cart'),
          axios.get('https://644e444e4e86e9a4d8f4926f.mockapi.io/favorites'),
          axios.get('https://644e444e4e86e9a4d8f4926f.mockapi.io/items'),
        ]);

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      }
      catch (error) {
        alert('Ошибка при запросе данных!');
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
    try {
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://644e444e4e86e9a4d8f4926f.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://644e444e4e86e9a4d8f4926f.mockapi.io/cart', obj);
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id,
            };
          }
          return item;
        }));
      }
    } catch (error) {
      alert('Ошибка при добавлении заказа в корзину');
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://644e444e4e86e9a4d8f4926f.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item => Number(item.id) !== Number(id))));
    } catch (error) {
      alert('Ошибка при удалении из корзины!');
    }
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
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, setCartOpened, setCartItems, onAddToFavorite, onAddToCart }}>
      <div className="wrapper clear">
        <div>
          <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />
        </div>

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

          <Route path="/orders" element=
            {<Orders
            />} ></Route>
        </Routes>

      </div >
    </AppContext.Provider>
  );
}

export default App;
