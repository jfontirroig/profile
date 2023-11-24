import React, { Component } from 'react';

//Axios
import axios from 'axios';

//Zonefile (Gaia)
import { parseZoneFile } from 'zone-file'

//CSS
import './viewerpdf.css'

//loader
import Loader from '../loader'

import { EditorState, convertFromRaw } from 'draft-js';

import { Base64 } from 'js-base64';

import MyDocument from "./generatepdf";
import {getTransactionRegister} from "./clarityfunctions"
import {getFileDB} from '../../actions/mongoDBActions'

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

class ViewerPdf extends Component {

    constructor(props) {
        super(props);

        const contentState = convertFromRaw(content);
        this.state = {contentState, }
        const editorState = EditorState.createWithContent(contentState);
        this.state = { editorState, }

        this.state = {
          jsonBlockstackY: [],
          networkUrlX: '',
          trimmedDataURL: null,
          jsonBlockstackFormPago: [],
          originMoney: 'USD - US Dollar',
          symbolcurrency: 'USD',
          jsonHeadPaymentForm: [],
          cryptoCurrency: 'STX',
          saldodocumento: null,
          totaldocumento: '',
          contentStateRaw: null,
          filedecodeAttachX: {},
          fileAttachX: {},
          getTransaction: '',
          fullRead: false,
        }
    }

    UNSAFE_componentWillMount() {
      let networkUrlX = 'https://stacks-node-api.mainnet.stacks.co'
      Promise.all([
                   this.getAgreement(networkUrlX),
                   this.goSignListNames(this.props.typeContract,this.props.numberContract,this.props.userRole,this.props.userOrigin,networkUrlX),
                   this.getHeadPaymentFormsNames(networkUrlX),
                   this.getDetailPaymentFormsNames(networkUrlX),
                   this.getUploadedDetailNames(networkUrlX),
                   this.getTransactionRegisterNames(networkUrlX)
                 ])
        .then((resolve) =>{this.setState({fullRead: true})},(reject) =>{this.setState({fullRead: true})})
    }

    //-----------------------------------------------------------------------

