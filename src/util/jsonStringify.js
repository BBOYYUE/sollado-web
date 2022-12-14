function getType (o) {
  return typeof o === "symbol"
    ? "Symbol_basic"
    : Object.prototype.toString.call(o).slice(8, -1);
}
function isObject (o) {
  return o !== null && (typeof o === "object" || typeof o === "function");
}
function processOtherTypes (target, type) {
  switch (type) {
    case "String":
      return `"${target.valueOf()}"`;
    case "Number":
    case "Boolean":
      return target.valueOf().toString();
    case "Symbol":
    case "Error":
    case "RegExp":
      return "{}";
    case "Date":
      return `"${target.toJSON()}"`;
    case "Function":
      return undefined;
    default:
      return null;
  }
}
function checkCircular (obj, currentParent) {
  let type = getType(obj);
  if (type == "Object" || type == "Array") {
    if (currentParent.includes(obj)) {
      throw new TypeError("Converting circular structure to JSON");
    }
    currentParent.push(obj);
  }
}
export default function jsonStringify (target, initParent = [target]) {
  let type = getType(target);
  let iterableList = ["Object", "Array", "Arguments", "Set", "Map"];
  let specialList = ["Undefined", "Symbol_basic", "Function"];
  if (!isObject(target)) {
    if (type === "Symbol_basic" || type === "Undefined") {
      return undefined;
    } else if (Number.isNaN(target) || target === Infinity || target === -Infinity) {
      return "null";
    } else if (type === "String") {
      return `"${target}"`;
    }
    return String(target);
  }
  else {
    let res;
    if (!iterableList.includes(type)) {
      res = processOtherTypes(target, type);
    } else {
      if (type === "Array") {
        res = target.map((item) => {
          if (specialList.includes(getType(item))) {
            return "null";
          } else {
            let currentParent = [...initParent];
            checkCircular(item, currentParent);
            return jsonStringify(item, currentParent);
          }
        });
        res = `[${res}]`.replace(/'/g, '"');
      } else if (type === "Set") {
        target = Array.from(target)
        res = target.map((item) => {
          if (specialList.includes(getType(item))) {
            return "null";
          } else {
            let currentParent = [...initParent];
            checkCircular(item, currentParent);
            return jsonStringify(item, currentParent);
          }
        });
        res = `[${res}]`.replace(/'/g, '"');
      } else {
        res = [];
        Object.keys(target).forEach((key) => {
          if (getType(key) !== "Symbol_basic") {
            let type = getType(target[key]);
            if (!specialList.includes(type)) {
              let currentParent = [...initParent];
              checkCircular(target[key], currentParent);
              res.push(`"${key}":${jsonStringify(target[key], currentParent)}`);
            }
          }
        });
        res = `{${res}}`.replace(/'/g, '"');
      }
    }
    return res;
  }
}
