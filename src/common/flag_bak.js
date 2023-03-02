const template = {
  scale: '0.5',
  crop: '0|0|1|32',
  frameheight: 32,
  onclick: 'hotspotOnclick',
  ondown: 'hotspotOndown',
  onup: 'hotspotOnup',
  edge: 'bottom',
  distorted: false,
  zoom: false,
  onloaded: 'set_flag',
  url: '%SWFPATH%/skin/line.jpg',
  visible: true
}

const styleList = [
  {
    uuid: 1,
    text: '浅红色渐变',
    style: {
      css: 'background: linear-gradient(#f9653b, #c24862); width:1.4rem; font-size: 1rem; line-height:1.2rem; padding: 8px 1px;  border-radius: 9999px; text-align:center; word-wrap:break-word; word-break: break-all; white-space: pre-wrap;color:#FFFFFF;',
      mobilecss: "background: linear-gradient(#f9653b, #c24862); width:0.7rem;font-size: .5rem; line-height:.6rem; padding: 4px 1px;  border-radius: 9999px; text-align:center; word-wrap:break-word; word-break: break-all; white-space: pre-wrap;color:#FFFFFF;"
    },
  },
  {
    uuid: 2,
    text: '浅橘色渐变',
    style: {
      css: 'background: linear-gradient(#bf865a, #cbb49d);  width:1.4rem; font-size: 1rem; line-height:1.2rem; padding: 8px 1px; border: 1px solid  #cbb49d; border-radius: 9999px; text-align:center; word-wrap:break-word; word-break: break-all; white-space: pre-wrap;color:#FFFFFF;',
      mobilecss: "background: linear-gradient(#bf865a, #cbb49d); width:0.7rem;font-size: .5rem; line-height:.6rem; padding: 4px 1px; border: 1px solid  #cbb49d; border-radius: 9999px; text-align:center; word-wrap:break-word; word-break: break-all; white-space: pre-wrap;color:#FFFFFF;",

    },
  },
  {
    uuid: 3,
    text: '浅青色渐变',
    style: {
      css: 'background: linear-gradient(#72aa9a, #269eb4);  width:1.4rem; font-size: 1rem; line-height:1.2rem; padding: 8px 1px; border-radius: 9999px; text-align:center; word-wrap:break-word; word-break: break-all; white-space: pre-wrap;color:#FFFFFF;',
      mobilecss: "background: linear-gradient(#72aa9a, #269eb4); width:0.7rem;font-size: .5rem; line-height:.6rem; padding: 4px 1px; border-radius: 9999px; text-align:center; word-wrap:break-word; word-break: break-all; white-space: pre-wrap;color:#FFFFFF;"

    },
  },
  {
    uuid: 4,
    text: '浅绿色渐变',
    style: {
      css: 'background: linear-gradient(#73aa9a, #73aa76);  width:1.4rem; font-size: 1rem; line-height:1.2rem; padding: 8px 1px; border-radius: 9999px; text-align:center; word-wrap:break-word; word-break: break-all; white-space: pre-wrap;color:#FFFFFF;',
      mobilecss: "background: linear-gradient(#73aa9a, #73aa76); width:0.7rem;font-size: .5rem; line-height:.6rem; padding: 4px 1px; border-radius: 9999px; text-align:center; word-wrap:break-word; word-break: break-all; white-space: pre-wrap;color:#FFFFFF;"

    },
  },
  {
    uuid: 5,
    text: '浅紫色渐变',
    style: {
      css: 'background: linear-gradient(#BA55D3, #DDA0DD); width:1.4rem; font-size: 1rem; line-height:1.2rem; padding: 8px 1px;  border-radius: 9999px; text-align:center; word-wrap:break-word; word-break: break-all; white-space: pre-wrap;color:#FFFFFF;',
      mobilecss: "background: linear-gradient(#BA55D3, #DDA0DD); width:0.7rem;font-size: .5rem; line-height:.6rem; padding: 4px 1px;  border-radius: 9999px; text-align:center; word-wrap:break-word; word-break: break-all; white-space: pre-wrap;color:#FFFFFF;"
    },
  },
  {
    uuid: 6,
    text: '金色渐变',
    style: {
      css: 'background: linear-gradient(#B8860B, #DAA520); width:1.4rem; font-size: 1rem; line-height:1.2rem; padding: 8px 1px;  border-radius: 9999px; text-align:center; word-wrap:break-word; word-break: break-all; white-space: pre-wrap;color:#FFFFFF;',
      mobilecss: "background: linear-gradient(#B8860B, #DAA520); width:0.7rem;font-size: .5rem; line-height:.6rem; padding: 4px 1px;  border-radius: 9999px; text-align:center; word-wrap:break-word; word-break: break-all; white-space: pre-wrap;color:#FFFFFF;"
    },
  },
  {
    uuid: 7,
    text: '红色渐变',
    style: {
      css: 'background: linear-gradient(#c34960, #d63856); width:1.4rem; font-size: 1rem; line-height:1.2rem; padding: 8px 1px;  border-radius: 9999px; text-align:center; word-wrap:break-word; word-break: break-all; white-space: pre-wrap;color:#FFFFFF;',
      mobilecss: "background: linear-gradient(#c34960, #d63856); width:0.7rem;font-size: .5rem; line-height:.6rem; padding: 4px 1px;  border-radius: 9999px; text-align:center; word-wrap:break-word; word-break: break-all; white-space: pre-wrap;color:#FFFFFF;"
    },
  },
  {
    uuid: 8,
    text: '黑色渐变',
    style: {
      css: 'background: linear-gradient(#2f3457, #383c51); width:1.4rem; font-size: 1rem; line-height:1.2rem; padding: 8px 1px;  border-radius: 9999px; text-align:center; word-wrap:break-word; word-break: break-all; white-space: pre-wrap;color:#FFFFFF;',
      mobilecss: "background: linear-gradient(#2f3457, #383c51); width:0.7rem;font-size: .5rem; line-height:.6rem; padding: 4px 1px;  border-radius: 9999px; text-align:center; word-wrap:break-word; word-break: break-all; white-space: pre-wrap;color:#FFFFFF;"

    },
  },
  {
    uuid: 9,
    text: '蓝色渐变',
    style: {
      css: 'background: linear-gradient(#194081, #1b5781);  width:1.4rem; font-size: 1rem; line-height:1.2rem; padding: 8px 1px; border-radius: 9999px; text-align:center; word-wrap:break-word; word-break: break-all; white-space: pre-wrap;color:#FFFFFF;',
      mobilecss: "background: linear-gradient(#194081, #1b5781); width:0.7rem;font-size: .5rem; line-height:.6rem; padding: 4px 1px; border-radius: 9999px; text-align:center; word-wrap:break-word; word-break: break-all; white-space: pre-wrap;color:#FFFFFF;"

    },
  },
  {
    uuid: 10,
    text: '绿色渐变',
    style: {
      css: 'background: linear-gradient(#67a26c, #73aa76); width:1.4rem; font-size: 1rem; line-height:1.2rem; padding: 8px 1px;  border-radius: 9999px; text-align:center; word-wrap:break-word; word-break: break-all; white-space: pre-wrap;color:#FFFFFF;',
      mobilecss: "background: linear-gradient(#67a26c, #73aa76); width:0.7rem;font-size: .5rem; line-height:.6rem; padding: 4px 1px;  border-radius: 9999px; text-align:center; word-wrap:break-word; word-break: break-all; white-space: pre-wrap;color:#FFFFFF;"

    },
  },
]
export { template, styleList }