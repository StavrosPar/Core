<template>
 
<v-container fluid>
      <loader v-if="loading"></loader> 
  <center><h1>Challenge the hole Java course at once</h1></center>

      <v-toolbar tabs>
        <template v-slot:extension>
          <v-tabs v-model="tabs" fixed-tabs color="transparent">
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#mobile-tabs-5-1" class="primary--text"> Multiple Choise </v-tab>
  
            <v-tab href="#mobile-tabs-5-2" class="primary--text"> Write Code </v-tab>

          </v-tabs>
        </template>
      </v-toolbar>
  
      <v-tabs-items v-model="tabs"   > 
        
        <v-tab-item   value="mobile-tabs-5-1" >
          <v-card>
            <v-stepper v-model="e1" horizontal style="background-color:#f5f5f5;">
              <template v-for="n in multipleChoise()" >
                <v-stepper-step :key="`${n.numquestion}-step`" :step="n.numquestion" :complete="e1 > n.numquestion"   >
                Question {{n.numquestion}}
                </v-stepper-step>
                <v-stepper-content :step="n.numquestion" :key="`${n.numquestion}-content`" >
                    <v-card   class="mb-5" height="100%" style="background-color:#f5f5f5;">
                        <h3  >{{n.mquestion}}</h3>
                        <v-radio-group row v-model="selectedItem"    >
                            <v-radio v-if="n.answer1!='' " :label="n.answer1" :value="n.answer1"  > </v-radio> 
                            <v-radio v-if="n.answer2!='' " :label="n.answer2" :value="n.answer2"  > </v-radio> 
                            <v-radio v-if="n.answer3!='' " :label="n.answer3" :value="n.answer3"  > </v-radio>
                            <v-radio v-if="n.answer4!='' " :label="n.answer4" :value="n.answer4"  > </v-radio>  
                        </v-radio-group>
    
                    </v-card>
                    <v-btn  v-if="n.numquestion != maxsteps " color="primary" @click="nextStep(n.numquestion); checkCorrect(selectedItem,n.correct,n.mquestion,n.numquestion);initialize()" >Next</v-btn>
                    <!-- <v-btn  v-if="n.numquestion != maxsteps " flat>Cancel</v-btn> -->
                    <v-btn  v-if="n.numquestion == maxsteps && visiblebuttonResults " color="primary" @click="checkCorrect(selectedItem,n.correct,n.mquestion,n.numquestion);visiblebuttonResults=false ;submitted=true;
                                  multchoisechecked=false; visiblebuttonAgain=true"   :disabled="submitted"  @click.stop="dialog = true" > Results</v-btn>
                    <v-btn v-if="n.numquestion == maxsteps && visiblebuttonAgain " color="primary" @click="again();"   >Again </v-btn>
                    <v-dialog v-model="dialog"  max-width="50%">
                      <v-card>
                        <v-card-title class=" justify-center"> <h1  >Results</h1> </v-card-title>
                        <v-card-text  > 
                          <center>
                            <h2> {{correctSelected}} out of {{maxsteps}} </h2>
                            <v-divider></v-divider>
                             <h3 v-if="viewCorrect==''" style="color:green;">Congratulations you answered everything correct !!!</h3>
                            <h3 v-if="viewCorrect!=''" style="color:red;">Wrong Answered</h3>
                            <div v-for="l in viewCorrect" :key="l.numquestion">
                                <h4>Question :{{l.numquestion}} → {{l.mquestion}}</h4>
                                <p>Your answer was: {{l.lanswer}}<v-icon color="red"  >highlight_off</v-icon></p>
                                <p>Correct answer is: {{l.canswer}}<v-icon color="green"  >check_circle_outline</v-icon></p>
                            </div>
                          </center> 
                        </v-card-text>
                        </v-card>
                    </v-dialog>
              </v-stepper-content>
              </template>
            </v-stepper> 
          </v-card>
 
        </v-tab-item>
        
        <v-tab-item  value="mobile-tabs-5-2">
          <v-card  height="100%" style="background-color:#f3f3f3;">
           
                <!-- <div class="text-xs-center"> -->
                  <p  style="text-align:center; font-size:20px; font-family: 'Times New Roman', Times, serif; font-weight: normal;">
                     {{codeCQ()}}  
                  </p>       

                  <iframe src='http://www.programmr.com/embed.php?action=tf&path=demostudent//view/temp_1558007671/Example.java' width='100%' height='580px' frameborder='0'></iframe>
                    
            <div > 
              <p style=" font-size:16px; text-align:left; margin-left:10px; font-family: 'Times New Roman', Times, serif; font-weight: normal;">
                <b style="color:orange;">Notice !</b>
                <i> If the embeded compiler doesn't play or you want to write code in another Compiler</i>  
                <a href="https://www.codiva.io/" target="_blank">External compiler</a> 
              </p> 
              <center><v-btn round @click="onComplete()" :disabled="multchoisechecked" id="le" style="">Done</v-btn></center>
            </div>    
 
          </v-card>

        </v-tab-item>
      
      </v-tabs-items>
    
   
 
 
  
