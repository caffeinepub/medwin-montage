import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  BrandInput,
  FAQInput,
  OfficeProfile,
  PageContent,
  PortfolioVideoFullInput,
  PricingPlanInput,
  ServiceFullInput,
  ServiceInput,
  TestimonialFullInput,
  VideoInput,
} from "../backend.d";

// Types not yet in backend.d.ts (from backend.did.d.ts)
type PresetPackage = {
  id: bigint;
  name: string;
  price: bigint;
  features: string[];
  deliveryDays: bigint;
  enabled: boolean;
};
type ReelPricing = {
  editingOnly: bigint;
  editingCamera: bigint;
  editingContentCamera: bigint;
};
type MonthlyPackage = {
  price: bigint;
  videoCount: bigint;
  description: string;
  enabled: boolean;
};
type SliderRates = {
  editing: bigint;
  videography: bigint;
  content: bigint;
  other: bigint;
};
type SiteStats = {
  videosDelivered: bigint;
  happyClients: bigint;
  viewsGenerated: bigint;
};
import { useActor } from "./useActor";

// ─── Videos ────────────────────────────────────────────────────────────────

export function useGetPublishedVideos() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["videos", "published"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublishedVideos();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllVideos() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["videos", "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllVideos();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddVideo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (video: VideoInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.addPortfolioVideo(video);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videos"] }),
  });
}

export function useUpdateVideo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (video: PortfolioVideoFullInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.updatePortfolioVideo(video);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videos"] }),
  });
}

export function useToggleVideoPublished() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.toggleVideoPublished(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videos"] }),
  });
}

export function useDeleteVideo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deletePortfolioVideo(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videos"] }),
  });
}

// ─── Brands ────────────────────────────────────────────────────────────────

export function useGetPublishedBrands() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["brands", "published"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublishedBrands();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllBrands() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["brands", "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllBrands();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddBrand() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (brand: BrandInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.addBrandPartner(brand);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["brands"] }),
  });
}

export function useUpdateBrand() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, brand }: { id: bigint; brand: BrandInput }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateBrandPartner(id, brand);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["brands"] }),
  });
}

export function useToggleBrandPublished() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.toggleBrandPublished(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["brands"] }),
  });
}

export function useDeleteBrand() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteBrandPartner(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["brands"] }),
  });
}

// ─── Services ──────────────────────────────────────────────────────────────

export function useGetPublishedServices() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["services", "published"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublishedServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllServices() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["services", "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllServices();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddService() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (service: ServiceInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.addService(service);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useUpdateService() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (service: ServiceFullInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateService(service);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useToggleServicePublished() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.toggleServicePublished(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

// ─── Pricing Plans ─────────────────────────────────────────────────────────

export function useGetPublishedPricingPlans() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["pricing", "published"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublishedPricingPlans();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllPricingPlans() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["pricing", "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllPricingPlans();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddPricingPlan() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (plan: PricingPlanInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.addPricingPlan(plan);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pricing"] }),
  });
}

export function useUpdatePricingPlan() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      plan,
    }: { id: bigint; plan: PricingPlanInput }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updatePricingPlan(id, plan);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pricing"] }),
  });
}

export function useTogglePricingPublished() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.togglePricingPublished(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pricing"] }),
  });
}

// ─── Preset Packages ──────────────────────────────────────────────────────

export function useGetPresetPackages() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["preset-packages"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getPresetPackages();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllPresetPackages() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["preset-packages", "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllPresetPackages();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdatePresetPackage() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (pkg: PresetPackage) => {
      if (!actor) throw new Error("Not connected");
      return actor.updatePresetPackage(pkg);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["preset-packages"] }),
  });
}

// ─── Reel Pricing ─────────────────────────────────────────────────────────

export function useGetReelPricing() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["reel-pricing"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getReelPricing();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateReelPricing() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (pricing: ReelPricing) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateReelPricing(pricing);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reel-pricing"] }),
  });
}

// ─── Monthly Package ──────────────────────────────────────────────────────

export function useGetMonthlyPackage() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["monthly-package"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getMonthlyPackage();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateMonthlyPackage() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (pkg: MonthlyPackage) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateMonthlyPackage(pkg);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["monthly-package"] }),
  });
}

// ─── Slider Rates ─────────────────────────────────────────────────────────

export function useGetSliderRates() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["slider-rates"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getSliderRates();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateSliderRates() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (rates: SliderRates) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateSliderRates(rates);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["slider-rates"] }),
  });
}

