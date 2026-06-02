<template>
  <div
    v-if="showPrompt"
    class="fixed bottom-6 right-6 z-[9999] bg-surface-0 border border-surface-200 shadow-2xl rounded-xl p-4 flex flex-col gap-3 w-[320px] animate-fadein"
  >
    <div class="flex justify-between items-start gap-3">
      <p class="text-sm text-surface-700 m-0 leading-snug">
        {{ promptText.message }}
      </p>
      <button
        @click="dismiss"
        class="text-surface-400 hover:text-surface-600 transition-colors bg-transparent border-none cursor-pointer p-1 -mt-1 -mr-1 rounded-full hover:bg-surface-100"
        aria-label="Close"
      >
        <i class="pi pi-times text-sm"></i>
      </button>
    </div>
    <div class="flex">
      <NuxtLink
        :to="switchLocalePath(targetLocale)"
        @click="dismiss"
        class="bg-primary-500 text-sm font-medium px-4 py-2 rounded-lg no-underline hover:bg-primary-700 transition-colors text-center w-full"
      >
        {{ promptText.action }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useI18n, useSwitchLocalePath } from "#imports";

const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const showPrompt = ref(false);
const targetLocale = ref("");

// Hardcoded translations to ensure they load independently of the active i18n locale
const prompts = {
  es: {
    message:
      "Parece que prefieres navegar en español. ¿Deseas ver la página en español?",
    action: "Cambiar a Español",
  },
  en: {
    message:
      "It looks like you prefer browsing in English. Would you like to switch?",
    action: "Switch to English",
  },
};

const promptText = computed(() => {
  return prompts[targetLocale.value] || prompts.en;
});

onMounted(() => {
  // Wait a moment to avoid flashing during initial load
  setTimeout(() => {
    const browserLang = navigator.language.toLowerCase();

    // If browser is ES but current site is EN
    if (browserLang.startsWith("es") && locale.value === "en") {
      targetLocale.value = "es";
      showPrompt.value = true;
    }
    // If browser is EN (or anything else) but current site is ES
    else if (!browserLang.startsWith("es") && locale.value === "es") {
      targetLocale.value = "en";
      showPrompt.value = true;
    }
  }, 1000); // 1 second delay
});

const dismiss = () => {
  showPrompt.value = false;
};
</script>

<style scoped>
@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadein {
  animation: fadein 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
</style>
