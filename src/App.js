import Drawer from "./Drawer";
import Card from "./components/Card";
import Header from "./components/Header";



function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="search"></img>
            <input placeholder="поиск..."></input>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          <Card />
          <Card />
          <Card />
          <Card />



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
