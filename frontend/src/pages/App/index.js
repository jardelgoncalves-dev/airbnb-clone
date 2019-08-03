import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import Dimensions from "react-dimensions";
import MapGL from "react-map-gl";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import { Container, ButtonContainer } from "./styles";
import api from "../../services/api";
import { logout } from "../../services/auth";
import Button from "./components/Button";
import Properties from "./components/Properties";



const TOKEN = "pk.eyJ1IjoiamFyZGVsZ29uY2FsdmVzIiwiYSI6ImNqeXZ4bmJoazBiODMzaGxnOGVwZG5pNTYifQ.7UkzYqcQRTNxMZxDqxwn-g";

class Map extends Component {
  constructor() {
    super();
    this.updatePropertiesLocalization = debounce(
      this.updatePropertiesLocalization,
      500
    );
  }

  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired
  }

  state = {
    viewport: {
      latitude: -4.97813,
      longitude: -39.0188,
      zoom: 12.8,
      bearing: 0,
      pitch: 0
    },
    properties: []
  }

  handleLogout = e => {
    logout();
    this.props.history.push("/");
  };

  renderActions() {
    return (
      <ButtonContainer>
        <Button color="#222" onClick={this.handleLogout}>
          <i className="fa fa-times" />
        </Button>
      </ButtonContainer>
    );
  }

  componentDidMount() {
    this.loadProperties();
  }
  
  updatePropertiesLocalization() {
    this.loadProperties();
  }
  
  loadProperties = async () => {
    const { latitude, longitude } = this.state.viewport;
    try {
      const response = await api.get("/properties", {
        params: { latitude, longitude }
      });
      console.log(response.data)
      this.setState({ properties: response.data })
    } catch (err) {
      console.log(err);
    }
  };

  render () {
    const { containerWidth: width, containerHeight: height } = this.props;
  const { properties } = this.state;
  return (
    <Fragment>
      <MapGL
        width={width}
        height={height}
        {...this.state.viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={viewport => this.setState({ viewport })}
        onViewStateChange={this.updatePropertiesLocalization.bind(this)}
      >
        <Properties properties={properties} />
      </MapGL>
      {this.renderActions()}
    </Fragment>
  );
  }
}

const DimensionedMap = withRouter(Dimensions()(Map));
const App = () => (
  <Container>
    <DimensionedMap />
  </Container>
);

export default App