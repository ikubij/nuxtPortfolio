<template>
    <v-card
        elevation="4"
        shaped
        class="mx-auto pa-4 col-md-6 col-10"
    >
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
            <form>
                <v-progress-linear
                indeterminate
                color="cyan"
                v-if="loading"
                ></v-progress-linear>
            <ValidationProvider v-slot="{ errors }" name="Name" rules="required|max:20">
                <v-text-field
                v-model="form.name"
                :counter="20"
                :error-messages="errors"
                label="Name"
                required
                ></v-text-field>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
                <v-text-field
                v-model="form.email"
                :error-messages="errors"
                label="E-mail"
                required
                ></v-text-field>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Password" rules="required|min:6">
                <v-text-field
                v-model="form.password"
                counter
                :error-messages="errors"
                label="Password"
                required
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
                ></v-text-field>
            </ValidationProvider>
            <!-- <ValidationProvider v-slot="{ errors }" name="select" rules="required">
                <v-select
                v-model="select"
                :items="items"
                :error-messages="errors"
                label="Select"
                data-vv-name="select"
                required
                ></v-select>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors, valid }" rules="required" name="checkbox">
                <v-checkbox
                v-model="checkbox"
                :error-messages="errors"
                value="1"
                label="Option"
                type="checkbox"
                required
                ></v-checkbox>
            </ValidationProvider> -->

            <v-btn 
                class="mr-4"
                @click="register" 
                outlined 
                color="purple"
            >
            submit
            <v-icon right dark small>fas fa-check</v-icon>
            </v-btn>

            <v-btn
                @click="clear"
                outlined 
                color="red"
            >
            clear
            <v-icon right dark small>fas fa-eraser</v-icon>
            </v-btn>
            <v-progress-linear
            indeterminate
            color="cyan"
            class="mt-2"
            v-if="loading"
            ></v-progress-linear>
            </form>
        </ValidationObserver>
    </v-card>
</template>

<script>
  import { required, email, max, min} from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('min', {
    ...min,
    message: '{_field_} may not be less than {length} characters',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

  export default {
    middleware: 'guest',
    
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      form: {
        name: '',
        email: '',
        password: '',
      }, 
      show: false,
      loading:false,
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: null,
    }),

    methods: {
      register () {
        this.loading=true
        this.$refs.observer.validate().then(success => {
            if (success) {
                this.$axios.post('api/auth/register', this.form)
                .then(response => {
                    this.$auth.login({data:this.form})         
                    .then(response => {
                        this.loading=false
                        this.$router.push({name:'projects'})
                    })
                })
            }
        })
        
      },

      clear () {
        this.loading=false
        this.form.name = ''
        this.form.email = ''
        this.form.password = ''
        this.select = null
        this.checkbox = null
        this.$refs.observer.reset()
      },
    },
  }
</script>