const axios = require('axios');
const url = process.env.TMDB_API_URL;
const apiKey = process.env.TMDB_API_KEY;

// Trae una lista de géneros de películas

exports.allGenres = async (req, res) => {
  try {
    const response = await axios.get(`${url}/genre/movie/list`, {
      params: {
        api_key: apiKey,
      },
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('HAY UN ERROR CON EL PEDIDO -->', error);
  }
};

//Trae una lista de todas las peliculas que estan ahora en el cine

exports.cinemaMovies = async (req, res) => {
  try {
    const response = await axios.get(`${url}/movie/now_playing`, {
      params: {
        api_key: apiKey,
      },
    });
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send('HAY UN ERROR CON ESTE PEDIDO -->', error);
  }
};

//Trae una lista de peliculas populares

exports.popularMovies = async (req, res) => {
  try {
    const response = await axios.get(`${url}/movie/popular`, {
      params: {
        api_key: apiKey,
      },
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('HAY UN ERROR CON ESTE PEDIDO -->', error);
  }
};

//Trae una lista de peliculas mejor valoradas

exports.topMovies = async (req, res) => {
  try {
    const response = await axios.get(`${url}/movie/top_rated`, {
      params: {
        api_key: apiKey,
      },
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('HAY UN ERROR CON ESTE PEDIDO -->', error);
  }
};

//trae todas las proximas peliculas a estrenar

exports.upcomingMovies = async (req, res) => {
  try {
    const response = await axios.get(`${url}/movie/upcoming`, {
      params: {
        api_key: apiKey,
      },
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('HAY UN ERROR CON ESTE PEDIDO -->', error);
  }
};

//Busca peliculas por nombre

exports.searchMovie = async (req, res) => {
  const data = req.body.data;
  try {
    const response = await axios.get(`${url}/search/movie`, {
      params: {
        api_key: apiKey,
        query: data,
      },
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('HAY UN ERROR CON ESTE PEDIDO', error);
  }
};
