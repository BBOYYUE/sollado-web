import panoramaLayer from "@/components/icon/panorama-layer.vue"
import createForm from "./createForm.vue"
import { v4 as uuid } from "uuid";
import { useEditorStore } from "@/stores/editor";


const editorStore = useEditorStore();
function showLayer (data) {
  let krpano = document.getElementById('krpanoSWFObject')
  let option = Object.assign({}, template, data)
  option.name = 'layer_' + data.hash_id
  let containerName = option.name + "_container"
  if (!option.isscroll) {
    boxName = option.name + "_box"
  } else {
    boxName = option.name + "_scroll"
  }
  let container = krpano.get("layer[" + containerName + "]")
  if (!container) {
    krpano.call("addlayer(" + containerName + ")")
  } else {
    krpano.call("removelayer(" + containerName + ")")
    krpano.call("addlayer(" + containerName + ")")
  }
  krpano.set("layer[" + containerName + "].type", 'container');
  krpano.set("layer[" + containerName + "].width", option.width);
  krpano.set("layer[" + containerName + "].height", option.height);
  krpano.set("layer[" + containerName + "].x", option.x);
  krpano.set("layer[" + containerName + "].y", option.y);
  krpano.set("layer[" + containerName + "].align", option.align);
  krpano.set("layer[" + containerName + "].visible", true);
  krpano.set("layer[" + containerName + "].keep", true);
  krpano.set("layer[" + containerName + "].keep", true);
  krpano.set("layer[" + containerName + "].bgcolor", option.bgcolor);
  krpano.set("layer[" + containerName + "].bgroundedge", option.bgroundedge);
  krpano.set("layer[" + containerName + "].bgalpha", option.bgalpha);
}
export default {
  dataType: "layer",
  dataGroupType: "layerGroup",
  activeDataType: "activeLayer",
  activeDataGroupType: "activeLayerGroup",
  alias: "全景容器",
  name: "panorama-layer",
  domElementId: "panorama",
  store: (formData) => {
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      width: formData.width,
      height: formData.height,
      bgcolor: formData.bgcolor,
      bgalpha: formData.bgalpha,
      bordercolor: formData.bordercolor,
      bgroundedge: formData.bgroundedge,
      align: formData.align,
      x: formData.x,
      y: formData.y,
      plugin: "panorama-layer"
    }
    editorStore.addLayer(data)
  },
  storeGroup: (formData) => {
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      plugin: "panorama-layer"
    }
    editorStore.addLayerGroup(data)
  },
  component: {
    icon: panoramaLayer,
    createForm: createForm
  }
}