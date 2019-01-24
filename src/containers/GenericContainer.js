import React, { Component } from "react";
import loremIpsum from "lorem-ipsum";
import ScrollContainer from "./ScrollContainer";

/**
 * Basic container holding configuration options for virtual scroller
 * @extends Component
 */
class GenericContainer extends Component {
  constructor() {
    super();

    this.height = window.innerHeight - 45;

    this.list = Array(100000)
      .fill()
      .map((val, index) => {
        return {
          index,
          text: loremIpsum({
            count: 1,
            units: "sentences",
            sentenceLowerBound: 1,
            sentenceUpperBound: 10
          })
        };
      });

    this.state = {
      range: this.list.length - 1
    };
  }

  /**
   * Basic rendering function to pass to ScrollContainer
   * @param  {Object} item object variable with property we are interested in rendering
   */
  renderItem = item => (
    <>
      <div className="overlay">{item.text}</div>
    </>
  );

  render() {
    const { range } = this.state;

    return (
      <>
        <div className="scroll-container" style={{ height: this.height }}>
          <ScrollContainer
            data={this.list}
            range={range}
            renderItem={this.renderItem}
            columnCount={3}
            bufferCount={1}
          />
        </div>
      </>
    );
  }
}

export default GenericContainer;
