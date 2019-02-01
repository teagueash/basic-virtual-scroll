import React from "react";
import ScrollContainer from "../containers/Scrollcontainer.js";
import { shallow } from "enzyme";

// check that scroll container component mounts
it("renders ScrollContainer without crashing", () => {
  const mockRender = jest.fn();

  const mockProps = {
    data: [],
    range: 0,
    renderItem: mockRender,
    columnCount: 0,
    bufferCount: 0
  };

  expect(
    shallow(
      <ScrollContainer
        data={mockProps.data}
        range={mockProps.range}
        renderItem={mockRender}
        columnCount={mockProps.columnCount}
        bufferCount={mockProps.bufferCount}
      />
    )
  ).toMatchSnapshot();
});
