import React from 'react';

const Child = (props) => {
  const { level } = props;
  const containsItems = level.items.length > 0;
  const currentLevel = level.level;
  return (
    <div className="wrapper-child">
      <div className="wrapper-container" position={currentLevel}>
        <div className="wrapper-title">{level.folderName}</div>
        {level.children && level.children.length > 0 && (
          <div
            className="wrapper-expand"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('currentLevel :', currentLevel);
              props.handleExpand(currentLevel);
            }}
          >
            {'>>'}
          </div>
        )}
        <div
          className="wrapper-expand"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.handleCreateFolder(currentLevel);
          }}
        >
          New Folder
        </div>

        <div
          className="wrapper-expand"
          // onClick={() => props.handlePaste(currentLevel)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.handlePaste(currentLevel);
          }}
        >
          Paste
        </div>
      </div>

      {containsItems && (
        <ul>
          {level.items.map((nestedLevel, index) => {
            return (
              <li className="list-item" key={nestedLevel}>
                <div>
                  {index + 1} : {nestedLevel}
                </div>
                <div
                  className="wrapper-expand"
                  onClick={() => props.handleCopy(level, nestedLevel, index)}
                >
                  Copy
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {level.children && level.children.length > 0
        ? level.isExpand &&
          level.children.map((nestedLevel) => {
            return (
              <Child
                key={nestedLevel.level}
                level={nestedLevel}
                handleExpand={props.handleExpand}
                handleCopy={props.handleCopy}
                handlePaste={props.handlePaste}
                handleCreateFolder={props.handleCreateFolder}
              />
            );
          })
        : null}
    </div>
  );
};

export default Child;
