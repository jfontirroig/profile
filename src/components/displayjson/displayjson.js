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

//JWT
//import jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";

//JSON Formatter
import JsonFormatter from 'react-json-formatter'

import {getFileDB} from '../../actions/mongoDBActions'

class DisplayJson extends React.Component {
  constructor() {
    super();

    this.state = {
      jsonBlockstack5: null,
      jsonBlockstack6: null,
    };
  }

  UNSAFE_componentWillMount() {
    Promise.all([this.readProfile(this.props.userProfile)])
       .then(() => {},() => {})
  }

  readProfile = (userX) => {
    const {userSession} = this.state
    const storage = new Storage({ userSession });
    const options = { decrypt: false, verify: false }
    return new Promise ((resolve, reject) =>{
      getFileDB(userX, `profile.json`)
         .then((fileContents) => {
           if(fileContents) {
             const jsonBlockstack1 = JSON.parse(fileContents)
             const jsonBlockstack2 = jsonBlockstack1.data
             let jsonBlockstack5 = '[]'
             if (jsonBlockstack2 !== null){
                const jsonBlockstack3 = jsonBlockstack2.dataobject
                const jsonBlockstack4 = jsonBlockstack3.replace(/\\/g,"");
                if (jsonBlockstack4.substring(0,1) === '"') {
                   jsonBlockstack5 = jsonBlockstack4.substring(1,jsonBlockstack4.length - 1)
                } else {
                   jsonBlockstack5 = jsonBlockstack4
                }
             }
             let jsonBlockstack6 = JSON.parse(jsonBlockstack5)
             const jwtToken = jsonBlockstack6
             const jwtDecoded = jwt_decode(jwtToken);
             let jsonBlockstack7 = jwtDecoded[0]
             this.setState({jsonBlockstack5: JSON.stringify(jsonBlockstack7)})
           resolve()
           } else {
             resolve()
           }
         })
          .catch(error => {
             reject()
         });
    })
  }

  render() {
    let jsonBlockstack6X = false
    if (this.state.jsonBlockstack6 !== null){
      jsonBlockstack6X = true
    }

    const jsonStyle = {
        propertyStyle: { color: 'red' },
        stringStyle: { color: 'green' },
        numberStyle: { color: 'darkorange' }
      }

    return (
      <Container fluid className="main-content-container px-4" >
        {jsonBlockstack6X ?
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
                         <JsonFormatter json={this.state.jsonBlockstack6} tabWith={4} jsonStyle={jsonStyle} />
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
