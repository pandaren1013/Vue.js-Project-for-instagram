<template>
  <!-- <div v-loading="loading"  class="grid grid-cols-1 gap-[29px] lg:grid-cols-3 max-h-[100vh] overflow-scroll" ref="el"> -->
  <div class="grid grid-cols-1 gap-[29px] lg:grid-cols-3 max-h-[100vh] overflow-scroll scroll-hidden" ref="el">
    <div class="col-span-1 lg:col-span-2">
      <PostForm />
      <vueper-slides
        :dragging-distance="201"
        :arrows-outside="false"
        :visible-slides="7"
        :gap="4"
        :slide-ratio="1 / 9"
        :breakpoints="{ 800: { visibleSlides: 3, slideMultiple: 3 } }"
        fixed-height="100px"
        :autoplay="true"
        :bullets="true"
      >
        <vueper-slide
          class="text-green-600 text-xs p-3 m-[7px] !w-[56px] !h-[56px] outline outline-offset-4 outline-pink-500 rounded-full"
          v-for="(slide, i) in slides"
          :key="i"
          :arrows-outside="false"
          :arrows="false"
          :title="slide.title"
          :content="slide.content"
          :image="slide.image"
        />
      </vueper-slides>

      <PostList v-for="(post, id) in postList" :key="id" :post="post" />
    </div>
    <div class="col-span-1">
      <RightSide :postList="postList" @increase-by="increaseCount" @some-event.once="callback" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import PostList from "@/sections/PostList.vue";
import PostForm from "@/sections/PostForm.vue";
import RightSide from "@/sections/RightSide.vue";
import { useScroll } from "@vueuse/core";
import moment from "moment";
import "vue3-canvas-video-player/dist/style.css";
import { provide, watch, onMounted, reactive, ref, defineProps } from "vue";
import { postStore } from "@/stores";
import { storeToRefs } from "pinia";
import type { FormInstance } from "element-plus";
const callback = () => {
  console.log("Emit Success,happen by .once");
};
defineProps({
  postList: {
    type: Array,
    required: true
  }
});
// provide('message', 'postList')
//Emit use exam
const count = ref(0);
function increaseCount(n: number) {
  count.value += n;
  console.log("increase", count.value);
}

const poststore = postStore();
const { postList } = storeToRefs(postStore());
const content = ref("");
import { VueperSlides, VueperSlide } from "vueperslides";

import "vueperslides/dist/vueperslides.css";
import a from "@/assets/img/avatar/1.png";
import b from "@/assets/img/avatar/2.png";
import c from "@/assets/img/avatar/3.png";
import d from "@/assets/img/avatar/4.png";
const slides = [
  {
    image: a,
    title: "aaaaa",
    content: "baaaab"
  },
  {
    image: b
    // title: "asefsefa",
    // content: "baefsfb"
  },
  {
    image: c
    // title: "aa",
    // content: "bb"
  },
  {
    image: d
    // title: "aa",
    // content: "bb"
  },
  {
    image: a
  },
  {
    image: b
  },
  {
    image: c
  },
  {
    image: d
  },
  {
    image: a
  },
  {
    image: b
  },
  {
    image: c
  },
  {
    image: d
  }
];

let unixTime = moment().unix();
const isLoading = ref(false);
const topCategs = reactive(["Development", "Music", "PhotoVideo", "Finance"]);
const serverError = ref("");
const postFormRef = ref<FormInstance>();
if (content) {
  isLoading.value = false;
}
const image = ref<File | any>();
const video = ref<File | any>();

const Twitter = ref(false);
async function submitForm() {
  Twitter.value = true;
  const isValid = await postFormRef.value?.validate();
  if (!isValid) return;
  const formData = new FormData();
  if (image.value) {
    formData.append("file", image.value);
    formData.append("type", "Image");
  }
  if (video.value) {
    formData.append("file", video.value);
    formData.append("type", "Video");
  }
  if (content) {
    formData.append("content", content.value);
  }
  poststore
    .postRegister(formData)
    .then(response => {
      image.value = "";
      video.value = "";
      content.value = "";
      console.log("asdfasef", response);
    })
    .catch(error => error)
    .finally(() => (loading.value = false));
}
const pagenum = ref<number>(1);
const pagecnt = ref<number>(2);
const loading = ref<boolean>(true);
const el = ref<HTMLElement | null>(null);
const { x, y, isScrolling, arrivedState, directions } = useScroll(el);

watch(arrivedState, value => {
  if (value.bottom) {
    loading.value = true;
    poststore.getPost(pagenum.value++, pagecnt.value).then(() => (loading.value = false));
  }
});

function fetchAllPosts() {
  poststore
    .getPost(pagenum.value, pagecnt.value)
    .catch(error => (serverError.value = error.message))
    .finally(() => (loading.value = false));
}

onMounted(() => {
  document.title = "Home | Jennifer";
  fetchAllPosts();
});
</script>

<style>
@media (min-width: 480px) {
  .ss {
    display: flex;
  }
}
/* .main-body {
  margin: auto;
  width: 80% !important;
  padding: 1em;
}

.course-box {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-self: center;
  margin: auto;
  align-content: space-around;
  border: 1px solid var(--el-border-color-darker);
  border-radius: 30%;
}

.banner-image {
  height: 10em;
  aspect-ratio: 16 / 9;
  width: 100%;
  background-color: blueviolet;
  overflow-x: hidden;
  overflow-y: hidden;
}

#header-box {
  text-align: left;
  color: aliceblue;
  padding-left: 10%;
  padding-top: 5%;
  width: 20%;
  height: 200px;
}

.courseCard {
  width: min-content;
  height: 20em;
}

.courseCard:hover {
  cursor: pointer;
}

.serif-head {
  font-family: Georgia, "Times New Roman", Times, serif;
}

.sub-heading {
  color: gray;
}

.catArea {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
}

.catSingle {
  width: 10em;
  font-weight: 700;
  border: rgba(0, 0, 0, 0.2) solid 1px;
  text-align: center;
  align-items: baseline;
  padding: 2em;
  margin: 1em;
  border-radius: 1em;
}

.catSingle:hover {
  background-color: var(--primary);
  cursor: pointer;
  border: none;
  color: var(--vt-c-white-soft);
}

.el-space__item {
  width: 100% !important;
}
.file-upload-form,
.image-preview {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  padding: 20px;
}
img.preview {
  width: 200px;
  background-color: white;
  border: 1px solid #ddd;
  padding: 5px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
/* 
@media screen and (max-width: 770px) {
  #header-box {
    width: 60%;
  }

  .courseCard {
    height: 100%;
  }

  .flex {
    display: block;
  }

  .catArea {
    flex-wrap: nowrap;
    overflow-x: scroll;
  }
  
} */
@media screen and (min-width: 470px) {
  .ss-flex-row {
    flex-direction: row !important;
  }
}
</style>
