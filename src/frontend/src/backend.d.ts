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
    getAllContactEnquiries(): Promise<Array<ContactEnquiry>>;
    getAllPageContent(): Promise<Array<[string, PageContent]>>;
    getAllVideos(): Promise<Array<PortfolioVideo>>;
    getBrandsByCategory(category: string): Promise<Array<Brand>>;
    getCallerUserRole(): Promise<UserRole>;
    getOfficeProfile(): Promise<OfficeProfile>;
    getPageContent(pageId: string): Promise<PageContent | null>;
    getPublishedBrands(): Promise<Array<Brand>>;
    getPublishedFAQs(): Promise<Array<FAQItem>>;
    getPublishedPricingPlans(): Promise<Array<PricingPlan>>;
    getPublishedServices(): Promise<Array<Service>>;
    getPublishedTestimonials(): Promise<Array<Testimonial>>;
    getPublishedVideos(): Promise<Array<PortfolioVideo>>;
    getServicesAndPricing(): Promise<{
        pricing: Array<PricingPlan>;
        services: Array<Service>;
    }>;
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
    updateOfficeProfile(profile: OfficeProfile): Promise<void>;
    updatePageContent(pageId: string, content: PageContent): Promise<void>;
    updatePortfolioVideo(video: PortfolioVideoFullInput): Promise<void>;
    updatePricingPlan(id: bigint, plan: PricingPlanInput): Promise<void>;
    updateService(service: ServiceFullInput): Promise<void>;
}
