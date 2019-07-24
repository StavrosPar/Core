<template>
  <!-- <v-app style="background-color:white;  "> -->
  <v-app id="vapp">
    <v-navigation-drawer temporary fixed v-model="sideNav">
      <v-list v-if="!userIsAuthenticated">
        <v-list-tile v-for="item in menu" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app dark style="background-color:#547c9e;">
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <strong>
          <router-link to="/" tag="span" style="cursor: Pointer">
            <v-icon>school</v-icon>
            <span id="sp">C</span>oding
            <span id="sp">O</span>nline expe
            <span id="sp">R</span>i
            <span id="sp">E</span>nce
          </router-link>
        </strong>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-menu v-if="!userIsAuthenticated" offset-y>
          <v-btn slot="activator" flat>
            <v-icon>drag_indicator</v-icon>Status
          </v-btn>
          <v-list>
            <v-list-tile v-for="item in menu " :key="item.title" :to="item.link">
              <v-list-tile-title :to="item.link">
                <v-icon left>{{item.icon }}</v-icon>
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <!-- <v-btn id="mail" flat v-for="item in mailItem" :key="item.title" :to="item.link">
          <v-icon left dark>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>-->
        <v-btn id="vi" flat v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-icon left dark>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>

        <v-menu v-if="userIsAuthenticated" offset-y>
          <v-btn slot="activator" flat>
            <v-icon left>account_circle</v-icon>
            {{this.user.name}}
          </v-btn>
          <v-list>
            <v-list-tile @click="goToProfile">
              <v-list-tile-title>
                <v-icon>account_circle</v-icon>
                <span>Profile</span>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
          <v-list>
            <v-list-tile @click="onLogout">
              <v-list-tile-title>
                <v-icon left>exit_to_app</v-icon>
                <span>Logout</span>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>

    <main>
      <v-content>
        <router-view />
      </v-content>
    </main>
    <!-- <v-footer class="justify-center pl-0" inset app> -->
    <v-footer class="pa-3" app>
      <v-spacer></v-spacer>
      <div>Nile Lab &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
// import Vue from 'vue'
// import quickMenu from 'vue-quick-menu'

export default {
  data() {
    return {
      sideNav: false
      //quickMenu
    };
  },
  computed: {
    user() {
      if (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      ) {
        return this.$store.getters.user;
      }
    },

    //shows menu items depending the state you are
    menu() {
      let menuItems = [
        { icon: "list_alt", title: "Sign Up", link: "/signup" },
        { icon: "lock_open", title: "Sign In", link: "/signin" }
      ];
      return menuItems;
    },
    menuItems() {
      let menuItems;
      //  = [
      //   { icon: "face", title: "Sign up  ", link: "/signup" },
      //   { icon: "lock_open", title: "Sign in  ", link: "/signin" }
      // ];
      if (this.userIsAuthenticated) {
        if (this.userIsTeacher) {
          menuItems = [
            { icon: "web", title: "Teacher Page", link: "/teachercourse" },
            { icon: "add_box", title: "Add Course", link: "/addcourse" }
            // { icon: "person", title: "Profile", link: "/profile" }
          ];
        } else {
          menuItems = [
            //  { icon: "gamepad", title: "Test", link: "/test" },
            { icon: "gamepad", title: "Courses", link: "/selectStartCourse" }
            // { icon: "person", title: "Profile", link: "/profile" }
          ];
        }
      }
      return menuItems;
    },

    //checks if user is authenticated
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },

    //checks if user is an Teacher
    userIsTeacher() {
      console.log("--------");
      console.log(this.user);
      console.log("--------");
      if (this.user) {
        if (this.user.type === "teacher") {
          return true;
        }
      } else {
        return false;
      }
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    },
    goToProfile() {
      let email = this.user.email;
      this.$router.push("/profile");
    }
  },
  name: "App"
};
</script>


<style>
#vapp {
  /* background-color:#f9fafa;  */
  background-color: #e0e9e9;
}
/*
#vi{
   text-transform: capitalize;
   font-size: 20px;
}

/* #sp{
  color: #60f044;
} */

/*loader css*/
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>







