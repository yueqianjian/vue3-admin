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
];

export default directives;
