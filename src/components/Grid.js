import React from "react";
import PropTypes from "prop-types";
import "../styles/Grid.css";

/**
 * Grid component that is responsible for rendering desired data
 * @param {array} data        array of data passed from parent
 * @param {number} columnCount  variable representing the number of columns to render
 * @param {number} startIndex  variable indicating the current starting index of data items to display
 * @param {number} endIndex    variabe indicating the last index of data items to display
 * @param {object} style       configuration object containing element width, height, and offset values
 * @param {function} renderItem  function to render each data item in row/column
 */
const Grid = ({
  data,
  columnCount,
  startIndex,
  endIndex,
  style,
  renderItem
}) => {
  const { offset, elementHeight, elementWidth } = style;
  const batch = data.slice(startIndex, endIndex);

  return (
    <div className="grid">
      {batch.map(element => {
        const { index, background } = element;
        const row = Math.floor(index / columnCount);
        const column = index % columnCount;

        return (
          <div
            key={index}
            style={{
              top: `${row * (elementHeight + offset)}px`,
              left: `${column * (elementWidth + offset)}px`,
              width: `${elementWidth}px`,
              height: `${elementHeight}px`,
              background: `${background}`
            }}
            className="card"
          >
            {renderItem(element)}
          </div>
        );
      })}
    </div>
  );
};

Grid.propTypes = {
  data: PropTypes.array.isRequired,
  startIndex: PropTypes.number.isRequired,
  endIndex: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  renderItem: PropTypes.func.isRequired
};

export default Grid;
