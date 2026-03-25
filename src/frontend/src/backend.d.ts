import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface FAQItem {
    id: bigint;
    question: string;
    published: boolean;
    answer: string;
}
export interface VideoInput {
    title: string;
    vimeoId: string;
    description: string;
    category: string;
}
export type Time = bigint;
export interface PortfolioVideo {
    id: bigint;
    title: string;
    vimeoId: string;
    published: boolean;
    description: string;
    category: string;
}
export interface ServiceFullInput {
    id: bigint;
    title: string;
    features: Array<string>;
    description: string;
}
export interface Service {
    id: bigint;
    title: string;
    features: Array<string>;
    published: boolean;
    description: string;
}
export interface PricingPlan {
    id: bigint;
    planLabel: string;
    published: boolean;
    note: string;
    price: bigint;
}
export interface FAQInput {
    question: string;
    answer: string;
}
export interface ContactEnquiry {
    id: bigint;
    name: string;
    email: string;
    message: string;
    selectedPlan?: string;
    timestamp: Time;
    phone: string;
}
export interface Brand {
    id: bigint;
    mapsUrl: string;
    published: boolean;
    name: string;
    description: string;
    category: string;
    location: string;
}
export interface OfficeProfile {
    city: string;
    mapsUrl: string;
    whatsapp: string;
    email: string;
    address: string;
    phone: string;
}
export interface ServiceInput {
    title: string;
    features: Array<string>;
    description: string;
}
export interface TestimonialFullInput {
    id: bigint;
    review: string;
    clientName: string;
    published: boolean;
    company: string;
    rating: bigint;
}
export interface BrandInput {
    mapsUrl: string;
    name: string;
    description: string;
    category: string;
    location: string;
}
export interface PricingPlanInput {
    planLabel: string;
    note: string;
    price: bigint;
}
export interface PortfolioVideoFullInput {
    id: bigint;
    title: string;
    vimeoId: string;
    published: boolean;
    description: string;
    category: string;
}
export interface Testimonial {
    id: bigint;
    review: string;
    clientName: string;
    published: boolean;
    company: string;
    rating: bigint;
}
export interface PageSection {
    id: string;
    heading: string;
    description: string;
    imageUrl: string;
    visible: boolean;
}
export interface PageContent {
    pageId: string;
    heroTitle: string;
    heroSubtitle: string;
    heroBackgroundImage: string;
    sections: Array<PageSection>;
}
export interface PresetPackage {
    id: bigint;
    name: string;
    price: bigint;
    features: Array<string>;
    deliveryDays: bigint;
    enabled: boolean;
}
export interface ReelPricing {
    editingOnly: bigint;
    editingCamera: bigint;
    editingContentCamera: bigint;
}
export interface MonthlyPackage {
    price: bigint;
    videoCount: bigint;
    description: string;
    enabled: boolean;
}
export interface SliderRates {
    editing: bigint;
    videography: bigint;
    content: bigint;
    other: bigint;
}
export interface SiteStats {
    videosDelivered: bigint;
    happyClients: bigint;
    viewsGenerated: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addBrandPartner(brand: BrandInput): Promise<bigint>;
    addFAQItem(faq: FAQInput): Promise<bigint>;
    addPortfolioVideo(video: VideoInput): Promise<bigint>;
    addPricingPlan(plan: PricingPlanInput): Promise<bigint>;
    addService(service: ServiceInput): Promise<bigint>;
    addTestimonial(input: TestimonialFullInput): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteBrandPartner(brandId: bigint): Promise<void>;
    deleteFAQItem(faqId: bigint): Promise<void>;
    deletePortfolioVideo(videoId: bigint): Promise<void>;
    deleteTestimonial(testimonialId: bigint): Promise<void>;
    getAllBrands(): Promise<Array<Brand>>;
    getAllContactEnquiries(): Promise<Array<ContactEnquiry>>;
    getAllFAQs(): Promise<Array<FAQItem>>;
    getAllPageContent(): Promise<Array<[string, PageContent]>>;
    getAllPresetPackages(): Promise<Array<PresetPackage>>;
    getAllPricingPlans(): Promise<Array<PricingPlan>>;
    getAllServices(): Promise<Array<Service>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getAllVideos(): Promise<Array<PortfolioVideo>>;
    getBrandsByCategory(category: string): Promise<Array<Brand>>;
    getCallerUserRole(): Promise<UserRole>;
    getMonthlyPackage(): Promise<MonthlyPackage>;
    getOfficeProfile(): Promise<OfficeProfile>;
    getPageContent(pageId: string): Promise<PageContent | null>;
    getPresetPackages(): Promise<Array<PresetPackage>>;
    getPublishedBrands(): Promise<Array<Brand>>;
    getPublishedFAQs(): Promise<Array<FAQItem>>;
    getPublishedPricingPlans(): Promise<Array<PricingPlan>>;
    getPublishedServices(): Promise<Array<Service>>;
    getPublishedTestimonials(): Promise<Array<Testimonial>>;
    getPublishedVideos(): Promise<Array<PortfolioVideo>>;
    getReelPricing(): Promise<ReelPricing>;
    getServicesAndPricing(): Promise<{
        pricing: Array<PricingPlan>;
        services: Array<Service>;
    }>;
    getSiteStats(): Promise<SiteStats>;
    getSliderRates(): Promise<SliderRates>;
    getVideoById(videoId: bigint): Promise<PortfolioVideo | null>;
    getVideosByCategory(category: string): Promise<Array<PortfolioVideo>>;
    isCallerAdmin(): Promise<boolean>;
    publicCombinedVideosBrands(): Promise<{
        brands: Array<Brand>;
        videos: Array<PortfolioVideo>;
    }>;
    seedData(): Promise<void>;
    seedPageContent(): Promise<void>;
    submitContactEnquiry(name: string, email: string, phone: string, message: string, selectedPlan: string): Promise<bigint>;
    toggleBrandPublished(brandId: bigint): Promise<boolean>;
    toggleFAQPublished(faqId: bigint): Promise<boolean>;
    togglePricingPublished(planId: bigint): Promise<boolean>;
    toggleServicePublished(serviceId: bigint): Promise<boolean>;
    toggleTestimonialPublished(testimonialId: bigint): Promise<boolean>;
    toggleVideoPublished(videoId: bigint): Promise<boolean>;
    updateBrandPartner(id: bigint, brand: BrandInput): Promise<void>;
    updateMonthlyPackage(pkg: MonthlyPackage): Promise<void>;
    updateOfficeProfile(profile: OfficeProfile): Promise<void>;
    updatePageContent(pageId: string, content: PageContent): Promise<void>;
    updatePortfolioVideo(video: PortfolioVideoFullInput): Promise<void>;
    updatePresetPackage(pkg: PresetPackage): Promise<void>;
    updatePricingPlan(id: bigint, plan: PricingPlanInput): Promise<void>;
    updateReelPricing(pricing: ReelPricing): Promise<void>;
    updateService(service: ServiceFullInput): Promise<void>;
    updateSiteStats(stats: SiteStats): Promise<void>;
    updateSliderRates(rates: SliderRates): Promise<void>;
}
