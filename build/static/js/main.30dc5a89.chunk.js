(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    13: function(e, t, n) {
      e.exports = n(31);
    },
    18: function(e, t, n) {},
    23: function(e, t, n) {},
    25: function(e, t, n) {},
    27: function(e, t, n) {},
    29: function(e, t, n) {},
    31: function(e, t, n) {
      "use strict";
      n.r(t);
      var r = n(0),
        i = n.n(r),
        a = n(9),
        o = n.n(a),
        l = (n(18), n(1)),
        c = n(2),
        s = n(4),
        u = n(3),
        d = n(5),
        g = n(10),
        b = n(11),
        h = n.n(b),
        f = n(6),
        m = n(12),
        p = (n(23),
        function(e) {
          var t = e.data,
            n = e.columnCount,
            r = e.startIndex,
            a = e.endIndex,
            o = e.style,
            l = e.renderItem,
            c = o.offset,
            s = o.elementHeight,
            u = o.elementWidth,
            d = t.slice(r, a);
          return i.a.createElement(
            "div",
            { className: "grid" },
            d.map(function(e) {
              var t = e.index,
                r = e.background,
                a = Math.floor(t / n),
                o = t % n;
              return i.a.createElement(
                "div",
                {
                  key: t,
                  style: {
                    top: "".concat(a * (s + c), "px"),
                    left: "".concat(o * (u + c), "px"),
                    width: "".concat(u, "px"),
                    height: "".concat(s, "px"),
                    background: "".concat(r)
                  },
                  className: "card"
                },
                l(e)
              );
            })
          );
        }),
        v = (n(25),
        (function(e) {
          function t(e) {
            var n;
            return (
              Object(l.a)(this, t),
              ((n = Object(s.a)(
                this,
                Object(u.a)(t).call(this, e)
              )).onScroll = function() {
                var e = n.props,
                  t = e.columnCount,
                  r = e.bufferCount,
                  i = e.range,
                  a = n.state,
                  o = a.style,
                  l = a.numberVisible,
                  c = n._viewPort.current.scrollTop,
                  s = c > n.prevScroll,
                  u = n.getStartingIndex(c, o.elementHeight, o.offset, r, t, s),
                  d = n.getEndingIndex(u, l, r, t, i, s);
                (n.prevScroll = c), n.setState({ start: u, end: d });
              }),
              (n.getStartingIndex = function(e, t, n, r, i, a) {
                var o = Math.floor(e / (t + n)) * i;
                return a || o - r * i <= 0 ? o : o - r * i;
              }),
              (n.getEndingIndex = function(e, t, n, r, i, a) {
                var o = e + t + n * r;
                return a ? (o >= i ? i - 1 : o) : 0 === e ? o : o + r;
              }),
              (n.getContainerHeight = Object(m.a)(function(e, t, n, r) {
                return (e * (t + n)) / r + t;
              })),
              (n.getRowCount = function(e, t, r) {
                var i = n._viewPort.current.clientHeight - n.viewportPadding;
                return Math.ceil(i / (t + r));
              }),
              (n.getNumberVisible = function(e, t) {
                return e * t;
              }),
              (n.handleResize = function() {
                n.setConfig();
              }),
              (n.setConfig = function() {
                var e = n.state.style.offset,
                  t = n.props,
                  r = t.columnCount,
                  i = t.bufferCount,
                  a =
                    (n._viewPort.current.clientWidth -
                      e * (r - 1) -
                      n.containerPadding) /
                    r,
                  o = 0.75 * a,
                  l = n.getRowCount(n._viewPort.current.clientHeight, o, e),
                  c = n.getNumberVisible(r, l),
                  s = n.state.start ? n.state.start : 0,
                  u = n.getEndingIndex(s, c, i, r),
                  d = { elementWidth: a, elementHeight: o, offset: e };
                n.setState({ start: s, end: u, style: d, numberVisible: c });
              }),
              (n._viewPort = i.a.createRef()),
              (n.state = {
                start: null,
                end: 0,
                style: { elementWidth: 0, elementHeight: 0, offset: 30 },
                numberVisible: 0
              }),
              (n.prevScroll = null),
              (n.containerPadding = 30),
              (n.viewportPadding = 60),
              (n.scrollThrottled = Object(f.b)(150, n.onScroll)),
              (n.resizeDebounced = Object(f.a)(500, n.handleResize)),
              n
            );
          }
          return (
            Object(d.a)(t, e),
            Object(c.a)(t, [
              {
                key: "componentDidMount",
                value: function() {
                  (this.prevScroll = this._viewPort.current.scrollTop),
                    window.addEventListener("resize", this.resizeDebounced),
                    this._viewPort.current.addEventListener(
                      "scroll",
                      this.scrollThrottled
                    ),
                    this.setConfig();
                }
              },
              {
                key: "componentWillUnmount",
                value: function() {
                  window.removeEventListener("resize", this.resizeDebounced),
                    this._viewPort.current.removeEventListener(
                      "scroll",
                      this.scrollThrottled
                    );
                }
              },
              {
                key: "shouldComponentUpdate",
                value: function(e, t) {
                  var n = this.state,
                    r = n.start,
                    i = n.style;
                  return (
                    this.props.data.length !== e.data.length ||
                    (i !== t.style || r !== t.start)
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state,
                    t = e.style,
                    n = e.start,
                    r = e.end,
                    a = this.props,
                    o = a.data,
                    l = a.columnCount,
                    c = this.getContainerHeight(
                      o.length,
                      t.elementHeight,
                      t.offset,
                      l
                    );
                  return i.a.createElement(
                    "div",
                    { className: "viewport", ref: this._viewPort },
                    i.a.createElement(
                      "div",
                      { className: "list-container", style: { height: c } },
                      null !== n &&
                        i.a.createElement(
                          p,
                          Object.assign({}, this.props, {
                            startIndex: n,
                            endIndex: r,
                            style: t
                          })
                        )
                    )
                  );
                }
              }
            ]),
            t
          );
        })(r.Component));
      v.defaultProps = { bufferCount: 1 };
      var w = v,
        y = (n(27),
        [
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
        ]),
        E = (function(e) {
          function t() {
            var e;
            return (
              Object(l.a)(this, t),
              ((e = Object(s.a)(
                this,
                Object(u.a)(t).call(this)
              )).renderItem = function(e) {
                return i.a.createElement(
                  i.a.Fragment,
                  null,
                  i.a.createElement("div", { className: "overlay" }, e.text)
                );
              }),
              (e.height = window.innerHeight),
              (e.list = Array(1e5)
                .fill()
                .map(function(e, t) {
                  return {
                    index: t,
                    text: h()({
                      count: 1,
                      units: "sentences",
                      sentenceLowerBound: 1,
                      sentenceUpperBound: 2
                    }),
                    background: Object(g.sample)(y)
                  };
                })),
              (e.state = { range: e.list.length - 1 }),
              e
            );
          }
          return (
            Object(d.a)(t, e),
            Object(c.a)(t, [
              {
                key: "render",
                value: function() {
                  var e = this.state.range;
                  return i.a.createElement(
                    i.a.Fragment,
                    null,
                    i.a.createElement(
                      "div",
                      {
                        className: "scroll-container",
                        style: { height: this.height }
                      },
                      i.a.createElement(w, {
                        data: this.list,
                        range: e,
                        renderItem: this.renderItem,
                        columnCount: 3,
                        bufferCount: 1
                      })
                    )
                  );
                }
              }
            ]),
            t
          );
        })(r.Component),
        j = (n(29),
        (function(e) {
          function t() {
            return (
              Object(l.a)(this, t),
              Object(s.a)(this, Object(u.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(d.a)(t, e),
            Object(c.a)(t, [
              {
                key: "render",
                value: function() {
                  return i.a.createElement(
                    i.a.Fragment,
                    null,
                    i.a.createElement(E, null)
                  );
                }
              }
            ]),
            t
          );
        })(r.Component));
      o.a.render(i.a.createElement(j, null), document.getElementById("root"));
    }
  },
  [[13, 2, 1]]
]);
//# sourceMappingURL=main.30dc5a89.chunk.js.map
