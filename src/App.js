/**css import*/
import icon_minimize from './icon_minimize.svg';
import icon_smaller from './icon_smaller.svg';
import icon_quit from './icon_quit.svg';
import icon_select from './icon_select.svg';
import icon_create_box from './icon_create_box.svg';
import './App.css';

import React, {useState} from "react";
import axios from 'axios';
import Draggable from "react-draggable"; 

function App() {

  // get photo
  const [url,setUrl] = useState(null);
  const photo_id = 15;
  const getPhoto = (e) => {  axios.get(`https://jsonplaceholder.typicode.com/photos/${photo_id}`).then(response=>
        {
          setUrl(JSON.stringify(response.data,['url'],1))
        }
      )
  }

  // add box
  const Input = () => {
    return <Draggable onDrag={(e, data) => trackPos(data)} >
            <div className="App-boundingbox" tabIndex={0} onKeyDown={handleKeyDown}></div>
          </Draggable>;         
  };
  const [boxList, setInputList] = useState([]);
  const addLabel = event => {
    setInputList(boxList.concat(<Input key={boxList.length} />));
  };
  
  // drag box
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const trackPos = (data) => {
	setPosition({ x: data.x, y: data.y }); 
  };

  // delete box
  const handleKeyDown = event => {
    if ((event.key === 'Delete' || event.key === 'Backspace')) {
      event.currentTarget.remove();
    }
  };

  return (
    <div className="App">
      <div className="App-content">
        <table className="App-table-css">
          {/* 상단영역 */}
          <tr>
            <td colSpan={2} className="App-table-td-css">
              <div className="App-top-container">
                <div className="App-top-icon-bar">
                  <img src={icon_minimize} className="App-icon-minimize" alt="icon-minimize" />
                  <img src={icon_smaller} className="App-icon-smaller" alt="icon-smaller" />
                  <img src={icon_quit} className="App-icon-quit" alt="icon-quit" />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="App-table-td-css">
              <div className="App-title-container">
                <p className="App-title-text">Dataset Label</p>
              </div>
            </td>
          </tr>
          {/* 하단영역 */}
          <tr>
            <td className="App-table-td-css">
              <div className="App-left-container">
                <img src={icon_select} className="App-icon-select" alt="icon-select" onClick={getPhoto} data-tip data-for="registerTip"/>
                <img src={icon_create_box} className="App-icon-create-box" alt="icon-create-box" onClick={addLabel}/>
              </div>
            </td>
            <td className="App-table-td-css">
              <div className="App-right-container">
                {url && <img src={JSON.parse(url).url} alt="test-photo"></img>}
                <div>{boxList}</div>                      
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default App;
