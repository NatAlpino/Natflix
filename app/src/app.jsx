import React, { useEffect, useState } from "react";
import "./app.css";
import api from "./services/api";
import MovieRow from "./components/MovieRow/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie/FeaturedMovie";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      //pegando a lista total de filmes
      let list = await api.getHomeList();
      setMovieList(list);

      //pegando o filme em destaque
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await api.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
      
    };

    loadAll();
  }, []);

  // Header
  // Destaque
  // Listas
  // Rodapé

  return (
    <div className="page">
      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
};
