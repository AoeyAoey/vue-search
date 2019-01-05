<template>
  <v-layout>
    <v-flex md12>
      <div class="text-center"/>
      <h1>ค้นหาข้อมูล</h1>
      <v-select
        :items="listSelect"
        v-model="cls"
        item-text="text_thai"
        signle-line
        label="ตัวเลือก"
        @change="reset"
      /> 
      <v-text-field 
        v-if="cls==1||cls==2||cls==3||cls==4" 
        v-model="search"
        label="รายเอียดการค้นหา"
      />
      <v-radio-group 
        v-if="cls==5"
        v-model="search"
        row>
        <v-radio 
          label="male" 
          value="male"/>
        <v-radio 
          label="female" 
          value="female"/>
      </v-radio-group>
      <div 
        v-if="cls==6" 
        class="v-form">
        <v-layout>
          <v-flex
            xs12
            md6
          >
            <v-text-field
              v-model="age1"
              label="อายุเริ่มต้น"
              required
            />
          </v-flex>
          &nbsp;
          <v-flex
            xs12
            md6
          >
            <v-text-field
              v-model="age2"
              label="อายุสิ้นสุด"
              required
            />
          </v-flex>
        </v-layout>
      </div>
      <h3>ผลการค้นหาทั้งหมด : {{ search_result.length }}</h3>
      <v-data-table
        :headers="headers"
        :items="search_result"
        :pagination.sync="pagination"
        class="elevation-1"
      >
        <template 
          slot="items" 
          slot-scope="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.first_name }}</td>
          <td>{{ props.item.last_name }}</td>
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.gender }}</td>
          <td>{{ props.item.age }}</td>
        </template>
        <template slot="no-data">
          <v-alert 
            :value="true" 
            color="error" 
            icon="warning">
            ไม่พบข้อมูล :(
          </v-alert>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
  
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: 'id',
          value: 'id'
        },
        { text: 'first_name', value: 'first_name' },
        { text: 'last_name', value: 'last_name' },
        { text: 'email', value: 'email' },
        { text: 'gender', value: 'gender' },
        { text: 'age', value: 'age' }
      ],
      pagination: {
        rowsPerPage: 10
      },
      search: '',
      age1: 0,
      age2: 0,
      cls: '1',
      listSelect: [
        { value: '1', text_en: 'id', text_thai: 'ค้นหาจากไอดี' },
        { value: '2', text_en: 'first_name', text_thai: 'ค้นหาจากชื่อ' },
        { value: '3', text_en: 'last_name', text_thai: 'ค้นหาจากนามสกุล' },
        { value: '4', text_en: 'email', text_thai: 'ค้นหาจากอีเมล' },
        { value: '5', text_en: 'gender', text_thai: 'ค้นหาจากเพศ' },
        { value: '6', text_en: 'age', text_thai: 'ค้นหาจากอายุ/ช่วงอายุ' }
      ],
      dataFetch: []
    }
  },
  computed: {
    search_result() {
      let newArray = this.dataFetch
      let filter = new RegExp(this.search)
      let age1 = this.age1
      let age2 = this.age2
      if (this.cls == 1) {
        //ค้นหาจากไอดี
        newArray = this.dataFetch.filter(function(el) {
          let id = String(el.id)
          return id.match(filter)
        })
      } else if (this.cls == 2) {
        //ค้นหาจากชื่อ
        newArray = this.dataFetch.filter(function(el) {
          return el.first_name.match(filter)
        })
      } else if (this.cls == 3) {
        //ค้นหาจากนามสกุล
        newArray = this.dataFetch.filter(function(el) {
          return el.last_name.match(filter)
        })
      } else if (this.cls == 4) {
        //ค้นหาจากอีเมล
        newArray = this.dataFetch.filter(function(el) {
          return el.email.match(filter)
        })
      } else if (this.cls == 5) {
        //ค้นหาจากเพศ
        filter = this.search
        newArray = this.dataFetch.filter(function(el) {
          return el.gender == filter
        })
      } else if (this.cls == 6) {
        //ค้นหาจากอายุ/ช่วงอายุ
        newArray = this.dataFetch.filter(function(el) {
          let age = String(el.age)
          return age >= age1 && age <= age2
        })
      }
      return newArray
    }
  },
  async created($axios) {
    let res = await this.$axios.get('http://127.0.0.1:5000/')
    this.dataFetch = res.data
  },
  methods: {
    reset() {
      this.search = ''
      this.age1 = ''
      this.age2 = ''
    }
  }
}
</script>
