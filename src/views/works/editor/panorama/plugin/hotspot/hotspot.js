import { useAppStore } from "@/stores/app";
import dashboard from "./dashboard.vue"
import icon from "../../../../../../components/icon/panorama-logic.vue"
import form from "./form.vue"
import info from "./info.vue"
import groupForm from "./groupForm.vue"
import groupInfo from "./groupInfo.vue"
import { v4 as uuid } from "uuid";

export default class hotspot {
  create = () => { }
  delete = () => { }
  move = (hotspotName, ath, atv) => { }
  toggleStyle = (hotspotName, style) => { }
  scale = (hotspotName, zoom) => { }
  // getMethodList = () => {
  //   return methodList;
  // }
  getStyleList = () => {
    return styleList;
  }

  // event = {
  //   click: (hotspotName) => { },
  //   hover: (hotspotName) => { },
  //   down: (hotspotName) => { },
  //   over: (hotspotName) => { },
  //   out: (hotspotName) => { },
  //   up: (hotspotName) => { }
  // };
  // method = {
  //   show: (hotspotName) => { },
  //   hide: (hotspotName) => { },
  //   active: (hotspotName) => { },
  //   unActive: (hotspotName) => { },
  // };
  component = {
    icon: icon,
    dashboard: dashboard,
    form: {
      groupForm: groupForm,
      form: form,
    },
    info: {
      groupInfo: groupInfo,
      info: info
    }
  }
}
// let methodList = [
//   {
//     uuid: uuid().split("-")[0],
//     name: 'show',
//     alias: '展示'
//   }, {
//     uuid: uuid().split("-")[0],
//     name: 'hide',
//     alias: '隐藏'
//   },
//   {
//     uuid: uuid().split("-")[0],
//     name: 'active',
//     alias: '设置选中状态'
//   },
//   {
//     uuid: uuid().split("-")[0],
//     name: 'unActive',
//     alias: '取消选中状态'
//   }
// ]
let styleList = [
  {
    uuid: 1,
    name: "front",
    alias: '向前',
    url: '%SWFPATH%/skin/hotspot_front.png',
  },
  {
    uuid: 2,
    name: "dot",
    alias: '圆点',
    url: '%SWFPATH%/skin/hotspot_dot.png',
  },
  {
    uuid: 3,
    name: "dot2",
    alias: '圆点2',
    url: '%SWFPATH%/skin/hotspot_dot2.png',
  },
  {
    uuid: 4,
    name: "down",
    alias: '向下',
    url: '%SWFPATH%/skin/hotspot_down.png',
  },
  {
    uuid: 5,
    name: "hand",
    alias: '小手',
    url: '%SWFPATH%/skin/hotspot_hand.png',
  },
  {
    uuid: 6,
    name: "left",
    alias: '向左',
    url: '%SWFPATH%/skin/hotspot_left.png',
  },
  {
    uuid: 7,
    name: "lf",
    alias: '向左',
    url: '%SWFPATH%/skin/hotspot_lf.png',
  },
  {
    uuid: 8,
    name: "right",
    alias: '向右',
    url: '%SWFPATH%/skin/hotspot_right.png',
  },
  {
    uuid: 9,
    name: "rf",
    alias: '向右',
    url: '%SWFPATH%/skin/hotspot_rf.png',
  }
]