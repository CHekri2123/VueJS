<template>
  <v-app>
    <v-main>
      <EmployeeData />
    </v-main>
  </v-app>
</template>

<script>
import EmployeeData from './components/Employee.vue';

export default {
  name: 'App',

  components: {
    EmployeeData,
},

  data: () => ({
    //
  }),
};
</script>
