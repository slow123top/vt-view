<template>
  <Row type="flex" justify="start">
    <i-col span="24">
      <el-checkbox-group v-model="catalogProp" size="medium" @change="changeCheckbox">
        <el-tooltip v-for="starCatalogProp in starCatalogPropList" effect="dark" :content="starCatalogProp.description"
                    :key="starCatalogProp.label" placement="top">
          <el-checkbox-button :label="starCatalogProp.label">{{starCatalogProp.label}}
          </el-checkbox-button>
        </el-tooltip>
      </el-checkbox-group>
      <el-form ref="ruleForm" :inline="true" :model="formData" label-width="100px" style="margin-top: 1rem">
        <el-form-item v-for="formLabel in catalogProp" :label="formLabel" :key="formLabel">
          <el-input v-model="formData[formLabel]" style="width: 10rem">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="medium">查询</el-button>
          <el-button @click="resetForm('ruleForm')" size="medium">重置</el-button>
        </el-form-item>
      </el-form>
    </i-col>
    <i-col span="24">
      <el-table ref="table" :data="currentTableData" @selection-change="selectChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="50" align="center"></el-table-column>
        <el-table-column prop="resName" label="资源名称" align="center"></el-table-column>
        <el-table-column prop="mainName" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="下载" placement="right">
              <i-button type="text" size="small">
                <Icon type="arrow-down-a" size="20"></Icon>
              </i-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </i-col>
  </Row>
</template>
<script>
  import { globalSearch } from '../../api/httpmethods'

  export default {
    name: 'sitemanage',
    mounted () {},
    data () {
      return {
        formData: {
          ra: '',
          de: '',
          radius: '',
          TBest: '',
          TBest2: '',
          Mbest: '',
          SolID: '',
          Source: '',
          P1: '',
          e_P1: '',
          EpG: '',
          e_EpG: '',
          Gmag: '',
          e_Gmag: '',
          AmpG: '',
          e_AmpG: '',
          NHP1: '',
          R21G: '',
          e_R21G: '',
          phi21G: '',
          e_phi21G: '',
          RAdeg: '',
          DEdeg: ''
        },
        catalogProp: ['TBest'],
        currentTableData: [],
        starCatalogPropList: [{
          label: 'TBest',
          description: 'Best type classification',
          bytes: '1-5'
        }, {
          label: 'TBest2',
          description: 'Best subclassification estimate',
          bytes: '7-12'
        }, {
          label: 'Mbest',
          description: 'Best mode classification estimate',
          bytes: '14-27'
        }, {
          label: 'SolID',
          description: 'Solution ID',
          bytes: '29-46'
        }, {
          label: 'Source',
          description: 'Source ID',
          bytes: '48-66'
        }, {
          label: 'P1',
          description: 'Period',
          bytes: '68-78'
        }, {
          label: 'e_P1',
          description: 'rms uncertainty on P1',
          bytes: '80-90'
        }, {
          label: 'EpG',
          description: 'Epoch of the maximum of the light curve in the G band',
          bytes: '92-104'
        }, {
          label: 'e_EpG',
          description: 'Uncertainty on the epoch parameter EpG',
          bytes: '106-118'
        }, {
          label: 'Gmag',
          description: 'Intensity-averaged magnitude in the G band',
          bytes: '120-126'
        }, {
          label: 'e_Gmag',
          description: 'Uncertainty on Gmag',
          bytes: '128-132'
        }, {
          label: 'AmpG',
          description: 'Peak-to-peak amplitude of the G band light curve',
          bytes: '134-138'
        }, {
          label: ' e_AmpG',
          description: 'Uncertainty on AmpG',
          bytes: '140-144'
        }, {
          label: 'NHP1',
          description: 'Number of harmonics used to model P1 of the light curve',
          bytes: '146-147'
        }, {
          label: 'R21G',
          description: 'Fourier decomposition parameter R21=A2/A1',
          bytes: '148-152'
        }, {
          label: 'e_R21G',
          description: 'Uncertainty on R21G',
          bytes: '154-158'
        }, {
          label: 'phi21G',
          description: 'Fourier decomposition parameter phi21=phi2-2*phi1',
          bytes: '160-164'
        }, {
          label: 'e_phi21G',
          description: 'Uncertainty on phi21G',
          bytes: '166-170'
        }, {
          label: 'RAdeg',
          description: 'Right ascension (ICRS) at epoch 2015.0',
          bytes: '172-185'
        }, {
          label: 'DEdeg',
          description: ' Declination (ICRS) at epoch 2015.0',
          bytes: '187-200'
        }
        ]
      }
    },
    methods: {
      onSubmit () {
        let catalogValues = []
        this.catalogProp.forEach(item => {
          catalogValues.push()
        })
        globalSearch('/global', this.catalogProp)
      },
      selectChange () {

      },
      changeCheckbox (value) {
        value.forEach(item => {
          this.formData[item] = ''
        })
        console.log(value)
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
<style scoped>

</style>
