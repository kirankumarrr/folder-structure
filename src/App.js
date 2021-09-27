import React, { useState, useEffect } from 'react';
import Child from './Child/Child';
import data from './mockdata.json';
import './App.css';

function App() {
  const [currentData, setCurrentData] = useState([]);
  useEffect(() => {
    setCurrentData(data);
  }, []);

  const handleExpand = (index) => {
    console.log('index :', index);
    const currentIndex = index.replace('l-', '').split('-');
    // console.log('currentIndex :', currentIndex);
    const newData = Object.assign([], data);
    let constructIndex = '';
    let currentObject = newData;
    for (let i = 0; i < currentIndex.length; i++) {
      constructIndex += i === 0 ? `${currentIndex[i]}` : `-${currentIndex[i]}`;
      if (currentObject[currentIndex[i]] !== undefined) {
        // console.log('currentObject :', currentObject);
        currentObject = currentObject[currentIndex[i]];
        if (constructIndex === index) {
          currentObject.isExpand = true;
          break;
        }
      } else {
        if (
          currentObject.children &&
          currentObject.children[currentIndex[i]] !== undefined
        ) {
          // console.log('currentObject :', currentObject);
          currentObject = currentObject.children[currentIndex[i]];
          if (constructIndex === index) {
            currentObject.isExpand = true;
            break;
          }
        }
      }
    }
    setCurrentData(newData);
    console.log('constructIndex :', constructIndex);
  };
  const handleCreateFolder = (index) => {
    // console.log('index :', index);
    const currentIndex = index.replace('l-', '').split('-');
    // console.log('currentIndex :', currentIndex);
    const newData = Object.assign([], data);
    let constructIndex = '';
    let currentObject = newData;
    for (let i = 0; i < currentIndex.length; i++) {
      constructIndex += i === 0 ? `${currentIndex[i]}` : `-${currentIndex[i]}`;
      if (currentObject[currentIndex[i]] !== undefined) {
        // console.log('currentObject :', currentObject);
        currentObject = currentObject[currentIndex[i]];
        if (constructIndex === index) {
          currentObject.children.push({
            level: `${index}-${currentObject.children.length}`,
            folderName: `Europe-Childern-${index}-${currentObject.children.length}`,
            children: [],
            items: [],
            isExpand: false,
          });
          break;
        }
      } else {
        if (
          currentObject.children &&
          currentObject.children[currentIndex[i]] !== undefined
        ) {
          console.log('currentObject :', currentObject);
          currentObject = currentObject.children[currentIndex[i]];
          if (constructIndex === index) {
            currentObject.children.push({
              level: `${index}-${currentObject.children.length}`,
              folderName: `Europe-Childern-${index}-${currentObject.children.length}`,
              children: [],
              items: [],
              isExpand: false,
            });
            break;
          }
        }
      }
    }
    // setCurrentData(JSON.parse(JSON.stringify(newData)));
    setCurrentData(newData);
    console.log('constructIndex :', constructIndex);
  };

  const handleCopy = async (object, currentValue, index) => {
    console.log('object,currentValue,index :', object, currentValue, index);
    // window.copy(JSON.stringify(object));
    console.log('navigator :', navigator);
    navigator.clipboard.writeText(JSON.stringify(currentValue));
    let text = await navigator.clipboard.readText();
    // debugger;
    console.log('text :', text);
  };
  const handlePaste = async () => {
    let text = await navigator.clipboard.readText();
    // debugger;
    console.log('text :', text);
  };

  return (
    <div className="App">
      <h1>Folder</h1>
      {currentData.map((level) => {
        return (
          <Child
            key={level.level}
            level={level}
            handleExpand={handleExpand}
            handleCopy={handleCopy}
            handlePaste={handlePaste}
            handleCreateFolder={handleCreateFolder}
          />
        );
      })}
    </div>
  );
}

export default App;
