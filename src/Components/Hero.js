const Hero = ({ data }) => {
  return (
    <div className="hero-container">
      <div>
        <h2>{data.restaurant.name}</h2>
        <p>{data.restaurant.description}</p>
      </div>

      <img className="pic-meal" src={data.restaurant.picture} alt="plats" />
    </div>
  );
};
export default Hero;
