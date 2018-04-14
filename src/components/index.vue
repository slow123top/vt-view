/**
* Created by QXC on 2017/11/1. xichengqian@gmail.com 钱西成
*/
<style>
  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .box-card {
    margin-top: 2rem;
  }

  .box-card span {
    font-size: 1rem;
  }

  .text {
    font-size: 14px;
  }

  .el-tag {
    margin-left: 5px;
    margin-top: 5px;
  }

  .button-new-tag {
    margin-left: 5px;
    margin-top: 5px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
<template>
  <el-row style="background-color:rgba(0,0,0,0);padding: 1rem;height: 1000px" type="flex" justify="space-between">
    <el-col :span="6" style="background-color: rgba(0,0,0,0.1);padding:.5rem 1rem;height: 100%;border-radius: 10px">
      <el-input placeholder="请输入内容" v-model="word" class="input-with-select">
        <el-button type="primary" @click="search" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>同义词</span>
        </div>
        <el-tag
          :key="tag"
          v-for="(tag,index) in tongYiCi"
          closable
          :disable-transitions="false"
          @close="handleTongYiCiClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="tongYiCiInputVisible"
          v-model="tongYiCiValue"
          ref="tongYiCiSaveTagInput"
          size="small"
          @blur="handleTongYiCiInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showTongYiCiInput">+新建同义词</el-button>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>上位词</span>
        </div>
        <el-tag
          :key="tag"
          v-for="(tag,index) in shangWeiCi"
          closable
          :disable-transitions="false"
          @close="handleShangWeiCiClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="shangWeiCiInputVisible"
          v-model="shangWeiCiValue"
          ref="shangWeiCiSaveTagInput"
          size="small"
          @blur="handleShangWeiCiInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showShangWeiCiInput">+新建上位词</el-button>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>下位词</span>
        </div>
        <el-tag
          :key="tag"
          v-for="(tag,index) in xiaWeiCi"
          closable
          :disable-transitions="false"
          @close="handleXiaWeiCiClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="xiaWeiCiInputVisible"
          v-model="xiaWeiCiValue"
          ref="xiaWeiCiSaveTagInput"
          size="small"
          @blur="handleXiaWeiCiInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showXiaWeiCiInput">+新建下位词</el-button>
      </el-card>
    </el-col>
    <el-col :span="17" style="background-color: rgba(0,0,0,0.1);padding:.5rem;height: 100%;border-radius: 10px">
      <div id="container" style="height: 100%"></div>
      <!--<force :nodes="nodes" :links="links"></force>-->
    </el-col>
  </el-row>

</template>
<script>
  import { getRemoteReqTodo } from '../api/httpmethods'
  import echarts from 'echarts'

  export default {
    data: function () {
      return {
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: '',
        word: '',
        typeSelect: '',
        nodes: [],
        edges: [],
        tongYiCiInputVisible: false,
        shangWeiCiInputVisible: false,
        xiaWeiCiInputVisible: false,
        tongYiCi: [],
        shangWeiCi: [],
        xiaWeiCi: [],
        links: [],
        tongYiCiValue: '',
        shangWeiCiValue: '',
        xiaWeiCiValue: ''
      }
    },
    beforeDestroy: function () {

    },
    methods: {
      getNodesIndex (arr, ele) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].name === ele) {
            return i
          }
        }
      },
      getLinksIndex (arr, ele, wordType) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].target === ele && arr[i].value === wordType) {
            return i
          }
        }
      },
      handleTongYiCiClose (tag) {
        this.tongYiCi.splice(this.tongYiCi.indexOf(tag), 1)
        this.nodes.splice(this.getNodesIndex(this.nodes, tag), 1)
        this.links.splice(this.getLinksIndex(this.links, tag, '同义词'), 1)
        this.draw(this.nodes, this.links)
      },
      handleShangWeiCiClose (tag) {
        this.shangWeiCi.splice(this.shangWeiCi.indexOf(tag), 1)
        this.nodes.splice(this.getNodesIndex(this.nodes, tag), 1)
        this.links.splice(this.getLinksIndex(this.links, tag, '上位词'), 1)
        this.draw(this.nodes, this.links)
      },
      handleXiaWeiCiClose (tag) {
        this.xiaWeiCi.splice(this.xiaWeiCi.indexOf(tag), 1)
        this.nodes.splice(this.getNodesIndex(this.nodes, tag), 1)
        this.links.splice(this.getLinksIndex(this.links, tag, '下位词'), 1)
        this.draw(this.nodes, this.links)
      },
      showTongYiCiInput () {
        this.tongYiCiInputVisible = true
        this.$nextTick(_ => {
          this.$refs.tongYiCiSaveTagInput.$refs.input.focus()
        })
      },
      showShangWeiCiInput () {
        this.shangWeiCiInputVisible = true
        this.$nextTick(_ => {
          this.$refs.shangWeiCiSaveTagInput.$refs.input.focus()
        })
      },
      showXiaWeiCiInput () {
        this.xiaWeiCiInputVisible = true
        this.$nextTick(_ => {
          this.$refs.xiaWeiCiSaveTagInput.$refs.input.focus()
        })
      },
      handleTongYiCiInputConfirm () {
        if (this.tongYiCiValue) {
          this.tongYiCi.push(this.tongYiCiValue)
          // 添加同义词
          let addedNode = {
            category: 1,
            name: this.tongYiCiValue,
            nodeName: this.tongYiCiValue,
            itemStyle: null,
            symbolSize: 35,
            x: null,
            y: null,
            draggable: false,
            label: {
              normal: {
                show: true
              }
            }
          }
          this.nodes.push(addedNode)
          // 添加同义词边
          let addedLink = {
            lineStyle: {
              normal: {
                color: 'rgb(128, 128, 128)',
                width: 10
              }
            },
            source: this.word,
            target: this.tongYiCiValue,
            value: '同义词'
          }
          this.links.push(addedLink)
          this.draw(this.nodes, this.links)
        }
        this.tongYiCiValue = ''
        this.tongYiCiInputVisible = false
      },
      handleShangWeiCiInputConfirm () {
        if (this.shangWeiCiValue === '') {
          this.shangWeiCiInputVisible = false
        } else {
          this.shangWeiCi.push(this.shangWeiCiValue)
          // 添加上位词
          let addedNode = {
            category: 2,
            name: this.shangWeiCiValue,
            nodeName: this.shangWeiCiValue,
            itemStyle: null,
            symbolSize: 35,
            x: null,
            y: null,
            draggable: false,
            label: {
              normal: {
                show: true
              }
            }
          }
          this.nodes.push(addedNode)
          // 添加上位词边
          let addedLink = {
            lineStyle: {
              normal: {
                color: 'rgb(128, 128, 128)',
                width: 10
              }
            },
            source: this.word,
            target: this.shangWeiCiValue,
            value: '同义词'
          }
          this.links.push(addedLink)
          this.draw(this.nodes, this.links)
          this.shangWeiCiValue = ''
          this.shangWeiCiInputVisible = false
        }
      },
      handleXiaWeiCiInputConfirm () {
        if (this.xiaWeiCiValue === '') {
          this.xiaWeiCiInputVisible = false
        } else {
          this.xiaWeiCi.push(this.xiaWeiCiValue)
          // 添加下位词
          let addedNode = {
            category: 3,
            name: this.xiaWeiCiValue,
            nodeName: this.xiaWeiCiValue,
            itemStyle: null,
            symbolSize: 35,
            x: null,
            y: null,
            draggable: false,
            label: {
              normal: {
                show: true
              }
            }
          }
          this.nodes.push(addedNode)
          // 添加下位词边
          let addedLink = {
            lineStyle: {
              normal: {
                color: 'rgb(128, 128, 128)',
                width: 10
              }
            },
            source: this.word,
            target: this.xiaWeiCiValue,
            value: '同义词'
          }
          this.links.push(addedLink)
          this.draw(this.nodes, this.links)
          this.xiaWeiCiValue = ''
          this.xiaWeiCiInputVisible = false
        }
      },
      search: function () {
        this.nodes.splice(0, this.nodes.length)
        getRemoteReqTodo('/getwordinfo', ['word'], [this.word])
          .then(response => {
            let data = response.data
            let nodes = response.data.graphResponse.nodes
            let links = response.data.graphResponse.links
            this.nodes = nodes
            this.links = links
            this.tongYiCi = data.tongyici
            this.shangWeiCi = data.shangweici
            this.xiaWeiCi = data.xiaweici
            this.draw(this.nodes, this.links)
            console.log(this.nodes)
          })
      },
      draw: function (nodes, links) {
        let dom = document.getElementById('container')
        let myChart = echarts.init(dom)
        let app = {}
        app.title = '力引导布局'

        let categories = []
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
        let option = {
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
    }
  }
</script>