    goSignListNames = (typeContract,numberContract,displayRole,userOrigin,networkUrlX) => {
      const {userSession} = this.state
      const storage = new Storage({ userSession });
      const options = { decrypt: false, verify: false }
      return new Promise ((resolve, reject) =>{
        getFileDB(userOrigin, `${typeContract}_${numberContract}_usergroup.json`)
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
               //---------------------------------------------------------------------------------
               this.goSignListRemotoNames(typeContract,numberContract,jsonBlockstack6,networkUrlX)
               //---------------------------------------------------------------------------------
               resolve()
             } else {
               //---------------------------------------------------------------------------------
               this.goSignListRemotoNames(typeContract,numberContract,[],networkUrlX)
               //---------------------------------------------------------------------------------
               resolve()
             }
           })
            .catch(error => {
               reject()
           });
      })
    }

    goSignListRemotoNames = (typeContract,configurationContractNumber,jsonBlockstack4c,networkUrlX) => {
      return new Promise ((resolve3, reject3) =>{
        const largo = jsonBlockstack4c.length
        jsonBlockstack4c.map((todoUserRemote,keyUserRemote)=>{
          const {userSession} = this.state
          const storage = new Storage({ userSession });
          const options = { decrypt: false, verify: false }
          getFileDB(todoUserRemote.id, `${typeContract}_${configurationContractNumber}_usergroup.json`)
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
                   const {signature} = jsonBlockstack6[0]
                   if (todoUserRemote.signature !== signature){
                      todoUserRemote.signature = signature
                   }
                   //-----------------------------------------------------------------------------
                   this.getSignatureRemoto(todoUserRemote.id,jsonBlockstack4c,keyUserRemote,networkUrlX)
                   //-----------------------------------------------------------------------------
                 } else {
                   //-----------------------------------------------------------------------------
                   this.getSignatureRemoto(todoUserRemote.id,jsonBlockstack4c,keyUserRemote,networkUrlX)
                   //-----------------------------------------------------------------------------
                 }
               })
                .catch(error => {
               });

          if (keyUserRemote === largo - 1){
             this.setState({jsonBlockstackY: jsonBlockstack4c})
             resolve3()
          }
        });
      });
    }

    getSignatureRemoto(userX,jsonBlockstack4c,keyUserRemote,networkUrlX){
      const {userSession} = this.state
      const storage = new Storage({ userSession });
      const options = { decrypt: false, verify: false }
      return new Promise ((resolve, reject) =>{
        getFileDB(userX, `signature.json`)
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
               jsonBlockstack4c.map((todoUserRemote2,keyUserRemote2)=>{
                 if (keyUserRemote2 === keyUserRemote){
                   todoUserRemote2.signpad = jsonBlockstack6.signature
                   todoUserRemote2.bsignpad = true
                   this.setState({trimmedDataURL: jsonBlockstack6.signature})
                 }
               })
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

    getDetailPaymentFormsNames = (networkUrlX) => {
      const {userSession} = this.state
      const storage = new Storage({ userSession });
      const options = { decrypt: false, verify: false }
      return new Promise ((resolve, reject) =>{
        getFileDB(this.props.userOrigin, `${this.props.typeContract}_${this.props.numberContract}_detail_payment_form.json`)
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
               this.setState({jsonBlockstackFormPago: jsonBlockstack6})
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

    getHeadPaymentFormsNames = (networkUrlX) => {
      const {userSession} = this.state
      const storage = new Storage({ userSession });
      const options = { decrypt: false, verify: false }
      return new Promise ((resolve, reject) =>{
        getFileDB(this.props.userOrigin, `${this.props.typeContract}_${this.props.numberContract}_head_payment_form.json`)
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
               this.setState({jsonHeadPaymentForm:jsonBlockstack6});
               this.setState({cryptoCurrency:jsonBlockstack6[0].symbolcryptocurrency, originMoney:jsonBlockstack6[0].originMoney,  symbolcurrency:jsonBlockstack6[0].symbolcurrency, saldodocumento: parseFloat(jsonBlockstack6[0].amount), totaldocumento: jsonBlockstack6[0].amount})
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

    getAgreement = (networkUrlX) => {
      const {userSession} = this.state
      const storage = new Storage({ userSession });
      const options = { decrypt: false, verify: false }
      return new Promise ((resolve, reject) =>{
        getFileDB(this.props.userOrigin, `${this.props.typeContract}_${this.props.numberContract}_blankdetail.json`)
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
               const fileContentsString = jsonBlockstack5
               const contentState = convertFromRaw(JSON.parse(fileContentsString))
               this.setState({contentState, contentStateRaw:jsonBlockstack6, })
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

    getUploadedDetailNames = (networkUrlX) => {
      const {userSession} = this.state
      const storage = new Storage({ userSession });
      const options = { decrypt: false, verify: false }
      return new Promise ((resolve, reject) =>{
        getFileDB(this.props.userOrigin, `${this.props.typeContract}_${this.props.numberContract}_uploadeddetail.json`)
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
               const file64 = jsonBlockstack6.file
               const file = Base64.decode(file64);
               this.setState({filedecodeAttachX: file, fileAttachX: file64 })
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

    getTransactionRegisterNames = (networkUrlX) => {
      const {userSession} = this.state
      const storage = new Storage({ userSession });
      const options = { decrypt: false, verify: false }
      return new Promise ((resolve, reject) =>{
        getFileDB(this.props.userOrigin, `${this.props.typeContract}_${this.props.numberContract}.json`)
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
               const txId = jsonBlockstack6.registerTxId
               if (txId !== undefined){
                 if (txId !== null && txId !== '' ) {
                   getTransactionRegister(networkUrlX, txId)
                     .then(val => {
                        this.setState({ getTransaction: val })
                     })
                 }
               }
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
      let jsonBlockstack5X = false
      if (this.state.fullRead === true){
        if (this.state.jsonBlockstackY !== null){
          jsonBlockstack5X = true
        }
      }

      return (
        <>
        {jsonBlockstack5X ?
              <MyDocument contentState={this.state.contentStateRaw}
                          typeContract={this.props.typeContract}
                          numberContract={this.props.numberContract}
                          jsonBlockstackY={this.state.jsonBlockstackY}
                          description={this.props.description}
                          trimmedDataURL={this.state.trimmedDataURL}
                          jsonBlockstackFormPago={this.state.jsonBlockstackFormPago}
                          totaldocumento={this.state.totaldocumento}
                          originMoney={this.state.originMoney}
                          cryptoCurrency={this.state.cryptoCurrency}
                          symbolcurrency={this.state.symbolcurrency}
                          usernameX={this.props.username}
                          userOrigin={this.props.userOrigin}
                          filedecodeAttachX={this.state.filedecodeAttachX}
                          getTransaction={this.state.getTransaction}
                          language={this.props.language} />
        :
          <Loader />
        }
        </>
      )
   }
}
export default ViewerPdf;
