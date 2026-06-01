import type LocomotiveScroll from "locomotive-scroll";

type ScrollOptions = ConstructorParameters<typeof LocomotiveScroll>[0];

interface LocomotiveProvider {
  instance: Ref<LocomotiveScroll | null>;
  init: (options?: ScrollOptions) => LocomotiveScroll | null;
  destroy: () => void;
  resize: () => void;
  start: () => void;
  stop: () => void;
  scrollTo: (
    target: Parameters<LocomotiveScroll["scrollTo"]>[0],
    options?: Parameters<LocomotiveScroll["scrollTo"]>[1]
  ) => void;
}

declare module "#app" {
  interface NuxtApp {
    $locomotive: LocomotiveProvider;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $locomotive: LocomotiveProvider;
  }
}

export {};
