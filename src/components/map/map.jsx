import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

import "../../../node_modules/leaflet/dist/leaflet.css";

export default class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.coord = props.coord;
  }

  componentDidMount() {
    const city = [52.38333, 4.9];

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const zoom = 12;

    const map = leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });

    map.setView(city, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    const mapCoords = this.coord;

    mapCoords.forEach((offerCoord) => {
      leaflet
      .marker(offerCoord, {icon})
      .addTo(map);
    });
  }

  render() {
    const {mapStyle} = this.props;
    return (
      <div style={mapStyle} id="map"></div>
    );
  }
}

Map.propTypes = {
  coord: PropTypes.array.isRequired,
  mapStyle: PropTypes.object.isRequired
};
