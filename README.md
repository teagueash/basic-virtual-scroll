![](https://img.shields.io/github/license/teagueash/basic-virtual-scroll.svg)

Basic virtual scroller to efficiently render large datasets

## Getting Started

`ScrollContainer` component takes 4 required and 1 option prop:

```
import ScrollContainer from "...";

class Container extends React.Component {
  ...
  render() {
    return (
      <ScrollContainer
        data={list}                     // array containing data to render (required)
        range={range}                   // number indicating the size of the data set (required)
        renderItem={this.renderItem}    // render function passed to child to render dataset (required)
        columnCount={3}                 // number indicating how many columns to render (required)
        bufferCount={1}                 // number indicating how many additional rows to render (optional)
      />
    )
}
```
