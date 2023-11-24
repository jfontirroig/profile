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

import { apiProfileDidWeb } from '../../actions/apiProfileActions';

const punycode = require('punycode/');

class DisplayDidW3c extends React.Component {
  constructor() {
    super();

    this.state = {
      jsonBlockstack3: null,
      jsonBlockstack4: null,
      jsonBlockstack5: null,
      stxAddress2X: '',
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
    .then(
       (resolve) => {
           Promise.all([this.readProfile2(this.props.userProfile,resolve[0].stxAddress2X)])
              .then(() => {},() => {})
       },() => {})
  }

  readProfile1 = (userX) => {
    return new Promise ((resolve1, reject1) =>{
      if (userX === undefined || userX === null || userX === ''){reject1()}
      var nameLookupURL = "https://stacks-node-api.mainnet.stacks.co/v1/names/" + userX;
      axios.get(nameLookupURL)
        .then(result => {
          const stxAddress2X = result.data.address
          resolve1({stxAddress2X: stxAddress2X})
        })
        .catch(error => {
           console.log(error)
           reject1()
        });
    });
  }

  readProfile2 = (userX,stxAddress2X) => {
    return new Promise ((resolve2, reject2) =>{
      if (userX === undefined || userX === null || userX === ''){reject2()}
      apiProfileDidWeb(userX,stxAddress2X)
         .then(resultadoX => {
           this.setState({jsonBlockstack4: resultadoX})
           resolve2()
         })
         .catch(error => {
            console.log(error)
            reject2()
         });
    });
  }

  render() {
    const userProfileX = punycode.toUnicode(this.props.userProfile)
    let userProfile9X = ''
    if (this.props.userProfile.includes('xck.app') === true){
      userProfile9X = `${userProfileX}`
    }else {
      userProfile9X = `my.xck.app:${userProfileX}`
    }
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

export default DisplayDidW3c;
