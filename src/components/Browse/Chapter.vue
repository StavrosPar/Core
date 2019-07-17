<template>
  <v-container fluid >

    <loader v-if="loading"></loader>

    <v-container fluid>    
      <div class="bloc1">
        <v-breadcrumbs :items="breadCrum()" divider=">"></v-breadcrumbs>
      </div>
      <div class="bloc2">
        <div class="tooltip" >Info <v-icon>info</v-icon>
          <span class="tooltiptext">  If there are no Sections you begin immediately   </span>
        </div>
      </div>   
    </v-container>
 
    <!-- <v-divider inset></v-divider> -->

    <v-container fluid>  
      <div   class="title" style="display: flex; justify-content: center;  align-items: center;">
        <h1 style="font-size:50px;  ">Chapters</h1>
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
        <v-flex xs12 v-if="chapters[0]===undefined">
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
      <v-timeline-item  v-for="(chapter, i) in chapters" :key="i" :color="colorStatus(i+1,user.chapterLVL,user.lessonLVL,user.moduleLVL )"  medium>
        <v-card xs12   class=" mb-3  ma-3"   id="contS" >
            <v-toolbar id="tool"   dark  >
                <v-toolbar-title id="toolbartitle" >{{chapter.title}}</v-toolbar-title>
           </v-toolbar>
          <v-container   fluid>           
            <v-card-text>
              <div>                        
                <p class="a" style="text-align:justify">  {{chapter.description}} <br> </p>
              </div>
            </v-card-text>
          </v-container>
          <v-container fluid style="align-items:center; display:flex; justify-content:center; ">
            <v-flex xs6   style="position:absolute; bottom:5%; " >
              <v-btn medium  id="lmbtn" :disabled="chapterStatus(i+1,user.chapterLVL,user.lessonLVL,user.moduleLVL )" @click="loadSections(chapter.parentId,chapter.lessonParentId,i+1)"  >
                {{textButton(i)}}
              </v-btn> 
            </v-flex>   
          </v-container> 
        </v-card>    
      </v-timeline-item>
    </v-timeline>
