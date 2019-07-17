<template>
  <v-container fluid >

    <loader v-if="loading"></loader> 

    <v-container fluid>    
      <div class="bloc1">
        <v-breadcrumbs :items="breadCrum()" divider=">"></v-breadcrumbs>
      </div>
      <div class="bloc2">
        <div class="tooltip" >Info <v-icon>info</v-icon>
          <span class="tooltiptext">  You are in the last layer good luck   </span>
        </div>
      </div>   
    </v-container>
 
    <!-- <v-divider inset></v-divider> -->

    <v-container fluid>  
      <div   class="title" style="display: flex; justify-content: center;  align-items: center;">
        <h1 style="font-size:50px;  ">Section</h1>
      </div>             
      <div xs12 sm10 md5 lg4 style="display: flex; justify-content: center;  align-items: center;">
        <h3 style="font-size:20px;  ">{{progressNum()}} are completed</h3>
      </div>
      <div style="display: flex; justify-content: center;  align-items: center;">
        <v-progress-linear color="#78909c" style="width:40%;" v-model="progressBarSt"></v-progress-linear>
      </div>
    </v-container> 

    <v-container v-if="!loading">        
      <v-layout row wrap >
        <v-flex xs12 v-if="sections[0]===undefined">
          <v-card class="mt-5" width="50%" style="margin:auto">
            <v-card-title class="headline">
              No Data Available
            </v-card-title>
          </v-card>
        </v-flex>  
      </v-layout>

    </v-container>
<!--===================================================================small screen + phone============================================================== -->
    <v-timeline dense xs12 sm10 md5 lg4 class="hidden-md-and-up">
      <v-timeline-item  v-for="(section, i) in sections" :key="i" :color="colorStatus(i+1,user.chapterLVL,user.lessonLVL,user.moduleLVL,user.sectionLVL )"  medium>
        <v-card xs12   class=" mb-3  ma-3"   id="contS" >
            <v-toolbar id="tool"   dark  >
                <v-toolbar-title id="toolbartitle" >{{section.title}}</v-toolbar-title>
           </v-toolbar>
          <v-container   fluid>           
            <v-card-text>
              <div>                        
                <p class="a" style="text-align:justify">  {{section.description}} <br> </p>
              </div>
            </v-card-text>
          </v-container>
          <v-container fluid style="align-items:center; display:flex; justify-content:center; ">
            <v-flex xs6   style="position:absolute; bottom:5%; " >
              <v-btn medium  id="lmbtn" :disabled="sectionStatus(i+1,user.chapterLVL,user.lessonLVL,user.moduleLVL,user.sectionLVL )" @click="loadGame(section.parentId,section.chapterParentId,i+1)"  >
                Begin
              </v-btn> 
            </v-flex>   
          </v-container> 
        </v-card>    
      </v-timeline-item>
    </v-timeline>
<!-- =======================================================================Big screens================================================================= -->  
    <v-timeline align  xs12 sm10 md5 lg4 class="hidden-sm-and-down ">
      <v-timeline-item  v-for="(section, i) in sections" :key="i" :color="colorStatus(i+1,user.chapterLVL,user.lessonLVL,user.moduleLVL,user.sectionLVL)"    large>
        <span slot="opposite">  Section {{i+1}} </span>
        
        <v-card xs12   class=" mb-3  ma-3"   id="contS" >
            <v-toolbar id="tool"  dark >
                <v-toolbar-title id="toolbartitle" >{{section.title}}</v-toolbar-title>
          </v-toolbar>
          <v-container   fluid>
            <v-card-text>
              <div>            
                <p class="a" style="text-align:justify">  {{section.description}} <br> </p>
              </div>
            </v-card-text>
          </v-container>
          <v-container fluid style="align-items:center; display:flex; justify-content:center; ">
            <v-flex xs6   style="position:absolute; bottom:5%; " >
              <v-btn medium  id="lmbtn" :disabled="sectionStatus(i+1,user.chapterLVL,user.lessonLVL,user.moduleLVL,user.sectionLVL )" @click="loadGame(section.parentId,section.chapterParentId,i+1)"  >
                Begin
              </v-btn> 
            </v-flex>   
          </v-container>    
        </v-card>
      </v-timeline-item>
    </v-timeline>
