<template>
 <v-container fluid>
    <loader v-if="loading"></loader> 
    <v-container fluid>   
      <div class="bloc1" >
        <v-breadcrumbs :items="breadCrum()" divider=">"></v-breadcrumbs>
      </div>
      <div class="bloc2">
        <div class="tooltip" >Info <v-icon>info</v-icon>
          <span class="tooltiptext">- If there are no Lessons you begin immediately. <br>- Challenge mode you do the entire Module. </span>
        </div>
      </div>   
    </v-container> 
    <v-container fluid>    
      <div xs12 sm10 md5 lg4  style="text-align:center">
        <h1 style="font-size:50px; ">Modules</h1>  
        <h3 style="font-size:20px;  "> {{user.moduleLVL}}/{{$store.getters.maxModule}}  are completed</h3>
      </div>   
      <div style="display: flex; justify-content: center;  align-items: center;" >   
        <v-progress-linear color="#78909c" style="width:40%; " v-model="progressBarSt" > </v-progress-linear>
      </div>
    </v-container>
    <v-container v-if="!loading">
        <v-flex xs12 v-if="modules[0]===undefined">
          <v-card class="mt-5" width="50%" style="margin:auto">
            <v-card-title class="headline">
              No Data Available
            </v-card-title>
          </v-card>
        </v-flex>   
    </v-container> 
    <v-layout row wrap>
        <v-flex xs12 sm10 md6 lg4 v-for="(module, i) in modules" v-bind:key="i">
          <v-card xs12 id="contC" class=" mb-2  ma-2"     >
            <v-toolbar id="tool" :color="colorStatus(i )" dark>
              <v-toolbar-title  id="toolbartitle"> {{i+1}} → {{module.title}}  </v-toolbar-title>
            </v-toolbar>
            <v-container fluid  >
              <v-card-text>
                <div>
                  <p  class="a">  {{module.description}} <br> </p>   
                </div>
              </v-card-text>
            </v-container>             
            <v-container  fluid style="align-items:center; display:flex; justify-content:center; ">
              <v-layout row wrap  style="position:absolute; bottom:5%; ">
                <v-flex xs6   >
                  <v-btn medium id="smbtn1" :disabled="!(i<=user.moduleLVL)" @click="loadLessons(i)">
                    {{textButton(i)}}
                  </v-btn>
                </v-flex>
                <v-flex xs6   >
                  <v-btn medium id="smbtn2" :disabled="!(i<=user.moduleLVL)" @click="loadChallengeModule(i)"  >
                    Challenge 
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>                      
          </v-card>
          
        </v-flex>
      </v-layout>

     
    </v-container>
</template>

<script>

export default {
  
  data() {
    return {
      valueDeterminate: null,   
    };
  },
  mounted: function() {
    this.$store.dispatch("getModules");
  },
  computed: {
    modules() {
      return this.$store.getters.modules;
    },
    loading() {
      return this.$store.getters.loading;
    },
    user(){
      return this.$store.getters.user ;
    },
    //compute the progress for the status bar
    progressBarSt(){  
      var stat = ((this.$store.getters.user.moduleLVL )/this.$store.getters.maxModule)*100;
     // console.log(Math.round(stat * 100) / 100);
      return this.valueDeterminate=Math.round(stat * 100) / 100;
    },
  },
  watch: {},
  methods: {
    textButton(i){
      var modulei = this.modules
      if(modulei[i].numLessons === 1){
        return "Begin";
      }else{ 
        return "Lessons";
      }  
    },
    loadLessons(id) {
      var moduleClicked= this.modules[id]
        console.log("module clicked-->",moduleClicked.parentId);
        console.log("module numLessons clicked-->",moduleClicked.numLessons);
      //console.log(moduleClicked);
      console.log("title",moduleClicked.title);

      if(moduleClicked.numLessons === 1){
        this.$store.dispatch("getPathModuleLVL", id);
        this.$store.dispatch("getPathLessonLVL", -1);
        this.$store.dispatch("getPathChapterLVL", -1);
        this.$store.dispatch("getPathSectionLVL", -1);       
        this.$store.dispatch("getPdfTitle",moduleClicked.title);
        this.$store.dispatch("getMultipleChoiseQ");
        this.$store.dispatch("getCodeQuestion"); 
        this.$router.push("/lecture");
      }else{//go to lesson.vue
        this.$store.dispatch("getPathModuleLVL", id);
        this.$store.dispatch("getLessons", id);
        this.$router.push("/" + id + "/");
      }

    },
    loadChallengeModule(id) {
      this.$store.dispatch("getPathModuleLVL", id);
      this.$store.dispatch("getChallengeModuleMCQ",id);
      this.$store.dispatch("getChallengeModuleCQ",id);
      this.$router.push("/challengemodule/" + id);
    },
    //Makes the Breadcrumbs path 
    breadCrum(){  
      var  items = [
          {
            text: 'Java',
            disabled:  false,
           // href: '/startcourse'
          },
          {
            text: 'Modules',
            disabled:  false
          
          }   
        ]
      return items;
    },
    //Gives color to the timeline cicles depending the progress    
    colorStatus(id){
      var userLVL=this.user.moduleLVL;
      if( id<userLVL){
        return "green lighten-2";
      }else if( id === userLVL){
        return "orange lighten-2";
      }else{
        return "red lighten-2";
      }
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#contC{
  /*#c4c4c5    #dedede*/
  background-color:white; 
 
}
#smbtn1{
  color: white;
  background-color: #547c9e;
  width: 120px;
  font-size: 19px;
  text-transform: none  ;
  font-weight: normal;
  font-family: "Times New Roman", Times, serif;
}
#smbtn2{
  color: white;
  background-color: #369ac1;
  width: 120px;
  font-size: 19px;
  text-transform: none ;
  font-weight: normal;
  font-family: "Times New Roman", Times, serif;
}
p{
  color:#596265;
  text-align:justify;
  font-weight: bold;
  font-family: "Times New Roman", Times, serif;
  font-size: 17px;
}
 p.a{ 
  white-space: nowrap; 
  width: 100%; 
  overflow: hidden;
  text-overflow:ellipsis;
  
}
p.a:hover {
  white-space: pre-wrap; 
  overflow: visible;
}

#tool{
  height: 60px;
  display: flex;
  justify-content: center;
}
#toolbartitle{
  white-space: normal;
  margin-top: -5px;
  font-size: 20px;
  font-weight: normal;
  font-family: "Times New Roman", Times, serif;
}

span{
  font-family: "Times New Roman", Times, serif;
  font-weight: normal;
  font-size: 18px; 
  color:#596265;
}
h1,h2, h3 {
  font-weight: normal;
  font-family: "Times New Roman", Times, serif;
  color:#596265;
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

.bloc1{
  float:left;
   
}
.bloc2{
  float:right;
 
}
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px   #547c9e;
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
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 18%;
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
