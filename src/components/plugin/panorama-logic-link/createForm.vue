<script setup>
import { ref, onMounted } from 'vue'
import dagreD3 from "dagre-d3";
import * as d3 from "d3";
import box from "@/components/box.vue"
onMounted(() => {
  renderGagre()
  showData(["去做", "我寻思能行", "牛逼!", "成功了!"], [

  ])
})


const dagreD3Impl = new dagreD3.graphlib.Graph().setGraph({ rankdir: "LR" });
const form = ref({})
const tooltip = ref({})
const emit = defineEmits(['store'])
const props = defineProps({
  alias: String,
  dataOption: Object,
  field: Object
})

function createTooltip () {
  return d3
    .select("body")
    .append("div")
    .classed("tooltip", true)
    .style("opacity", 0)
    .style("display", "none");
}
// tooltip显示
function tipVisible (textContent) {
  tooltip.value
    .transition()
    .duration(400)
    .style("opacity", 0.9)
    .style("display", "block");
  tooltip.value
    .html(textContent)
    .style("left", `${d3.event.pageX + 15}px`)
    .style("top", `${d3.event.pageY + 15}px`);
}

// tooltip隐藏
function tipHidden () {
  tooltip.value
    .transition()
    .duration(400)
    .style("opacity", 0)
    .style("display", "none");
}

function showData (dataList, tupleList) {

  // States and transitions from RFC 793
  const states = dataList;

  // Automatically label each of the nodes
  states.forEach(function (state) {
    dagreD3Impl.setNode(state,
      {
        label: state.label ? state.label : '',
        shape: state.shape ? state.shape : '',
        toolText: state.toolText ? state.toolText : '',
        style: state.style ? state.style : '',
        labelStyle: state.labelStyle ? state.labelStyle : '',
      }
    );
  });

  // Set up the edges
  for (let item in tupleList) {
    dagreD3Impl.setEdge(tupleList[item][0], tupleList[item][1], {
      label: tupleList[item][2].label,
      arrowheadStyle: tupleList[item][2].arrowheadStyle ? tupleList[item][2].arrowheadStyle : '',
      style: tupleList[item][2].style ? tupleList[item][2].style : ''
    });
  }

  dagreD3Impl.nodes().forEach(function (v) {
    const node = dagreD3Impl.node(v);
    node.rx = node.ry = 5;
  });

  // Add some custom colors based on state
}

function renderGagre () {
  tooltip.value = createTooltip();
  const svg = d3.selectAll("svg").filter("#d3");
  const inner = svg.append("g");
  console.log(svg, inner)
  // Set up zoom support
  const zoom = d3.zoom().on("zoom", function (event) {
    inner.attr("transform", event.transform);
  });
  svg.call(zoom);

  // Create the renderer
  const render = new dagreD3.render();

  // Run the renderer. This is what draws the final graph.
  inner
    .selectAll("g.node")
    .on("mouseover", (v) => {
      // 假如当前toolText为"",则不展示
      if (g.node(v).toolText === "") {
        return;
      }
      tipVisible(g.node(v).toolText);
    })
    .on("mouseout", () => {
      tipHidden();
    });

  setInterval(function () {
    render(inner, dagreD3Impl);
  }, 1000)

}
</script>
<template>
  <box size="md" class="overflow-x-auto">
    <el-tabs>
      <el-tab-pane label="流程图">
        <div style="width:600px; height:500px;">
          <svg id="d3" width="600" height="500"></svg>
        </div>
      </el-tab-pane>
      <el-tab-pane label="方法列表">
        <div style="width:600px; height:500px;" class="flex flex-row justify-center">
          <el-transfer v-model="value" :props="{
            key: 'value',
            label: 'desc',
          }" :data="data" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </box>

</template>
<style setup>

</style>