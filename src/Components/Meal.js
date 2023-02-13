import { RiStarSFill } from "react-icons/ri";
const Meal = ({ meal, addToCart }) => {
  return (
    <div
      onClick={() => {
        addToCart(meal);
      }}
      className="meal"
    >
      <div>
        <h3>{meal.title}</h3>
        {meal.description && (
          <div className="description-container">
            <p>{meal.description}</p>
          </div>
        )}

        <div className="price-popular-container">
          <p>{meal.price} €</p>

          {meal.popular && (
            <div className="popular-tag">
              <RiStarSFill style={{ color: "orange" }} />
              <p style={{ color: "orange" }}>Populaire</p>
            </div>
          )}
        </div>
      </div>
      {meal.picture && <img src={meal.picture} alt="" />}
    </div>
  );
};

export default Meal;
