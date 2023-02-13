import Meal from "./Meal";

const Category = ({ category, cart, setCart, addToCart }) => {
  return (
    <div className="category">
      <h2>{category.name}</h2>
      <div className="meals-container">
        {category.meals.map((meal) => {
          return (
            <Meal
              addToCart={addToCart}
              cart={cart}
              setCart={setCart}
              key={meal.id}
              meal={meal}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Category;
