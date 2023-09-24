import { defineStore } from "pinia";
import { httpUtil } from "@/util/http_util";
import type { UserDto } from "@/interfaces/custom";

// FOR USER's state
interface UserState {
  id: number;
  username: string;
  email: string;
  loggedIn: boolean;
  cartCount: number;
  content: string;
  file: string;
  type: string;
  author?: string;
  like?: number;
  createdAt?: Date | string;
}

const useStudentStore = defineStore({
  id: "studentStore",
  state: (): UserState => {
    return {
      id: 0,
      cartCount: 0,
      loggedIn: false,
      email: "",
      username: "",
      content: "",
      file: "",
      type: "",
      author: "",
      like: 0,
      createdAt: ""
    };
  },
  actions: {
    async getLoginStatus(): Promise<boolean> {
      try {
        if (this.username !== "") {
          return true;
        }
        const res = await httpUtil.get("/auth/status");
        this.loggedIn = res.data.loggedIn;
        const user: UserDto = res.data?.userInfo;
        if (user) {
          this.id = user.id;
          this.username = user.username;
        }
        return this.loggedIn;
      } catch (error: any) {
        console.error(error.message);
        return false;
      }
    },
    async getCartCountServer(): Promise<number> {
      try {
        const res = await httpUtil.get("/cart/mine/count");
        this.cartCount = res.data.cartCount;
        return this.cartCount;
      } catch (error: any) {
        console.error(error.message);
        return 0;
      }
    },
    async logoutUser() {
      await httpUtil.post("/auth/logout", null);
      this.$reset();
    }
  },
  getters: {
    getCartCount: (store): number => {
      return store.cartCount;
    },
    getIsLoggedIn: (store): boolean => {
      return store.loggedIn;
    }
  }
  // persist: {
  //   key: 'info',
  //   // storage: window.localStorage,
  //   paths: ['loggedIn' ]
  // }
});

export default useStudentStore;
