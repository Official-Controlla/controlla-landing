<script lang="ts" setup>
import { ref } from "vue";
import twilioImg from "@/assets/images/integrations/twilio.jpg";
import hikconnectImg from "@/assets/images/integrations/hkc.png";
import firebasePushImg from "@/assets/images/integrations/fcm.svg";
import expoNotificationsImg from "@/assets/images/integrations/expo.png";
import googleMapsSdkImg from "@/assets/images/integrations/maps.png";
import googlePlacesApiImg from "@/assets/images/integrations/places.png";
import facturapiImg from "@/assets/images/integrations/facturapi.jpeg";
import stripeImg from "@/assets/images/integrations/stripe.png";
import mcpImg from "@/assets/images/integrations/mcp.webp";
import openaiImg from "@/assets/images/integrations/openai.webp";
import claudeImg from "@/assets/images/integrations/claude.png";

const integrations = ref([
  {
    name: "OpenAI",
    logo: openaiImg,
  },
  {
    name: "Claude",
    logo: claudeImg,
  },
  {
    name: "Twilio",
    logo: twilioImg,
  },
  {
    name: "Hikconnect",
    logo: hikconnectImg,
  },
  {
    name: "FCM",
    logo: firebasePushImg,
  },
  {
    name: "Expo Notifications",
    logo: expoNotificationsImg,
  },
  {
    name: "Google Maps SDK",
    logo: googleMapsSdkImg,
  },
  {
    name: "Google Places API",
    logo: googlePlacesApiImg,
  },
  {
    name: "Facturapi",
    logo: facturapiImg,
  },
  {
    name: "Stripe",
    logo: stripeImg,
  },
  { name: "MCP", logo: mcpImg },
]);

const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 5,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 4,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 2,
    numScroll: 1,
  },
]);
</script>

<template>
  <section
    class="py-24 bg-surface-0 dark:bg-surface-900 relative tech-grid border-t border-surface-200 dark:border-surface-800"
  >
    <div class="default-container">
      <header class="mb-16">
        <div class="flex items-center gap-4 mb-12">
          <span
            class="h-px bg-surface-200 dark:bg-surface-700 flex-grow"
            aria-hidden="true"
          ></span>
          <span
            class="text-xs text-surface-500 dark:text-surface-400 uppercase tracking-widest font-semibold"
            >{{ $t("integrations.badge") }}</span
          >
          <span
            class="h-px bg-surface-200 dark:bg-surface-700 flex-grow"
            aria-hidden="true"
          ></span>
        </div>
        <div class="text-center max-w-2xl mx-auto">
          <h2
            class="text-4xl md:text-5xl text-surface-900 dark:text-surface-0 tracking-tight mb-4 font-bold"
          >
            {{ $t("integrations.title") }}
          </h2>
          <p class="text-lg text-surface-600 dark:text-surface-400">
            {{ $t("integrations.subtitle") }}
          </p>
        </div>
      </header>

      <Carousel
        :value="integrations"
        :numVisible="5"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
        circular
        :autoplayInterval="3000"
        class="integrations-carousel"
      >
        <template #item="slotProps">
          <div class="p-4 flex flex-col items-center justify-center group">
            <div
              class="bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 rounded-2xl p-6 flex items-center justify-center w-full h-32 hover:shadow-xl dark:hover:shadow-surface-950 hover:border-primary-500/30 transition-all duration-300"
            >
              <img
                :src="slotProps.data.logo"
                :alt="slotProps.data.name"
                class="max-h-16 max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
            <span
              class="mt-4 font-semibold text-sm text-surface-600 dark:text-surface-400 group-hover:text-primary-500 transition-colors"
              >{{ slotProps.data.name }}</span
            >
          </div>
        </template>
      </Carousel>

      <div class="mt-16 text-center max-w-3xl mx-auto px-4">
        <p
          class="text-surface-600 dark:text-surface-400 bg-surface-100/50 dark:bg-surface-800/30 rounded-xl p-5 inline-flex flex-col md:flex-row items-center md:text-left border border-surface-200 dark:border-surface-700/50 shadow-sm leading-relaxed text-sm md:text-base gap-3"
        >
          <i class="pi pi-verified text-primary-500 text-2xl flex-shrink-0"></i>
          <span>{{ $t("integrations.footerText") }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.integrations-carousel :deep(.p-carousel-indicator) {
  margin-top: 2rem;
}
</style>
