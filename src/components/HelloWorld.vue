<template>
  <v-container>
    <v-row>
      <v-col cols="11">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">Name</th>
                <th class="text-center">Email</th>
                <th class="text-center">Ph. No</th>
                <th class="text-center">Hobbies</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="entry in records" :key="entry">
                <td class="text-center">{{entry.name}}</td>
                <td class="text-center">{{entry.email}}</td>
                <td class="text-center">{{entry.number}}</td>
                <td class="text-center">{{entry.hobbies}}</td>
                <td class="text-center">
                  <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="indigo" class="ml-2" fab dark v-bind="attrs" v-on="on">
                        <v-icon small>
                          mdi-pencil
                        </v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">User Registartion form</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model='namee' label="Enter your name" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model='emaill' label="Enter your email" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model='numberr' label="Enter your mobile no" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-autocomplete v-model="hobbiess" :items="items" label="Interests" multiple>
                              </v-autocomplete>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">
                          Close
                        </v-btn>

                        <v-btn color="blue darken-1" text @click="edit">
                          Update
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col cols="1">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="indigo" class="ml-2" fab dark v-bind="attrs" v-on="on">
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">User Registartion form</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model='name' label="Enter your name" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model='email' label="Enter your email" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model='number' label="Enter your mobile no" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete v-model="hobbies" :items="items" label="Interests" multiple></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>

              <v-btn color="blue darken-1" text @click="submit">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {


  data: () => ({
    dialog: false,
    name: '',
    email: '',
    number: '',
    records: [],
    hobbies: [],
    items: ['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump'],
  }),
  methods: {
    submit() {
      this.records.push({
        name: this.name,
        email: this.email,
        number: this.number,
        hobbies: this.hobbies
      })
      console.log(this.records);
      this.dialog = false
    },
    edit() {
      this.records[this.entry] = {
        namee: this.name,
        email: this.email,
        number: this.number,
        hobbies: this.hobbies
      }
      console.log(this.records);
      this.dialog = false
    },

  }

}


</script>
