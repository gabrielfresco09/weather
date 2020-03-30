import React from "react";
import GoogleMapReact from "google-map-react";

const CityLocation = ({ coordinates }) => {
  return (
    <div style={{ height: "300px", width: "30%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{
          lat: 59.95,
          lng: 30.33
        }}
        defaultZoom={8}
        center={{
          lat: coordinates.lat || 59.95,
          lng: coordinates.lon || 30.33
        }}
      >
        {coordinates.lat && coordinates.lon && (
          <div lat={coordinates.lat} lng={coordinates.lon}>
            Hola
          </div>
        )}
      </GoogleMapReact>
    </div>
  );
};

CityLocation.defaultProps = {
  coordinates: {}
};

export default CityLocation;