<!-- =================================================================================================================================================== -->     
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valueDeterminate:0,   
    };
  },
  mounted: function() {
  
  },
  computed: {
    sections(){
      return this.$store.getters.sections;  
    },
    chapters() {
      return this.$store.getters.chapters;
    },
    lessons() {
      return this.$store.getters.lessons;
    },
    loading() {
      return this.$store.getters.loading;
    },
    user(){
      return this.$store.getters.user ;
    },
    modules() { 
      return this.$store.getters.modules;
    },
    pathModuleLVL(){
      return this.$store.getters.pathModuleLVL;
    },
    pathLessonLVL(){
      return this.$store.getters.pathLessonLVL;
    },
    pathChapterLVL(){
      return this.$store.getters.pathChapterLVL;
    },

    // compute the progress for the status bar
    progressBarSt(){ 
      var pathModule =this.pathModuleLVL;
      var pathLesson =this.pathLessonLVL;
      var pathChapter=this.pathChapterLVL;

      var mymodulelvl = this.user.moduleLVL;//to module lvl tou xrthsh
      var mylessonlvl = this.user.lessonLVL;//to lesson lvl tou xrhsth 
      var mychapterlvl = this.user.chapterLVL//to chapterlvl tou xrhsth
      var mysectionlvl = this.user.sectionLVL//to sectionLVL tou xrhsth

      var ChaptersOfLesson=this.chapters;//einai ola ta chapters pou exoun patera to  lesson to current
      var SectionOfChapter=this.sections;//einai ola ta sections pou exoun patera to chapter to current

      var numSectionOfChapters;
 
    
      for(var i=0;i<Object.keys(ChaptersOfLesson).length;i++){
        if(ChaptersOfLesson[i].parentId==pathChapter){
          numSectionOfChapters = ChaptersOfLesson[i].numSections;
        }
       }

      if(mymodulelvl > pathModule){
        return this.valueDeterminate=100;
      }
      else if(mymodulelvl == pathModule){
        if(mylessonlvl > pathLesson){
            return this.valueDeterminate=100;
        }
        if(mychapterlvl >pathChapter ){
            return this.valueDeterminate=100;
        }
        else if(mychapterlvl == pathChapter){
         var mysectionlvlID = this.myLVL(numSectionOfChapters,mysectionlvl,SectionOfChapter);
         var stat = ((mysectionlvlID-1)/numSectionOfChapters)*100;
         return this.valueDeterminate=Math.round(stat * 100) / 100;
        }
      }
    },
  },
  watch: {},

  methods: {
    //loadGame(sectionParentId,sectionChapterParentId,i+1)
    loadGame(sectionParentId,sectionChapterParentId,sectionClicked) {
        var pathModule =this.pathModuleLVL;
        var pathLesson =this.pathLessonLVL;
        var pathChapter=this.pathChapterLVL;

        var sectionOfChapter=this.sections;
        console.log("title",sectionOfChapter[sectionClicked-1].title);

        this.$store.dispatch("getPathModuleLVL", pathModule  );
        this.$store.dispatch("getPathLessonLVL", pathLesson );
        this.$store.dispatch("getPathChapterLVL",sectionChapterParentId );
        this.$store.dispatch("getPathSectionLVL",sectionParentId );
 
      console.log("pathModule "+pathModule+"/pathLesson"+pathLesson+"/sectionChapterParentId"+sectionChapterParentId+"/sectionParentId "+sectionParentId);
      //this.$router.push("/"+ pathModule+"/"+pathLesson+"/"+sectionChapterParentId+"/"+sectionParentId);
        this.$store.dispatch("getPdfTitle",sectionOfChapter[sectionClicked-1].title);
       this.$store.dispatch("getMultipleChoiseQ");
       this.$store.dispatch("getCodeQuestion"); 
       this.$router.push("/lecture");
    },

    //compute the progress for the  num status
    progressNum(){
      var pathModule =this.pathModuleLVL;
      var pathLesson =this.pathLessonLVL;
      var pathChapter=this.pathChapterLVL;

      var mymodulelvl = this.user.moduleLVL;//to module lvl tou xrthsh
      var mylessonlvl = this.user.lessonLVL;//to lesson lvl tou xrhsth 
      var mychapterlvl = this.user.chapterLVL//to chapterlvl tou xrhsth
      var mysectionlvl = this.user.sectionLVL//to sectionLVL tou xrhsth

      var ChaptersOfLesson=this.chapters;//einai ola ta chapters pou exoun patera to  lesson to current
      var SectionOfChapter=this.sections;//einai ola ta sections pou exoun patera to chapter to current

      var numSectionOfChapters;
      
    
      for(var i=0;i<Object.keys(ChaptersOfLesson).length;i++){
        if(ChaptersOfLesson[i].parentId==pathChapter){
          numSectionOfChapters = ChaptersOfLesson[i].numSections;
        }
       }
   
      if(mymodulelvl > pathModule){
        return numSectionOfChapters+"/"+numSectionOfChapters;
      }
      else if(mymodulelvl == pathModule){
        if(mylessonlvl > pathLesson){
            return numSectionOfChapters+"/"+numSectionOfChapters;
        }
        if(mychapterlvl >pathChapter ){
            return numSectionOfChapters+"/"+numSectionOfChapters;
        }
        else if(mychapterlvl == pathChapter){
          var mysectionlvlID = this.myLVL(numSectionOfChapters,mysectionlvl,SectionOfChapter);
          return (mysectionlvlID-1)+"/"+numSectionOfChapters;
        }
      }
    },


    //Makes the Breadcrumbs path 
    breadCrum(){  
      var pathModule =this.pathModuleLVL;
      var pathLesson =this.pathLessonLVL;
      var pathChapter=this.pathChapterLVL;

      var lessonsOfModule=this.lessons;//einai ola ta lessons pou exoun patera to  module to current
      //console.log(lessonsOfModule);
      var ChapterOfLesson=this.chapters;//einai ola ta chapters tou lesson
      //console.log(ChapterOfLesson);
      
      var les2;
      var chapt2;
      for(var i=0;i<Object.keys(lessonsOfModule).length;i++){
        if(lessonsOfModule[i].parentId==pathLesson){
          les2 = lessonsOfModule[i].id;
        }
       }
      for(var i=0;i<Object.keys(ChapterOfLesson).length;i++){
        if(ChapterOfLesson[i].parentId==pathChapter){
          chapt2 = ChapterOfLesson[i].id;
        }
       }

      var  items = [
          {
            text: 'Java',
            disabled:  false,
           // href: '/startcourse'
          },
          {
            text: 'Module '+ (pathModule+1),
            disabled:  false,
           // href: '/module'
          },
          {
            text: 'Lesson '+les2,
            disabled:  false
          },
          {
            text: 'Chapter '+chapt2 ,
            disabled:  false
          },       
          {
            text: 'Sections ' ,
            disabled:  false
          }     
        ]
      return items;
    },

    //Disables or enables the button depending the progress 
    sectionStatus(sectionId,userChapterLvl,userLessonLvL,userModuleLvL,userSectionLVL ){
       // console.log("sectionId-->",sectionId," userModuleLvL-->",userModuleLvL," userLessonLvL-->",userLessonLvL," userChapterLvl-->",userChapterLvl,"userSectionLVL-->",userSectionLVL);    

        var pathModule =this.pathModuleLVL;
        var pathLesson =this.pathLessonLVL;
        var pathChapter=this.pathChapterLVL;
       
        var SectionOfChapters=this.sections;

        if(userModuleLvL>pathModule){
            return false;
        }
        else if(userLessonLvL>pathLesson ){
            return false; 
        }
        else if(userChapterLvl>pathChapter){
            return false; 
        }
        else if(userChapterLvl === pathChapter  ){
            if(userSectionLVL>=SectionOfChapters[sectionId-1].parentId){
            return false;
            }else if(userSectionLVL<SectionOfChapters[sectionId-1].parentId){
            return true;
            } 
        }

    },
    
    //Gives color to the timeline cicles depending the progress  
    colorStatus( sectionId,userChapterLvl,userLessonLvL,userModuleLvL,userSectionLVL ){
        //console.log("sectionId-->",sectionId," userModuleLvL-->",userModuleLvL," userLessonLvL-->",userLessonLvL," userChapterLvl-->",userChapterLvl,"userSectionLVL-->",userSectionLVL);    
        
        var pathModule =this.pathModuleLVL;
        var pathLesson =this.pathLessonLVL;
        var pathChapter=this.pathChapterLVL;
       
        var SectionOfChapters=this.sections;
        //console.log(SectionOfChapters);

        //console.log(userChapterLvl," > ",currentChapter);

        if(userModuleLvL>pathModule){
            return "green lighten-2";
        }
        else if(userLessonLvL>pathLesson ){
            return "green lighten-2"; 
        }
        else if(userChapterLvl>pathChapter){
            return "green lighten-2"; 
        }
        else if(userChapterLvl === pathChapter ){
            if( SectionOfChapters[sectionId-1].parentId <userSectionLVL){
            return "green lighten-2";
            }else if( SectionOfChapters[sectionId-1].parentId == userSectionLVL){
            return "orange lighten-2";
        }else{
            return "red lighten-2";
            }
        }
    },
    //finds my section lvl
    myLVL(numSectionOfChapters,mysectionlvl,SectionOfChapter){
      if(SectionOfChapter.length !== 0){
        for(var j=0;j<numSectionOfChapters;j++){
          if(SectionOfChapter[j].parentId == mysectionlvl){
            return SectionOfChapter[j].id
          }
        }
      }
    }

  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#contS{
  background-color:white; 
}
#lmbtn{
  color: white;
  background-color: #547c9e;
  width: 120px;
  height: 40px;
  font-size: 17px;
  text-transform:none ;
}

#tool{
  height: 60px;
  display: flex;
  justify-content: center;
  background-color:#547c9e;
}
#toolbartitle{
  white-space: normal;
  margin-top: -5px;
  font-size: 20px;
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

span{
  font-family: "Times New Roman", Times, serif;
  font-weight: bold;
  font-size: 20px; 
  color:#596265;
}
h1,
h2, h3 {
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
