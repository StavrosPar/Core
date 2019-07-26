<template >
  <v-content style="padding: 0px 0px 0px;">
    <v-snackbar
      v-model="snackbar"
      multi-line="multi-line"
      right="right"
      :timeout="timeout"
      top="top"
      color="orange"
    >
      <v-icon>warning</v-icon>
      {{text}}
      <v-btn color="white" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <center>
      <v-flex xs12 sm10 md6 lg4>
        <p id="spl">Select the Programming language you want to learn</p>
        <v-select solo :items="itemList()" v-model="selected" label="Select language" id="sel"></v-select>
      </v-flex>
    </center>

    <p
      v-if="selected!=undefined"
      class="text-xs-center"
      id="titl"
      xs12
      sm10
      md6
      lg4
    >Learn how to programm in {{selected}} in a course</p>
    <div v-if="selected!=undefined" class="action" xs12 sm10 md6 lg4>
      <div class="call-button-container">
        <v-btn round id="mbtn" @click="loadCourse(selected)">Let' s Begin</v-btn>
      </div>
    </div>

    <p v-if="selected!=undefined" class="text-xs-center" id="chtitl" xs12 sm10 md6 lg4>
      <span style="color:#bf810d">Or</span>
      <br />Complete it at once
    </p>
    <div v-if="selected!=undefined" class="action2" xs12 sm10 md6 lg4>
      <div class="call-button-container">
        <v-btn round id="mbtn2" @click="loadChallengeCourse(selected)">Challenge</v-btn>
      </div>
    </div>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      selected: undefined,
      snackbar: false,
      timeout: 2000,
      text: "Course doesn't exist yet"
    };
  },
  mounted: function() {
    this.$store.dispatch("getCourse");
  },
  computed: {
    courses() {
      return this.$store.getters.course;
    }
  },
  methods: {
    itemList() {
      var temp = [];
      this.$store.getters.course.forEach(element => {
        temp.push(element.name);
      });
      return temp;
    },
    loadCourse(selected) {
      if (selected == "Java") {
        this.$router.push("/module/");
      } else {
        this.snackbar = true;
      }
    },
    loadChallengeCourse(selected) {
      if (selected == "Java") {
        this.$store.dispatch("getChallengeOnceMCQ");
        this.$store.dispatch("getChallengeOnceCQ");
        this.$router.push("/challengeCourse");
      } else {
        this.snackbar = true;
      }
    }
  }
};
</script>

<style>
/*
"static/codestart.png"
style="padding:0px; "
 style="padding: 0px 0px 0px;" 
*/

#mbtn {
  width: 200px;
  height: 60px;
  font-size: 22px;
  text-transform: none;
  font-family: "Times New Roman", Times, serif;
  color: white;
  background-color: #547c9e;
  box-shadow: 0 0 40px rgba(84, 124, 158, 0.4), 0 0 40px rgba(84, 124, 158, 0.4);
}
#mbtn:hover {
  box-shadow: 0 0 50px rgba(84, 124, 158, 1), 0 0 50px rgba(84, 124, 158, 1);
}

#mbtn2 {
  width: 200px;
  height: 60px;
  font-size: 22px;
  text-transform: none;
  font-family: "Times New Roman", Times, serif;
  color: white;
  background-color: #369ac1;
  box-shadow: 0 0 40px rgba(54, 154, 193, 0.4), 0 0 40px rgba(54, 154, 193, 0.4);
}
#mbtn2:hover {
  box-shadow: 0 0 50px rgba(54, 154, 193, 0.75),
    0 0 50px rgba(54, 154, 193, 0.75);
}

.action {
  display: flex;
  align-items: center;
  justify-content: center;
  /*  height: 10vh;*/
}
.action2 {
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 10vh; */
}

#titl {
  color: #547c9e;
  /* height: 10vh; */
  font-size: 30px;
  font-family: "Times New Roman", Times, serif;
  margin-top: 30px;
  text-align: justify;
}
#chtitl {
  color: #547c9e;
  /* height: 5vh; */
  font-size: 30px;
  font-family: "Times New Roman", Times, serif;
  margin-top: 30px;
  text-align: justify;
}
#spl {
  color: #547c9e;
  font-size: 40px;
  font-family: "Times New Roman", Times, serif;
  margin-top: 30px;
}
</style>
