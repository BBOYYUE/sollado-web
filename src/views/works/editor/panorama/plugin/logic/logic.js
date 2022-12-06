import { useAppStore } from "@/stores/app";
// import dashboard from "./dashboard.vue"
// import icon from "./icon.vue"
// import form from "./form.vue"
// import info from "./info.vue"
// import groupForm from "./groupForm.vue"
// import groupInfo from "./groupInfo.vue"
import hotspot from "../hotspot/hotspot";
import { v4 as uuid } from "uuid";


let hotspotImpl = new hotspot()
export default class logic {

  getLogicTypeList = () => {

  }
  getLogicMethodList = (type) => { }
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

/**
 * 操作名称 
 * 操作的数据类型
 * 要执行的操作
 * 执行操作的对象
 */

/**
 * 例如 
 * 操作名称: 展示场景
 * 操作的数据类型: 场景
 * 要执行的操作: show
 * 执行操作的对象: state 中的某个场景
 */

const methodList = [
  {
    uuid: uuid().split("-")[0],
    name: 'scene',
    alias: '场景',
    methodList: [
      {
        uuid: uuid().split("-")[0],
        name: 'showScene',
        alias: '展示场景'
      },
      {
        uuid: uuid().split("-")[0],
        name: 'hideScene',
        alias: '隐藏场景'
      },
      {
        uuid: uuid().split("-")[0],
        name: 'delScene',
        alias: '卸载场景'
      }
    ],
  },
  {
    uuid: uuid().split("-")[0],
    name: 'hotspot',
    alias: '热点',
    methodList: [
      {
        uuid: uuid().split("-")[0],
        name: 'showHotspot',
        alias: '展示热点'
      },
      {
        uuid: uuid().split("-")[0],
        name: 'hideHotspot',
        alias: '隐藏热点'
      },
      {
        uuid: uuid().split("-")[0],
        name: 'showHotspotByGroup',
        alias: '展示某个分组的所有文本'
      },
      {
        uuid: uuid().split("-")[0],
        name: 'hideHotspotByGroup',
        alias: '隐藏某个分组的所有文本'
      }
    ]
  },
  {
    uuid: uuid().split("-")[0],
    name: 'button',
    alias: '按钮',
    methodList: [
      {
        uuid: uuid().split("-")[0],
        name: 'showButton',
        alias: '展示按钮'
      },
      {
        uuid: uuid().split("-")[0],
        name: 'hideButton',
        alias: '隐藏按钮'
      },
      {
        uuid: uuid().split("-")[0],
        name: 'showButtonByGroup',
        alias: '展示某个分组的所有按钮'
      },
      {
        uuid: uuid().split("-")[0],
        name: 'hideButtonByGroup',
        alias: '隐藏某个分组的所有按钮'
      }
    ]
  },
  {
    uuid: uuid().split("-")[0],
    name: 'text',
    alias: '文本',
    methodList: [
      {
        uuid: uuid().split("-")[0],
        name: 'showText',
        alias: '展示文本'
      },
      {
        uuid: uuid().split("-")[0],
        name: 'hideText',
        alias: '隐藏文本'
      },
      {
        uuid: uuid().split("-")[0],
        name: 'showTextByGroup',
        alias: '展示某个分组的所有文本'
      },
      {
        uuid: uuid().split("-")[0],
        name: 'hideTextByGroup',
        alias: '隐藏某个分组的所有文本'
      }
    ]
  }
]


