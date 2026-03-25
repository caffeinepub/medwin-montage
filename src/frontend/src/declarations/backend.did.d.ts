/* eslint-disable */

// @ts-nocheck

import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';
import type { Principal } from '@icp-sdk/core/principal';

export interface Brand {
  'id' : bigint,
  'mapsUrl' : string,
  'published' : boolean,
  'name' : string,
  'description' : string,
  'category' : string,
  'location' : string,
}
export interface BrandInput {
  'mapsUrl' : string,
  'name' : string,
  'description' : string,
  'category' : string,
  'location' : string,
}
export interface ContactEnquiry {
  'id' : bigint,
  'name' : string,
  'email' : string,
  'message' : string,
  'timestamp' : Time,
  'phone' : string,
}
export interface FAQInput { 'question' : string, 'answer' : string }
export interface FAQItem {
  'id' : bigint,
  'question' : string,
  'published' : boolean,
  'answer' : string,
}
export interface OfficeProfile {
  'city' : string,
  'mapsUrl' : string,
  'whatsapp' : string,
  'email' : string,
  'address' : string,
  'phone' : string,
}
export interface PageSection {
  'id' : string,
  'heading' : string,
  'description' : string,
  'imageUrl' : string,
  'visible' : boolean,
}
export interface PageContent {
  'pageId' : string,
  'heroTitle' : string,
  'heroSubtitle' : string,
  'heroBackgroundImage' : string,
  'sections' : Array<PageSection>,
}
export interface PortfolioVideo {
  'id' : bigint,
  'title' : string,
  'vimeoId' : string,
  'published' : boolean,
  'description' : string,
  'category' : string,
}
export interface PortfolioVideoFullInput {
  'id' : bigint,
  'title' : string,
  'vimeoId' : string,
  'published' : boolean,
  'description' : string,
  'category' : string,
}
export interface PricingPlan {
  'id' : bigint,
  'planLabel' : string,
  'published' : boolean,
  'note' : string,
  'price' : bigint,
}
export interface PricingPlanInput {
  'planLabel' : string,
  'note' : string,
  'price' : bigint,
}
export interface PresetPackage {
  'id' : bigint,
  'name' : string,
  'price' : bigint,
  'features' : Array<string>,
  'deliveryDays' : bigint,
  'enabled' : boolean,
}
export interface ReelPricing {
  'editingOnly' : bigint,
  'editingCamera' : bigint,
  'editingContentCamera' : bigint,
}
export interface MonthlyPackage {
  'price' : bigint,
  'videoCount' : bigint,
  'description' : string,
  'enabled' : boolean,
}
export interface SliderRates {
  'editing' : bigint,
  'videography' : bigint,
  'content' : bigint,
  'other' : bigint,
}
export interface SiteStats {
  'videosDelivered' : bigint,
  'happyClients' : bigint,
  'viewsGenerated' : bigint,
}
export interface Service {
  'id' : bigint,
  'title' : string,
  'features' : Array<string>,
  'published' : boolean,
  'description' : string,
}
export interface ServiceFullInput {
  'id' : bigint,
  'title' : string,
  'features' : Array<string>,
  'description' : string,
}
export interface ServiceInput {
  'title' : string,
  'features' : Array<string>,
  'description' : string,
}
export interface Testimonial {
  'id' : bigint,
  'review' : string,
  'clientName' : string,
  'published' : boolean,
  'company' : string,
  'rating' : bigint,
}
export interface TestimonialInput {
  'clientName' : string,
  'company' : string,
  'review' : string,
  'rating' : bigint,
}
export type Time = bigint;
export type UserRole = { 'admin' : null } |
  { 'user' : null } |
  { 'guest' : null };
