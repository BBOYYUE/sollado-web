import plural from 'plural';
// 首字母大写
export const title = (str) => {
  // 使用扩展运算符（...）拆分为字符        
  const characters = [...str];
  characters[0] = characters[0].toUpperCase();
  str = characters.join("");
  return str;
}

