const template = {
  onloaded: 'hotspot_animate();add_all_the_time_tooltip();',
  edge: 'top',
  distorted: false,
  scale: '0.4',
  crop: '0|0|128|128',
  framewidth: '128',
  frameheight: '128',
  frame: 0,
  zoom: false,
  onclick: 'hotspotOnclick',
  ondown: 'hotspotOndown',
  onup: 'hotspotOnup',
  lastframe: 24
}
const urlList = [
  {
    uuid: 1,
    text: '向前',
    url: '%SWFPATH%/skin/hotspot_front.png',
  },
  {
    uuid: 2,
    text: '圆点',
    url: '%SWFPATH%/skin/hotspot_dot.png',
  },
  {
    uuid: 3,
    text: '圆点2',
    url: '%SWFPATH%/skin/hotspot_dot2.png',
  },
  {
    uuid: 4,
    text: '向下',
    url: '%SWFPATH%/skin/hotspot_down.png',
  },
  {
    uuid: 5,
    text: '小手',
    url: '%SWFPATH%/skin/hotspot_hand.png',
  },
  {
    uuid: 6,
    text: '向左',
    url: '%SWFPATH%/skin/hotspot_left.png',
  },
  {
    uuid: 7,
    text: '向左',
    url: '%SWFPATH%/skin/hotspot_lf.png',
  },
  {
    uuid: 8,
    text: '向右',
    url: '%SWFPATH%/skin/hotspot_right.png',
  },
  {
    uuid: 9,
    text: '向右',
    url: '%SWFPATH%/skin/hotspot_rf.png',
  }
]
export { template, urlList };