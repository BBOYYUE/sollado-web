import { v4 as uuid } from "uuid";
export default [
  {
    uuid: uuid().split("-")[0],
    alias: '靠上',
    name: "top",
  },
  {
    uuid: uuid().split("-")[0],
    alias: '左上',
    name: "lefttop",
  },
  {
    uuid: uuid().split("-")[0],
    alias: '右上',
    name: "righttop",
  },
  {
    uuid: uuid().split("-")[0],
    alias: '靠下',
    name: "bottom",
  },
  {
    uuid: uuid().split("-")[0],
    alias: '左下',
    name: "leftbottom",
  },
  {
    uuid: uuid().split("-")[0],
    alias: '右下',
    name: "rightbottom",
  },
  {
    uuid: uuid().split("-")[0],
    alias: '居中',
    name: "center",
  },
  {
    uuid: uuid().split("-")[0],
    alias: '靠左',
    name: "left",
  },
  {
    uuid: uuid().split("-")[0],
    alias: '靠右',
    name: "right",
  },
]