export interface VideoInput {
  'title' : string,
  'vimeoId' : string,
  'description' : string,
  'category' : string,
}
export interface _CaffeineStorageCreateCertificateResult {
  'method' : string,
  'blob_hash' : string,
}
export interface _CaffeineStorageRefillInformation {
  'proposed_top_up_amount' : [] | [bigint],
}
export interface _CaffeineStorageRefillResult {
  'success' : [] | [boolean],
  'topped_up_amount' : [] | [bigint],
}
export interface _SERVICE {
  '_caffeineStorageBlobIsLive' : ActorMethod<[Uint8Array], boolean>,
  '_caffeineStorageBlobsToDelete' : ActorMethod<[], Array<Uint8Array>>,
  '_caffeineStorageConfirmBlobDeletion' : ActorMethod<[Array<Uint8Array>], undefined>,
  '_caffeineStorageCreateCertificate' : ActorMethod<[string], _CaffeineStorageCreateCertificateResult>,
  '_caffeineStorageRefillCashier' : ActorMethod<[[] | [_CaffeineStorageRefillInformation]], _CaffeineStorageRefillResult>,
  '_caffeineStorageUpdateGatewayPrincipals' : ActorMethod<[], undefined>,
  '_initializeAccessControlWithSecret' : ActorMethod<[string], undefined>,
  'addBrandPartner' : ActorMethod<[BrandInput], bigint>,
  'addFAQItem' : ActorMethod<[FAQInput], bigint>,
  'addPortfolioVideo' : ActorMethod<[VideoInput], bigint>,
  'addPricingPlan' : ActorMethod<[PricingPlanInput], bigint>,
  'addService' : ActorMethod<[ServiceInput], bigint>,
  'addTestimonial' : ActorMethod<[TestimonialInput], bigint>,
  'assignCallerUserRole' : ActorMethod<[Principal, UserRole], undefined>,
  'deleteBrandPartner' : ActorMethod<[bigint], undefined>,
  'deleteFAQItem' : ActorMethod<[bigint], undefined>,
  'deletePortfolioVideo' : ActorMethod<[bigint], undefined>,
  'deleteTestimonial' : ActorMethod<[bigint], undefined>,
  'getAllContactEnquiries' : ActorMethod<[], Array<ContactEnquiry>>,
  'getAllPageContent' : ActorMethod<[], Array<[string, PageContent]>>,
  'getAllPresetPackages' : ActorMethod<[], Array<PresetPackage>>,
  'getAllVideos' : ActorMethod<[], Array<PortfolioVideo>>,
  'getBrandsByCategory' : ActorMethod<[string], Array<Brand>>,
  'getCallerUserRole' : ActorMethod<[], UserRole>,
  'getMonthlyPackage' : ActorMethod<[], MonthlyPackage>,
  'getOfficeProfile' : ActorMethod<[], OfficeProfile>,
  'getPageContent' : ActorMethod<[string], [] | [PageContent]>,
  'getPresetPackages' : ActorMethod<[], Array<PresetPackage>>,
  'getPublishedBrands' : ActorMethod<[], Array<Brand>>,
  'getPublishedFAQs' : ActorMethod<[], Array<FAQItem>>,
  'getPublishedPricingPlans' : ActorMethod<[], Array<PricingPlan>>,
  'getPublishedServices' : ActorMethod<[], Array<Service>>,
  'getPublishedTestimonials' : ActorMethod<[], Array<Testimonial>>,
  'getPublishedVideos' : ActorMethod<[], Array<PortfolioVideo>>,
  'getReelPricing' : ActorMethod<[], ReelPricing>,
  'getServicesAndPricing' : ActorMethod<[], { 'pricing' : Array<PricingPlan>, 'services' : Array<Service> }>,
  'getSiteStats' : ActorMethod<[], SiteStats>,
  'getSliderRates' : ActorMethod<[], SliderRates>,
  'getVideosByCategory' : ActorMethod<[string], Array<PortfolioVideo>>,
  'isCallerAdmin' : ActorMethod<[], boolean>,
  'publicCombinedVideosBrands' : ActorMethod<[], { 'brands' : Array<Brand>, 'videos' : Array<PortfolioVideo> }>,
  'seedData' : ActorMethod<[], undefined>,
  'seedPageContent' : ActorMethod<[], undefined>,
  'submitContactEnquiry' : ActorMethod<[string, string, string, string], bigint>,
  'toggleBrandPublished' : ActorMethod<[bigint], boolean>,
  'toggleFAQPublished' : ActorMethod<[bigint], boolean>,
  'togglePricingPublished' : ActorMethod<[bigint], boolean>,
  'toggleServicePublished' : ActorMethod<[bigint], boolean>,
  'toggleTestimonialPublished' : ActorMethod<[bigint], boolean>,
  'toggleVideoPublished' : ActorMethod<[bigint], boolean>,
  'updateBrandPartner' : ActorMethod<[bigint, BrandInput], undefined>,
  'updateMonthlyPackage' : ActorMethod<[MonthlyPackage], undefined>,
  'updateOfficeProfile' : ActorMethod<[OfficeProfile], undefined>,
  'updatePageContent' : ActorMethod<[string, PageContent], undefined>,
  'updatePortfolioVideo' : ActorMethod<[PortfolioVideoFullInput], undefined>,
  'updatePresetPackage' : ActorMethod<[PresetPackage], undefined>,
  'updatePricingPlan' : ActorMethod<[bigint, PricingPlanInput], undefined>,
  'updateReelPricing' : ActorMethod<[ReelPricing], undefined>,
  'updateService' : ActorMethod<[ServiceFullInput], undefined>,
  'updateSiteStats' : ActorMethod<[SiteStats], undefined>,
  'updateSliderRates' : ActorMethod<[SliderRates], undefined>,
}
export declare const idlService: IDL.ServiceClass;
export declare const idlInitArgs: IDL.Type[];
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
