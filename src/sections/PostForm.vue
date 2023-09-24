<template>
  <div>
    <el-form
      @submit.prevent="submitForm"
      enctype="multipart/form-data"
      class="mx-[31px] my-[54px]"
      status-icon
      ref="postFormRef"
    >
      <div class="flex justify-between">
        <div class="text-[19px] font-bold">Home</div>
        <img src="@/assets/img/posticons/Customize.svg" alt="Customize" />
      </div>
      <div class="flex mt-5 items-center">
        <div className="h-12 w-12 justify-center mr-4">
          <template v-if="preview">
            <img :src="Twitter ? '' : preview" class="img-fluid h-full w-full rounded-full" />
          </template>
          <template v-else>
            <img class="border border-gray-300 h-full w-full rounded-full" src="@/assets/img/avatar/avatar.png" />
          </template>
        </div>
        <el-input
          :rows="2"
          type="textarea"
          placeholder="Please input"
          :prefix-icon="Message"
          maxlength="170"
          v-model="content"
          class="m-auto field"
          clearable
        ></el-input>
      </div>
      <div class="flex flex-col ss-flex-row gap-10 justify-between mt-7">
        <div class="flex gap-6 sm:ml-16 m-auto">
          <img
            class="w-5"
            src="@/assets/img/posticons/Group.svg"
            alt="Group"
            onclick="document.getElementById('getImage').click()"
          />
          <img
            class="w-5"
            onclick="document.getElementById('getVideo').click()"
            src="@/assets/img/posticons/Gif.svg"
            alt="gif"
          />
          <img class="w-5" src="@/assets/img/posticons/Stats.svg" alt="Stats" />
          <img class="w-5" src="@/assets/img/posticons/Smiley.svg" alt="Smiley" />
          <input id="getImage" hidden type="file" ref="file" accept="image/*" v-on:change="previewImage1" />
          <input id="getVideo" hidden type="file" ref="file" accept="video/*" v-on:change="previewVideo" />
        </div>
        <div class="flex gap-4 m-auto sm:m-0">
          <img class="w-6" src="@/assets/img/posticons/Ellipse.svg" alt="gif" />
          <img class="h-9" src="@/assets/img/posticons/Line.svg" alt="gif" />
          <img class="w-6" src="@/assets/img/posticons/plus.svg" alt="gif" />
          <el-button
            class="bg-blue-500 text-white rounded-full"
            style="font-weight: bold"
            native-type="submit"
            :loading="isLoading"
          >
            Tweet1
          </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { watch, onMounted, reactive, ref, defineProps } from "vue";
import type { FormInstance } from "element-plus";
import { postStore } from "@/stores";
import { storeToRefs } from "pinia";
import { Message } from "@element-plus/icons-vue";

const poststore = postStore();
const { postList } = storeToRefs(postStore());

const content = ref("");
const isLoading = ref(false);
const loading = ref(false);

const postFormRef = ref<FormInstance>();

const Twitter = ref(false);
const image = ref<File | any>();
const video = ref<File | any>();
const preview = ref("");
const previewImage1 = (event: any) => {
  Twitter.value = false;
  var input = event.target;
  if (input.files) {
    var reader = new FileReader();
    reader.onload = (e: any) => {
      preview.value = e.target.result;
    };
    image.value = input.files[0];
    reader.readAsDataURL(input.files[0]);
  }
};
const previewVideo = (event: any) => {
  Twitter.value = false;

  var input = event.target;
  if (input.files) {
    var reader = new FileReader();
    reader.onload = (e: any) => {
      preview.value = e.target.result;
    };
    video.value = input.files[0];
    reader.readAsDataURL(input.files[0]);
  }
};
if (content) {
  isLoading.value = false;
}
async function submitForm() {
  Twitter.value = true;
  //   const isValid = await postFormRef.value?.validate();
  //   if (!isValid) return;
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
</script>
