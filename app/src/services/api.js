import  makeRequest from './client'
const key = "api_key=a6ecff937aaa6a771f25f2908bba5f46";
const base = "https://api.themoviedb.org/3";
const language = "language=pt-BR";


async function getHomeList () {
    const response = await Promise.all([
      makeRequest('axios', `${base}/discover/tv?with_network=213&${language}&${key}`, 'GET'),
      makeRequest('fetch', `${base}/trending/all/week?${language}&${key}`, 'GET'),
      makeRequest('axios', `${base}/movie/top_rated?${language}&${key}`, 'GET'),
      makeRequest('fetch', `${base}/discover/movie?with_genres=28${language}&${key}`, 'GET')
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
}

async function getMovieInfo(movieId, type) {
  if (movieId) {
    switch (type) {
      case "movie":
        return makeRequest('axios', `${base}/movie/${movieId}?${language}&${key}`, 'GET');
      case "tv":
        return makeRequest('axios', `${base}/tv/${movieId}?${language}&${key}`, 'GET');
      default: 
        throw new Error('Tipo de filme inválido!')
    }
  }
}

export default {
  getMovieInfo, 
  getHomeList
}