<!-- =======================================================================Big screens================================================================= -->  
    <v-timeline align  xs12 sm10 md5 lg4 class="hidden-sm-and-down ">
      <v-timeline-item  v-for="(chapter, i) in chapters" :key="i" :color="colorStatus(i+1,user.chapterLVL,user.lessonLVL,user.moduleLVL )"    large>
        <span slot="opposite">  Chapter {{i+1}} </span>
        
        <v-card xs12   class=" mb-3  ma-3"   id="contS" >
            <v-toolbar id="tool"  dark >
                <v-toolbar-title id="toolbartitle" >{{chapter.title}}</v-toolbar-title>
          </v-toolbar>
          <v-container   fluid>
            <v-card-text>
              <div>            
                <p class="a" style="text-align:justify">  {{chapter.description}} <br> </p>
              </div>
            </v-card-text>
          </v-container>
          <v-container fluid style="align-items:center; display:flex; justify-content:center; ">
            <v-flex xs6   style="position:absolute; bottom:5%; " >
              <v-btn medium  id="lmbtn" :disabled="chapterStatus(i+1,user.chapterLVL,user.lessonLVL,user.moduleLVL )" @click="loadSections(chapter.parentId,chapter.lessonParentId,i+1)"  >
                {{textButton(i)}}
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


    // compute the progress for the status bar
    progressBarSt(){ 
      var pathModule =this.pathModuleLVL;
      var pathLesson =this.pathLessonLVL;

      var mymodulelvl = this.user.moduleLVL;//to module lvl tou xrthsh
      var mylessonlvl = this.user.lessonLVL;//to lesson lvl tou xrhsth 
      var mychapterlvl =this.user.chapterLVL//to chapterlvl tou xrhsth

      var lessonsOfModule=this.lessons;//einai ola ta lessons pou exoun patera to  module to current
      var ChaptersOfLesson=this.chapters;//einai ola ta lessons pou exoun patera to  module to current
     
      var numChaptersofLesson;//number of chapters in the lesson
      
      for(var i=0;i<Object.keys(lessonsOfModule).length;i++){
        if(lessonsOfModule[i].parentId==pathLesson){
          numChaptersofLesson = lessonsOfModule[i].numChapters;
        }
       }
     
      if(mymodulelvl > pathModule){
        return this.valueDeterminate=100;
      }
      else if(mymodulelvl == pathModule){
        if(mylessonlvl > pathLesson){
            return this.valueDeterminate=100;
        }
        else if(mylessonlvl == pathLesson){
            var mychapterlvlID = this.myLVL(numChaptersofLesson,mychapterlvl,ChaptersOfLesson);
            var stat = ((mychapterlvlID-1)/+numChaptersofLesson)*100;
            return this.valueDeterminate=Math.round(stat * 100) / 100;
        }
      }
    },
  },
  watch: {},

  methods: {
    textButton(i){
        var chaptersi = this.chapters
        //console.log(chaptersi);
        if(chaptersi[i].numSections === 1){
          return "Begin";
        }else{ 
          return "Sections";
        }  
      },
    //
    loadSections(chapterparentId,lessonParentId,ChapterCLicked) {
      //console.log("chapterparentId-",chapterparentId," lessonParentId-",lessonParentId," ChapterCLicked-",ChapterCLicked);
      //console.log(" ChapterCLicked-->",ChapterCLicked);
       var pathModule =this.pathModuleLVL;
       var pathLesson =this.pathLessonLVL;

      var chapterOfLessons =this.chapters;//ola ta paidia tou lessons
        //console.log("chapterOfLessons--",chapterOfLessons);
      var chaptClickedNumSections=chapterOfLessons[ChapterCLicked-1].numSections;//posa section exei to chapter
       console.log("chapter clicked-->",ChapterCLicked);
       console.log("chapter ParentId clicked",chapterOfLessons[ChapterCLicked-1].parentId);
       console.log("chapter numSections clicked",chaptClickedNumSections);


      if(chaptClickedNumSections == 1){
        this.$store.dispatch("getPathModuleLVL", pathModule);
        this.$store.dispatch("getPathLessonLVL", lessonParentId);
        this.$store.dispatch("getPathChapterLVL", chapterparentId);
        this.$store.dispatch("getPathSectionLVL", -1);
        //this.$router.push("/"+ pathModule +"/"+lessonParentId+"/"+chapterparentId+"/"+(-1));
        this.$store.dispatch("getPdfTitle",chapterOfLessons[ChapterCLicked-1].title);
        this.$store.dispatch("getMultipleChoiseQ");
        this.$store.dispatch("getCodeQuestion"); 
        this.$router.push("/lecture");
      }else{
        this.$store.dispatch("getPathModuleLVL", pathModule);
        this.$store.dispatch("getPathLessonLVL", lessonParentId);
        this.$store.dispatch("getPathChapterLVL", chapterparentId);
        this.$store.dispatch("getSections", chapterparentId);
        this.$router.push("/"+ pathModule +"/"+lessonParentId+"/"+chapterparentId);
      }
    },

    //compute the progress for the  num status
    progressNum(){
      var pathModule =this.pathModuleLVL;
      var pathLesson =this.pathLessonLVL;

      var mymodulelvl = this.user.moduleLVL;//to module lvl tou xrthsh
      var mylessonlvl = this.user.lessonLVL;//to lesson lvl tou xrhsth 
      var mychapterlvl =this.user.chapterLVL//to chapterlvl tou xrhsth

      var lessonsOfModule=this.lessons;//einai ola ta lessons pou exoun patera to  module to current
      var ChaptersOfLesson=this.chapters;//einai ola ta chapters pou exoun patera to  lesson to current
     
      var numChaptersofLesson;//number of chapters in the lesson
      

      for(var i=0;i<Object.keys(lessonsOfModule).length;i++){
        if(lessonsOfModule[i].parentId==pathLesson){
          numChaptersofLesson = lessonsOfModule[i].numChapters;
        }
       }

      if(mymodulelvl > pathModule){
        return numChaptersofLesson+"/"+numChaptersofLesson;
      }
      else if(mymodulelvl == pathModule){
        if(mylessonlvl > pathLesson){
          return numChaptersofLesson+"/"+numChaptersofLesson;
        }
        else if(mylessonlvl == pathLesson){
          var mychapterlvlID = this.myLVL(numChaptersofLesson,mychapterlvl,ChaptersOfLesson);
          return (mychapterlvlID-1)+"/"+numChaptersofLesson;
        }
      }
    },


    //Makes the Breadcrumbs path 
    breadCrum(){  
      var pathModule =this.pathModuleLVL;
      var pathLesson =this.pathLessonLVL;

      var lessonsOfModule=this.lessons;//einai ola ta lessons pou exoun patera to  module to current
      //console.log(lessonsOfModule);
      
      var les2;
      for(var i=0;i<Object.keys(lessonsOfModule).length;i++){
        if(lessonsOfModule[i].parentId==pathLesson){
          les2 = lessonsOfModule[i].id;
        }
       }

      var  items = [
          {
            text: 'Java',
            disabled:  false,
           // href: '/selectStartCourse'
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
            text: 'Chapters ' ,
            disabled:  false
          }   
        ]
      return items;
    },

    //Disables or enables the button depending the progress 
    chapterStatus( ChapterId,userChapterLvl,userLessonLvL,userModuleLvL){
    
        var pathModule =this.pathModuleLVL;
        var pathLesson =this.pathLessonLVL;

        var ChapterOfLesson=this.chapters;

        if(userModuleLvL>pathModule){
            return false;
        }
        else if(userLessonLvL>pathLesson ){
            return false; 
        }
        else if(userLessonLvL === pathLesson  ){
            if(userChapterLvl>=ChapterOfLesson[ChapterId-1].parentId){
            return false;
            }else if(userChapterLvl<ChapterOfLesson[ChapterId-1].parentId){
            return true;
            } 
        }

    },
    
    //Gives color to the timeline cicles depending the progress  
    colorStatus( ChapterId,userChapterLvl,userLessonLvL,userModuleLvL ){
        //console.log("ChapterId--",ChapterId," userChapterLvl--",userChapterLvl," userLessonLvL--",userLessonLvL," userModuleLvL--",userModuleLvL);    
        var pathModule =this.pathModuleLVL;
        var pathLesson =this.pathLessonLVL;

        var ChapterOfLesson=this.chapters;
        //console.log(ChapterOfLesson);

      if(userModuleLvL>pathModule){
        return "green lighten-2";
      }
      else if(userLessonLvL>pathLesson ){
         return "green lighten-2"; 
      }
      else if(userLessonLvL === pathLesson ){
        if( ChapterOfLesson[ChapterId-1].parentId<userChapterLvl){
          return "green lighten-2";
        }else if( ChapterOfLesson[ChapterId-1].parentId == userChapterLvl){
          return "orange lighten-2";
      }else{
          return "red lighten-2";
        }
      }
    },    
    myLVL(numChaptersofLesson,mychapterlvl,ChaptersOfLesson){
      if(ChaptersOfLesson.length !== 0){
        for(var j=0;j<numChaptersofLesson;j++){
          if(ChaptersOfLesson[j].parentId == mychapterlvl){
            return ChaptersOfLesson[j].id
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
