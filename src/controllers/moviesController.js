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
