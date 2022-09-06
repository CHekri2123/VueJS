<template>

  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card width="600px" elevation="0">
      <v-card-title class="justify-center">Login Form</v-card-title>
      <v-row justify="center" align="center">
        <v-col>
          <p class="text-end">Name</p>
        </v-col>
        <v-col>
          <v-text-field outlined v-model="name" :rules="nameRules" :counter="10" label="Enter your name" required>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="text-end">Email</p>
        </v-col>
        <v-col>
          <v-text-field outlined v-model="email" :rules="emailRules" label="Enter your email" required>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="text-end">Ph No.</p>
        </v-col>
        <v-col>
          <v-text-field outlined v-model="phone" :rules="phoneRules" label="Enter your mobile no." required>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="text-end">Gender</p>
        </v-col>
        <v-col>
          <v-radio-group v-model="gender" row>
            <v-radio label="Male" value="Male"></v-radio>
            <v-radio label="Female" value="Female"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="text-end">city</p>
        </v-col>
        <v-col>
          <v-select v-model="city" :items="cityNames" label="Select the city"></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="text-end">Hobbies</p>
        </v-col>
        <v-col>
          <v-row>
            <v-col>
              <v-checkbox v-model="Hobbies" label="Cricket" value="Cricket" hide-details></v-checkbox>
              <v-checkbox v-model="Hobbies" label="Badminton" value="Badminton" hide-details></v-checkbox>
              <v-checkbox v-model="Hobbies" label="Football" value="Football" hide-details></v-checkbox>
            </v-col>
            <v-col>
              <v-checkbox v-model="Hobbies" label="Base-ball" value="Base-ball" hide-details></v-checkbox>
              <v-checkbox v-model="Hobbies" label="Reading" value="Reading" hide-details></v-checkbox>
              <v-checkbox v-model="Hobbies" label="Videogames" value="Videogames" hide-details></v-checkbox>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-card-actions class="justify-center">
        <v-btn color="primary" :disabled="!valid" @click="validate">Submit</v-btn>
      </v-card-actions>
    </v-card>

  </v-form>

</template>


<script>
export default {

  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    phone: '',
    phoneRules: [v => !!v || 'Phone no. is required',
    v => v.length >= 10 || 'phone number must not be less than 10 characters',],
    gender: '',
    city: '',
    cityNames: ['Chennai', 'Bangalore', 'Delhi'],
    Hobbies: ['Cricket', 'Badminton', 'Football', 'Base-ball', 'Reading', 'Videogames']
  }),
  methods: {
    validate() {
      this.$refs.form.validate()
      const array = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        gender: this.gender,
        city: this.city,
        Hobbies: this.Hobbies,
      }
      console.log(JSON.stringify(array))
    }
  },
}
</script>
