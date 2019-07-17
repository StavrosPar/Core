<template>
    <v-container fluid >
      <v-layout row  v-if="error">
        <v-flex xs12 sm6 offset-sm3>
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </v-flex>
      </v-layout>
      <v-layout row  class="my-5">
        <v-flex xs12 sm6 offset-sm3>
          <div style="background-color: #547c9e; padding :20px;   ">
            <h2  style="  text-align: center; color:white;">Welcome <br>Sign Up and Play !!! </h2>
          </div>
          <v-card id="frmUP">
            <v-card-text>
              <v-container>
                <form  @submit.prevent="onSignup">   
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field name="name" label="Name" id="name" v-model="name" type="text" required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field name="surname" label="Surname" id="surname" v-model="surname" type="text" required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field name="email" label="Mail" id="email" v-model="email" type="email" required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field name="password" label="Password" id="password" v-model="password" type="password" required></v-text-field>
                    </v-flex>
                  </v-layout> 
                  <v-layout row>
                   <v-flex xs12>
                      <v-text-field name="confirmPassword" label="Confirm Password" id="confirmPassword" v-model="confirmPassword" type="password" :rules="[comparePasswords]"></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-btn type="submit" :disabled="loading" :loading="loading" id="btnUP">
                        Sign up
                        <span slot="loader" class="custom-loader">
                          <v-icon light >cached</v-icon>
                        </span>
                      </v-btn>
                    </v-flex>
                  </v-layout> 
                  <div style="padding-top :20px;  ">
                    <p >Already have an account <a href="/signin">Sign in</a> </p>
                  </div>                                                    
                </form>
              </v-container>  
            </v-card-text>
          </v-card>      
        </v-flex> 
      </v-layout>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  computed: {
    //compares and checks if passwords are same
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Password do not match"
        : "";
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onSignup() {
      //VueX
      console.log({
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        name: this.name,
        surname: this.surname
      });
      if( this.password == this.confirmPassword){
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password,
        name: this.name,
        surname: this.surname
      });
      }
    },
    onDismissed() {
      console.log("Dismissed Alert!");
      this.$store.dispatch("clearError");
    }
  }
};
</script>

<style>
#vcont{
  height: 100vh;  
  background-color:#e1ecf1;
}
#btnUP {
  background-color: #547c9e;
  color: white;
}
#frmUP {
  background-color: white;
}
</style>
