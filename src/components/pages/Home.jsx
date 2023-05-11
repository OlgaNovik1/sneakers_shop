import React, { useContext } from 'react'
import Card from '../Card';
import AppContext from '../../context';

function Home({
    items,
    searchValue,
    setSearchValue,
    onChangeSearchValue,
    onAddToFavorite,
    onAddToCart,
    isLoading
}

) {


    const renderItems = () => {
        const filteredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()),
        );

        return (isLoading ? [...Array(8)] : filteredItems)
            .map((item, index) =>
                <Card
                    key={index}
                    onFavorite={(obj) => onAddToFavorite(obj)}
                    onPlus={(obj) => onAddToCart(obj)}
                    {...item}
                    loading={isLoading}
                />
            )
    }


    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="search"></img>
                    {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg" alt="clear"></img>}
                    <input onChange={onChangeSearchValue} value={searchValue} placeholder="поиск..."></input>
                </div>
            </div>
            <div className="d-flex flex-wrap">{renderItems()}</div>
        </div>
    );
};

export default Home;