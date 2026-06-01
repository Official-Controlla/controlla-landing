<script setup lang="ts">
import { ref, computed } from "vue";
import logoImg from "@/assets/images/logo.png";

const { t } = useI18n();
const mobileMenuOpen = ref(false);

const navLinks = computed(() => [
  { label: t("nav.services"), to: "/services" },
  { label: t("nav.about"), to: "/about" },
  { label: t("nav.contact"), to: "/contact" },
]);
</script>

<template>
  <header
    class="fixed top-0 w-full z-50 bg-surface-0/80 dark:bg-surface-950/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-800 shadow-sm"
  >
    <div
      class="flex justify-between items-center px-6 md:px-12 max-w-7xl mx-auto h-16"
    >
      <!-- Brand -->
      <NuxtLink
        class="flex items-center hover:opacity-80 transition-opacity"
        to="/"
      >
        <img
          alt="Controlla Logo"
          class="h-6 w-auto object-contain filter invert dark:invert-0"
          :src="logoImg"
        />
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.label"
          :to="link.to"
          class="text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-0 transition-colors text-[11px] font-semibold uppercase tracking-wider"
          exact-active-class="text-surface-900 dark:text-surface-0 font-bold"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="hidden md:flex items-center gap-4">
        <Button
          :label="$t('nav.getInTouch')"
          size="small"
          class="font-semibold uppercase tracking-wider text-[11px] px-4 py-2"
          @click="$router.push('/contact')"
        />
      </div>

      <!-- Mobile Menu Toggle -->
      <div class="md:hidden">
        <button
          type="button"
          class="inline-flex items-center justify-center p-2 text-surface-900 dark:text-surface-0 hover:bg-surface-100 dark:hover:bg-surface-800 rounded transition-colors focus:outline-none"
          @click="mobileMenuOpen = true"
          aria-label="Open Menu"
        >
          <i class="pi pi-bars text-xl"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <Drawer
      v-model:visible="mobileMenuOpen"
      position="right"
      class="w-full sm:w-80"
    >
      <template #header>
        <div class="font-bold text-xl">Menu</div>
      </template>
      <div class="flex flex-col gap-6 mt-4">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.label"
          :to="link.to"
          class="text-surface-700 dark:text-surface-200 hover:text-primary-500 text-sm font-semibold uppercase tracking-wide"
          @click="mobileMenuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>

        <hr class="border-surface-200 dark:border-surface-700" />

        <Button
          :label="$t('nav.getInTouch')"
          fluid
          @click="$router.push('/contact')"
        />
      </div>
    </Drawer>
  </header>
</template>
