<!-- =========================================================================================================================================================== --> 
<template>
  <v-container fluid>
    <loader v-if="loading"></loader>

    <v-container fluid>
      <div class="bloc1">
        <v-breadcrumbs :items="breadCrum()" divider=">"></v-breadcrumbs>
      </div>
      <div class="bloc2">
        <div class="tooltip">
          Info
          <v-icon>info</v-icon>
          <span class="tooltiptext">If there are no Chapters you begin immediately</span>
        </div>
      </div>
    </v-container>

    <!-- <v-divider inset></v-divider> -->

    <v-container fluid>
      <div class="title" style="display: flex; justify-content: center;  align-items: center;">
        <h1 style="font-size:50px;  ">Lessons</h1>
      </div>
      <div xs12 sm10 md5 lg4 style="display: flex; justify-content: center;  align-items: center;">
        <h3 style="font-size:20px;  ">{{progressNum()}} are completed</h3>
      </div>
      <div style="display: flex; justify-content: center;  align-items: center;">
        <v-progress-linear color="#78909c" style="width:40%;" v-model="progressBarSt"></v-progress-linear>
      </div>
    </v-container>

    <v-container v-if="!loading">
      <v-layout row wrap>
        <v-flex xs12 v-if="lessons[0]===undefined">
          <v-card class="mt-5" width="50%" style="margin:auto">
            <v-card-title class="headline">No Data Available</v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!--===================================================================small screen + phone============================================================== -->
    <v-timeline dense xs12 sm10 md5 lg4 class="hidden-md-and-up">
      <v-timeline-item
        v-for="(lesson, i) in lessons"
        :key="i"
        :color="colorStatus(i+1,lesson.moduleParentId)"
        medium
      >
        <v-card xs12 class="mb-3 ma-3" id="contS">
          <v-toolbar id="tool" dark>
            <v-toolbar-title id="toolbartitle">{{lesson.title}}</v-toolbar-title>
          </v-toolbar>
          <v-container fluid>
            <v-card-text>
              <div>
                <h3>Lesson :{{i+1}}</h3>
                <p class="a" style="text-align:justify">
                  Description: {{lesson.description}}
                  <br>
                </p>
              </div>
            </v-card-text>
          </v-container>
          <v-container fluid style="align-items:center; display:flex; justify-content:center; ">
            <v-flex xs6 style="position:absolute; bottom:5%; ">
              <v-btn
                medium
                id="lmbtn"
                :disabled="lessonStatus(i+1,lesson.moduleParentId)"
                @click="loadChapters(lesson.parentId,lesson.moduleParentId,i+1 )"
              >{{textButton(i)}}</v-btn>
            </v-flex>
          </v-container>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <!-- =======================================================================Big screens================================================================= -->
    <v-timeline align xs12 sm10 md5 lg4 class="hidden-sm-and-down">
      <v-timeline-item
        v-for="(lesson, i) in lessons"
        :key="i"
        :color="colorStatus(i+1,lesson.moduleParentId)"
        large
      >
        <span slot="opposite">Lesson {{i+1}}</span>
        <v-card xs12 class="mb-5 ma-5" id="contS">
          <v-toolbar id="tool" dark>
            <v-toolbar-title id="toolbartitle">{{lesson.title}}</v-toolbar-title>
          </v-toolbar>
          <v-container fluid>
            <v-card-text>
              <div>
                <p class="a" style="text-align:justify">
                  {{lesson.description}}
                  <br>
                </p>
              </div>
            </v-card-text>
          </v-container>
          <v-container fluid style="align-items:center; display:flex; justify-content:center; ">
            <v-flex xs6 style="position:absolute; bottom:5%; ">
              <v-btn
                medium
                id="lmbtn"
                :disabled="lessonStatus(i+1,lesson.moduleParentId)"
                @click="loadChapters(lesson.parentId,lesson.moduleParentId,i+1)"
              >{{textButton(i)}}</v-btn>
            </v-flex>
          </v-container>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <!-- =================================================================================================================================================== -->
  </v-container>
</template>

