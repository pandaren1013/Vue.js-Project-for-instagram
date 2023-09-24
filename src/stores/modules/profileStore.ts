import { defineStore } from "pinia";
import { ref } from "vue";
import { httpUtil } from "@/util/http_util";
export const profileStore = defineStore("main", () => {
  const postList = ref([]);

  function getProfileInfo(pagenum: number = 1, pagecnt: number = 3) {
    const token = localStorage.getItem("auth_token");
    return httpUtil
      .get("/posts/all", {
        headers: { Authorization: `Bearer ${token}` },
        params: { pagenum, pagecnt }
      })
      .then(res => {
        postList.value = res.data;
      })
      .catch(error => {
        alert(error.message);
      });
  }

  return { getProfileInfo };
});
export default profileStore;
