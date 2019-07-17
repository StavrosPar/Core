<template>

	<v-container fluid>
        <p align="center" id="plt">Lecture</p>
		<!-- <pdf  v-for="i in pdfnumPages()" :key="i" :src="pdfSource()" :page="i" style="display: inline-block; width: 75%"></pdf>
	 -->
        <embed :src="pdfSource()" type="application/pdf" width="100%" height="700px" />

      
            <div class="bloc1">            
                <p>The content was taken from <b>Oracle © </b><i>Java Documentation</i></p>
            </div >
            <div class="bloc2">
                 <v-btn round id="th" @click="LabExercises()" >Exercises</v-btn>
            </div>
    
    </v-container>
</template>

<script>

import pdf from 'vue-pdf'


export default {
	components: {
		pdf
	},
	data() {
		return {
		}
    },
    computed: {
        pathModuleLVL(){
            return this.$store.getters.pathModuleLVL;
        },
        pathLessonLVL(){
            return this.$store.getters.pathLessonLVL;
        },
        pathChapterLVL(){
            return this.$store.getters.pathChapterLVL;
        },
        pathSectionLVL(){
            return this.$store.getters.pathSectionLVL;
        },
        pdfTitle(){
            return this.$store.getters.pdfTitle;
        }

    },
    methods:{
        LabExercises(){
            var pathModule =this.pathModuleLVL;
            var pathLesson =this.pathLessonLVL;
            var pathChapter=this.pathChapterLVL;
            var pathSection=this.pathSectionLVL;
            //  console.log(pathModule,'/',pathLesson,'/',pathChapter,'/',pathSection);
            this.$router.push("/"+pathModule+"/"+pathLesson+"/"+pathChapter+"/"+pathSection);
        },
        pdfSource() {
            var pdfpathtitle=this.pdfTitle;
             var title = './static/JAVA-PDFs/'+pdfpathtitle+'.pdf';
            // console.log(title);
            return title;
        },
        pdfnumPages(){
            return 1;
        }
    }
}

</script>
<style>
#plt{
  color:#547c9e;
  font-size:38px;
  font-family: "Times New Roman", Times, serif;
  font-weight: normal;
  margin-top:-20px;
}
.bloc1 {
  float: left;
  margin-top: 10px;
}
.bloc2 {
  float: right;
}
p{
    font-size:14px;
}
#th{
    font-family: "Times New Roman", Times, serif;
    font-weight: normal;
     
    text-transform: capitalize;
    color:white; 
    background-color:#547c9e;
    box-shadow: 0 0 10px rgba(0,0,0,0.6), 0 0 10px rgba(0,0,0,0.3);
}
#th:hover{
       box-shadow: 0 0 20px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 0, 0, 0.4); 
}
</style>




