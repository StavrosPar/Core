<template >
  <div>
    <!-- <center><h1>Comming Soon</h1></center> -->
    <v-container fluid>
      <v-layout justify-center class="my-5">
        <v-flex xs12 sm6>
          <div style="background-color: #78909c; padding :20px;">
            <h2 style="  text-align: center; color:white;">{{user.name}} 's profile</h2>
          </div>
          <v-card id="contP">
            <v-container>
              <v-layout row wrap class="mb-4 ma-4">
                <div>
                  <img src="static/person.png" height="200" />
                </div>
                <div style="margin-left:10%;">
                  <p>
                    Name :
                    <input
                      :disabled="disabled == 0 ? true : false"
                      v-model="name"
                      required
                      type="text"
                    />
                  </p>
                  <p>
                    Surname :
                    <input
                      :disabled="disabled == 0 ? true : false"
                      v-model="surname"
                      required
                      type="text"
                    />
                  </p>
                  <p>
                    Email :
                    <input disabled v-model="email" required type="text" />
                  </p>

                  <p>
                    Type :
                    <input disabled v-model="type" required type="text" />
                  </p>
                  <p>
                    Section :
                    <input disabled v-model="section" required type="text" />
                  </p>
                  <p>
                    Lesson :
                    <input disabled v-model="lesson" required type="text" />
                  </p>
                </div>
              </v-layout>
              <v-btn
                v-if="!disabled"
                @click="disabled = (disabled + 1) % 2"
                class="right align blue lighten-3"
              >Edit</v-btn>
              <v-btn v-if="disabled" @click="update" class="right align blue lighten-3">Update</v-btn>
              <v-btn v-if="disabled" @click="back" class="right align red lighten-3">Back</v-btn>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: 0,
      name: this.$store.getters.user.name,
      surname: this.$store.getters.user.surname,
      email: this.$store.getters.user.email,
      type: this.$store.getters.user.type,
      section: this.$store.getters.user.sectionLVL,
      lesson: this.$store.getters.user.lessonLVL
    };
  },
  mounted: function() {},
  computed: {
    user() {
      return this.$store.getters.user;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {},
  methods: {
    back() {
      this.disabled = (this.disabled + 1) % 2;
      this.name = this.$store.getters.user.name;
      this.surname = this.$store.getters.user.surname;
    },
    update() {
      this.disabled = (this.disabled + 1) % 2;
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#vcont {
  height: 100vh;
  background-color: #e1ecf1;
}
#contP {
  background-color: white;
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#float {
  position: fixed;
  bottom: 5%;
  right: 1%;
}
</style>