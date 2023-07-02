import React from "react";
import "./HomeScreen.css";
import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import requests from "../../requests";
import Row from "../../components/Row/Row";

const HomeScreen = () => {
  return (
    <div className="homeScreen">
      <Navbar />
      <Banner />

      <div className="homeScreen__rows">
        <Row
          isLargeRow={true}
          rowTitle="NETFLIX ORIGINALS"
          fetchUrl={requests.fetchNetflixOriginals}
        />

        <Row rowTitle="Trending Now" fetchUrl={requests.fetchTrending} />
        <Row rowTitle="Top Rated" fetchUrl={requests.fetchTopRated} />
        <Row rowTitle="Action Movies" fetchUrl={requests.fetchActionMovies} />
        <Row rowTitle="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        <Row rowTitle="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
        <Row rowTitle="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
        <Row rowTitle="Documentaries" fetchUrl={requests.fetchDocumentation} />
        <Row rowTitle="Upcoming Movies" fetchUrl={requests.fetchUpcoming} />
      </div>
    </div>
  );
};

export default HomeScreen;
