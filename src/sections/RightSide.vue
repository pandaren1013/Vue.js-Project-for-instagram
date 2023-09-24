<template>
  <div>
    <div class="mt-11 mb-6 flex">
      <img src="@/assets/img/avatar/1.png" alt="Emoji" class="w-14 mr-6 rounded-full" />
      <div class="flex justify-between w-full">
        <div class="w-36">
          <p class="text-sm mb-2 text-semibold truncate">
            Shirley romeroShirley romeroShirley romeroShirley romeroShirley romero1
          </p>
          <p class="text-sm mb-2 text-[#8E8E8E]">Shirley romero</p>
        </div>
        <button class="text-[#0095F6] font-semibold text-xs">Switch</button>
      </div>
    </div>
    <div class="flex justify-between mb-2">
      <p class="text-sm text-semibold text-[#8E8E8E]">Suggestions For You</p>
      <button class="font-semibold text-xs">See All</button>
    </div>

    <div class="my-2 items-center justify-between gap-5" v-for="(post, id) in postList" :key="id">
      <div class="flex items-center justify-between gap-3">
        <div class="flex">
          <img
            class="h-8 w-8 mr-3 rounded-full"
            :src="`http://192.168.3.42:3009/${post.post.filename}`"
            :alt="post.post.filename"
          />
          <div class="w-48">
            <p class="truncate text-[14px] leading-3">terylucas</p>
            <p class="truncate text-[12px] text-[#8E8E8E]">Followed by terylucas + 2 more</p>
          </div>
        </div>
        <button class="text-[#0095F6] text-xs font-semibold">Follow</button>
      </div>
    </div>
  </div>
  <button @click="$emit('someEvent')">Emit Exam</button><br />
  <button @click="$emit('increaseBy', 1)">Increase by 1</button>
</template>
<script lang="ts" setup>
import { inject } from "vue";
const message = inject("message");
console.log("message", message);
const props = defineProps({
  postList: {
    type: Array,
    required: true
  }
});
</script>
