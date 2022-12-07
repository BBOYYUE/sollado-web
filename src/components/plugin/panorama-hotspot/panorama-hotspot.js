import panoramaHotspot from "@/components/icon/panorama-hotspot.vue"
export default {
  dataType: "hotspot",
  dataGroupType: "hotspotGroup",
  activeDataType: "activeHotspot",
  activeDataGroupType: "activeHotspotGroup",
  alias: "热点",
  name: "hotspot",
  domElementId: "panorama",
  component: {
    icon: panoramaHotspot
  }
}