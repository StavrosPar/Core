<template>
    <!-- <v-dialog
      v-model="dialog"
      max-width="400"
    > -->
  <v-container fluid  >
    <v-layout row  v-if="error">
      <v-flex xs12 sm6 offset-sm3 >
        <app-alert  @dismissed="onDismissed" :text="error.message"></app-alert>  
      </v-flex>
    </v-layout>   
    <v-layout row   >
      <v-flex xs12 sm6 offset-sm3>
        <div style="background-color: #547c9e; padding :20px;   ">
          <h2  style="  text-align: center; color:white;"> Sign In to Play   </h2>
        </div>
        <v-card id="frmIN">
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin" >
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="email"  label="Mail" id="email" v-model="email" type="email" required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="password" label="Password" id="password" v-model="password" type="password" required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                 <v-flex xs12>
                    <v-btn type="submit" :disabled="loading" :loading="loading" id="btnIN">
                      Sign in
                      <span slot="loader" class="custom-loader">
                        <v-icon light >cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
                  <div style="padding-top :20px;  ">
                    <p >You Don't have an account <a href="/signup">Sign up</a> </p>
                  </div> 
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
<!-- </v-dialog> -->
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
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
    onSignin() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password
      });
    },
    onDismissed() {
      console.log("Dismissed Alert!");
      this.$store.dispatch("clearError");
    }
  }
};

//#7a97a9
</script>

<style>
#vcont{
  height: 100vh;  
  background-color:#e1ecf1;
}

#btnIN {
  background-color: #547c9e;
  color: white;
}
#frmIN {
  background-color: white;
}
</style>
