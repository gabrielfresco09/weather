import React from "react";
import GoogleMapReact from "google-map-react";

const CityLocation = ({ coordinates }) => {
  return (
    <div style={{ height: "400px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{
          lat: 59.95,
          lng: 30.33
        }}
        defaultZoom={12}
        center={{
          lat: coordinates.lat || 59.95,
          lng: coordinates.lon || 30.33
        }}
      >
        {coordinates.lat && coordinates.lon && (
          <img
            lat={coordinates.lat}
            lng={coordinates.lon}
            src="marker.svg"
            width="40px"
          />
        )}
      </GoogleMapReact>
    </div>
  );
};

CityLocation.defaultProps = {
  coordinates: {}
};

export default CityLocation;
