import Header from "../components/Layout/Header.jsx";
import Hero from "../components/Route/Hero/Hero.jsx";

function HomePage() {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
    </div>
  );
}

export default HomePage;
