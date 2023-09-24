<template>
  <div v-loading="isLoading" class="max-h-[100vh] overflow-scroll" ref="el">
    <!-- START HEADER -->
    <div class="flex flex-col gap-10 md:gap-0 md:flex-row items-center mb-11 mt-5 ml-[71px]">
      <img src="@/assets/img/avatar/1.png" alt="avatar" class="w-[150px] mr-[101px] rounded-full" />
      <div class="flex-col">
        <div class="flex items-center">
          <p class="text-3xl">Jennifer</p>
          <button class="bg-[#0095F6] rounded-[4px] text-xl text-white px-6 py-[6px] ml-5 mr-3">Follow</button>
          <img src="@/assets/img/posticons/More.svg" alt="Customize" />
        </div>
        <div class="flex gap-10 my-5">
          <p class="text-base font-semibold">1.258 <span class="font-normal">posts</span></p>
          <p class="text-base font-semibold">4M <span class="font-normal">followers</span></p>
          <p class="text-base font-semibold">1.250 <span class="font-normal">following</span></p>
        </div>
        <p class="text-base font-semibold">Terry Lucas</p>
      </div>
    </div>
    <!-- END OF HEADER -->
    <div class="flex ml-12 mb-11 items-baseline">
      <div v-for="(post, id) in postList" :key="id" class="flex flex-col gap-4 mx-7 my-4 items-center">
        <img v-if="post.post.type === 'IMAGE'" class="w-full" :src="mediaFun(post)" :alt="post.post.filename" />
        <video v-else ref="el1" class="m-auto rounded" :src="mediaFun(post)" controls />
        <p class="text-sm font-semibold">Made Us</p>
      </div>
    </div>

    <hr />

    <div class="flex flex-col justify-center gap-[60px] my-4 md:flex-row pt-4">
      <div
        @click="getAll"
        class="flex gap-1.5 items-center cursor-pointer m-auto md:m-0 pt-[17px]"
        :class="_getAll ? '  border-[#262626] border-t-[1px]' : ''"
      >
        <img class="w-8 md:w-3" src="@/assets/img/posticons/Posts.svg" alt="Posts" />
        <p class="text-5xl md:text-xs font-semibold">POSTS</p>
      </div>
      <div
        @click="getImage"
        class="flex gap-1.5 items-center cursor-pointer m-auto md:m-0 pt-[17px]"
        :class="_getImage ? '  border-[#262626] border-t-[1px]' : ''"
      >
        <img class="w-8 md:w-3" src="@/assets/img/posticons/Guides.svg" alt="Guides" />
        <p class="text-5xl md:text-xs font-semibold">PHOTOS</p>
      </div>
      <div
        @click="getVideo"
        class="flex gap-1.5 items-center cursor-pointer m-auto md:m-0 pt-[17px]"
        :class="_getVideo ? '  border-[#262626] border-t-[1px]' : ''"
      >
        <img class="w-8 md:w-3" src="@/assets/img/posticons/Videos.svg" alt="Videos" />
        <p class="text-5xl md:text-xs font-semibold">VIDEOS</p>
      </div>
    </div>

    <div class="flex items-center">
      <div v-if="_getImage" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <div v-for="(post, id) in postList.filter(list => list.post.type === 'IMAGE')" :key="id">
          <img class="w-full" :src="mediaFun(post)" :alt="post.post.filename" />
        </div>
      </div>
      <div v-else-if="_getVideo" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <div v-for="(post, id) in postList.filter(list => list.post.type === 'VIDEO')" :key="id">
          <video ref="el1" class="m-auto rounded !h-64" :src="mediaFun(post)" controls />
        </div>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <div v-for="(post, id) in postList" :key="id">
          <img v-if="post.post.type === 'IMAGE'" class="w-full" :src="mediaFun(post)" :alt="post.post.filename" />
          <video v-else ref="el1" class="m-auto rounded !h-64" :src="mediaFun(post)" controls />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch } from "vue";
import type { Comment, Post, newPost } from "@/interfaces/custom";
import { useScroll } from "@vueuse/core";
import { postStore } from "@/stores";
import { storeToRefs } from "pinia";
const poststore = postStore();
const { postList } = storeToRefs(postStore());
const _getImage = ref(false);
const _getVideo = ref(false);
const _getAll = ref(false);
const isLoading = ref(true);
const mediaFun = (post: newPost) => {
  return `http://192.168.3.42:3009/${post.post.filename}`;
};
function getProfileInfo() {
  poststore
    .getPost(pagenum.value, pagecnt.value)
    .catch(error => error)
    .finally(() => (isLoading.value = false));
}

const getAll = () => {
  _getAll.value = true;
  _getImage.value = false;
  _getVideo.value = false;
};
const getImage = () => {
  _getAll.value = false;
  _getImage.value = true;
  _getVideo.value = false;
};
const getVideo = () => {
  _getAll.value = false;
  _getVideo.value = true;
  _getImage.value = false;
};

//Pagenation
const pagenum = ref<number>(1);
const pagecnt = ref<number>(12);

const el = ref<HTMLElement | null>(null);
const { arrivedState } = useScroll(el);

watch(arrivedState, value => {
  if (value.bottom) {
    isLoading.value = true;

    poststore.getPost(pagenum.value++, pagecnt.value).then(() => (isLoading.value = false));
  }
});
import { onMounted, reactive, ref } from "vue";
function toLower(item?: string) {
  return String(item).toLowerCase();
}
onMounted(() => {
  document.title = "My Profile | Jennifer";
  getProfileInfo();
});
</script>

<style scoped>
.main-view {
  text-align: center;
  justify-content: center;
}

.joined {
  font-size: 14px;
}

.myEdit {
  color: var(--primary);
  cursor: pointer;
}

.username {
  font-size: 1.5em;
  margin: 0.5em auto;
}

.summary {
  width: 70%;
  margin: 0 auto;
}
.myprogress {
  width: 8em;
  margin-top: 1em;
}

.myvalue {
  font-size: 2em;
  font-family: Georgia, "Times New Roman", Times, serif;
}

.my-title {
  font-size: 1em;
  font-variant: small-caps;
}

.my-sub {
  font-size: 1em;
}

.second-form {
  width: 40% !important;
}

.titleprogress {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.viewAll button {
  color: var(--primary) !important;
}

.recently {
  width: 70%;
  text-align: left;
  margin: 2em auto;
}

.recentBox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 95%;
}

.recentSingle {
  width: 10em;
  font-weight: 700;
  border: rgba(0, 0, 0, 0.2) solid 1px;
  text-align: left;
  align-items: baseline;
  padding: 1.5em;
  margin: 1em;
  border-radius: 1em;
}

.recentSingle:hover {
  background-color: rgb(202, 202, 202);
  cursor: pointer;
  border: white solid 1px;
}

.recentSingle.linky {
  color: var(--primary) !important;
  width: 7em !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media screen and (max-width: 770px) {
  .main-view {
    padding: 0 2%;
  }

  .second-form {
    width: 90% !important;
  }

  .summary {
    width: 90%;
    margin: 0 auto;
  }

  .my-sub {
    font-size: 12px;
  }

  .myvalue {
    font-size: 1.5em;
  }

  .titleprogress {
    width: 90%;
  }

  .recently {
    width: 100%;
    margin-left: 1em;
    text-align: left;
  }

  .recentBox {
    width: 100%;
    flex-wrap: nowrap;
    overflow-x: scroll;
  }

  .recentSingle {
    width: 200px !important;
  }
}
</style>
