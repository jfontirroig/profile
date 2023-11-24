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

//JSON Formatter
import JsonFormatter from 'react-json-formatter'

import {getFileDB} from '../../actions/mongoDBActions'

const punycode = require('punycode/');

class DisplayDidW3c extends React.Component {
  constructor() {
    super();

    this.state = {
      jsonBlockstack5: null,
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
      getFileDB(userX, `didw3c.json`)
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
             this.setState({jsonBlockstack5: jsonBlockstack5})
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

    const userProfileX = punycode.toUnicode(this.props.userProfile)

    let userProfile9X = ''
    if (this.props.userProfile.includes('xck.app') === true){
      userProfile9X = `${userProfileX}`
    }else {
      userProfile9X = `my.xck.app:${userProfileX}`
    }

    let jwtDidW3c = ''
    jwtDidW3c = jwtDidW3c + `{`
    jwtDidW3c = jwtDidW3c + `  "@context": "https://www.w3.org/ns/did/v1",`
    jwtDidW3c = jwtDidW3c + `  "did:web": "${userProfile9X}",`
    jwtDidW3c = jwtDidW3c + `  "verificationMethod": [{`
    jwtDidW3c = jwtDidW3c + `     "id": "did:web:${userProfile9X}#OAuth",`
    jwtDidW3c = jwtDidW3c + `     "type": "Secp256k1",`
    jwtDidW3c = jwtDidW3c + `     "controller": "did:web:${userProfile9X}",`
    jwtDidW3c = jwtDidW3c + `     "stacksAddress": "${this.state.stxAddress2X}"`
    jwtDidW3c = jwtDidW3c + `  }],`
    jwtDidW3c = jwtDidW3c + `  "authentication": [`
    jwtDidW3c = jwtDidW3c + `     "did:web:${userProfile9X}#OpenID"`
    jwtDidW3c = jwtDidW3c + `  ]`
    jwtDidW3c = jwtDidW3c + `}`


    let jsonBlockstack5X = true
    //let jsonBlockstack5X = false
    if (this.state.jsonBlockstack5 !== null){
      jsonBlockstack5X = true
    }

    const jsonStyle = {
        propertyStyle: { color: 'red' },
        stringStyle: { color: 'green' },
        numberStyle: { color: 'darkorange' }
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
                         <JsonFormatter json={jwtDidW3c} tabWith={4} jsonStyle={jsonStyle} />
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
