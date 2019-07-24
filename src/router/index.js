import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Module from "@/components/Browse/Module";
import Profile from "@/components/User/Profile";
import Signin from "@/components/User/Signin";
import Signup from "@/components/User/Signup";
import TeacherCourse from "@/components/Teacher/TeacherCourse";
import AddCourse from "@/components/Teacher/AddCourse";
import Authguard from "./auth-guard";
import Lessons from "@/components/Browse/Lessons";
import LabExercise from "@/components/Play/LabExercise";
import SelectStartCourse from "@/components/Browse/SelectStartCourse";
import ChallengeModule from "@/components/Challenge/ChallengeModule";
import Chapter from "@/components/Browse/Chapter";
import Section from "@/components/Browse/Section";
import Lecture from "@/components/Play/Lecture";
import ChallengeCourse from "@/components/Challenge/ChallengeCourse";

import Test from "@/components/TestFolder/Test";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/test",
      name: "Test",
      component: Test
    },
    {
      path: "/lecture",
      name: "Lecture",
      component: Lecture,
      beforeRouteUpdate: Authguard,
      beforeEnter: Authguard
    },
    {
      path: "/selectStartCourse",
      name: "SelectStartCourse",
      component: SelectStartCourse,
      beforeRouteUpdate: Authguard,
      beforeEnter: Authguard
    },
    {
      path: "/teachercourse",
      name: "TeacherCourse",
      component: TeacherCourse,
      beforeEnter: Authguard
    },
    {
      path: "/addcourse",
      name: "AddCourse",
      component: AddCourse,
      beforeEnter: Authguard
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      beforeEnter: Authguard
    },
    {
      path: "/signin",
      name: "Signin",
      component: Signin
    },
    {
      path: "/challengemodule/:parentId",
      name: "ChallengeModule",
      component: ChallengeModule,
      beforeEnter: Authguard
    },
    {
      path: "/challengeCourse",
      name: "ChallengeCourse",
      component: ChallengeCourse,
      beforeEnter: Authguard
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    },
    {
      path: "/module",
      name: "Module",
      component: Module,
      beforeRouteUpdate: Authguard,
      beforeEnter: Authguard
    },
    {
      path: "/:parentId/",
      name: "Lessons",
      props: true,
      component: Lessons,
      beforeRouteUpdate: Authguard,
      beforeEnter: Authguard
    },
    {
      path: "/:parentId/:id/",
      name: "Chapter",
      //props:true,
      component: Chapter,
      beforeRouteUpdate: Authguard,
      beforeEnter: Authguard
    },
    {
      path: "/:parentId/:lessonid/:id/",
      //path:"/section",
      name: "Section",
      component: Section,
      beforeRouteUpdate: Authguard,
      beforeEnter: Authguard
    },
    {
      path: "/:parentId/:lessonid/:chapterid/:id",
      name: "LabExercise",
      component: LabExercise,
      beforeEnter: Authguard,
      beforeEnter: Authguard
    },
    {
      path: "*",
      component: Home
    }
  ],
  mode: "history"
});
