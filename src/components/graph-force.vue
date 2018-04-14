/**
* Created by QXC on 2018/3/12. xichengqian@gmail.com 钱西成
*/
<style scoped>
</style>
<template>
  <div id="container" style="height: 100%"></div>
</template>
<script>
  import echarts from 'echarts'

  export default {
    data: function () {
      return {}
    },
    ready: function () {

    },
    beforeDestroy: function () {

    },
    methods: {
      draw: function (nodes, links) {
        var dom = document.getElementById('container')
        var myChart = echarts.init(dom)
        var app = {}
        var option = null
        app.title = '力引导布局'

        var categories = []
        categories[0] = {
          name: '主词'
        }
        categories[1] = {
          name: '同义词'
        }
        categories[2] = {
          name: '上位词'
        }
        categories[3] = {
          name: '下位词'
        }
        // console.log(nodes)
        nodes.forEach(function (node) {
          node.name = node.nodeName
          node.itemStyle = null
          node.symbolSize = 35
          // Use random x, y
          node.x = node.y = null
          node.draggable = false
          node.label = {
            normal: {
              show: true
            }
          }
        })
        links.forEach(function (link) {
//                    link.id = linkCount++;
//                    link.lineStyle = JSON.parse(JSON.stringify(link.lineStyle))
//                    link.value = 1;
        })
        // console.log(typeof links[0].lineStyle)
        option = {
          title: {
            text: 'Les Miserables',
            subtext: 'Default layout',
            top: 'bottom',
            left: 'right'
          },
          tooltip: {},
          legend: [{
            // selectedMode: 'single',
            data: categories.map(function (a) {
              return a.name
            })
          }],
          animation: false,
          series: [
            {
              type: 'graph',
              layout: 'force',
              data: nodes,
              links: links,
              categories: categories,
              roam: true,
              label: {
                normal: {
                  position: 'right'
                }
              },
              force: {
                repulsion: 1000
              }
            }
          ]
        }

        myChart.setOption(option)
      }
    },
    props: {
      nodes: {
        type: Array,
        default: function () {
          return []
        }
      },
      links: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    mounted () {
      this.draw(this.nodes, this.links)
    }
  }
</script>
