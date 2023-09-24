<template>
  <div class="h-13 py-2 nav-sticky">
    <el-row justify="space-between">
      <div @click="goToHome">
        <img src="@/assets/img/navbar/Logo.svg" alt="Logo" class="mt-[7px]" />
      </div>
      <div></div>
      <!-- START SEARCH BAR -->
      <div id="searchBar">
        <form @submit.prevent="handleSearch">
          <el-input
            :prefix-icon="Search"
            native-type="search"
            clearable
            maxlength="30"
            v-model="searchItem"
            placeholder="Search"
          >
          </el-input>
        </form>
      </div>
      <!-- end searchbar -->
      <!-- ELSE -->
      <div>
        <div className="md:hidden flex  justify-end items-center">
          <el-dropdown>
            <el-avatar class="!rounded-sm" :size="30" style="cursor: pointer" :src="menu" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item disabled>
                  {{ store.username }}
                </el-dropdown-item>
                <el-dropdown-item divided />
                <!-- NAV BAR DROPDOWN -->
                <el-dropdown-item v-for="item in navMenuList" :key="item.id" @click="router.push(item.url)">
                  {{ item.title }}
                </el-dropdown-item>
                <el-dropdown-item @click="logout()">Logout</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="hidden md:flex gap-[22px]">
          <img src="@/assets/img/navbar/home.svg" alt="home" />
          <img src="@/assets/img/navbar/flow.svg" alt="flow" />
          <img src="@/assets/img/navbar/plus.svg" alt="plus" />
          <img src="@/assets/img/navbar/campass.svg" alt="campass" />
          <img src="@/assets/img/navbar/heart.svg" alt="heart" />
          <el-dropdown>
            <el-avatar :size="30" style="cursor: pointer" :src="avatar" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item disabled>
                  {{ store.username }}
                </el-dropdown-item>
                <el-dropdown-item divided />
                <!-- NAV BAR DROPDOWN -->
                <el-dropdown-item v-for="item in navMenuList" :key="item.id" @click="router.push(item.url)">
                  {{ item.title }}
                </el-dropdown-item>
                <el-dropdown-item @click="logout()">Logout</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import menu from "@/assets/img/navbar/menu.png";
import { ElNotification } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import avatar from "@/assets/img/avatar/avatar.png";

import navMenuList from "@/navmenu.json";
import type { PropType } from "vue";
import { ref } from "vue";
import { useStudentStore } from "@/stores";
import { useRouter } from "vue-router";
const store = useStudentStore();
const searchItem = ref("");
const router = useRouter();
const goToHome = () => {
  router.replace({ path: "/", force: true });
};

function handleSearch() {
  if (!searchItem.value.trim().length) return;
  if (searchItem.value.trim().length < 3) {
    return ElNotification({
      title: "Error",
      type: "error",
      duration: 2000,
      message: "Query too short"
    });
  }
  router.push({
    name: "SearchResults",
    query: { q: encodeURI(searchItem.value.trim()) },
    force: true
  });
}

const logout = async () => {
  localStorage.clear();
  store.$patch({
    id: 0,
    email: "",
    loggedIn: false
  });

  router.push("/login");
};
</script>

<style scoped>
.nav-sticky {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.8);
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
}
.logo-area {
  cursor: pointer;
  width: 10em;
  /* margin-left: -5em; */
  height: 100%;
}

.mylogo {
  width: 100%;
  height: 100%;
}

.el-dropdown-link {
  font-size: 14px;
  cursor: pointer;
}

.category {
  margin-top: 0.5em;
  width: 10%;
}

.nav-btns {
  display: flex;
  margin-right: 1em;
  flex-direction: row;
}

.shorty {
  display: block;
  color: red;
  font-size: small;
}
.cartIcon {
  width: 10%;
  float: right;
  display: flex;
  height: 100%;
}

#searchBar {
  width: 30%;
}

#nav {
  margin-top: 0;
  right: 0;
  left: 0;
  padding: 0.25em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.08);
}

.itemCart {
  margin-top: 0.5em;
}

@media screen and (max-width: 830px) {
  #searchBar {
    display: none;
  }
}

@media screen and (max-width: 770px) {
  .full-only {
    display: none;
  }
  .logo-area {
    transform: scale(0.7);
    margin-left: 0;
    transition: all ease-in 0.5s;
  }
}
</style>
