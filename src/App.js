import "./App.css";
import Header from "./components/Header";
import Category from "./components/Category";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--deliveroo-backend--2t5y6vr4b9j9.code.run/"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);
  const handleCart = (meal) => {
    const newCart = [...cart];
    const newMeal = { ...meal, quantity: 1 };
    const mealExists = newCart.find((element) => element.id === meal.id);
    if (mealExists) {
      mealExists.quantity++;
    } else {
      newCart.push(newMeal);
    }
    setCart(newCart);
  };
  const removeToCart = (meal) => {
    const newCart = [...cart];
    const mealInTab = newCart.find((element) => element.id === meal.id);
    if (mealInTab.quantity === 1) {
      const index = newCart.indexOf(mealInTab);
      newCart.splice(index, 1);
    } else {
      mealInTab.quantity--;
    }
    setCart(newCart);
  };
  let total = 0;
  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <div>
      <Header></Header>
      <div className="hero">
        <div className="container hero-container">
          <div>
            <h2>{data.restaurant.name}</h2>
            <p>{data.restaurant.description}</p>
          </div>

          <img src={data.restaurant.picture} alt="" />
        </div>
      </div>
      <main className="container">
        <div className="main-left">
          {data.categories.map((category, index) => {
            return (
              category.meals.length > 0 && (
                <Category
                  handleCart={handleCart}
                  className="container"
                  category={category}
                  key={index}
                ></Category>
              )
            );
          })}
        </div>
        <div className="main-right">
          {cart.map((meal, index) => {
            total = total + meal.quantity * meal.price;
            return (
              <div key={meal.id}>
                <button
                  onClick={() => {
                    handleCart(meal);
                  }}
                >
                  +
                </button>
                <span>{meal.quantity}</span>
                <button
                  onClick={() => {
                    removeToCart(meal);
                  }}
                >
                  -
                </button>
                <span>{meal.title}</span>
                <span>{(meal.quantity * meal.price).toFixed(2)} €</span>
              </div>
            );
          })}
          <div>Total: {total.toFixed(2)}</div>
        </div>
      </main>
    </div>
  );
}

export default App;