</v-container>

</template>


<script>
import pdf from 'vue-pdf'

  export default {
  components: {
		pdf
	},
    data () {
      return {
        tabs:null,
        dialog: false,
        dialog1:false,
        e1: 1,
        radioGroup: 0,
        maxsteps: 1,
        selectedItem:'',
        correctSelected:0,
        wrongSelected:0,
        viewCorrect:[],
        submitted:false,
        multchoisechecked:true,
        visiblebuttonAgain:false,
        visiblebuttonResults:true

 
      }
    },
 
    computed: {

        loading() {
          return this.$store.getters.loading;
        },
        user(){
          return this.$store.getters.user ;
        },
         
        challengeOnceMCQ(){
          return this.$store.getters.challengeOnceMCQ;
        },
        challengeOnceCQ(){
          return this.$store.getters.challengeOnceCQ;
        },

     

    },
    methods: {


      //Finds where to go after
      onComplete(){
        this.user.moduleLVL=7;
        this.user.lessonLVL=33;
        this.user.chapterLVL=104;
        this.user.sectionLVL=117;
        this.$store.dispatch("changeUserLVLs", this.user);
        this.$router.push("/module/" );  
      },

      //
      nextStep (n,selectedItem,correct) {
          
          if (n === this.maxsteps) {
            this.e1 = 1
          } else {
            this.e1 = n + 1
          }
        

      },
      //
      checkCorrect(selectedItem, correct,mquestion,numquestion){
          if(selectedItem == correct){
              this.correctSelected++;
          }
          if(selectedItem != correct){
              this.wrongSelected++;
              this.viewCorrect.push({"numquestion":numquestion,"mquestion":mquestion,"lanswer":selectedItem,"canswer":correct})
              
          }
          console.log(this.viewCorrect);
        
          console.log("wrong->",this.wrongSelected);
          console.log("correct->",this.correctSelected); 
      },
      //Initializes the selected  v-radio for eatch question
      initialize(){
        this.selectedItem = '';
      },
      //Initializes variable to play again the multiple Choise
      again(){
        this.e1=1;
        this.correctSelected=0;
        this.wrongSelected=0 ;
        this.submitted= false;
        this.selectedItem='';
        this.viewCorrect=[];
        this.multchoisechecked=true;
        this.visiblebuttonAgain=false;
        this.visiblebuttonResults=true;
      },
      
      //brings if they exist all the multiple choise question and answers
      multipleChoise(){
        var multipleChoise =this.challengeOnceMCQ;
        
        if(multipleChoise.length!=0){
           // console.log("multipleChoise-->",multipleChoise);
            this.maxsteps = Object.keys(multipleChoise).length;
            return multipleChoise;
        }
      

      },
      //brings the code question
      codeCQ(){
        var codeQ = this.challengeOnceCQ; 
        
        if(codeQ.challengeoncecq  != null){
            console.log("lalilo",codeQ.challengeoncecq);
            return codeQ.challengeoncecq ;
        }
      },

    }
  }
</script>


<style>
 
#nextb{
   background-color:#547c9e; color:white; 
}

#ple{
  color:#547c9e;
  font-size:38px;
  font-family: "Times New Roman", Times, serif;
  font-weight: normal;
}
#le{
  width: 100px;
  height: 40px;
  font-size: 16px; 
  font-family: "Times New Roman", Times, serif;
  text-transform: capitalize;
  margin-top: 20px;
  color:white; background-color:#547c9e;
  box-shadow: 0 0 10px rgba(0,0,0,0.3), 0 0 10px rgba(0,0,0,0.3);
}
#le:hover{
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 0, 0, 0.4); 
}
h1{
  font-family: 'Times New Roman', Times, serif;
  font-size: 45px;
  color:#547c9e;
}
h2{
  font-family: 'Times New Roman', Times, serif;
  font-size: 30px;
   color:#547c9e;
}
p{
    
   margin-bottom: 0px; 
}
h3{
   font-family: 'Times New Roman', Times, serif;
    margin-top: 5px;
     font-size: 20px;
}
 h4{
    font-family: 'Times New Roman', Times, serif;
  margin-bottom: 5px; 
  margin-top: 5px;
}
.v-card__title {
   padding: 0px;
}
 
</style>
