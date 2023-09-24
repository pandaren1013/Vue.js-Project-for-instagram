import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { httpUtil } from "@/util/http_util";
import type { Comment, Post, newPost } from "@/interfaces/custom";
import { formatDistance } from "date-fns";

export const postStore = defineStore("poststore", () => {
  const postList = ref<newPost[]>([]);

  function getPost(pagenum: number, pagecnt: number) {
    const token = localStorage.getItem("auth_token");
    return httpUtil
      .get("/posts/all", {
        headers: { Authorization: `Bearer ${token}` },
        params: { pagenum, pagecnt }
      })
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          const createday = new Date(res.data[i].post.createdAt);
          const presentDay = new Date();
          res.data[i].post.createdAt = formatDistance(presentDay, createday);
        }
        if (pagenum == 1) {
          postList.value = res.data;
        } else {
          postList.value.push(...res.data);
        }
      })
      .catch(error => {
        alert(error.message);
      });
  }

  function postRegister(payload: FormData) {
    const token = localStorage.getItem("auth_token");
    return axios({
      method: "post",
      url: "http://192.168.3.42:3009/posts/add",
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          const createday = new Date(res.data[i].post.createdAt);
          const presentDay = new Date();
          res.data[i].post.createdAt = formatDistance(presentDay, createday);
        }
        console.log("aef", res.data);
        postList.value.unshift({ post: { ...res.data }, comments: [] });
      })
      .catch(error => {
        alert(error.message);
      });
  }
  function commentRegister(payload: Comment, post_id: string) {
    const token = localStorage.getItem("auth_token");
    return axios({
      method: "post",
      url: `http://192.168.3.42:3009/commentaries/${post_id}`,
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const updateIndex = postList.value.findIndex(x => x.post._id === post_id);
        postList.value[updateIndex].comments.unshift({ ...res.data });
      })
      .catch(error => {
        alert(error.message);
      });
  }
  function Like(post_id: string) {
    const token = localStorage.getItem("auth_token");
    const like = true;
    return axios({
      method: "post",
      url: `http://192.168.3.42:3009/like/${post_id}`,
      data: { like: true },
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const updateIndex = postList.value.findIndex(x => x.post._id === post_id);
        postList.value[updateIndex].post = { ...postList.value[updateIndex].post, likecnt: res.data.likecnt };
      })
      .catch(error => {
        alert(error.message);
      });
  }
  function DisLike(post_id: string) {
    const token = localStorage.getItem("auth_token");
    return axios({
      method: "post",
      url: `http://192.168.3.42:3009/like/${post_id}`,
      data: { like: false },
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const updateIndex = postList.value.findIndex(x => x.post._id === post_id);
        postList.value[updateIndex].post = { ...postList.value[updateIndex].post, likecnt: res.data.likecnt };
      })
      .catch(error => {
        alert(error.message);
      });
  }

  return { getPost, postRegister, Like, DisLike, postList, commentRegister };
});
