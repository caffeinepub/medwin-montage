import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    name: string;
}
export interface VideoInput {
    title: string;
    vimeoId: string;
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
export type Time = bigint;
export interface MonthlyPackage {
    videoCount: bigint;
    description: string;
    enabled: boolean;
    price: bigint;
}
export interface PortfolioVideo {
    id: bigint;
    title: string;
    vimeoId: string;
    published: boolean;
    description: string;
    category: string;
}
export interface FullPricingPlan {
    id: bigint;
    hasSeasonOffer: boolean;
    videoCount: bigint;
    name: string;
    offerDescription: string;
    deliveryDays: bigint;
    enabled: boolean;
    offerPrice: bigint;
    price: bigint;
    planTypeBadge: string;
    services: Array<string>;
}
export interface PricingPlan {
    id: bigint;
    planLabel: string;
    published: boolean;
    note: string;
    price: bigint;
}
export interface PageSection {
    id: string;
    description: string;
    heading: string;
    imageUrl: string;
    visible: boolean;
}
export interface FAQInput {
    question: string;
    answer: string;
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
export interface SliderRates {
    content: bigint;
    editing: bigint;
    other: bigint;
    videography: bigint;
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
export interface PageContent {
    heroSubtitle: string;
    sections: Array<PageSection>;
    heroTitle: string;
    heroBackgroundImage: string;
    pageId: string;
}
export interface FAQItem {
    id: bigint;
    question: string;
    published: boolean;
    answer: string;
}
export interface SiteStats {
    videosDelivered: bigint;
    happyClients: bigint;
    viewsGenerated: bigint;
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
export interface PresetPackage {
    id: bigint;
    features: Array<string>;
    name: string;
    deliveryDays: bigint;
    enabled: boolean;
    price: bigint;
}
export interface ContactEnquiry {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface ReelPricing {
    editingContentCamera: bigint;
    editingCamera: bigint;
    editingOnly: bigint;
}
export interface OfficeProfile {
    city: string;
    mapsUrl: string;
    whatsapp: string;
    email: string;
    address: string;
    phone: string;
}
export interface BrandInput {
    mapsUrl: string;
    name: string;
    description: string;
    category: string;
    location: string;
}
export interface FullPricingPlanInput {
    hasSeasonOffer: boolean;
    videoCount: bigint;
    name: string;
    offerDescription: string;
    deliveryDays: bigint;
    enabled: boolean;
    offerPrice: bigint;
    price: bigint;
    planTypeBadge: string;
    services: Array<string>;
}
export interface SeasonOfferSettings {
    title: string;
    endDate: string;
    postOfferMessage: string;
    discountAmount: bigint;
    applicablePlanIds: Array<bigint>;
    offerMessage: string;
    postOfferWindowDays: bigint;
    badgeColor: string;
    startDate: string;
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
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addBrandPartner(brand: BrandInput): Promise<bigint>;
    addFAQItem(faq: FAQInput): Promise<bigint>;
    addFullPricingPlan(input: FullPricingPlanInput): Promise<bigint>;
    addPortfolioVideo(video: VideoInput): Promise<bigint>;
    addPricingPlan(plan: PricingPlanInput): Promise<bigint>;
    addService(service: ServiceInput): Promise<bigint>;
    addTestimonial(input: TestimonialFullInput): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteBrandPartner(brandId: bigint): Promise<void>;
    deleteFAQItem(faqId: bigint): Promise<void>;
    deleteFullPricingPlan(planId: bigint): Promise<void>;
    deletePortfolioVideo(videoId: bigint): Promise<void>;
    deleteTestimonial(testimonialId: bigint): Promise<void>;
    fullPricingSeed(): Promise<void>;
    getAllBrands(): Promise<Array<Brand>>;
    getAllContactEnquiries(): Promise<Array<ContactEnquiry>>;
    getAllFAQs(): Promise<Array<FAQItem>>;
    getAllFullPricingPlans(): Promise<Array<FullPricingPlan>>;
    getAllPageContent(): Promise<Array<[string, PageContent]>>;
    getAllPresetPackages(): Promise<Array<PresetPackage>>;
    getAllPricingPlans(): Promise<Array<PricingPlan>>;
    getAllServices(): Promise<Array<Service>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getAllVideos(): Promise<Array<PortfolioVideo>>;
    getBrandsByCategory(category: string): Promise<Array<Brand>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getEnabledFullPricingPlans(): Promise<Array<FullPricingPlan>>;
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
    getSeasonOfferSettings(): Promise<SeasonOfferSettings>;
    getServicesAndPricing(): Promise<{
        pricing: Array<PricingPlan>;
        services: Array<Service>;
    }>;
    getSiteStats(): Promise<SiteStats>;
    getSliderRates(): Promise<SliderRates>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVideoById(videoId: bigint): Promise<PortfolioVideo | null>;
    getVideosByCategory(category: string): Promise<Array<PortfolioVideo>>;
    isCallerAdmin(): Promise<boolean>;
    publicCombinedVideosBrands(): Promise<{
        brands: Array<Brand>;
        videos: Array<PortfolioVideo>;
    }>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedData(): Promise<void>;
    seedPageContent(): Promise<void>;
    submitContactEnquiry(name: string, email: string, phone: string, message: string, selectedPlan: string): Promise<bigint>;
    toggleBrandPublished(brandId: bigint): Promise<boolean>;
    toggleFAQPublished(faqId: bigint): Promise<boolean>;
    toggleFullPricingPlanEnabled(planId: bigint): Promise<boolean>;
    togglePricingPublished(planId: bigint): Promise<boolean>;
    toggleServicePublished(serviceId: bigint): Promise<boolean>;
    toggleTestimonialPublished(testimonialId: bigint): Promise<boolean>;
    toggleVideoPublished(videoId: bigint): Promise<boolean>;
    updateBrandPartner(id: bigint, brand: BrandInput): Promise<void>;
    updateFullPricingPlan(id: bigint, input: FullPricingPlanInput): Promise<void>;
    updateMonthlyPackage(pkg: MonthlyPackage): Promise<void>;
    updateOfficeProfile(profile: OfficeProfile): Promise<void>;
    updatePageContent(pageId: string, content: PageContent): Promise<void>;
    updatePortfolioVideo(video: PortfolioVideoFullInput): Promise<void>;
    updatePresetPackage(pkg: PresetPackage): Promise<void>;
    updatePricingPlan(id: bigint, plan: PricingPlanInput): Promise<void>;
    updateReelPricing(pricing: ReelPricing): Promise<void>;
    updateSeasonOfferSettings(settings: SeasonOfferSettings): Promise<void>;
    updateService(service: ServiceFullInput): Promise<void>;
    updateSiteStats(stats: SiteStats): Promise<void>;
    updateSliderRates(rates: SliderRates): Promise<void>;
}
