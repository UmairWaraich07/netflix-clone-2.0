import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "../../axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import InfoIcon from "@mui/icons-material/Info";
// import { Info } from "@mui/icons-material";

function Row({ isLargeRow = false, rowTitle, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request?.data?.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "350",
    width: "99%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(
        movie?.name ||
          movie?.original_name ||
          movie?.title ||
          movie?.original_title ||
          ""
      )
        .then((url) => {
          // https://www.youtube.com/watch?v=Rh3tobg7hEo
          const urlParams = new URLSearchParams(new URL(url).search);
          // console.log(urlParams.get("v"));
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error.message));
    }
  };

  return (
    <div className="row">
      <h3 className="row__title">{rowTitle}</h3>
      <div className="row__container">
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                key={movie.id}
                onClick={() => handleClick(movie)}
                src={`https://image.tmdb.org/t/p/original${
                  isLargeRow ? movie?.poster_path : movie?.backdrop_path
                }`}
                alt={movie?.name || movie?.original_name}
                className={isLargeRow ? "row__posterLarge" : "row__poster"}
              />
            )
        )}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
