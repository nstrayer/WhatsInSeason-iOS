import React,{ Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop
} from 'react-native-svg';
import Dimensions from 'Dimensions';
import {geoAlbersUsa, geoPath} from 'd3-geo';
import topojson, {mesh,feature} from 'topojson';
import mapBounds from '../data/us.json';
import stateKeys from '../data/stateKeys';
class TheMap extends Component {

  constructor(props){
    super(props);

    this.state = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      mapPaths: "",
    }

    this.scales()
    this.convertTopojson()
  }

  scales(){
    this.projection = geoAlbersUsa()
      .scale(400)
      .translate([this.state.width / 2, this.state.height / 2]);

    this.path = geoPath()
      .projection(this.projection);
  }

  convertTopojson(){
    this.stateFeatures = feature(
      mapBounds,
      mapBounds.objects.states).features;
  }

  render(){
    const mapPaths = this.stateFeatures.map( state => {
      const statePath = this.path(state);
      return(
        <Path
          key = {state.id}
          d = {statePath? statePath: ""}
          fill = "none"
          stroke = "red"
          onPress={() => console.log(`clicked on ${stateKeys[state.id]}`)}
        />
      )
    })

    console.log(mapPaths)
    return(
      <View>
        <Svg
          height= {this.state.height}
          width= {this.state.width}
        >
          {mapPaths}
        </Svg>
      </View>
    )
  }

}

module.exports = TheMap;
