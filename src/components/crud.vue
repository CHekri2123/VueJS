<template>
    <v-data-table :headers="headers" :items="users" sort-by="email" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>User Profile</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="900px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                            <v-icon dark>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field outlined v-model="editedUser.name" label="Enter your Name">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field outlined v-model="editedUser.email" label="Enter your email">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field outlined v-model="editedUser.phno" label="Enter your phone no">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedUser.address" label="Enter your address">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-autocomplete v-model="editedUser.hob" :items="hobbyData" label="Hobbies"
                                            multiple>
                                        </v-autocomplete>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">
                                Cancel
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteUserConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editUser(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteUser(item)">
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
</template>

<script>
export default {
    name: 'HomeWorld',
    data: () => ({
        dialog: false,
        dialogDelete: false,
        hobbyData: ['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump'],
        headers: [
            {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            { text: 'Email', value: 'email' },
            { text: 'Ph No', value: 'phno' },
            { text: 'Address', value: 'address' },
            { text: 'Hobbies', value: 'hob' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        users: [],
        editedIndex: -1,
        editedUser: {
            name: '',
            email: '',
            phno: '',

            hob: [],
            address: '',
        },
        defaultUser: {
            name: '',
            email: '',
            phno: '',

            hob: [],
            address: '',
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Add User' : 'Edit User'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },

    methods: {


        editUser(item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedUser = Object.assign({}, item)
            this.dialog = true
        },

        deleteUser(item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedUser = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteUserConfirm() {
            this.users.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedUser = Object.assign({}, this.defaultUser)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedUser = Object.assign({}, this.defaultUser)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.users[this.editedIndex], this.editedUser)
            } else {
                this.users.push(this.editedUser)
            }
            console.log(this.users);
            this.close()
        },
        update(){

        },
    },
}
</script>