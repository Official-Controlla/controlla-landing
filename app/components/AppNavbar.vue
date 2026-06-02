<script setup lang="ts">
import logo from "~/assets/images/logo.png";

const NuxtLinkComponent = resolveComponent("NuxtLink");

const SCROLL_THRESHOLD = 96;

const route = useRoute();
const mobileOpen = ref(false);
const scrollY = ref(0);

const localePath = useLocalePath();

const navLinks = [
  { label: "Home", to: localePath("/") },
  { label: "About us", to: localePath("/about") },
  { label: "How it works", to: localePath("/how-it-works") },
  { label: "Services", to: localePath("/services") },
] as const;

const isScrolled = computed(() => scrollY.value >= SCROLL_THRESHOLD);

function onScroll() {
  if (typeof window === "undefined") return;
  scrollY.value = window.scrollY ?? document.documentElement.scrollTop;
}

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("scroll", onScroll);
  }
});

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false;
  },
);
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 py-6 transition-shadow duration-300"
    :class="isScrolled ? 'shadow-lg shadow-black/45' : 'shadow-none'">
    <div class="default-container flex items-center justify-between gap-4">
      <NuxtLink :to="localePath('/')" class="shrink-0" aria-label="CANO STEEL home">
        <Image :src="logo" alt="CANO STEEL — structural steel company logo" class="invert dark:invert-0" />
      </NuxtLink>

      <nav class="absolute left-1/2 hidden -translate-x-1/2 md:block" aria-label="Primary">
        <ul class="flex items-center justify-center gap-4 lg:gap-8 border border-white/20 py-2 px-6 rounded-full">
          <li v-for="item in navLinks" :key="item.to">
            <NuxtLink :to="item.to"
              class="text-xs md:text-sm lg: text-basefont-medium transition-colors hover:text-primary-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 line-clamp-1 relative before:w-0 before:transition-all before:duration-300 before:ease-in-out"
              :class="{
                'before:content-[\'\'] before:block before:h-px before:w-full before:bg-primary-400 before:absolute before:bottom-0 before:left-0':
                  route.path === item.to,
              }">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="flex shrink-0 items-center gap-2">
        <Button :as="NuxtLinkComponent" :to="localePath('/contact')" label="Get a quote" class="hidden md:inline-flex" />

        <Button class="md:!hidden" icon="pi pi-bars" rounded text severity="secondary" aria-label="Open menu"
          @click="mobileOpen = true" />
      </div>
    </div>

    <Drawer v-model:visible="mobileOpen" position="right" class="bg-primary-500! border-0!">
      <nav class="flex flex-col gap-2" aria-label="Mobile primary">
        <NuxtLink v-for="item in navLinks" :key="item.to" :to="item.to"
          class="rounded-lg px-3 py-3 text-base font-medium hover:bg-white/5"
          :class="{ 'bg-white/10 text-primary-300': route.path === item.to }">
          {{ item.label }}
        </NuxtLink>
        <Divider />
        <Button :as="NuxtLinkComponent" :to="localePath('/contact')" label="Get a quote" fluid severity="contrast" class="mt-2" />
      </nav>
    </Drawer>
  </header>
</template>
