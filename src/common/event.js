const eventType = [
  {
    name: 'flagGroupSwitch',
    alias: '标牌分组切换',
  },
  {
    name: 'sceneSwitch',
    alias: '场景切换'
  },
  {
    name: 'viewSwitch',
    alias: '视角切换'
  },
  {
    name: 'playVideo',
    alias: '播放视频'
  },
  {
    name: 'playAudio',
    alias: "播放音频"
  },
  {
    name: "showImg",
    alias: "展示图片"
  }
]

const buttonStyle = [
  {
    name: 'photoFrame',
    alias: '相框'
  },
  {
    name: 'roundBaseButton',
    alias: '简单的纯色圆角按钮'
  },
  {
    name: "none",
    alias: "无样式(由按钮组决定)"
  }
]
const eventAlignType = [
  {
    alias: '左上',
    name: "lefttop",
  },
  {
    alias: '右上',
    name: "righttop",
  },
  {
    alias: '左下',
    name: "leftbottom",
  },
  {
    alias: '右下',
    name: "rightbottom",
  },
  {
    alias: '居中',
    name: "center",
  }
]
const dialogTypeList = ['playVideo', 'showImg']
export { eventType, dialogTypeList, eventAlignType, buttonStyle }