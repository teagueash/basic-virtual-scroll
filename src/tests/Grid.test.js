import React from "react";
import Grid from "../components/Grid.js";
import { shallow } from "enzyme";

// check that snapshot matches
it("will render Grid Component", () => {
  const mockRender = jest.fn();

  const mockProps = {
    data: [
      {
        index: 0,
        text: "lorem ipsum",
        background: "black"
      }
    ],
    range: 1,
    renderItem: mockRender,
    columnCount: 1,
    bufferCount: 0
  };
  const start = 0;
  const end = 1;
  const style = { offset: 5, elementWidth: 300, elementHeight: 300 };

  expect(
    shallow(
      <Grid {...mockProps} startIndex={start} endIndex={end} style={style} />
    )
  ).toMatchSnapshot();
});
