<script lang="ts" setup>
import { ref, computed } from "vue";
import projectsDataEn from "~/data/projects_en.json";
import projectsDataEs from "~/data/projects_es.json";

const { locale, t } = useI18n();
const projectsData = computed(() =>
  locale.value === "es" ? projectsDataEs : projectsDataEn,
);

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const siteUrl = runtimeConfig.public.siteUrl.replace(/\/$/, "");
const canonicalUrl = `${siteUrl}${route.path === "/" ? "" : route.path}`;
const defaultOgImage = `${siteUrl}/og_image.png`;

// Case Studies Modal Logic
const isProjectModalOpen = ref(false);
const selectedProject = ref<(typeof projectsDataEn)[0] | null>(null);

const openProjectModal = (project: (typeof projectsDataEn)[0]) => {
  selectedProject.value = project;
  isProjectModalOpen.value = true;
};

useSeoMeta({
  title: computed(() => t("seo.title")),
  description: computed(() => t("seo.description")),
  ogTitle: computed(() => t("seo.title")),
  ogDescription: computed(() => t("seo.description")),
  ogImage: defaultOgImage,
  ogUrl: canonicalUrl,
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: computed(() => t("seo.title")),
  twitterDescription: computed(() => t("seo.description")),
  twitterImage: defaultOgImage,
});

useHead(
  computed(() => ({
    link: [{ rel: "canonical", href: canonicalUrl }],
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Controlla",
          url: canonicalUrl,
          logo: `${siteUrl}/favicon-96x96.png`,
          description: t("seo.description"),
        }),
      },
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: t("seo.faq1_q"),
              acceptedAnswer: {
                "@type": "Answer",
                text: t("seo.faq1_a"),
              },
            },
            {
              "@type": "Question",
              name: t("seo.faq2_q"),
              acceptedAnswer: {
                "@type": "Answer",
                text: t("seo.faq2_a"),
              },
            },
            {
              "@type": "Question",
              name: t("seo.faq3_q"),
              acceptedAnswer: {
                "@type": "Answer",
                text: t("seo.faq3_a"),
              },
            },
          ],
        }),
      },
    ],
  })),
);
</script>

