const key = "api_key=a6ecff937aaa6a771f25f2908bba5f46";
const base = "https://api.themoviedb.org/3";
const language = "language=pt-BR";

/*
-originais Netflix
-recomendados (trending)
-em alta
-ação
-terror
-romance
-documentários
*/

const basicFetch = async (endpoint) => {
  const req = await fetch(`${base}${endpoint}`);
  const json = await req.json();
  return json;
};

export default {
  getHomeList: async () => {
    return [
      {
        slug: "originals",
        title: "Originais Natflix",
        items: await basicFetch(
          `/discover/tv?with_network=213&${language}&${key}`
        ),
      },
      {
        slug: "trending",
        title: "Recomendados para Você",
        items: await basicFetch(
          `/trending/all/week?${language}&${key}`
        ),
      },
      {
        slug: "topRated",
        title: "Em alta",
        items: await basicFetch(`/movie/top_rated?${language}&${key}`),
      },
      {
        slug: "action",
        title: "Ação",
        items: await basicFetch(
          `/discover/movie?with_genres=28${language}&${key}`
        ),
      },
      {
        slug: "horror",
        title: "Terror",
        items: await basicFetch(
          `/discover/movie?with_genres=27${language}&${key}`
        ),
      },
      {
        slug: "romance",
        title: "Romance",
        items: await basicFetch(
          `/discover/movie?with_genres=10749${language}&${key}`
        ),
      },
      {
        slug: "documentary",
        title: "Documentários",
        items: await basicFetch(
          `/discover/movie?with_genres=99$${language}&${key}`
        ),
      },
    ];
  },
  getMovieInfo: async (movieId, type) => {
    let info ={};

    if(movieId) {
      switch(type) {
        case "movie":
          info = await basicFetch(`/movie/${movieId}?${language}&${key}`);
        break;
        case "tv":
          info = await basicFetch(`/tv/${movieId}?${language}&${key}`);
      }
    }

    return info;
  }
};  //refatorar jogando essa lista em outro arquivo
