import React, { Component } from "react";
import { sample } from "lodash";
import loremIpsum from "lorem-ipsum";
import ScrollContainer from "./ScrollContainer";
import "../styles/GenericContainer.css";

const gradients = [
  "linear-gradient(135deg, rgb(168, 237, 234) 0%, rgb(254, 214, 227) 100%)",
  "linear-gradient(135deg, rgb(224, 195, 252) 0%, rgb(142, 197, 252) 100%)",
  "linear-gradient(120deg, rgb(224, 195, 252) 0%, rgb(142, 197, 252) 100%)",
  "linear-gradient(to top, rgb(193, 223, 196) 0%, rgb(222, 236, 221) 100%)",
  "linear-gradient(to top, rgb(150, 251, 196) 0%, rgb(249, 245, 134) 100%)",
  "linear-gradient(to top, rgb(255, 241, 235) 0%, rgb(172, 224, 249) 100%)",
  "linear-gradient(135deg, rgb(240, 235, 251) 0%, rgb(245, 87, 108) 100%)",
  "linear-gradient(-20deg, rgb(221, 214, 243) 0%, rgb(250, 172, 168) 100%, rgb(250, 172, 168) 100%)",
  "linear-gradient(120deg, rgb(246, 211, 101) 0%, rgb(253, 160, 133) 100%)",
  "linear-gradient(to top, rgb(235, 192, 253) 0%, rgb(217, 222, 216) 100%)",
  "linear-gradient(to top, rgb(150, 251, 196) 0%, rgb(249, 245, 134) 100%)",
  "linear-gradient(to top, rgb(210, 153, 194) 0%, rgb(254, 249, 215) 100%)"
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
