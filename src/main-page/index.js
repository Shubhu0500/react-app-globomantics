import { useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router , Switch, Route } from "react-router-dom";
import './main-page.css';
import Header from './header';
import FeaturedHouse from './featured-house';
import SearchResults from '../search-results';
import HouseFilter from './house-filter';
import HouseFromQuery from '../house/HouseFromQuery';

function App() {
  // load data
  const [allHouses, setAllHouses] = useState([]);

  useEffect (() => {
    const fetchHouses = async () => {
      const rsp =await fetch("/houses.json");
      const houses =await rsp.json();
      setAllHouses(houses);
    };
    fetchHouses();
  }, []);

  const featuredHouse = useMemo (() => {
  if (allHouses.length) {
    const randomIndex = Math.floor(Math.random() * allHouses.length);
    return allHouses[randomIndex];
  }
  },[allHouses]);


  return (
    <Router>
      <div className="container">
        <Header subtitle="Providing Houses all over the world"/>  
        <HouseFilter allHouses={allHouses} />
        <Switch>
          <Route path="/searchresults/:country">
            <SearchResults allHouses={allHouses} />
          </Route>
          <Route path="/house/:id">
            <HouseFromQuery allHouses={allHouses} />
          </Route>
          <Route path="/">
            <FeaturedHouse house={featuredHouse}></FeaturedHouse>
          </Route>
        </Switch>

    </div>
    </Router>
  );
}

export default App;
