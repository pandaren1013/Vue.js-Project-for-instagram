<template>
  <Navbar v-if="!computedHideNavbar" />
  <router-view />
</template>

<script lang="ts" setup>
import Navbar from "@/components/Navbar.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const computedHideNavbar = computed(() => route.meta?.hideNavbar ?? false);
</script>
