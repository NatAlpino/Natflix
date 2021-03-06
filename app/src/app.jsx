import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import "./app.css";
import api from "./services/api";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      //pegando a lista total de filmes
      let list = await api.getHomeList();
      setMovieList(list);

      //pegando o filme em destaque
      let originals = list.filter((i) => i.slug === "originals");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await api.getMovieInfo(chosen.id, "tv");
      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  return (
    <Grid className="page">
      {featuredData && <FeaturedMovie item={featuredData} />}

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <section className="lists">
          {movieList.map((item, key) => (
            <MovieRow key={key} title={item.title} items={item.items} />
          ))}
        </section>

        <footer>
          <strong>Feito com carinho por Natália Alpino.</strong>
          <br />
          <strong>Direitos de imagem para a Netflix.</strong>
          <br />
          <strong>Dados pegos do site Themoviedb.org.</strong>
        </footer>
        {movieList.length <= 0 && (
          <Grid className="loading">
            <img
              src="https://pa1.narvii.com/7724/02d6be6c9b9ca850006adc3fa77d9e4088c9c959r1-2000-1000_hq.gif"
              alt="Carregando"
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
