import { useState } from "react";
import './App.scss';
const axios = require('axios').default;

const contentTypeList = [
  "application/json",
  "application/x-www-form-urlencoded",
  "multipart/form-data"
];

function App() {
  const [webhookStatus,setWebhookStatus] = useState(true);
  const [url,setUrl] = useState("");
  const [contentType,setContentType] = useState(contentTypeList[0]);
  const [params,setParams] = useState([{key:"",value:"",timestamp:Date.now()}]);
  const [urlParams,setUrlParams] = useState([{key:"",value:"",timestamp:Date.now()}]);

  const setParamText = (idx,prop,e) => {
    setParams(prevState => {
      prevState[idx][prop] = e.target.value;
      console.log(e.target.value)
      return prevState;
    })
  }

  const addParam = () => {
    setParams(prevState => prevState.concat({key:"",value:"",timestamp:Date.now()}));
  }

  const removeParam = (idx) => {
    if(params.length < 2) {
      window.alert("There should be atleast 1 parameter.");
      return;
    }
    setParams(prevState => {
      return [...prevState.slice(0,idx),...prevState.slice(idx+1)];
    });
  }

  const setUrlParamText = (idx,prop,e) => {
    setUrlParams(prevState => {
      prevState[idx][prop] = e.target.value;
      return prevState;
    })
  }

  const addUrlParam = () => {
    setUrlParams(prevState => prevState.concat({key:"",value:"",timestamp:Date.now()}));
  }

  const removeUrlParam = (idx) => {
    if(urlParams.length < 2) {
      window.alert("There should be atleast 1 url parameter.");
      return;
    }
    setUrlParams(prevState => {
      return [...prevState.slice(0,idx),...prevState.slice(idx+1)];
    });
  }

  const submitForm = () => {
    if(!url) {
      window.alert("URL can't be empty.");
      return;
    }

    const data = JSON.stringify({
      "status": webhookStatus,
      "url": url,
      "contentType": contentType,
      "parameter": params.map(obj => ({"key":obj.key,"value":obj.value})),
      "urlParameter": params.map(obj => ({"key":obj.key,"value":obj.value})),
    });

    const config = {
      method: "post",
      url: "https://eo5o8y4opus393f.m.pipedream.net/webhook_72ha8",
      headers: {
        'Hello': 'Demo',
        'Content-Type': 'application/json'
      },
      data
    };

    axios(config)
    .then(res => {
      console.log(res.data)
    }).catch(console.log)
  }
  return (
    <div className="main">
      <div className="content-box">
        <div>
          Webhook Status:
          <input type="radio" checked={webhookStatus===true} onChange={() => setWebhookStatus(true)} />Enable
          <input type="radio" checked={webhookStatus===false} onChange={() => setWebhookStatus(false)} />Disable
        </div>
        <div>
          URL:
          <input value={url} style={{marginLeft:'8px'}} onChange={e => setUrl(e.target.value)} />
        </div>
        <div>
          Content Type:
          <select style={{marginLeft:'8px'}} value={contentType} onChange={(e) => setContentType(e.target.value)}>
            {contentTypeList.map(type => <option value={type} key={type}>{type}</option>)}
          </select>
        </div>
        <div className="input-group">
          <div className="texts">
            <div className="title">Parameters</div>
            {params.map((obj,idx) => <div className="input-text-pair" key={obj.timestamp}>
              <input placeholder="key" onChange={e => setParamText(idx,'key',e)} />
              <input placeholder="value" onChange={e => setParamText(idx,'value',e)} />
            </div>)}
          </div>
          <div className="action">
            <div onClick={() => addParam()}>+</div>
            {params.map((obj,idx) => <div key={obj.timestamp} onClick={() => removeParam(idx)}>-</div>)}
          </div>
        </div>
        <div className="input-group">
          <div className="texts">
            <div className="title">URL Parameters</div>
            {urlParams.map((obj,idx) => <div className="input-text-pair" key={obj.timestamp}>
              <input placeholder="key" onChange={e => setUrlParamText(idx,'key',e)} />
              <input placeholder="value" onChange={e => setUrlParamText(idx,'value',e)} />
            </div>)}
          </div>
          <div className="action">
            <div onClick={() => addUrlParam()}>+</div>
            {urlParams.map((obj,idx) => <div key={obj.timestamp} onClick={() => removeUrlParam(idx)}>-</div>)}
          </div>
        </div>
        <button onClick={submitForm}>Submit</button>
      </div>
    </div>
  )
}

export default App;
