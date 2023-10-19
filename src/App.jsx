import "./App.css";
import { useState, useEffect } from "react";

import Loader from "./Loader";
function App() {
  const [endPoint, setEndPoint] = useState("");
  const [container, setContainer] = useState([]);
  const [finalPoint, setFinalPoint] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMe();
  }, [finalPoint]);

  useEffect(() => {
    setLoading(true);
    const delay = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(delay);
  }, []);

  const url = `https://imdb8.p.rapidapi.com/auto-complete?q=+${endPoint}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6ec2bad9bdmsh0edbdf1dbca64adp16c629jsn4235a5a2d52a",
      "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
    },
  };
  const fetchMe = () => {
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.d) {
          setContainer(data.d);
        } else {
          setContainer([]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const onChangeHandler = (event) => {
    setEndPoint(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setFinalPoint(endPoint);
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="search"
          id="search"
          value={endPoint}
          onChange={onChangeHandler}
          className="input"
        />
        <button type="submit">Submit</button>
      </form>

      {container.map((item) => {
        return (
          <div key={item.id}>
            {loading ? (
              <Loader />
            ) : (
              <div className="container">
                {item.i && <img src={item.i.imageUrl} alt={item.l} className="image" />}
                <h2 className="title">{item.l}</h2>
                <div className="discription"><span>Casts</span>: <h4 className="actors">{item.s}</h4></div>
                
                <div className="discription"><span>Category</span>: <span>{item.qid}</span></div>
                <div className="discription"><span>Ranked</span>: <span>{item.rank}</span></div>
                <div className="discription"><span>Year</span>: <span>{item.y}</span></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default App;
