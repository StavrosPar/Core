<template>
    <v-container fluid>
      <v-stepper v-model="e1" horizontal>
          <template v-for="n in multipleChoise()">
            <v-stepper-step :key="`${n.id}-step`" :step="n.id" :complete="e1 > n.id"   >
             Question {{n.id}}
            </v-stepper-step>
            <v-stepper-content :step="n.id" :key="`${n.id}-content`">
                <v-card   class="mb-5" height="100%">
                    <h3>{{n.question}}</h3>
                    <v-radio-group row v-model="selectedItem"   >
                        <v-radio v-if="n.answer1!='' " :label="n.answer1" :value="n.answer1"  > </v-radio> 
                        <v-radio v-if="n.answer2!='' " :label="n.answer2" :value="n.answer2"  > </v-radio> 
                        <v-radio v-if="n.answer3!='' " :label="n.answer3" :value="n.answer3"  > </v-radio>
                        <v-radio v-if="n.answer4!='' " :label="n.answer4" :value="n.answer4"  > </v-radio>  
                      <!-- <div v-if="selectedItem == n.correct"> 
                        <v-icon color="green"  >check_circle_outline</v-icon>
                      </div>    
                      <div v-if="selectedItem != n.correct && selectedItem !='' "> 
                        <v-icon color="red"  >highlight_off</v-icon>
                      </div>  -->
                     <!-- clear done -->
                    </v-radio-group>
 
                </v-card>
                <v-btn  v-if="n.id != maxsteps " color="primary" @click="nextStep(n.id); checkCorrect(selectedItem,n.correct,n.question,n.id);initialize()" >Next</v-btn>
                <!-- <v-btn  v-if="n.id != maxsteps " flat>Cancel</v-btn> -->
                <v-btn  v-if="n.id == maxsteps " color="primary" @click="checkCorrect(selectedItem,n.correct,n.question,n.id);"  @click.stop="dialog = true" > Results</v-btn>
                 <v-dialog v-model="dialog"  max-width="50%">
                  <v-card>
                    <v-card-title class="headline">Results</v-card-title>
                    <v-card-text  > 
                       <center><h1> {{correctSelected}} out of {{maxsteps}} </h1><v-divider></v-divider>
                            <h3 v-if="viewCorrect!=''">Rong Answered</h3>
                        <div v-for="l in viewCorrect" :key="l.id">
                            <h4>Question :{{l.id}} → {{l.question}}</h4>
                            <p>Your answer was: {{l.lanswer}}<v-icon color="red"  >highlight_off</v-icon></p>
                            <p>Correct answer is: {{l.canswer}}<v-icon color="green"  >check_circle_outline</v-icon></p>
                        </div></center> 
                    </v-card-text>
                    </v-card>
                 </v-dialog>
          </v-stepper-content>
          </template>
          
     
      </v-stepper> 
 </v-container>
 
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      e1: 1,
      radioGroup: 0,
      maxsteps: 1,
      selectedItem:'',
      correctSelected:0,
      rongSelected:0,
      viewCorrect:[]
       
    }
  },

  // watch: {
  //   steps (val) {
  //     if (this.e1 > val) {
  //       this.e1 = val
  //     }
  //   }
  // },

  methods: {
    nextStep (n,selectedItem,correct) {
        
      if (n === this.maxsteps) {
        this.e1 = 1
      } else {
        this.e1 = n + 1
      }
      

    },
    checkCorrect(selectedItem, correct,question,id){
        if(selectedItem == correct){
            this.correctSelected++;
        }
        if(selectedItem != correct){
            this.rongSelected++;
            this.viewCorrect.push({"id":id,"question":question,"lanswer":selectedItem,"canswer":correct})
             
        }
        console.log(this.viewCorrect);
      
        console.log("rong->",this.rongSelected);
        console.log("correct->",this.correctSelected); 
    },
    initialize(){
      this.selectedItem = '';
    },
    multipleChoise(){
        var multipleChoise =[
            {
            "id": 1,
            "question": "Test 1 Question bla bla  ",
            "answer1":"a1",
            "answer2":"a2",
            "answer3":"a3",
            "answer4":"",
            "correct":"a3"
            },
            {
            "id": 2,
            "question": "Test 2 Question o oooo o oo",
            "answer1":"b1",
            "answer2":"b2",
            "answer3":"b3",
            "answer4":"b4",
            "correct":"b4"
            
            },
            {
            "id": 3,
            "question": "Test 3 Question aaaaa aaa aaa",
            "answer1":"c1",
            "answer2":"c2",
            "answer3":"",
            "answer4":"",
            "correct":"c1"
            
            },
                        {
            "id": 4,
            "question": "Test 4 Question ouuuuuuiiiii",
            "answer1":"d1",
            "answer2":"d2",
            "answer3":"d3",
            "answer4":"d4",
            "correct":"d2"
            
            },
        ]
        this.maxsteps = Object.keys(multipleChoise).length;
       
        return multipleChoise;

        }
  }
 
}
</script>