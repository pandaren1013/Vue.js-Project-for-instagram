import type { Ref } from "vue";

export const scrollToHandler = (targetDiv: Ref<HTMLElement | null>) => {
  if (targetDiv.value) {
    targetDiv.value.scrollIntoView({ behavior: "smooth" });
  }
};
