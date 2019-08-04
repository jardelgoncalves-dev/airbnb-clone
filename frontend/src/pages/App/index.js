import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import Dimensions from "react-dimensions";
import MapGL from "react-map-gl";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import { Container, ButtonContainer, PointReference } from "./styles";
import api from "../../services/api";
import { logout } from "../../services/auth";
import Button from "./components/Button";
import Properties from "./components/Properties";
import { ModalRoute } from "react-router-modal";
import AddProperty from "../AddProperty";
import Property from "../Property";



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
    properties: [],
    addActivate: false
  }

  handleLogout = e => {
    logout();
    this.props.history.push("/");
  };

  renderActions() {
    return (
      <ButtonContainer>
        <Button
          color="#fc6963"
          onClick={() => this.setState({ addActivate: true })}
        >
          <i className="fa fa-plus" />
        </Button>
        <Button color="#222" onClick={this.handleLogout}>
          <i className="fa fa-times" />
        </Button>
      </ButtonContainer>
    );
  }

  renderButtonAdd() {
    return (
      this.state.addActivate && (
        <PointReference>
          <i className="fa fa-map-marker" />
          <div>
            <button onClick={this.handleAddProperty} type="button">
              Adicionar
            </button>
            <button
              onClick={() => this.setState({ addActivate: false })}
              className="cancel"
            >
              Cancelar
            </button>
          </div>
        </PointReference>
      )
    );
  }

  handleAddProperty = () => {
    const { match, history } = this.props;
    const { latitude, longitude } = this.state.viewport;
    history.push(
      `${match.url}/properties/add?latitude=${latitude}&longitude=${longitude}`
    );
    
    this.setState({ addActivate: false });
  };
  
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
      this.setState({ properties: response.data })
    } catch (err) {
      console.log(err);
    }
  };

  render () {
    const { containerWidth: width, containerHeight: height, match } = this.props;
  const { properties, addActivate } = this.state;
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
        {!addActivate && <Properties match={match} properties={properties} />}
      </MapGL>
      {this.renderActions()}
      {this.renderButtonAdd()}
      <ModalRoute
        path={`${match.url}/properties/add`}
        parentPath={match.url}
        component={AddProperty}
      />
      <ModalRoute
        path={`${match.url}/property/:id`}
        parentPath={match.url}
        component={Property}
      />
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