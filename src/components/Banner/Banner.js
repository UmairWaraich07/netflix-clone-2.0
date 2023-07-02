import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "../../axios";
import requests from "../../requests";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  const truncate = (string, n) => {
    return string?.length > n ? string.slice(0, n - 1) + "..." : string;
  };

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
    };
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${
          movie?.backdrop_path || movie?.poster_path
        }")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__content">
        <h1>{movie?.name || movie?.title || movie?.original_name}</h1>
        <div className="banner__buttons">
          <button className="banner__btn">Play</button>
          <button className="banner__btn">My List</button>
        </div>
        <p className="banner__description">
          {truncate(`${movie?.overview}`, 150)}
        </p>
      </div>
      <div className="banner__fadebottom" />
    </header>
  );
};

export default Banner;
