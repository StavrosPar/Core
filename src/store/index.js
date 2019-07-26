import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";
import router from "../router/index";
import axios from "axios";
//import server from "../components/server";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: null,
    modules: [],
    lessons: [],
    chapters: [],
    sections: [],
    maxChapter: null,
    maxModule: null,
    maxLesson: null,
    maxSection: null,
    pathModuleLVL: null,
    pathLessonLVL: null,
    pathChapterLVL: null,
    pathSectionLVL: null,
    pdfTitle: null,
    multipleChoiseQ: [],
    codeQuestion: null,
    challengeOnceMCQ: [],
    challengeOnceCQ: null,
    challengeModuleMCQ: [],
    challengeModuleCQ: null,
    course: []
  },
  mutations: {
    //Setters
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setModules(state, payload) {
      state.modules = payload;
    },
    setLessons(state, payload) {
      state.lessons = payload;
    },
    setChapters(state, payload) {
      state.chapters = payload;
    },
    setSections(state, payload) {
      state.sections = payload;
    },
    setMaxModule(state, payload) {
      state.maxModule = payload;
    },
    setMaxLesson(state, payload) {
      state.maxLesson = payload;
    },
    setMaxChapter(state, payload) {
      state.maxChapter = payload;
    },
    setMaxSection(state, payload) {
      state.maxSection = payload;
    },

    setPathModuleLVL(state, payload) {
      state.pathModuleLVL = payload;
    },
    setPathLessonLVL(state, payload) {
      state.pathLessonLVL = payload;
    },
    setPathChapterLVL(state, payload) {
      state.pathChapterLVL = payload;
    },
    setPathSectionLVL(state, payload) {
      state.pathSectionLVL = payload;
    },
    setPdfTitle(state, payload) {
      state.pdfTitle = payload;
    },
    setMultipleChoiseQ(state, payload) {
      state.multipleChoiseQ = payload;
    },
    setCodeQuestion(state, payload) {
      state.codeQuestion = payload;
    },
    setChallengeOnceMCQ(state, payload) {
      state.challengeOnceMCQ = payload;
    },
    setChallengeOnceCQ(state, payload) {
      state.challengeOnceCQ = payload;
    },
    setChallengeModuleMCQ(state, payload) {
      state.challengeModuleMCQ = payload;
    },
    setChallengeModuleCQ(state, payload) {
      state.challengeModuleCQ = payload;
    },
    setCourse(state, payload) {
      state.course = payload;
    }
  },

  actions: {
    //stays signed in and keeps some info of the user
    autoSignIn({ commit }, payload) {
      commit("setLoading", false);
      const newUser = { id: payload.uid };
      var temp = newUser.id;
      console.log("temp", temp);
      axios
        .get(`http://localhost:5000/api/users/${temp}`)
        .then(response => {
          console.log(response.data[0]);
          commit("setUser", response.data[0]);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    //logs out
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
      router.push("/");
    },
    //creates the user in the Authentication of firebase and after
    //stores the user in the database in (Users) with
    //the extra fields an th type
    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");

      firebase
        .auth()
        .createUserAndRetrieveDataWithEmailAndPassword(
          payload.email,
          payload.password
        )
        .then(user => {
          commit("setLoading", false);
          var date = new Date();
          const newUser = {
            id: user.user.uid,
            email: user.user.email,
            name: payload.name,
            surname: payload.surname,
            status: "true",
            type: "user",
            registration_date: date.toISOString(),
            moduleLVL: 0,
            lessonLVL: 0,
            chapterLVL: 0,
            sectionLVL: 0
          };

          var temp = newUser.id;
          console.log(temp);
          axios
            .post(`http://localhost:5000/api/users/${temp}`, {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name,
              surname: newUser.surname,
              status: newUser.status,
              type: newUser.type,
              registration_date: newUser.registration_date,
              moduleLVL: newUser.moduleLVL,
              lessonLVL: newUser.lessonLVL,
              chapterLVL: newUser.chapterLVL,
              sectionLVL: newUser.sectionLVL
            })
            .then(response => {
              commit("setUser", newUser);
              console.log(response.data);
            })
            .catch(err => {});
        })
        .catch(error => {
          commit("setError", error);
          console.log(error);
        });
      commit("setLoading", false);
    },
    //sees if he is in the Database
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            fbKeys: {}
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    //
    clearError({ commit }) {
      commit("clearError");
    },
    //gets all modules of the course from sql
    //gets the max module
    getModules({ commit }) {
      commit("setLoading", true);

      axios.get(`http://localhost:5000/api/modules`).then(response => {
        console.log(response.data);
        commit("setModules", response.data);

        var maxid = 0;
        //= this.findMaxID(response.data);
        for (var i = 0; i < response.data.length; i++) {
          if (maxid < response.data[i].id) {
            maxid = response.data[i].id;
          }
        }
        commit("setMaxModule", maxid);
      });
      commit("setLoading", false);
    },
    //gets all lessons of  the selected module
    getLessons({ commit }, payload) {
      commit("setLoading", true);
      axios
        .get(`http://localhost:5000/api/lessons?moduleParentID=${payload}`)
        .then(response => {
          console.log(response.data);
          commit("setLessons", response.data);

          var maxid = 0;
          for (var i = 0; i < response.data.length; i++) {
            if (maxid < response.data[i].id) {
              maxid = response.data[i].id;
            }
          }
          commit("setMaxLesson", maxid);
        });
      commit("setLoading", false);
    },
    //gets all chapters from the selected lessons
    getChapters({ commit }, payload) {
      commit("setLoading", true);

      axios
        .get(`http://localhost:5000/api/chapters?lessonParentId=${payload}`)
        .then(response => {
          console.log(response.data);
          commit("setChapters", response.data);

          var maxid = 0;
          for (var i = 0; i < response.data.length; i++) {
            if (maxid < response.data[i].id) {
              maxid = response.data[i].id;
            }
          }
          commit("setMaxChapter", maxid);
        });
      commit("setLoading", false);
    },
    //gets all sections with the selected id
    getSections({ commit }, payload) {
      commit("setLoading", true);

      axios
        .get(`http://localhost:5000/api/sections?chapterParentId=${payload}`)
        .then(response => {
          console.log(response.data);
          commit("setSections", response.data);

          var maxid = 0;
          for (var i = 0; i < response.data.length; i++) {
            if (maxid < response.data[i].id) {
              maxid = response.data[i].id;
            }
          }
          commit("setMaxSection", maxid);
        });
      commit("setLoading", false);
    },
    //update user's profile with new name and surname
    editUserProfile({ commit }, payload) {
      commit("setLoading", true);
      var temp = payload.id;
      console.log("Edit User's Profile with ID: ", temp);
      axios
        .put(`http://localhost:5000/api/users/${temp}`, {
          id: payload.id,
          email: payload.email,
          name: payload.name,
          surname: payload.surname,
          status: payload.status,
          type: payload.type,
          registration_date: payload.registration_date,
          moduleLVL: payload.moduleLVL,
          lessonLVL: payload.lessonLVL,
          chapterLVL: payload.chapterLVL,
          sectionLVL: payload.sectionLVL
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {});

      commit("setLoading", false);
    },
    //Store a new Course
    storeNewCourse({ commit }, payload) {
      commit("setLoading", true);

      axios.post(`http://localhost:5000/api/course/`, {
        name: payload.name
      });
      commit("setLoading", false);
    },

    //
    changeUserLVLs({ commit }, payload) {
      commit("setLoading", true);
      console.log("olo to payload", payload);
      var temp = payload.id;
      axios
        .put(`http://localhost:5000/api/users/${temp}`, {
          id: payload.id,
          email: payload.email,
          name: payload.name,
          surname: payload.surname,
          status: payload.status,
          type: payload.type,
          registration_date: payload.registration_date,
          moduleLVL: payload.moduleLVL,
          lessonLVL: payload.lessonLVL,
          chapterLVL: payload.chapterLVL,
          sectionLVL: payload.sectionLVL
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {});

      commit("setLoading", false);
    },
    //
    // Various Cases for Multiple choise
    //
    getMultipleChoiseQ({ commit }) {
      commit("setLoading", true);
      var moduleP = this.getters.pathModuleLVL;
      var lessonP = this.getters.pathLessonLVL;
      var chapterP = this.getters.pathChapterLVL;
      var sectionP = this.getters.pathSectionLVL;
      console.log("getMultipleChoiseQ->", moduleP, lessonP, chapterP, sectionP);

      axios
        .post(`http://localhost:5000/api/multiplechoise`, {
          moduleid: moduleP,
          lessonid: lessonP,
          chapterid: chapterP,
          sectionid: sectionP
        })
        .then(response => {
          console.log("back to store", response.data);
          commit("setMultipleChoiseQ", response.data);
        })
        .catch(err => {});

      commit("setLoading", false);
    },
    getChallengeModuleMCQ({ commit }, payload) {
      commit("setLoading", true);
      console.log("getChallengeModuleMCQ", payload);

      axios
        .post(`http://localhost:5000/api/challenge/module/mc`, {
          moduleid: payload
        })
        .then(response => {
          console.log("store setChallengeModuleMCQ", response.data);
          commit("setChallengeModuleMCQ", response.data);
        })
        .catch(err => {});
      commit("setLoading", false);
    },
    getChallengeOnceMCQ({ commit }) {
      commit("setLoading", true);
      axios
        .get(`http://localhost:5000/api/challenge/once/mc`)
        .then(response => {
          console.log("Store getChallengeOnceMCQ ", response.data);
          commit("setChallengeOnceMCQ", response.data);
        })
        .catch(err => {});

      commit("setLoading", false);
    },
    //
    // Various Cases for Code Question
    //
    getCodeQuestion({ commit }) {
      commit("setLoading", true);
      var moduleP = this.getters.pathModuleLVL;
      var lessonP = this.getters.pathLessonLVL;
      var chapterP = this.getters.pathChapterLVL;
      var sectionP = this.getters.pathSectionLVL;
      console.log(" getCodeQuestion->", moduleP, lessonP, chapterP, sectionP);

      axios
        .post(`http://localhost:5000/api/codeq`, {
          moduleid: moduleP,
          lessonid: lessonP,
          chapterid: chapterP,
          sectionid: sectionP
        })
        .then(response => {
          console.log("back ", response.data);
          commit("setCodeQuestion", response.data);
        })
        .catch(err => {});

      commit("setLoading", false);
    },
    getChallengeModuleCQ({ commit }, payload) {
      commit("setLoading", true);
      console.log("getChallengeModuleCQ", payload);

      axios
        .post(`http://localhost:5000/api/challenge/module/cq`, {
          moduleid: payload
        })
        .then(response => {
          console.log("store setChallengeModuleCQ ", response.data);
          commit("setChallengeModuleCQ", response.data);
        })
        .catch(err => {});

      commit("setLoading", false);
    },
    getChallengeOnceCQ({ commit }) {
      commit("setLoading", true);

      axios
        .get(`http://localhost:5000/api/challenge/once/cq`)
        .then(response => {
          console.log("Store getChallengeOnceCQ ", response.data[0]);
          commit("setChallengeOnceCQ", response.data[0]);
        })
        .catch(err => {});

      commit("setLoading", false);
    },
    getCourse({ commit }) {
      commit("setLoading", true);

      axios
        .get(`http://localhost:5000/api/course/`)
        .then(response => {
          console.log("Get Course", response.data);
          commit("setCourse", response.data);
        })
        .catch(err => {});
      commit("setLoading", false);
    },

    //get the paths
    getPathModuleLVL({ commit }, payload) {
      console.log(payload);
      commit("setPathModuleLVL", payload);
    },
    getPathLessonLVL({ commit }, payload) {
      commit("setPathLessonLVL", payload);
    },
    getPathChapterLVL({ commit }, payload) {
      commit("setPathChapterLVL", payload);
    },
    getPathSectionLVL({ commit }, payload) {
      commit("setPathSectionLVL", payload);
    },
    //get the pdf title
    getPdfTitle({ commit }, payload) {
      commit("setPdfTitle", payload);
    }
  },

  getters: {
    // Getters
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    modules(state) {
      return state.modules;
    },
    lessons(state) {
      return state.lessons;
    },
    chapters(state) {
      return state.chapters;
    },
    sections(state) {
      return state.sections;
    },

    maxModule(state) {
      return state.maxModule;
    },
    maxLesson(state) {
      return state.maxLesson;
    },
    maxChapter(state) {
      return state.maxChapter;
    },
    maxSection(state) {
      return state.maxSection;
    },

    pathModuleLVL(state) {
      return state.pathModuleLVL;
    },
    pathLessonLVL(state) {
      return state.pathLessonLVL;
    },
    pathChapterLVL(state) {
      return state.pathChapterLVL;
    },
    pathSectionLVL(state) {
      return state.pathSectionLVL;
    },
    pdfTitle(state) {
      return state.pdfTitle;
    },
    multipleChoiseQ(state) {
      return state.multipleChoiseQ;
    },
    codeQuestion(state) {
      return state.codeQuestion;
    },
    challengeOnceMCQ(state) {
      return state.challengeOnceMCQ;
    },
    challengeOnceCQ(state) {
      return state.challengeOnceCQ;
    },
    challengeModuleMCQ(state) {
      return state.challengeModuleMCQ;
    },
    challengeModuleCQ(state) {
      return state.challengeModuleCQ;
    },
    course(state) {
      return state.course;
    }
  }
});
