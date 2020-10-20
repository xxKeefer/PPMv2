import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TrackListing from "../components/GuestComponents/TrackListing";
import ChartLayout from "../components/Charts/ChartLayout";

export default function GuestVisual() {
  let { playlist } = useParams();

  const [pieObject, setPieObject] = useState({});
  const [barObject, setBarObject] = useState({});
  const [lineObject, setLineObject] = useState({});
  const [radarObject, setRadarObject] = useState({});
  const [songs, setSongs] = useState([]);

  // phil = 22nllj3rpfhvzlgt5hin5aqra
  // tyler = tylerhall12
  // simon = 1231189291
  // keefer = 12179586444

  useEffect(() => {
    const fetchData = async () => {
      let {
        data: { chartData: data, filteredData: tracks },
      } = await axios.get(`http://localhost:5000/data/${playlist}`);
      setPieObject(data.pie);
      setBarObject(data.bar);
      setLineObject(data.line);
      setRadarObject(data.radar);

      let musicList = [];

      tracks.forEach((t) => {
        musicList.push(<TrackListing track={t} />);
      });

      setSongs(musicList);
    };
    fetchData();
  }, [playlist]);
  return (
    <div className="tile is-ancestor  notification is-dark">
      <div className="tile is-parent is-vertical is-3">
        <div className="tile is-child is-vertical">
          <h1 className="title">Playlist Here:</h1>
          <div className="box">{songs}</div>
        </div>
      </div>
      <div className="tile is-parent is-vertical">
        <div className="tile is-child">
          <ChartLayout
            chartData={{ pieObject, barObject, lineObject, radarObject }}
          />
        </div>
      </div>
    </div>
  );
}
