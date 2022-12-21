export function showHotspot (data, type) {
  let krpano = document.getElementById('krpanoSWFObject')
  let option = Object.assign({}, template[type], data)
  option.name = type + '_' + data.hash_id
  console.log(option)

  let flag = krpano.get("hotspot[" + option.name + "]")
  if (!flag) {
    krpano.call("addhotspot(" + option.name + ")")
  } else {
    krpano.call("removehotspot(" + option.name + ")")
    krpano.call("addhotspot(" + option.name + ")")
  }
  for (let item in option) {
    krpano.set(
      "hotspot[" + option.name + "]." + item,
      option[item]
    );
  }
}
export function showView (view) {
  let krpano = document.getElementById('krpanoSWFObject')
  krpano.set("view.fov", view.fov);
  krpano.set("view.fovmax", view.fovmax);
  krpano.set("view.hlookat", view.hlookat);
  krpano.set("view.vlookat", view.vlookat);
}

export function showPhotoButton (data) {
  let krpano = document.getElementById('krpanoSWFObject')
  krpano.call("create_photo_album(" + data.hash_id + "," + data.name + "," + data.thumburl + "," + 156 + "," + 156 + ',leftBottom,' + data.x + "," + data.y + ")");
}

const template = {
  flag: {
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
  },
  image: {
    zoom: true,
    oy: -45,
    alpha: 1,
    onclick: 'hotspotOnclick',
    ondown: 'hotspotOndown',
    onup: 'hotspotOnup',
  },
  hotspot: {
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
    lastframe: 24,
    visible: true
  }
}
