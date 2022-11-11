import "./App.css";
import Header from "./components/Header";
import Category from "./components/Category";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
                  className="container"
                  category={category}
                  key={index}
                ></Category>
              )
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
