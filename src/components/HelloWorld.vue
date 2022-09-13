<template>
  <v-app>
    <v-app-bar app height="50px">
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
                  <v-text-field v-model="name" :rules="nameRules" outlined label="Enter your name" required>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="email" :rules="emailRules" outlined label="Enter your email" required>
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
    </v-app-bar>
    <div>
      <v-simple-table fixed-header>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in table" :key="row.name">
            <td>{{row.name}}</td>
            <td>{{row.email}}</td>
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
  </v-app>
</template>

<script>
import axios from 'axios';
var instanceOfItem;
export default {
  name: 'HelloWorld',
  data() {
    return {
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      dialog: false,
      table: undefined,
      tableData: '',
      flag: false,
      boolValue: true,
      submitButton: true,
    }
  },
  mounted() {
    axios.get(
      `http://127.0.0.1:3333/displayData`)
      .then(response => {
        // JSON responses are 
        // automatically parsed
        this.table = response.data
      })
    console.log(this.table)

  },
  methods: {
    read() {
      axios.get(
        `http://127.0.0.1:3333/displayData`).then(response => {
          // JSON responses are 
          // automatically parsed
          this.table = response.data
        })
    },
    async submit() {
      await axios.post(`http://127.0.0.1:3333/insertData`, {
        name: this.name,
        email: this.email
      })
      this.read()
      this.dialog = false
    },
    press() {
      this.boolValue = true
    },

    async update(row) {
      this.boolValue = false;
      instanceOfItem = row;
      this.name = row.name
      this.email = row.email
      this.dialog = true;
      this.submitButton = false;
    },

    async edit() {
      instanceOfItem.name = this.name
      instanceOfItem.email = this.email
      await axios.put(`http://127.0.0.1:3333/updateData/${instanceOfItem.name}`, {
        name: instanceOfItem.name,
        email: instanceOfItem.email
      })
    },
    async deleteData(name) {
      await axios.delete(`http://127.0.0.1:3333/deleteData/${name}`)
      this.read()
    },
  }

}
</script>
