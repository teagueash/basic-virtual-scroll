import React, { Component } from "react";
import { throttle, debounce } from "throttle-debounce";
import memoizeOne from "memoize-one";
import Grid from "../components/Grid.js";
import PropTypes from "prop-types";
import "../styles/ScrollContainer.css";

/**
 * Component to generate configuration information for virtualized scroller
 */
class ScrollContainer extends Component {
  constructor(props) {
    super(props);

    this._viewPort = React.createRef();

    this.state = {
      start: null,
      end: 0,
      style: {
        elementWidth: 0,
        elementHeight: 0,
        offset: 30
      },
      numberVisible: 0
    };

    this.prevScroll = null;
    this.containerPadding = 30;
    this.viewportPadding = 60;
    this.scrollThrottled = throttle(150, this.onScroll);
    this.resizeDebounced = debounce(500, this.handleResize);
  }

  /**
   * Set initial and follow-up configurations and add resizing + scroll event listener
   */
  componentDidMount() {
    // variable to track scroll position;
    this.prevScroll = this._viewPort.current.scrollTop;
    window.addEventListener("resize", this.resizeDebounced);
    this._viewPort.current.addEventListener("scroll", this.scrollThrottled);
    this.setConfig();
  }

  /**
   * clean up any event listeners
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeDebounced);
    this._viewPort.current.removeEventListener("scroll", this.scrollThrottled);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { start, style } = this.state;
    const { data } = this.props;

    // if new list supplied, update
    if (data.length !== nextProps.data.length) {
      return true;
    }
    // resize occurred, update
    if (style !== nextState.style) {
      return true;
    }
    // new row scrolled to, update
    if (start !== nextState.start) {
      return true;
    }

    return false;
  }

  onScroll = () => {
    const { columnCount, bufferCount, range } = this.props;
    const { style, numberVisible } = this.state;
    const scrollPosition = this._viewPort.current.scrollTop;

    // boolean flag to determine which direction to add new elements
    const scrollingDown = scrollPosition > this.prevScroll;

    const start = this.getStartingIndex(
      scrollPosition,
      style.elementHeight,
      style.offset,
      bufferCount,
      columnCount,
      scrollingDown
    );
    const end = this.getEndingIndex(
      start,
      numberVisible,
      bufferCount,
      columnCount,
      range,
      scrollingDown
    );

    this.prevScroll = scrollPosition;
    this.setState({ start, end });
  };

  getStartingIndex = (
    viewPortHeight,
    elementHeight,
    offset,
    bufferCount,
    columnCount,
    scrollingDown
  ) => {
    let start =
      Math.floor(viewPortHeight / (elementHeight + offset)) * columnCount;

    return scrollingDown || start - bufferCount * columnCount <= 0
      ? start
      : start - bufferCount * columnCount;
  };

  getEndingIndex = (
    start,
    numberVisible,
    bufferCount,
    columnCount,
    range,
    scrollingDown
  ) => {
    let end = start + numberVisible + bufferCount * columnCount;

    // if scrolling down, return last element or current end, otherwise add a buffer row for smoother offscreen exits at bottom of page
    if (scrollingDown) {
      return end >= range ? range - 1 : end;
    } else {
      return start === 0 ? end : end + columnCount;
    }
  };

  // memoize to prevent unnecessary recalculations
  getContainerHeight = memoizeOne(
    (dataLength, elementHeight, offset, columnCount) =>
      (dataLength * (elementHeight + offset)) / columnCount + elementHeight
  );

  getRowCount = (viewPortHeight, elementHeight, offset) => {
    // account for the 60px padding-top
    const adjustedHeight =
      this._viewPort.current.clientHeight - this.viewportPadding;

    return Math.ceil(adjustedHeight / (elementHeight + offset));
  };

  getNumberVisible = (columnCount, rowCount) => {
    return columnCount * rowCount;
  };

  handleResize = () => {
    console.log("resizing");
    this.setConfig();
  };

  /**
   * function to generate state configuration information
   */
  setConfig = () => {
    const { offset } = this.state.style;
    const { columnCount, bufferCount } = this.props;

    const elementWidth =
        (this._viewPort.current.clientWidth -
          offset * (columnCount - 1) -
          this.containerPadding) /
        columnCount,
      elementHeight = elementWidth * 0.75;

    const rowCount = this.getRowCount(
      this._viewPort.current.clientHeight,
      elementHeight,
      offset
    );

    const numberVisible = this.getNumberVisible(columnCount, rowCount);

    // check if start is null, set to 0, otherwise use existing value
    const start = this.state.start ? this.state.start : 0;

    const end = this.getEndingIndex(
      start,
      numberVisible,
      bufferCount,
      columnCount
    );

    const style = { elementWidth, elementHeight, offset };

    this.setState({ start, end, style, numberVisible });
  };

  render() {
    const { style, numberVisible, start, end } = this.state;
    const { data, columnCount } = this.props;
    const height = this.getContainerHeight(
      data.length,
      style.elementHeight,
      style.offset,
      columnCount
    );
    console.log("rendering");

    return (
      <div className="viewport" ref={this._viewPort}>
        <div className="list-container" style={{ height }}>
          {start !== null && (
            <Grid
              {...this.props}
              startIndex={start}
              endIndex={end}
              style={style}
              numberVisible={numberVisible}
            />
          )}
        </div>
      </div>
    );
  }
}

ScrollContainer.propTypes = {
  data: PropTypes.array.isRequired,
  range: PropTypes.number.isRequired,
  columnCount: PropTypes.number.isRequired,
  renderItem: PropTypes.func.isRequired,
  bufferCount: PropTypes.number
};

ScrollContainer.defaultProps = {
  bufferCount: 1
};

export default ScrollContainer;
