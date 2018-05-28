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

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
<template>
  <el-row style="background-color:rgba(0,0,0,0);padding: 1rem;height: 1000px" type="flex" justify="center">
    <el-col :span="10"
            style="background-color: rgba(30,144,255,0.5);padding:0 1rem 4rem 1rem;height: 100%;border-radius: 10px">
      <div style="text-align: left"><img src="../img/word2.png" alt="措辞助手" style="width: 4rem"/></div>
      <!--<div style="width: 5rem;height: 5rem;background-image: url('http://localhost:8000/images/word.png');background-position: center"></div>-->
      <h2>文字措辞助手</h2>
      <textarea ref="textArea" v-model="textareaText" @click="search"
                style="height: 90%;width: 90%;font-size: 1rem"></textarea>
      <h3 style="text-align: left">操作提示：对文本框里面的文本使用鼠标滑动取词，当鼠标抬起时，若该词存在同义词或上位词或下位词，这些词汇将出现在右侧相应的栏目中；
        反之，会提示“无相关词汇”。当点击这些相关词汇时，滑动所取词语将被该词汇替换。</h3>
    </el-col>
    <el-col :span="7" :offset="1"
            style="background-color: rgba(30,144,255,0.5);padding:2rem 1rem;height: 100%;border-radius: 10px">
      <el-card class="box-card" :body-style="bodyStyle">
        <div slot="header" class="clearfix">
          <span>同义词</span>
        </div>
        <el-button type="primary"
                   :key="tag"
                   size="mini"
                   v-for="(tag,index) in tongYiCi"
                   @click="replaceWord(tag)"
                   style="margin-top: 5px">
          {{tag}}
        </el-button>
        <el-input
          class="input-new-tag"
          v-if="tongYiCiInputVisible"
          v-model="tongYiCiValue"
          ref="tongYiCiSaveTagInput"
          size="small"
          @blur="handleTongYiCiInputConfirm"
        >
        </el-input>
      </el-card>
      <el-card class="box-card" :body-style="bodyStyle">
        <div slot="header" class="clearfix">
          <span>上位词</span>
        </div>
        <el-button type="success"
                   :key="tag"
                   size="mini"
                   v-for="(tag,index) in shangWeiCi"
                   @click="replaceWord(tag)"
                   style="margin-top: 5px">
          {{tag}}
        </el-button>
        <el-input
          class="input-new-tag"
          v-if="shangWeiCiInputVisible"
          v-model="shangWeiCiValue"
          ref="shangWeiCiSaveTagInput"
          size="small"
          @blur="handleShangWeiCiInputConfirm"
        >
        </el-input>
      </el-card>
      <el-card class="box-card" :body-style="bodyStyle">
        <div slot="header" class="clearfix">
          <span>下位词</span>
        </div>
        <el-button type="warning"
                   :key="tag"
                   size="mini"
                   v-for="(tag,index) in xiaWeiCi"
                   @click="replaceWord(tag)"
                   style="margin-top: 5px">
          {{tag}}
        </el-button>
        <el-input
          class="input-new-tag"
          v-if="xiaWeiCiInputVisible"
          v-model="xiaWeiCiValue"
          ref="xiaWeiCiSaveTagInput"
          size="small"
          @blur="handleXiaWeiCiInputConfirm"
        >
        </el-input>
      </el-card>
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
        xiaWeiCiValue: '',
        wordRange: '',
        textareaText: '',
        selectStart: 0,
        selectEnd: 0,
        bodyStyle: {
          height: '200px',
          overflow: 'auto'
        }
      }
    },
    methods: {
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
      replaceWord: function (tag) {
        this.textareaText = `${this.textareaText.substring(0, this.selectStart)}${tag}${this.textareaText.substring(this.selectEnd)}`
        this.selectEnd = this.selectStart + tag.length
      },
      search: function () {
        // 获取文本域
        if (this.textareaText === '') {
          return false
        }
        let that = this.$refs.textArea
        let nullvalue = -1
        let selectStart
        let selectEnd
        // let position
        // let selectText
        // let text = this.textareaText
        selectStart = that.selectionStart
        selectEnd = that.selectionEnd
        if (selectStart === selectEnd) {
          // position = that.selectionStart
          selectStart = nullvalue
          selectEnd = nullvalue
        } else {
          // position = nullvalue
        }
        this.selectStart = selectStart
        this.selectEnd = selectEnd
        // selectText = text.substring(selectStart, selectEnd)
        // console.log(selectStart)
        // console.log(selectEnd)
        // this.nodes.splice(0, this.nodes.length)
        getRemoteReqTodo('/getwordinfo', ['word'], [window.getSelection().toString()])
          .then(response => {
            let data = response.data
            if (data.state === 'ERROR') {
              this.$message.warning('无相关词汇')
              return false
            }
            this.tongYiCi = data.tongyici
            this.shangWeiCi = data.shangweici
            this.xiaWeiCi = data.xiaweici
            // this.draw(this.nodes, this.links
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
            top: '10%',
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
