import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  BrandInput,
  FAQInput,
  OfficeProfile,
  PortfolioVideoFullInput,
  PricingPlanInput,
  ServiceFullInput,
  ServiceInput,
  TestimonialFullInput,
  VideoInput,
} from "../backend.d";
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
        return await actor.getPublishedBrands();
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
      return actor.getPublishedServices();
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

// ─── Pricing ───────────────────────────────────────────────────────────────

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
      return actor.getPublishedPricingPlans();
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

// ─── Testimonials ──────────────────────────────────────────────────────────

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

// Keep for backward compat
export function useGetTestimonials() {
  return useGetPublishedTestimonials();
}

export function useGetAllTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["testimonials", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublishedTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTestimonial() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: TestimonialFullInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.addTestimonial(input);
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

// ─── FAQs ──────────────────────────────────────────────────────────────────

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

// Keep for backward compat
export function useGetFAQs() {
  return useGetPublishedFAQs();
}

export function useGetAllFAQs() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["faqs", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublishedFAQs();
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

// ─── Contact Enquiries ─────────────────────────────────────────────────────

export function useGetAllContactEnquiries() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["contact-enquiries"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllContactEnquiries();
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
    }: {
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactEnquiry(name, email, phone, message);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contact-enquiries"] }),
  });
}

// Keep for backward compat
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
