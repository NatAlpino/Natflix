const key = "api_key=a6ecff937aaa6a771f25f2908bba5f46";
const base = "https://api.themoviedb.org/3";
const language = "language=pt-BR";

const basicFetch = async (endpoint) => {
  const req = await fetch(`${base}${endpoint}`);
  const json = await req.json();
  return json;
};

export default {
  getHomeList: async () => {
    const response = await Promise.all([
      basicFetch(`/discover/tv?with_network=213&${language}&${key}`),
      basicFetch(`/trending/all/week?${language}&${key}`),
      basicFetch(`/movie/top_rated?${language}&${key}`),
      basicFetch(`/discover/movie?with_genres=28${language}&${key}`)
    ])
    return [
      {
        slug: "originals",
        title: "Originais Natflix",
        items: response[0]
      },
      {
        slug: "trending",
        title: "Recomendados para Você",
        items: response[1]
      },
      {
        slug: "topRated",
        title: "Em alta",
        items: response[2]
      },
      {
        slug: "action",
        title: "Ação",
        items: response[3]
      },
    ];
  },
  getMovieInfo: async (movieId, type) => {
    let info = {};

    if (movieId) {
      switch (type) {
        case "movie":
          info = await basicFetch(`/movie/${movieId}?${language}&${key}`);
          break;
        case "tv":
          info = await basicFetch(`/tv/${movieId}?${language}&${key}`);
          break;
      }
    }

    return info;
  },
}; 
