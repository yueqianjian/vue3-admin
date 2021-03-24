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
];

export default directives;
