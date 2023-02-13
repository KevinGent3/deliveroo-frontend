import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

import { InfinitySpin } from "react-loader-spinner";
// Components
import Category from "./Components/Category";
import Header from "./Components/Header";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--deliveroo-backend--2t5y6vr4b9j9.code.run"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  let total = 0;
  const deliveryFee = 2.5;
  const addToCart = (meal) => {
    const newCart = [...cart];
    const mealIsPresent = newCart.find((elem) => elem.id === meal.id);
    if (mealIsPresent) {
      mealIsPresent.quantity = mealIsPresent.quantity + 1;
    } else {
      newCart.push({ ...meal, quantity: 1 });
    }
    setCart(newCart);
  };

  const deleteToCart = (meal) => {
    const newCart = [...cart];
    const mealIsPresent = newCart.find((elem) => elem.id === meal.id);

    if (mealIsPresent.quantity === 1) {
      const index = newCart.indexOf(mealIsPresent);
      newCart.splice(index, 1);
    } else {
      mealIsPresent.quantity = mealIsPresent.quantity - 1;
    }
    setCart(newCart);
  };
  return isLoading ? (
    <p>
      <InfinitySpin width="200" color="#4fa94d" />
    </p>
  ) : (
    <div className="App">
      <Header></Header>
      <div className="container hero">
        <div>
          <h1>{data.restaurant.name}</h1>
          <p>{data.restaurant.description}</p>
        </div>
        <img src={data.restaurant.picture} alt={data.restaurant.name} />
      </div>
      <div className="content">
        <div className="container sections-container">
          <section className="left-section">
            {data.categories.map((category, index) => {
              if (category.meals.length !== 0) {
                return (
                  <Category
                    cart={cart}
                    setCart={setCart}
                    category={category}
                    addToCart={addToCart}
                  />
                );
              } else {
                return null;
              }
            })}
          </section>

          <section className="right-section">
            <button className="valid-cart">Valider mon panier</button>
            {cart.length !== 0 ? (
              <div className="Cart">
                {cart.map((meal, index) => {
                  total = total + meal.quantity * meal.price;
                  return (
                    <div className="meal-information" key={meal.id}>
                      <div>
                        <button
                          onClick={() => {
                            deleteToCart(meal);
                          }}
                        >
                          -
                        </button>
                        <span>{meal.quantity}</span>
                        <button
                          onClick={() => {
                            addToCart(meal);
                          }}
                        >
                          +
                        </button>
                        <span>{meal.title}</span>
                      </div>

                      <div className="meal-price">
                        <span>{(meal.price * meal.quantity).toFixed(2)} €</span>
                      </div>
                    </div>
                  );
                })}
                <div className="cart-fees">
                  <div className="sous-total">
                    <p>Sous-total:</p>
                    <p>{total.toFixed(2)} €</p>
                  </div>
                  <div className="frais-livraison">
                    <p>Frais de livraison: </p>
                    <p>{deliveryFee.toFixed(2)}€</p>
                  </div>
                </div>
                <div className="total">
                  <p>Total: </p>
                  <p>{(total + deliveryFee).toFixed(2)} €</p>
                </div>
              </div>
            ) : (
              <div className="empty-cart">
                <p>Votre panier est vide</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