// ─── Site Stats ───────────────────────────────────────────────────────────

export function useGetSiteStats() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["site-stats"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getSiteStats();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateSiteStats() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (stats: SiteStats) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateSiteStats(stats);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["site-stats"] }),
  });
}

// ─── Page Content ─────────────────────────────────────────────────────────

export function useGetPageContent(pageId: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["page-content", pageId],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const result = await actor.getPageContent(pageId);
        return result ?? null;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllPageContent() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["page-content", "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllPageContent();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdatePageContent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      pageId,
      content,
    }: { pageId: string; content: PageContent }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updatePageContent(pageId, content);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["page-content", vars.pageId] });
      qc.invalidateQueries({ queryKey: ["page-content", "all"] });
    },
  });
}

export function useSeedPageContent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.seedPageContent();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["page-content"] }),
  });
}

// ─── Testimonials ─────────────────────────────────────────────────────────

export function useGetPublishedTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["testimonials", "published"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublishedTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTestimonials() {
  return useGetPublishedTestimonials();
}

export function useGetAllTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["testimonials", "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllTestimonials();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTestimonial() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (t: TestimonialFullInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.addTestimonial(t);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useToggleTestimonialPublished() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.toggleTestimonialPublished(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useDeleteTestimonial() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteTestimonial(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

// ─── FAQs ─────────────────────────────────────────────────────────────────

export function useGetPublishedFAQs() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["faqs", "published"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublishedFAQs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetFAQs() {
  return useGetPublishedFAQs();
}

export function useGetAllFAQs() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["faqs", "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllFAQs();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddFAQ() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (faq: FAQInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.addFAQItem(faq);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["faqs"] }),
  });
}

export function useToggleFAQPublished() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.toggleFAQPublished(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["faqs"] }),
  });
}

export function useDeleteFAQ() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteFAQItem(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["faqs"] }),
  });
}

// ─── Contact Enquiries ─────────────────────────────────────────────────────

export function useGetAllContactEnquiries() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["contact-enquiries"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const raw = await actor.getAllContactEnquiries();
        return raw.map((e) => {
          const sep = e.message.indexOf("|||");
          if (sep !== -1) {
            return {
              ...e,
              selectedPlan: e.message.slice(0, sep),
              message: e.message.slice(sep + 3),
            };
          }
          return { ...e, selectedPlan: "" };
        });
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContactEnquiry() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      message,
      selectedPlan = "",
    }: {
      name: string;
      email: string;
      phone: string;
      message: string;
      selectedPlan?: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactEnquiry(
        name,
        email,
        phone,
        message,
        selectedPlan ?? "",
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contact-enquiries"] }),
  });
}

export function useSubmitContactForm() {
  return useSubmitContactEnquiry();
}

// ─── Office Profile ────────────────────────────────────────────────────────

export function useGetOfficeProfile() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["office-profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getOfficeProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateOfficeProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: OfficeProfile) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateOfficeProfile(profile);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["office-profile"] }),
  });
}

// ─── Seed & Admin ──────────────────────────────────────────────────────────

export function useSeedData() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.seedData();
    },
    onSuccess: () => qc.invalidateQueries(),
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Full Pricing Plans ────────────────────────────────────────────────────

export function useGetAllFullPricingPlans() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["full-pricing", "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllFullPricingPlans();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetEnabledFullPricingPlans() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["full-pricing", "enabled"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getEnabledFullPricingPlans();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddFullPricingPlan() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: import("../backend.d").FullPricingPlanInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.addFullPricingPlan(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["full-pricing"] }),
  });
}

export function useUpdateFullPricingPlan() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: bigint;
      input: import("../backend.d").FullPricingPlanInput;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateFullPricingPlan(id, input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["full-pricing"] }),
  });
}

export function useDeleteFullPricingPlan() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteFullPricingPlan(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["full-pricing"] }),
  });
}

export function useToggleFullPricingPlanEnabled() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.toggleFullPricingPlanEnabled(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["full-pricing"] }),
  });
}

export function useFullPricingSeed() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.fullPricingSeed();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["full-pricing"] }),
  });
}

// ─── Season Offer Settings ─────────────────────────────────────────────────

export function useGetSeasonOfferSettings() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["season-offer-settings"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getSeasonOfferSettings();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateSeasonOfferSettings() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (
      settings: import("../backend.d").SeasonOfferSettings,
    ) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateSeasonOfferSettings(settings);
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["season-offer-settings"] }),
  });
}
