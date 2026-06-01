<script setup lang="ts">
const { locale, setLocale } = useI18n();
</script>

<template>
  <footer
    class="bg-surface-0 dark:bg-surface-950 border-t border-surface-200 dark:border-surface-800 w-full relative tech-grid overflow-hidden"
  >
    <div
      class="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto px-6 md:px-12 py-16 relative z-10"
    >
      <!-- Logo / Tagline Column -->
      <div class="md:col-span-1 flex flex-col gap-4">
        <span
          class="text-xl font-bold text-surface-900 dark:text-surface-0 tracking-tight"
          >Controlla IA</span
        >
        <p
          class="text-[11px] font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider"
        >
          Engineered Intelligence.
        </p>
      </div>

      <!-- Links Grid Column -->
      <div class="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <!-- Contact -->
        <div class="flex flex-col gap-3">
          <span
            class="text-[10px] font-semibold text-surface-500 dark:text-surface-400 mb-1 uppercase tracking-widest border-b border-surface-200 dark:border-surface-800 pb-2 w-max"
            >Contact</span
          >
          <a
            class="text-sm text-surface-900 dark:text-surface-0 hover:text-primary-500 transition-colors duration-200"
            href="mailto:ltorres@controlla.com.mx"
            >ltorres@controlla.com.mx</a
          >
          <span class="text-sm text-surface-600 dark:text-surface-400"
            >Chihuahua, Mexico HQ</span
          >
        </div>

        <!-- Explore -->
        <div class="flex flex-col gap-3">
          <span
            class="text-[10px] font-semibold text-surface-500 dark:text-surface-400 mb-1 uppercase tracking-widest border-b border-surface-200 dark:border-surface-800 pb-2 w-max"
            >Explore</span
          >
          <NuxtLink
            class="text-sm text-surface-900 dark:text-surface-0 hover:text-primary-500 transition-colors duration-200"
            to="/services"
            >{{ $t('nav.services') }}</NuxtLink
          >
          <NuxtLink
            class="text-sm text-surface-900 dark:text-surface-0 hover:text-primary-500 transition-colors duration-200"
            to="/about"
            >{{ $t('nav.about') }}</NuxtLink
          >
          <NuxtLink
            class="text-sm text-surface-900 dark:text-surface-0 hover:text-primary-500 transition-colors duration-200"
            to="/contact"
            >{{ $t('nav.contact') }}</NuxtLink
          >
        </div>

        <!-- Legal -->
        <div class="flex flex-col gap-3">
          <span
            class="text-[10px] font-semibold text-surface-500 dark:text-surface-400 mb-1 uppercase tracking-widest border-b border-surface-200 dark:border-surface-800 pb-2 w-max"
            >Legal</span
          >
          <NuxtLink
            class="text-sm text-surface-900 dark:text-surface-0 hover:text-primary-500 transition-colors duration-200"
            to="#"
            >Privacy Policy</NuxtLink
          >
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="col-span-1 md:col-span-4 mt-8 pt-8 border-t border-surface-200 dark:border-surface-800 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <p
          class="text-[10px] font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider"
        >
          © {{ new Date().getFullYear() }} Controlla IA. All rights reserved.
        </p>
        <div
          class="flex gap-2 items-center text-[10px] font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider"
        >
          <button
            @click="setLocale('en')"
            :class="{
              'text-primary-500': locale === 'en',
              'hover:text-surface-900 dark:hover:text-surface-0':
                locale !== 'en',
            }"
            class="cursor-pointer transition-colors"
          >
            EN
          </button>
          <span>|</span>
          <button
            @click="setLocale('es')"
            :class="{
              'text-primary-500': locale === 'es',
              'hover:text-surface-900 dark:hover:text-surface-0':
                locale !== 'es',
            }"
            class="cursor-pointer transition-colors"
          >
            ES
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>
