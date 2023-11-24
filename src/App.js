// React
import React, { PureComponent } from 'react';

// Components
import Profile from './components/profile/profile.js';
import DisplayJson from './components/displayjson/displayjson-api.js';
import DisplayDidW3c from './components/displayjson/displaydidw3c-api.js';
import VerifyPdf from './components/verifypdf/verifypdf.js';

// Translate
import { IntlProvider } from "react-intl";
import messages_es from "./languages/i18n/es.json";
import messages_en from "./languages/i18n/en.json";
import messages_fr from "./languages/i18n/fr.json";
import messages_pt from "./languages/i18n/pt.json";
import messages_sv from "./languages/i18n/sv.json";
import messages_nl from "./languages/i18n/nl.json";
import messages_ru from "./languages/i18n/ru.json";
import messages_jp from "./languages/i18n/jp.json";
import messages_cn from "./languages/i18n/cn.json";
import messages_de from "./languages/i18n/de.json";
import messages_it from "./languages/i18n/it.json";

import 'bootstrap/dist/css/bootstrap.css';
import './styles/shards-dashboards.min.css';

//----------------------------
class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      messages: {
        'es': messages_es,
        'en': messages_en,
        'fr': messages_fr,
        'pt': messages_pt,
        'sv': messages_sv,
        'nl': messages_nl,
        'ru': messages_ru,
        'jp': messages_jp,
        'cn': messages_cn,
        'de': messages_de,
        'it': messages_it
      },
      language: navigator.language.split(/[-_]/)[0],
    }
  }

  render() {
    let language3 = window.navigator.language||navigator.browserLanguage;
    language3 = language3.substring(0,2);
    if (language3 !=='en' && language3 !=='es' && language3 !=='fr' && language3 !=='pt' && language3 !=='sv' && language3 !=='nl' && language3 !=='ru' && language3 !=='jp' && language3 !=='cn' && language3 !=='de' && language3 !=='it'){
      language3 ='en'
    }
    let userProfile = ''
    let ArrayIdValue = ''
    let domainProfileX = decodeURI(window.location);
    let domainProfileX2 = decodeURI(window.location.href)
    let domainProfileX3 = decodeURI(window.location.pathname);
    let bDisplayMy = true
    let bDisplayProfile = false
    let bDisplayDidW3c = false
    let bVerifyPdf = false
    let codeVerifyPdf = ''
    let searchX = ''

    if (domainProfileX2.substring(0,19) === 'https://my.xck.app/'){
       ArrayIdValue = domainProfileX2.split('https://my.xck.app/')
       userProfile = ArrayIdValue[1]
       searchX = domainProfileX3
    }else{
       let userProfileX = window.location.origin;
       ArrayIdValue = userProfileX.split('https://')
       userProfile = ArrayIdValue[1]
       searchX = domainProfileX3
    }

    if (searchX.includes('/.well-known/profile') === true){
      bDisplayProfile = true
    }
    if (searchX.includes('/.well-known/did.json') === true){
      bDisplayProfile = true
      bDisplayDidW3c = true
    }

    if (searchX.includes('?pdf:') === true){
      ArrayIdValue = searchX.split('?pdf:')
      codeVerifyPdf = ArrayIdValue[1]
      bDisplayProfile = true
      bVerifyPdf = true
      ArrayIdValue = userProfile.split('?')
      userProfile = ArrayIdValue[0]
    }else{
      ArrayIdValue = userProfile.split('/.well-known')
      userProfile = ArrayIdValue[0]
    }
    return (
      <IntlProvider locale={language3} messages={this.state.messages[language3]}>
           {bDisplayProfile ?
               <>
               {bDisplayDidW3c ?
                 <DisplayDidW3c userProfile={userProfile} language={language3} />
               :
                 <>
                 {bVerifyPdf ?
                   <VerifyPdf userProfile={userProfile} language={language3} codeVerifyPdf={codeVerifyPdf} />
                 :
                   <DisplayJson userProfile={userProfile} language={language3} />
                 }
                 </>
               }
               </>
           :
               <Profile userProfile={userProfile} language={language3} />
           }
      </IntlProvider>
    );
  }
}

export default App;
