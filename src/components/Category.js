const Category = ({ category }) => {
  return (
    <div>
      <h3>{category.name}</h3>
      <div className="meals-container">
        {category.meals.map((meal, num) => {
          return (
            <article key={meal.id} className="meal-container">
              <div>
                <h4>{meal.title}</h4>
                <p>{meal.description}</p>
                <p>{meal.price} €</p>
                {meal.popular && <p>Populaire</p>}
              </div>

              {meal.picture && <img src={meal.picture} alt="" />}
            </article>
          );
        })}
      </div>
    </div>
  );
};
export default Category;
