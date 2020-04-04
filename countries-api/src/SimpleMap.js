import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 

 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAWvyVPXYtFUD-oLaqpeXn_gOx8zGzmY3I" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
         
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;
 
// export default GoogleApiWrapper({
//     apiKey: ("AIzaSyAWvyVPXYtFUD-oLaqpeXn_gOx8zGzmY3I")
// })(MapContainer)




// key:"AIzaSyCn5rRv2NRgVXg-GkO2TA9Fq1RZy89KvNU"