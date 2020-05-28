<template>
    <v-card
        elevation="4"
        shaped
        class="mx-auto pa-4 col-md-6 col-10"
    ><p>Authenticated -> {{authenticated}}</p>
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
            <form>
                <v-progress-linear
                indeterminate
                color="cyan"
                v-if="loading"
                ></v-progress-linear>
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

            <v-btn 
                class="mr-4"
                @click="login" 
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
        email: '',
        password: '',
      }, 
      previousPage:null,
      show: false,
      loading:false,
    }),
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.previousPage = from
      })
    },

    methods: {
      login () {
        this.loading=true
        this.$refs.observer.validate().then(success => {
            if (success) {
              // this.$auth.login({data:this.form}) 
              this.$axios.post('api/auth/login', this.form)   
              .then(response => {
                console.log(response)
                  this.loading=false
                  if(this.previousPage.name!='about' && this.previousPage!==null){
                    this.$router.back()
                  }else{
                    this.$router.push({name:'about'});         
                  }
              })
            }
        })
        
      },

      clear () {
        console.log(this.$auth.user)
        this.loading=false
        this.form.email = ''
        this.form.password = ''
        this.$refs.observer.reset()
      },

      async fetchuser(){
        return await this.$auth.fetchUser()
      }
    },
  }
</script>