<template >
<center><h1>Comming Soon</h1></center>

  <!-- <v-container fluid  >
    <v-layout  justify-center class="my-5">
      <v-flex xs12 sm6  >

        <div style="background-color: #78909c; padding :20px;">
          <h2  style="  text-align: center; color:white;"> Profile Page </h2>
        </div>
            
        <v-card  id="contP"   >
          <v-container  >
            <v-card-title><h2>{{user.name}} 's profile </h2> </v-card-title>
            <v-layout row wrap class=" mb-4  ma-4">
              <div style="margin-left: 10%;">
                <img src="static/person.png"   height="100">
              </div>
              <div style="margin-left: 10%;" >                
                <p>Name : {{user.name}}</p>  
                <p>Surname : {{user.surname}}</p> 
                <p>Email : {{user.email}}</p> 
              </div >
              <div style="margin-left: 10%;">
                <p>Type : {{user.type}}</p> 
                <p>Section : {{user.sectionLVL}}</p>
                <p>Lesson : {{user.lessonLVL}}</p>  
              </div>
            </v-layout>
          </v-container> 
        </v-card>

      </v-flex>         
    </v-layout>
  </v-container> -->
</template>

<script>
export default {
  data() {
    return {
        
    };
  },
  mounted: function() {
  
  },
  computed: {
    user(){
      return this.$store.getters.user ;
    },
    loading() {      
      return this.$store.getters.loading;
    }
  },
  watch: {},
  methods: {

  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#vcont{
  height: 100vh;  
  background-color:#e1ecf1;
}
#contP{
  background-color:white;

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