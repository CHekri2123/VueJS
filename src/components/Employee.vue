<template>
  <v-container>
    <SearchComponent @empDataSender="serachEmpDataReciever($event)" />
    <template>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mb-2" small @click="press()" v-bind="attrs" v-on="on" fab color="indigo">
              <v-icon small>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">User Data</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="name" outlined label="Enter your name" required>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="email" :rules="emailRules" outlined label="Enter your email" required>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="salary" outlined v-addCommas="salary" label="Enter Salary">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-btn color="success" v-model="submitButton" @click="submit()" v-if="boolValue">
                Submit
              </v-btn>
              <v-btn color="success" @click="edit()" v-else>
                Update
              </v-btn>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-form>
      <div>
        <v-simple-table fixed-header>
          <thead>
            <tr>
              <th class="text-left">Name <v-icon v-model="searchNameAscending" @click="searchNameAscendingFunction()">
                  mdi-arrow-down</v-icon>
                <v-icon v-model="searchNameDescending" @click="searchNameDescendingFunction()">mdi-arrow-up</v-icon>
              </th>
              <th class="text-left">Email <v-icon v-model="searchEmailAscending"
                  @click="searchEmailAscendingFunction()">
                  mdi-arrow-down</v-icon>
                <v-icon v-model="searchEmailDescending" @click="searchEmailDescendingFunction()">mdi-arrow-up</v-icon>
              </th>
              <th class="text-left">Salary</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in table" :key="row.name">
              <td>{{row.name}}</td>
              <td>{{row.email}}</td>
              <td>{{row.salary}}</td>
              <td>
                <v-btn fab class="mb-2" small color="cyan" dark @click="update(row)">
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
                <v-btn fab class="mb-2" @click="deleteData(row.name)" small color="pink">
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
    </template>
  </v-container>
</template>

<script>
import API from '../services/api'
var instanceOfItem;
export default {
  name: "EmployeeData",
  data() {
    return {
      salary: '',
      searchNameAscending: '',
      searchNameDescending: '',
      searchEmailAscending: '',
      searchEmailDescending: '',
      email: '',
      name: '',
      valid: '',
      search: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      dialog: false,
      table: "",
      searchTable: "",
      tableData: "",
      flag: false,
      boolValue: true,
      submitButton: true,
    };
  },
  mounted() {
    this.read();
  },
  methods: {
    // addComma(salary) {
    //   this.salary = salary.replace(/\D/g, "")
    //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //   console.log(salary)
    // },
    read() {
      API.get(process.env.VUE_APP_GET_LINK).then(response => {
        // JSON responses are 
        // automatically parsed
        this.table = response.data;
      });
    },
    async submit() {
      const sub = await API.post(process.env.VUE_APP_POST_LINK, {
        name: this.name,
        email: this.email,
        salary: this.salary
      });
      console.log(sub);
      this.read();
      this.dialog = false;
    },
    press() {
      this.boolValue = true;
    },
    async update(row) {
      this.boolValue = false;
      instanceOfItem = row;
      this.name = row.name;
      this.email = row.email;
      this.salary = row.salary;
      this.dialog = true;
      this.submitButton = false;
    },
    async edit() {
      instanceOfItem.name = this.name;
      instanceOfItem.email = this.email;
      instanceOfItem.salary = this.salary;
      await API.put(`${process.env.VUE_APP_PUT_LINK}/${instanceOfItem.name}`, {
        name: instanceOfItem.name,
        email: instanceOfItem.email,
        salary: instanceOfItem.salary
      });
    },
    async deleteData(name) {
      await API.delete(`${process.env.VUE_APP_DELETE_LINK}/${name}`);
      this.read();
    },
    serachEmpDataReciever(value) {
      this.table = value.data
      console.log(value)
    },
    async searchNameAscendingFunction() {
      console.log("Ascending Button CLicked")
      const searchAscendingResult = await API.get(`http://127.0.0.1:3333/sortByAscending`).then(response => {
        this.table = response.data
      });
      console.log(searchAscendingResult)
    },
    async searchEmailAscendingFunction() {
      console.log("Ascending Button CLicked")
      const searchEmailAscendingFunction = await API.get(`http://127.0.0.1:3333/sortByAscending`).then(response => {
        this.table = response.data
      });
      console.log(searchEmailAscendingFunction)
    },
    async searchNameDescendingFunction() {
      console.log("Descendng Button CLicked")
      const searchDescendingResult = await API.get(`http://127.0.0.1:3333/sortByDescending`).then(response => {
        this.table = response.data
      });
      console.log(searchDescendingResult)
    },
    async searchEmailDescendingFunction() {
      console.log("Descendng Button CLicked")
      const searchEmailDescendingFunction = await API.get(`http://127.0.0.1:3333/sortByDescending`).then(response => {
        this.table = response.data
      });
      console.log(searchEmailDescendingFunction)
    }
  },

}
</script>
