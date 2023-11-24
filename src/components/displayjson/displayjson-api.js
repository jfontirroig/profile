import React from "react";
import {
  Row,
  Col,
  Card,
  Container
} from "shards-react";

import axios from 'axios';

import { parseZoneFile } from 'zone-file'

//loader
import Loader from '../loader'

import { apiProfileProfile } from '../../actions/apiProfileActions';

class DisplayJson extends React.Component {
  constructor() {
    super();

    this.state = {
      jsonBlockstack3: null,
      jsonBlockstack4: null,
    };
  }

  componentDidMount() {
    this.setState({jsonBlockstack3: 'ok'})
  }

  componentDidUpdate = () => {
    if (this.state.jsonBlockstack3 === 'ok'){
       this.readProfile()
    }
  }

  readProfile = () => {
    Promise.all([this.readProfile1(this.props.userProfile)])
       .then(() => {},() => {})
  }

  readProfile1 = (userX) => {
    return new Promise ((resolve1, reject1) =>{
      if (userX === undefined || userX === null || userX === ''){reject1()}
      apiProfileProfile(userX)
         .then(resultadoX => {
           let resultadoX2 = JSON.parse(resultadoX)
           let resultadoX3 = JSON.stringify(resultadoX2.decodedToken)
           this.setState({jsonBlockstack4: resultadoX3})
           resolve1()
         })
         .catch(error => {
            console.log(error)
            reject1()
         });
    });
  }

  render() {
    let jsonBlockstack5X = false
    if (this.state.jsonBlockstack4 !== ''){
      jsonBlockstack5X = true
    }

    return (
      <Container fluid className="main-content-container px-4" >
        {jsonBlockstack5X ?
          <>
            <Row>&nbsp;</Row>
            <Row>
              <Col lg="2"></Col>
              <Col lg="8">
                <Card small className="mb-4 pt-3">
                  <Row>&nbsp;</Row>
                  <Row>
                    <Col lg="1"></Col>
                    <Col lg="10">
                       <div>
                         {this.state.jsonBlockstack4}
                       </div>
                    </Col>
                   <Col lg="1"></Col>
                  </Row>
                  <Row>&nbsp;</Row>
                </Card>
              </Col>
              <Col lg="2"></Col>
            </Row>
            <Row>&nbsp;</Row>
          </>
        :
          <Loader />
        }
      </Container>
    )
  }
};

export default DisplayJson;
