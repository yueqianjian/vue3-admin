const directives = [
  {
    name: "pm",
    func(el, binding) {
      const { arg, value } = binding;
      let pm = arg || "p";
      let pmObj = {
        p: "padding",
        m: "margin",
      };
      el.style[pmObj[pm]] = value;
    },
  },
  {
    name: "fs",
    func(el, binding) {
      const { value } = binding;
      el.style.fontSize = `${value}px`;
    },
  },
  {
    name: "hover",
    func(el) {
      el.onmouseover = () => {
        el.style.opacity = 0.7;
      };
      el.onmouseout = () => {
        el.style.opacity = 1;
      };
    },
  },
  {
    name: "border",
    func(el, binding) {
      // border color
      const borderColorList = [`#DCDFE6`, `#E4E7ED`, `#EBEEF5`, `#F2F6FC`];
      const { arg, value } = binding;
      let colorIndex = value || 0;
      let directionObj = {
        t: "top",
        r: "right",
        b: "bottom",
        l: "left",
      };
      let styleName = "border";
      if (arg) {
        styleName += `-${directionObj[arg]}`;
      }
      el.style[styleName] = `1px solid ${borderColorList[colorIndex]}`;
    },
  },
];

export default directives;