<template>
  <main class="flex flex-col flex-1">
    <!-- Hero Section -->
    <section
      class="relative pt-32 pb-32 bg-surface-50 dark:bg-surface-950 overflow-hidden tech-grid min-h-dvh-screen flex items-center"
    >
      <div
        class="default-container relative z-10 flex flex-col items-center text-center"
      >
        <div
          class="inline-flex items-center gap-2 bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-full px-4 py-1.5 mb-8"
        >
          <span class="w-2 h-2 rounded-full bg-primary-500"></span>
          <span
            class="text-[11px] text-surface-600 dark:text-surface-300 uppercase tracking-wider font-semibold"
            >{{ $t("hero.badge") }}</span
          >
        </div>

        <h1
          class="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-surface-900 dark:text-surface-0"
        >
          {{ $t("hero.title") }}<br />
          <span class="text-primary-500">{{ $t("hero.titleHighlight") }}</span>
        </h1>

        <p
          class="text-xl md:text-2xl text-surface-600 dark:text-surface-300 mb-10 leading-relaxed"
        >
          {{ $t("hero.subtitle") }}
        </p>

        <div class="flex flex-wrap justify-center gap-4 mb-16">
          <Button
            :label="$t('hero.primaryBtn')"
            icon="pi pi-arrow-right"
            iconPos="right"
            @click="$router.push('/contact')"
          />
        </div>

        <div class="w-full max-w-5xl mx-auto relative h-[550px] md:h-[600px]">
          <HeroGlobe />
          <div
            class="absolute inset-0 bg-gradient-to-t from-surface-50 via-transparent to-transparent dark:from-surface-950 pointer-events-none"
          ></div>
        </div>
      </div>
    </section>

    <!-- Services (What We Do) -->
    <section
      class="py-32 bg-surface-0 dark:bg-surface-900 relative tech-grid"
      id="services"
    >
      <div class="default-container">
        <div class="flex items-center gap-4 mb-12">
          <span
            class="h-px bg-surface-200 dark:bg-surface-700 flex-grow"
          ></span>
          <span
            class="text-xs text-surface-500 dark:text-surface-400 uppercase tracking-widest font-semibold"
            >{{ $t("services.badge") }}</span
          >
          <span
            class="h-px bg-surface-200 dark:bg-surface-700 flex-grow"
          ></span>
        </div>

        <div class="text-center mb-16 mx-auto">
          <h2
            class="text-4xl md:text-5xl text-surface-900 dark:text-surface-0 tracking-tight mb-4 font-bold"
          >
            {{ $t("services.title") }}
          </h2>
          <p class="text-lg text-surface-600 dark:text-surface-400">
            {{ $t("services.subtitle") }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Service 1 -->
          <div
            class="bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 rounded-2xl p-8 hover:shadow-xl dark:hover:shadow-surface-950 transition-all duration-300 group"
          >
            <div
              class="w-12 h-12 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center mb-6 text-primary-500"
            >
              <i class="pi pi-code text-2xl"></i>
            </div>
            <h3
              class="text-2xl font-semibold text-surface-900 dark:text-surface-0 mb-4 tracking-tight"
            >
              {{ $t("services.cards.software.title") }}
            </h3>
            <p class="text-surface-600 dark:text-surface-400 leading-relaxed">
              {{ $t("services.cards.software.desc") }}
            </p>
          </div>

          <!-- Service 2 -->
          <div
            class="bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 rounded-2xl p-8 hover:shadow-xl dark:hover:shadow-surface-950 transition-all duration-300 group"
          >
            <div
              class="w-12 h-12 rounded-lg bg-sky-500/10 dark:bg-sky-500/20 flex items-center justify-center mb-6 text-sky-500"
            >
              <i class="pi pi-wrench text-2xl"></i>
            </div>
            <h3
              class="text-2xl font-semibold text-surface-900 dark:text-surface-0 mb-4 tracking-tight"
            >
              {{ $t("services.cards.legacy.title") }}
            </h3>
            <p class="text-surface-600 dark:text-surface-400 leading-relaxed">
              {{ $t("services.cards.legacy.desc") }}
            </p>
          </div>

          <!-- Service 3 -->
          <div
            class="bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 rounded-2xl p-8 hover:shadow-xl dark:hover:shadow-surface-950 transition-all duration-300 group glass-card relative overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-primary-500/5 dark:bg-primary-500/10 tech-grid opacity-50"
            ></div>
            <div class="relative z-10">
              <div
                class="w-12 h-12 rounded-lg bg-surface-900 dark:bg-surface-0 flex items-center justify-center mb-6 text-surface-0 dark:text-surface-900 shadow-lg"
              >
                <i class="pi pi-sparkles text-2xl"></i>
              </div>
              <h3
                class="text-2xl font-semibold text-surface-900 dark:text-surface-0 mb-4 tracking-tight"
              >
                {{ $t("services.cards.ai.title") }}
              </h3>
              <p class="text-surface-600 dark:text-surface-400 leading-relaxed">
                {{ $t("services.cards.ai.desc") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience & Nearshore Advantage -->
    <section
      class="py-32 bg-surface-50 dark:bg-surface-950 relative tech-grid"
      id="about"
    >
      <div class="default-container">
        <div class="flex items-center gap-4 mb-12">
          <span
            class="h-px bg-surface-200 dark:bg-surface-700 flex-grow"
          ></span>
          <span
            class="text-xs text-surface-500 dark:text-surface-400 uppercase tracking-widest font-semibold"
            >{{ $t("about.badge") }}</span
          >
          <span
            class="h-px bg-surface-200 dark:bg-surface-700 flex-grow"
          ></span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <AdvantageCard
            class="md:col-span-7"
            icon="pi-verified"
            :title="$t('about.cards.mastery.title')"
            :description="$t('about.cards.mastery.desc')"
            glowPosition="top-right"
            glowColorClass="bg-primary-500/30 dark:bg-primary-500/20"
            :tags="[
              { label: $t('about.cards.mastery.tag1'), variant: 'outlined' },
              {
                label: $t('about.cards.mastery.tag2'),
                severity: 'info',
                variant: 'text',
                class: 'bg-primary-500/10 border-primary-500/20',
              },
            ]"
          />
          <AdvantageCard
            class="md:col-span-5"
            icon="pi-globe"
            :title="$t('about.cards.location.title')"
            :description="$t('about.cards.location.desc')"
            glowPosition="bottom-left"
            glowColorClass="bg-sky-400/20 dark:bg-sky-400/10"
            :tags="[
              { label: $t('about.cards.location.tag1'), variant: 'outlined' },
              { label: $t('about.cards.location.tag2'), variant: 'outlined' },
            ]"
          />
        </div>
      </div>
    </section>

    <!-- Our Philosophy -->
    <section
      class="py-32 bg-surface-900 dark:bg-surface-950 text-surface-0 relative overflow-hidden"
      id="expertise"
    >
      <div class="absolute inset-0 opacity-20 mesh-gradient"></div>
      <div class="default-container relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div
              class="inline-flex items-center gap-2 bg-surface-800 border border-surface-700 rounded-full px-4 py-1.5 mb-8"
            >
              <span class="w-2 h-2 rounded-full bg-primary-400"></span>
              <span
                class="text-[11px] text-surface-300 uppercase tracking-wider font-semibold"
                >{{ $t("approach.badge") }}</span
              >
            </div>
            <h2 class="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {{ $t("approach.title") }}
            </h2>
            <p class="text-lg text-surface-300 leading-relaxed mb-8">
              {{ $t("approach.p1") }}
            </p>
            <p class="text-lg text-surface-300 leading-relaxed">
              {{ $t("approach.p2") }}
            </p>
          </div>
          <div
            class="relative h-[400px] rounded-2xl border border-surface-700 overflow-hidden shadow-2xl glow-border"
          >
            <div class="absolute inset-0 tech-grid opacity-30"></div>
            <div
              class="absolute inset-0 bg-gradient-to-tr from-surface-900 via-transparent to-primary-900/40 mix-blend-overlay"
            ></div>
            <img
              src="/assets/images/empathy.jpeg"
              alt="Team collaborating"
              class="w-full h-full object-cover mix-blend-luminosity opacity-80"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Success Stories -->
    <section
      class="py-32 bg-surface-0 dark:bg-surface-900 relative tech-grid"
      id="case-studies"
    >
      <div class="default-container">
        <div class="flex items-center gap-4 mb-12">
          <span
            class="h-px bg-surface-200 dark:bg-surface-700 flex-grow"
          ></span>
          <span
            class="text-xs text-surface-500 dark:text-surface-400 uppercase tracking-widest font-semibold"
            >{{ $t("caseStudies.badge") }}</span
          >
          <span
            class="h-px bg-surface-200 dark:bg-surface-700 flex-grow"
          ></span>
        </div>

        <div class="text-center mb-16 max-w-2xl mx-auto">
          <h2
            class="text-4xl md:text-5xl text-surface-900 dark:text-surface-0 tracking-tight mb-4 font-bold"
          >
            {{ $t("caseStudies.title") }}
          </h2>
          <p class="text-lg text-surface-600 dark:text-surface-400">
            {{ $t("caseStudies.subtitle") }}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CaseStudyCard
            v-for="project in projectsData"
            :key="project.id"
            :imageSrc="project.coverImage"
            :imageTags="project.tags"
            :icon="project.icon"
            :title="project.title"
            :description="project.shortDescription"
            @select="openProjectModal(project)"
          />
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section
      class="py-32 bg-surface-50 dark:bg-surface-950 relative tech-grid text-center"
    >
      <div class="default-container relative z-10 max-w-3xl mx-auto">
        <h2
          class="text-4xl md:text-6xl text-surface-900 dark:text-surface-0 tracking-tight mb-6 font-bold"
        >
          {{ $t("cta.title") }}
        </h2>
        <p class="text-xl text-surface-600 dark:text-surface-400 mb-10">
          {{ $t("cta.subtitle") }}
        </p>
        <Button
          :label="$t('cta.btn')"
          icon="pi pi-calendar"
          @click="$router.push('/contact')"
        />
      </div>
    </section>

    <!-- Project Details Modal -->
    <Dialog
      v-model:visible="isProjectModalOpen"
      modal
      dismissableMask
      class="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 mx-4"
      contentClass="bg-surface-0 dark:bg-surface-900 rounded-b-2xl p-0"
      headerClass="bg-surface-50 dark:bg-surface-950 rounded-t-2xl border-b border-surface-200 dark:border-surface-800"
    >
      <template #header>
        <div v-if="selectedProject" class="flex flex-col">
          <span
            class="text-sm font-semibold uppercase tracking-wider text-surface-500"
            >{{ selectedProject.client }}</span
          >
          <span
            class="text-2xl font-bold text-surface-900 dark:text-surface-0"
            >{{ selectedProject.title }}</span
          >
        </div>
      </template>

      <div v-if="selectedProject" class="flex flex-col pb-8">
        <!-- Hero Image -->
        <div class="w-full h-64 sm:h-80 relative overflow-hidden mb-8">
          <img
            :src="selectedProject.coverImage"
            :alt="selectedProject.title"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-surface-0 dark:from-surface-900 via-transparent to-transparent"
          ></div>
        </div>

        <div class="px-6 sm:px-10 flex flex-col gap-10">
          <!-- The Challenge -->
          <div>
            <h3
              class="text-xl font-bold text-surface-900 dark:text-surface-0 mb-3 flex items-center gap-2"
            >
              <i class="pi pi-exclamation-triangle text-orange-500"></i>
              {{ $t("caseStudies.modal.challenge") }}
            </h3>
            <p
              class="text-lg text-surface-600 dark:text-surface-400 leading-relaxed"
            >
              {{ selectedProject.details.problemSolved }}
            </p>
          </div>

          <!-- The Solution -->
          <div>
            <h3
              class="text-xl font-bold text-surface-900 dark:text-surface-0 mb-3 flex items-center gap-2"
            >
              <i class="pi pi-check-circle text-green-500"></i>
              {{ $t("caseStudies.modal.solution") }}
            </h3>
            <p
              class="text-lg text-surface-600 dark:text-surface-400 leading-relaxed"
            >
              {{ selectedProject.details.whatWeDid }}
            </p>
          </div>

          <hr class="border-surface-200 dark:border-surface-800" />

          <!-- Specs (Tech & Integrations) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-if="selectedProject.details.techStack.length">
              <h4
                class="font-bold text-xs uppercase tracking-widest mb-4 text-surface-500"
              >
                {{ $t("caseStudies.modal.techStack") }}
              </h4>
              <div class="flex flex-wrap gap-2">
                <Chip
                  v-for="tech in selectedProject.details.techStack"
                  :key="tech"
                  :label="tech"
                  class="text-xs bg-surface-100 dark:bg-surface-800"
                />
              </div>
            </div>

            <div v-if="selectedProject.details.integrations.length">
              <h4
                class="font-bold text-xs uppercase tracking-widest mb-4 text-surface-500"
              >
                {{ $t("caseStudies.modal.integrations") }}
              </h4>
              <div class="flex flex-wrap gap-2">
                <Chip
                  v-for="int in selectedProject.details.integrations"
                  :key="int"
                  :label="int"
                  variant="outlined"
                  class="text-xs"
                />
              </div>
            </div>
          </div>

          <!-- Links (Stores / Web) -->
          <div
            v-if="
              selectedProject.details.links.website ||
              selectedProject.details.links.appStore ||
              selectedProject.details.links.playStore
            "
            class="flex flex-wrap gap-4 mt-2"
          >
            <Button
              v-if="selectedProject.details.links.website"
              as="a"
              :href="selectedProject.details.links.website"
              target="_blank"
              :label="$t('caseStudies.modal.visitWeb')"
              icon="pi pi-external-link"
              size="small"
            />
            <Button
              v-if="selectedProject.details.links.appStore"
              as="a"
              :href="selectedProject.details.links.appStore"
              target="_blank"
              :label="$t('caseStudies.modal.appStore')"
              icon="pi pi-apple"
              severity="secondary"
              variant="outlined"
              size="small"
            />
            <Button
              v-if="selectedProject.details.links.playStore"
              as="a"
              :href="selectedProject.details.links.playStore"
              target="_blank"
              :label="$t('caseStudies.modal.playStore')"
              icon="pi pi-android"
              severity="secondary"
              variant="outlined"
              size="small"
            />
          </div>
        </div>
      </div>
    </Dialog>
  </main>
</template>
