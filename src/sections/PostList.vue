<template>
  <div class="mb-16">
    <div class="flex justify-between mb-3">
      <div class="flex gap-[14px]">
        <img
          class="outline-pink-500 bg-gradient-to-r from-cyan-500 to-blue-500 ml-4 h-8 w-8 rounded-full outline outline-offset-4"
          src="@/assets/img/avatar/1.png"
          alt=""
        />
        <div class="text-sm font-semibold">{{ post.post.author.username }}</div>
      </div>
      <img src="@/assets/img/posticons/More.svg" alt="Smiley" />
    </div>
    <img v-if="post.post.type === 'IMAGE'" class="w-full" :src="mediaFun(post.post)" :alt="post.post.filename" />
    <video v-else class="m-auto rounded" :src="mediaFun(post.post)" width="600" controls />
    <div class="mx-4">
      <div class="flex justify-between my-2">
        <div class="flex">
          <div @click="post.post.liketype = !post.post.liketype">
            <img
              v-if="post.post.liketype === true"
              class="hover:scale-125 duration-300 m-2 w-6 cursor-pointer"
              src="@/assets/img/posticons/heart2.png"
              alt="Like"
              @click="poststore.DisLike(post.post._id)"
            />
            <img
              v-else
              class="hover:scale-125 duration-300 m-2 cursor-pointer"
              src="@/assets/img/posticons/Like.svg"
              alt="Like"
              @click="poststore.Like(post.post._id)"
            />
          </div>

          <img
            class="hover:scale-125 duration-300 m-2 cursor-pointer"
            @click="commentFocus"
            src="@/assets/img/posticons/Comment.svg"
            alt="Comment"
          />
          <img
            class="hover:scale-125 duration-300 m-2 cursor-pointer"
            src="@/assets/img/posticons/SharePosts.svg"
            alt="SharePosts"
          />
        </div>
        <img src="@/assets/img/posticons/Save.svg" alt="Save" />
      </div>
      <div>
        <div class="text-sm">{{ post.post.likecnt }} likes</div>
        <div class="flex justify-between">
          <div class="flex mb-1">
            <div class="text-sm font-semibold mr-[7px]">{{ post.post.author.username }}</div>
            <p :class="truncl ? '' : 'truncate'" class="text-sm">{{ post.post.content }}</p>
          </div>
          <button @click="truncl = !truncl">{{ truncl ? "less" : "more" }}</button>
        </div>
        <div v-for="(comment, com_id) in post.comments" :key="com_id">
          <div v-if="com_id < 3" class="flex mb-1 justify-between">
            <div class="flex">
              <div class="text-sm font-semibold mr-[7px]">{{ comment.user.username }}</div>
              <p :class="truncli[com_id + 100] ? '' : 'truncate'" class="text-sm">{{ comment.commentary }}</p>
            </div>
            <button @click="truncli[com_id + 100] = !truncli[com_id + 100]">
              {{ truncli[com_id + 100] ? "less" : "more" }}
            </button>
          </div>
        </div>
        <div class="text-sm text-[#8E8E8E] mb-1">View all 100 comments</div>
        <div class="text-[10px] leading-6 text-[#8E8E8E] mb-6">{{ post.post.createdAt }} ago</div>
        <form @submit.prevent="CommentFunction(commentForm, post.post._id)">
          <div class="flex items-center my-2 mr-4">
            <img src="@/assets/img/posticons/Emoji.svg" alt="Emoji" class="mr-4" />
            <input
              class="w-full px-4 py-1 bg-gray-100 focus:outline-none border border-gray-200 rounded-lg"
              type="text"
              placeholder="Add a comment..."
              v-on:input="(e:any) => (commentForm.commentary = e.target.value)"
              v-model="commentModel"
              ref="focusRef"
            />
            <input
              type="submit"
              class="cursor-pointer ml-1 flex items-center justify-center mb-2 text-[#0095F6] font-normal leading-8 rounded-xl"
              value="Post"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { postStore } from "@/stores";
import type { Post } from "@/interfaces/custom";
import { defineProps, reactive, ref, defineEmits } from "vue";
const poststore = postStore();
const mediaFun = (post: Post) => {
  return `http://192.168.3.42:3009/${post.filename}`;
};
const truncli = ref<boolean[]>([]);
const truncl = ref<boolean>();
const focusRef = ref<HTMLInputElement | null>(null);
const commentFocus = () => {
  if (focusRef.value) {
    focusRef.value.focus();
  }
};
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});
const commentModel = ref<string>("");
const commentForm = reactive({
  commentary: ""
});
const CommentFunction = (Form: any, id: string) => {
  poststore.commentRegister(Form, id).then(res => (commentModel.value = ""));
};
// const emit = defineEmits(["menu-click"]);
</script>
