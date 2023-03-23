import { r as reactExports, R as React } from "../settings.js";
const _Inputs = "";
function InputField({ defaultValue, placeholder, message, className, type, disabled, label, labelInline, onChange, children, style }) {
  const [val, setVal] = reactExports.useState(defaultValue || "");
  reactExports.useState(false);
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const handleVal = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };
  const valueStatus = () => {
    if (val) {
      if (type === "email" && emailRegex.test(val)) {
        return "has-value success";
      }
      if (type !== "email") {
        return "has-value";
      }
      return "has-value error";
    }
    return "";
  };
  return /* @__PURE__ */ React.createElement("label", { className: `urlslab-inputField-wrap ${className || ""} ${labelInline ? "inline" : ""} ${valueStatus()}`, style }, label ? /* @__PURE__ */ React.createElement("span", { className: "urlslab-inputField-label" }, label) : null, /* @__PURE__ */ React.createElement("div", { className: `urlslab-inputField ${children ? "has-svg" : ""}` }, children, /* @__PURE__ */ React.createElement(
    "input",
    {
      className: "urlslab-input input__text",
      type: type || "text",
      defaultValue: val,
      onChange: (event) => setVal(event.target.value),
      onBlur: (event) => handleVal(event),
      onKeyDown: (event) => {
        if (event.key === "Enter" || event.keyCode === 9) {
          event.target.blur();
        }
      },
      placeholder,
      disabled: disabled ? "disabled" : ""
    }
  )), (message == null ? void 0 : message.length) && valueStatus().length ? /* @__PURE__ */ React.createElement("div", { className: "urlslab-inputField-message" }, message) : null);
}
const _Checkbox = "";
function Checkbox({ checked, readOnly, radial, name, className, onChange, textBefore, children }) {
  const [isChecked, setChecked] = reactExports.useState(checked ? true : false);
  const handleOnChange = (event) => {
    if (onChange && !readOnly) {
      onChange(event.target.checked);
    }
    if (!readOnly) {
      setChecked(event.target.checked);
    }
  };
  return /* @__PURE__ */ React.createElement("label", { className: `urlslab-checkbox ${className || ""} ${textBefore ? "textBefore" : ""} ${radial ? "radial" : ""}` }, /* @__PURE__ */ React.createElement(
    "input",
    {
      className: `urlslab-checkbox-input ${checked ? "checked" : ""}`,
      type: name ? "radio" : "checkbox",
      name: name || "",
      defaultChecked: isChecked,
      onChange: (event) => handleOnChange(event)
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "urlslab-checkbox-box" }), /* @__PURE__ */ React.createElement("span", { className: "urlslab-checkbox-text", dangerouslySetInnerHTML: { __html: children } }));
}
const _FilterMenu = "";
function SortMenu({
  className,
  name,
  style,
  children,
  items,
  checkedId,
  isFilter,
  onChange
}) {
  const [isActive, setActive] = reactExports.useState(false);
  const [isVisible, setVisible] = reactExports.useState(false);
  const [checked, setChecked] = reactExports.useState(checkedId);
  const didMountRef = reactExports.useRef(false);
  const ref = reactExports.useRef(name);
  reactExports.useEffect(() => {
    const handleClickOutside = (event) => {
      var _a;
      if (!((_a = ref.current) == null ? void 0 : _a.contains(event.target)) && isActive) {
        setActive(false);
        setVisible(false);
      }
    };
    if (onChange && didMountRef.current && !isActive && checked !== checkedId) {
      onChange(checked);
    }
    didMountRef.current = true;
    document.addEventListener("click", handleClickOutside, true);
  }, [checked, isActive]);
  const checkedCheckbox = (targetId) => {
    setChecked(targetId);
  };
  const handleMenu = () => {
    setActive(!isActive);
    setTimeout(() => {
      setVisible(!isVisible);
    }, 100);
  };
  return /* @__PURE__ */ React.createElement("div", { className: `urlslab-FilterMenu urlslab-SortMenu ${className || ""} ${isActive ? "active" : ""}`, style, ref }, !isFilter && children ? /* @__PURE__ */ React.createElement("div", { className: "urlslab-inputField-label", dangerouslySetInnerHTML: { __html: children } }) : null, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: `urlslab-FilterMenu__title ${isFilter ? "isFilter" : ""} ${isActive ? "active" : ""}`,
      onClick: handleMenu,
      onKeyUp: (event) => handleMenu(),
      role: "button",
      tabIndex: 0,
      dangerouslySetInnerHTML: { __html: isFilter ? children : items[checked] }
    }
  ), /* @__PURE__ */ React.createElement("div", { className: `urlslab-FilterMenu__items ${isActive ? "active" : ""} ${isVisible ? "visible" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: `urlslab-FilterMenu__items--inn ${Object.values(items).length > 8 ? "has-scrollbar" : ""}` }, Object.entries(items).map(([id, value]) => {
    return /* @__PURE__ */ React.createElement(
      Checkbox,
      {
        className: "urlslab-FilterMenu__item",
        key: id,
        id,
        onChange: () => checkedCheckbox(id),
        name,
        checked: id === checked,
        radial: true
      },
      value
    );
  }))));
}
const datepicker = "";
export {
  Checkbox as C,
  InputField as I,
  SortMenu as S
};