<script>
import Module from "@/components/Browse/Module";
export default {
  //name: "App",
  // components: {
  //   Module
  // },
  data() {
    return {
      valueDeterminate: 0
    };
  },
  // mounted: {},
  computed: {
    lessons() {
      return this.$store.getters.lessons;
    },
    loading() {
      return this.$store.getters.loading;
    },
    user() {
      return this.$store.getters.user;
    },
    modules() {
      return this.$store.getters.modules;
    },
    pathModuleLVL(){
      return this.$store.getters.pathModuleLVL;
    },

    //compute the progress for the status bar
    progressBarSt() {
      var pathModule =this.pathModuleLVL;

      var curModule = this.modules[pathModule]; //to module apo pou hr8a
      var curModNumLess = this.modules[pathModule].numLessons; //posa einai ta lessons
      var mylessonlvl = this.user.lessonLVL; //to lesson lvl tou xrhsth
      var mymodulelvl = this.user.moduleLVL; //to module lvl tou xrthsh
      var lessonsOfModule = this.lessons; //ola ta paidia tou module
      var mylessonlvlID; //to lesson lvl tou xrhsth  me basei to id

      if (mymodulelvl > pathModule) {
        return (this.valueDeterminate = 100);
      } else if (mymodulelvl === pathModule) {
        mylessonlvlID = this.myLVL(curModNumLess, mylessonlvl, lessonsOfModule);
        var stat = ((mylessonlvlID - 1) / curModNumLess) * 100;
        return (this.valueDeterminate = Math.round(stat * 100) / 100);
      }
    }
  },
  watch: {},

  methods: {
    textButton(i) {
      var lessonsi = this.lessons;
      if (lessonsi[i].numChapters === 1) {
        return "Begin";
      } else {
        return "Chapters";
      }
    },
    loadChapters(lessonParentId, moduleParentId, LessonClicked) {
      var lessonsOfModule = this.lessons; //ola ta paidia tou
      //console.log("lessonsOfModule--",lessonsOfModule);
      var lesClickedNumChap = lessonsOfModule[LessonClicked - 1].numChapters; //posa chapter exei to to lesson pou pathsa
      console.log("lesson clicked-->", LessonClicked);
      console.log("lesson ParentId clicked-->",lessonsOfModule[LessonClicked - 1].parentId);
      console.log("lesson numChaptes clicked-->", lesClickedNumChap);
      console.log("title",lessonsOfModule[LessonClicked - 1].title);

      if (lesClickedNumChap === 1) {
        this.$store.dispatch("getPathModuleLVL", moduleParentId);
        this.$store.dispatch("getPathLessonLVL", lessonParentId);
        this.$store.dispatch("getPathChapterLVL", -1);
        this.$store.dispatch("getPathSectionLVL", -1);
        // this.$router.push("/" + moduleParentId + "/" + lessonParentId + "/" + -1 + "/" + -1);
        this.$store.dispatch("getPdfTitle",lessonsOfModule[LessonClicked - 1].title);
        this.$store.dispatch("getMultipleChoiseQ");
        this.$store.dispatch("getCodeQuestion"); 
        this.$router.push("/lecture");
      } else {
        this.$store.dispatch("getPathModuleLVL", moduleParentId);  
        this.$store.dispatch("getPathLessonLVL", lessonParentId);
        this.$store.dispatch("getChapters", lessonParentId);
        this.$router.push("/" + moduleParentId + "/" + lessonParentId + "/");
      }
    },

    //compute the progress for the  num status
    progressNum() {
      var pathModule =this.pathModuleLVL;

      var curModNumLess = this.modules[pathModule].numLessons; //posa einai ta lessons
      //console.log("curModNumLess--",curModNumLess);
      var mylessonlvl = this.user.lessonLVL; //to lesson lvl tou xrhsth
      //console.log("mylessonlvl--",mylessonlvl);
      var mymodulelvl = this.user.moduleLVL; //to module lvl tou xrthsh
      //console.log("mymodulelvl--",mymodulelvl);
      var lessonsOfModule = this.lessons; //ola ta paidia tou module
      //console.log("lessonsOfModule--",lessonsOfModule);
      var mylessonlvlID; //to lesson lvl tou xrhsth  me basei to id

      if (mymodulelvl > pathModule) {
        return curModNumLess + "/" + curModNumLess;
      } else if (mymodulelvl == pathModule) {
        mylessonlvlID = this.myLVL(curModNumLess, mylessonlvl, lessonsOfModule);
        return mylessonlvlID - 1 + "/" + curModNumLess;
      }
    },
    //Makes the Breadcrumbs path
    breadCrum() {
      var pathModule =this.pathModuleLVL;

      var items = [
        {
          text: "Java",
          disabled: false
          // href: '/startcourse'
        },
        {
          text: "Module " + (pathModule + 1),
          disabled: false
          //  href: '/module'
        },
        {
          text: "Lessons",
          disabled: false
        }
      ];
      return items;
    },

    //Disables or enables the button depending the progress
    lessonStatus(LessonId, currentModule) {
      var userLessonLvl = this.user.lessonLVL; //user lessonlvl
      var userModule = this.user.moduleLVL; //user modulelvl

      var curModule = this.modules[userModule];
      var lessonsOfModule = this.lessons;

      if (userModule > currentModule) {
        return false;
      } else if (userModule === currentModule) {
        if (userLessonLvl >= lessonsOfModule[LessonId - 1].parentId) {
          return false;
        } else if (userLessonLvl < lessonsOfModule[LessonId - 1].parentId) {
          return true;
        }
      }
    },

    //Gives color to the timeline cicles depending the progress
    colorStatus(LessonId, currentModule) {
      var userLessonLvl = this.user.lessonLVL; //user lessonlvl
      var userModule = this.user.moduleLVL; //user modulelvl

      var curModule = this.modules[userModule]; // to module apo pou hr8e
      var lessonsOfModule = this.lessons; //einai ola ta lessons pou exoun patera to  module to current

      if (userModule > currentModule) {
        return "green lighten-2";
      } else if (userModule === currentModule) {
        if (lessonsOfModule[LessonId - 1].parentId < userLessonLvl) {
          return "green lighten-2";
        } else if (lessonsOfModule[LessonId - 1].parentId == userLessonLvl) {
          return "orange lighten-2";
        } else {
          return "red lighten-2";
        }
      }
    },
    myLVL(curModNumLess, mylessonlvl, lessonsOfModule) {
      if (lessonsOfModule.length !== 0) {
        // console.log(lessonsOfModule);
        // console.log(lessonsOfModule[0].parentId);
        for (var i = 0; i < curModNumLess; i++) {
          //console.log(mylessonlvl," === ",Number(lessonsOfModule[i].parentId));
          if (mylessonlvl === Number(lessonsOfModule[i].parentId)) {
            return lessonsOfModule[i].id;
          }
        }
      }
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#contS {
  background-color: white;
}
#lmbtn {
  color: white;
  background-color: #547c9e;
  width: 120px;
  height: 40px;
  font-size: 17px;
  text-transform: none;
}
#tool {
  height: 60px;
  display: flex;
  justify-content: center;
  background-color: #547c9e;
}
#toolbartitle {
  white-space: normal;
  margin-top: -5px;
  font-size: 20px;
  font-weight: normal;
  font-family: "Times New Roman", Times, serif;
}
p {
  color: #596265;
  text-align: justify;
  font-weight: bold;
  font-family: "Times New Roman", Times, serif;
  font-size: 17px;
}
p.a {
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
p.a:hover {
  white-space: pre-wrap;
  overflow: visible;
}
span {
  font-family: "Times New Roman", Times, serif;
  font-weight: bold;
  font-size: 20px;
  color: #596265;
}
h1,
h2,
h3 {
  font-weight: normal;
  font-family: "Times New Roman", Times, serif;
  color: #596265;
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

.bloc1 {
  float: left;
}
.bloc2 {
  float: right;
}
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px #547c9e;
  font-family: "Times New Roman", Times, serif;
  font-size: 20px;
  font-weight: normal;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 230px;
  background-color: #547c9e;
  color: rgb(255, 255, 255);
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: -5px;
  right: 110%;
  font-family: "Times New Roman", Times, serif;
  font-size: 18px;
  font-weight: normal;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 35%;
  left: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent transparent #547c9e;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
