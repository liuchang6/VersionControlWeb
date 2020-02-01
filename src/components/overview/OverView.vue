<template>
  <el-card class="box-card">
    <div id="main" style="width: 500px;height: 800px;"></div>
  </el-card>
</template>

<script>
import echarts from "echarts";
export default {
  name: "",
  methods: {
    drawLinepoint() {
      let myChart = echarts.init(document.getElementById("main"));

      myChart.setOption({
        legend: {
          orient: "vertical",
          x: "right",
          data: [
            "500积分以下",
            "500-1000积分",
            "1000-5000积分",
            "5000积分以上"
          ],
          top: "10%",
          right: 100,
          itemGap: 20,
          width: 200,
          textStyle: {
            fontSize: 14
          }
        },
        graphic: {
          type: "text",
          left: "22%",
          top: "43%",
          style: {
            text: "3307",
            textAlign: "center",
            fill: "#302e33",
            fontSize: 25
          }
        },
        color: ["#ff7474", "#ffc95e", "#f0a042", "#ff9f8c"],
        series: [
          {
            name: "积分客户总数",
            type: "pie",
            radius: ["45%", "100%"], //调整大小
            center: ["30%", "50%"], //调整位置
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: "inside",
                fontSize: "10",
                formatter: "{d}%"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 1058,
                name: "500积分以下"
              },
              {
                value: 827,
                name: "500-1000积分"
              },
              {
                value: 926,
                name: "1000-5000积分"
              },
              {
                value: 496,
                name: "5000积分以上"
              }
            ]
          }
        ]
      });
    }
  },
  mounted(){
            this.$nextTick(function() {
                this.drawLinepoint()
            })
        }
};
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.box-card {
  border-radius: 0;
  width: 100%;
  height: 1000px;
}
</style>
