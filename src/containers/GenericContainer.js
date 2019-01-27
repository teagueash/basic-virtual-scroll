import React, { Component } from "react";
import { sample } from "lodash";
import loremIpsum from "lorem-ipsum";
import ScrollContainer from "./ScrollContainer";
import "../styles/GenericContainer.css";

const gradients = [
  "linear-gradient(135deg, rgb(168, 237, 234) 0%, rgb(254, 214, 227) 100%)",
  "linear-gradient(135deg, rgb(224, 195, 252) 0%, rgb(142, 197, 252) 100%)",
  "linear-gradient(to right bottom, #1987b1, #2891ba, #359bc3, #41a6cd, #4cb0d6)",
  "linear-gradient(to right bottom, #19b126, #00b47e, #00b1c1, #00a8e8, #1298eb)",
  "linear-gradient(to right bottom, #f29200, #f18600, #ef7902, #ed6c07, #ea5e0d)",
  "linear-gradient(135deg, rgb(240, 147, 251) 0%, rgb(245, 87, 108) 100%)",
  "linear-gradient(to right bottom, #19b126, #56c01f, #80cf17, #a7dd11, #ceeb12)",
  "linear-gradient(120deg, rgb(246, 211, 101) 0%, rgb(253, 160, 133) 100%)",
  "linear-gradient(to right bottom, #b11919, #cc003f, #dd006f, #db00aa, #b912eb)",
  "linear-gradient(to top, rgb(150, 251, 196) 0%, rgb(249, 245, 134) 100%)",
  "linear-gradient(to right bottom, #b11998, #a543ae, #985dbe, #8c72c8, #8484ce)"
];

/**
 * Basic container holding configuration options for virtual scroller
 * @extends Component
 */
class GenericContainer extends Component {
  constructor() {
    super();

    this.height = window.innerHeight;

    this.list = Array(100000)
      .fill()
      .map((val, index) => {
        return {
          index,
          text: loremIpsum({
            count: 1,
            units: "sentences",
            sentenceLowerBound: 1,
            sentenceUpperBound: 4
          }),
          background: sample(gradients)
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
