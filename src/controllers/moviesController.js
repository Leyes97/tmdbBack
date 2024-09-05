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
    res
      .status(500)
      .json({ message: 'HAY UN ERROR CON ESTE PEDIDO', error: error.message });
  }
};

//Trae una lista de todas las peliculas que estan ahora en el cine

exports.cinemaMovies = async (req, res) => {
  try {
    const { page } = req.query;

    const response = await axios.get(`${url}/movie/now_playing`, {
      params: {
        api_key: apiKey,
        page: page || 1,
      },
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'HAY UN ERROR CON ESTE PEDIDO', error: error.message });
  }
};

//Trae una lista de peliculas populares

exports.popularMovies = async (req, res) => {
  try {
    const { page } = req.query;
    const response = await axios.get(`${url}/movie/popular`, {
      params: {
        api_key: apiKey,
        page: page || 1,
      },
    });
    res.send(response.data);
  } catch (error) {
    console.error('ESTE ES EL ERROR ---->', error);
    res
      .status(500)
      .json({ message: 'HAY UN ERROR CON ESTE PEDIDO', error: error.message });
  }
};

//Trae una lista de peliculas mejor valoradas

exports.topMovies = async (req, res) => {
  try {
    const { page } = req.query;
    const response = await axios.get(`${url}/movie/top_rated`, {
      params: {
        api_key: apiKey,
        page: page || 1,
      },
    });
    res.send(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'HAY UN ERROR CON ESTE PEDIDO', error: error.message });
  }
};

//trae todas las proximas peliculas a estrenar

exports.upcomingMovies = async (req, res) => {
  try {
    const { page } = req.query;
    const response = await axios.get(`${url}/movie/upcoming`, {
      params: {
        api_key: apiKey,
        page: page || 1,
      },
    });
    res.send(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'HAY UN ERROR CON ESTE PEDIDO', error: error.message });
  }
};

//Busca peliculas por nombre

exports.searchMovie = async (req, res) => {
  const data = req.body.data; // Obtener datos del body
  try {
    const response = await axios.get(`${url}/search/movie`, {
      params: {
        api_key: apiKey,
        query: data,
      },
    });
    res.send(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'HAY UN ERROR CON ESTE PEDIDO', error: error.message });
  }
};
// Busca peliculas por id:

exports.getMovieById = async (req, res) => {
  const movieId = req.params.id;

  try {
    // Realizar la solicitud para obtener detalles de la película
    const movieDetailsResponse = await axios.get(`${url}/movie/${movieId}`, {
      params: {
        api_key: apiKey,
      },
    });

    // Realizar la solicitud para obtener videos de la película
    const movieVideosResponse = await axios.get(
      `${url}/movie/${movieId}/videos`,
      {
        params: {
          api_key: apiKey,
        },
      },
    );

    // Combinando las respuestas en un solo objeto
    const movieData = {
      ...movieDetailsResponse.data,
      videos: movieVideosResponse.data.results, // Incluir los videos de la película
    };

    res.send(movieData);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'HAY UN ERROR CON ESTE PEDIDO', error: error.message });
  }
};
