import { useEffect, useState } from "react";
import "./App.styles.js";
import Button from "./components/button/button";
import Card from "./components/card/card";
import Header from "./components/header/header";
import Loader from "./components/loader/loader";

import { AppStyled } from "./App.styles";
const BASE_URL =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";
function App() {
  const [roverImages, setRoverImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [earthDate, setEarthDate] = useState("");

  const fetchImages = async () => {
    try {
      const API_URL = `${BASE_URL}?${
        earthDate ? `earth_date=${earthDate}` : `sol=1000&page=${page}`
      }&api_key=${process.env.REACT_APP_NASA_API_KEY}`;

      const response = await fetch(API_URL);
      const responseJson = await response.json();

      if (responseJson.length === 0 || responseJson.length < 25) {
        setHasMore(false);
        return;
      }
      setRoverImages((prevRoverImages) => [
        ...prevRoverImages,
        ...responseJson.photos,
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchImages();
    //eslint-disable-next-line
  }, [page, earthDate]);

  const handleShowMore = () => {
    setEarthDate("");
    setPage((prev) => prev + 1);
  };

  const handleEarthDate = (event) => {
    const { value } = event.target;
    setRoverImages([]);
    setEarthDate(value);
  };

  const handleClearEarthDate = () => {
    setEarthDate("");
  };

  if (error && !loading)
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );

  return (
    <>
      <Header />
      <AppStyled>
        <section className="date-container">
          <input type="date" value={earthDate} onChange={handleEarthDate} />
          <Button className="danger-btn" onClick={handleClearEarthDate}>
            Clear Date Selection
          </Button>
        </section>

        <section className="card-container">
          {roverImages.map((roverImage) => (
            <Card
              key={roverImage.id + Math.random().toString()}
              roverImage={roverImage}
            />
          ))}
        </section>

        {loading && (
          <section className="loader-container">
            <Loader />
          </section>
        )}

        {hasMore && !loading && !error && (
          <section className="btn-container">
            <Button onClick={handleShowMore}>Show More</Button>
          </section>
        )}
      </AppStyled>
    </>
  );
}

export default App;
