/* eslint-disable */

// @ts-nocheck

import { IDL } from '@icp-sdk/core/candid';

export const _CaffeineStorageCreateCertificateResult = IDL.Record({
  'method' : IDL.Text,
  'blob_hash' : IDL.Text,
});
export const _CaffeineStorageRefillInformation = IDL.Record({
  'proposed_top_up_amount' : IDL.Opt(IDL.Nat),
});
export const _CaffeineStorageRefillResult = IDL.Record({
  'success' : IDL.Opt(IDL.Bool),
  'topped_up_amount' : IDL.Opt(IDL.Nat),
});
export const BrandInput = IDL.Record({
  'mapsUrl' : IDL.Text,
  'name' : IDL.Text,
  'description' : IDL.Text,
  'category' : IDL.Text,
  'location' : IDL.Text,
});
export const FAQInput = IDL.Record({
  'question' : IDL.Text,
  'answer' : IDL.Text,
});
export const VideoInput = IDL.Record({
  'title' : IDL.Text,
  'vimeoId' : IDL.Text,
  'description' : IDL.Text,
  'category' : IDL.Text,
});
export const PricingPlanInput = IDL.Record({
  'planLabel' : IDL.Text,
  'note' : IDL.Text,
  'price' : IDL.Nat,
});
export const ServiceInput = IDL.Record({
  'title' : IDL.Text,
  'features' : IDL.Vec(IDL.Text),
  'description' : IDL.Text,
});
export const TestimonialInput = IDL.Record({
  'review' : IDL.Text,
  'clientName' : IDL.Text,
  'company' : IDL.Text,
  'rating' : IDL.Nat,
});
export const UserRole = IDL.Variant({
  'admin' : IDL.Null,
  'user' : IDL.Null,
  'guest' : IDL.Null,
});
export const Time = IDL.Int;
export const ContactEnquiry = IDL.Record({
  'id' : IDL.Nat,
  'name' : IDL.Text,
  'email' : IDL.Text,
  'message' : IDL.Text,
  'timestamp' : Time,
  'phone' : IDL.Text,
});
export const PortfolioVideo = IDL.Record({
  'id' : IDL.Nat,
  'title' : IDL.Text,
  'vimeoId' : IDL.Text,
  'published' : IDL.Bool,
  'description' : IDL.Text,
  'category' : IDL.Text,
});
export const Brand = IDL.Record({
  'id' : IDL.Nat,
  'mapsUrl' : IDL.Text,
  'published' : IDL.Bool,
  'name' : IDL.Text,
  'description' : IDL.Text,
  'category' : IDL.Text,
  'location' : IDL.Text,
});
export const OfficeProfile = IDL.Record({
  'city' : IDL.Text,
  'mapsUrl' : IDL.Text,
  'whatsapp' : IDL.Text,
  'email' : IDL.Text,
  'address' : IDL.Text,
  'phone' : IDL.Text,
});
export const PageSection = IDL.Record({
  'id' : IDL.Text,
  'heading' : IDL.Text,
  'description' : IDL.Text,
  'imageUrl' : IDL.Text,
  'visible' : IDL.Bool,
});
export const PageContent = IDL.Record({
  'pageId' : IDL.Text,
  'heroTitle' : IDL.Text,
  'heroSubtitle' : IDL.Text,
  'heroBackgroundImage' : IDL.Text,
  'sections' : IDL.Vec(PageSection),
});
export const FAQItem = IDL.Record({
  'id' : IDL.Nat,
  'question' : IDL.Text,
  'published' : IDL.Bool,
  'answer' : IDL.Text,
});
export const PricingPlan = IDL.Record({
  'id' : IDL.Nat,
  'planLabel' : IDL.Text,
  'published' : IDL.Bool,
  'note' : IDL.Text,
  'price' : IDL.Nat,
});
export const Service = IDL.Record({
  'id' : IDL.Nat,
  'title' : IDL.Text,
  'features' : IDL.Vec(IDL.Text),
  'published' : IDL.Bool,
  'description' : IDL.Text,
});
export const Testimonial = IDL.Record({
  'id' : IDL.Nat,
  'review' : IDL.Text,
  'clientName' : IDL.Text,
  'published' : IDL.Bool,
  'company' : IDL.Text,
  'rating' : IDL.Nat,
});
export const PortfolioVideoFullInput = IDL.Record({
  'id' : IDL.Nat,
  'title' : IDL.Text,
  'vimeoId' : IDL.Text,
  'published' : IDL.Bool,
  'description' : IDL.Text,
  'category' : IDL.Text,
});
export const ServiceFullInput = IDL.Record({
  'id' : IDL.Nat,
  'title' : IDL.Text,
  'features' : IDL.Vec(IDL.Text),
  'description' : IDL.Text,
});
export const PresetPackage = IDL.Record({
  'id' : IDL.Nat,
  'name' : IDL.Text,
  'price' : IDL.Nat,
  'features' : IDL.Vec(IDL.Text),
  'deliveryDays' : IDL.Nat,
  'enabled' : IDL.Bool,
});
export const ReelPricing = IDL.Record({
  'editingOnly' : IDL.Nat,
  'editingCamera' : IDL.Nat,
  'editingContentCamera' : IDL.Nat,
});
export const MonthlyPackage = IDL.Record({
  'price' : IDL.Nat,
  'videoCount' : IDL.Nat,
  'description' : IDL.Text,
  'enabled' : IDL.Bool,
});
export const SliderRates = IDL.Record({
  'editing' : IDL.Nat,
  'videography' : IDL.Nat,
  'content' : IDL.Nat,
  'other' : IDL.Nat,
});
export const SiteStats = IDL.Record({
  'videosDelivered' : IDL.Nat,
  'happyClients' : IDL.Nat,
  'viewsGenerated' : IDL.Nat,
});

export const idlService = IDL.Service({
  '_caffeineStorageBlobIsLive' : IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Bool], ['query']),
  '_caffeineStorageBlobsToDelete' : IDL.Func([], [IDL.Vec(IDL.Vec(IDL.Nat8))], ['query']),
  '_caffeineStorageConfirmBlobDeletion' : IDL.Func([IDL.Vec(IDL.Vec(IDL.Nat8))], [], []),
  '_caffeineStorageCreateCertificate' : IDL.Func([IDL.Text], [_CaffeineStorageCreateCertificateResult], []),
  '_caffeineStorageRefillCashier' : IDL.Func([IDL.Opt(_CaffeineStorageRefillInformation)], [_CaffeineStorageRefillResult], []),
  '_caffeineStorageUpdateGatewayPrincipals' : IDL.Func([], [], []),
  '_initializeAccessControlWithSecret' : IDL.Func([IDL.Text], [], []),
  'addBrandPartner' : IDL.Func([BrandInput], [IDL.Nat], []),
  'addFAQItem' : IDL.Func([FAQInput], [IDL.Nat], []),
  'addPortfolioVideo' : IDL.Func([VideoInput], [IDL.Nat], []),
  'addPricingPlan' : IDL.Func([PricingPlanInput], [IDL.Nat], []),
  'addService' : IDL.Func([ServiceInput], [IDL.Nat], []),
  'addTestimonial' : IDL.Func([TestimonialInput], [IDL.Nat], []),
  'assignCallerUserRole' : IDL.Func([IDL.Principal, UserRole], [], []),
  'deleteBrandPartner' : IDL.Func([IDL.Nat], [], []),
  'deleteFAQItem' : IDL.Func([IDL.Nat], [], []),
  'deletePortfolioVideo' : IDL.Func([IDL.Nat], [], []),
  'deleteTestimonial' : IDL.Func([IDL.Nat], [], []),
  'getAllContactEnquiries' : IDL.Func([], [IDL.Vec(ContactEnquiry)], ['query']),
  'getAllPageContent' : IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, PageContent))], ['query']),
  'getAllPresetPackages' : IDL.Func([], [IDL.Vec(PresetPackage)], ['query']),
  'getAllVideos' : IDL.Func([], [IDL.Vec(PortfolioVideo)], ['query']),
  'getBrandsByCategory' : IDL.Func([IDL.Text], [IDL.Vec(Brand)], ['query']),
  'getCallerUserRole' : IDL.Func([], [UserRole], ['query']),
  'getMonthlyPackage' : IDL.Func([], [MonthlyPackage], ['query']),
  'getOfficeProfile' : IDL.Func([], [OfficeProfile], ['query']),
  'getPageContent' : IDL.Func([IDL.Text], [IDL.Opt(PageContent)], ['query']),
  'getPresetPackages' : IDL.Func([], [IDL.Vec(PresetPackage)], ['query']),
  'getPublishedBrands' : IDL.Func([], [IDL.Vec(Brand)], ['query']),
  'getPublishedFAQs' : IDL.Func([], [IDL.Vec(FAQItem)], ['query']),
  'getPublishedPricingPlans' : IDL.Func([], [IDL.Vec(PricingPlan)], ['query']),
  'getPublishedServices' : IDL.Func([], [IDL.Vec(Service)], ['query']),
  'getPublishedTestimonials' : IDL.Func([], [IDL.Vec(Testimonial)], ['query']),
  'getPublishedVideos' : IDL.Func([], [IDL.Vec(PortfolioVideo)], ['query']),
  'getReelPricing' : IDL.Func([], [ReelPricing], ['query']),
  'getServicesAndPricing' : IDL.Func([], [IDL.Record({ 'pricing' : IDL.Vec(PricingPlan), 'services' : IDL.Vec(Service) })], ['query']),
  'getSiteStats' : IDL.Func([], [SiteStats], ['query']),
  'getSliderRates' : IDL.Func([], [SliderRates], ['query']),
  'getVideosByCategory' : IDL.Func([IDL.Text], [IDL.Vec(PortfolioVideo)], ['query']),
  'isCallerAdmin' : IDL.Func([], [IDL.Bool], ['query']),
  'publicCombinedVideosBrands' : IDL.Func([], [IDL.Record({ 'brands' : IDL.Vec(Brand), 'videos' : IDL.Vec(PortfolioVideo) })], ['query']),
  'seedData' : IDL.Func([], [], []),
  'seedPageContent' : IDL.Func([], [], []),
  'submitContactEnquiry' : IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
  'toggleBrandPublished' : IDL.Func([IDL.Nat], [IDL.Bool], []),
  'toggleFAQPublished' : IDL.Func([IDL.Nat], [IDL.Bool], []),
  'togglePricingPublished' : IDL.Func([IDL.Nat], [IDL.Bool], []),
  'toggleServicePublished' : IDL.Func([IDL.Nat], [IDL.Bool], []),
  'toggleTestimonialPublished' : IDL.Func([IDL.Nat], [IDL.Bool], []),
  'toggleVideoPublished' : IDL.Func([IDL.Nat], [IDL.Bool], []),
  'updateBrandPartner' : IDL.Func([IDL.Nat, BrandInput], [], []),
  'updateMonthlyPackage' : IDL.Func([MonthlyPackage], [], []),
  'updateOfficeProfile' : IDL.Func([OfficeProfile], [], []),
  'updatePageContent' : IDL.Func([IDL.Text, PageContent], [], []),
  'updatePortfolioVideo' : IDL.Func([PortfolioVideoFullInput], [], []),
  'updatePresetPackage' : IDL.Func([PresetPackage], [], []),
  'updatePricingPlan' : IDL.Func([IDL.Nat, PricingPlanInput], [], []),
  'updateReelPricing' : IDL.Func([ReelPricing], [], []),
  'updateService' : IDL.Func([ServiceFullInput], [], []),
  'updateSiteStats' : IDL.Func([SiteStats], [], []),
  'updateSliderRates' : IDL.Func([SliderRates], [], []),
});

export const idlInitArgs = [];

export const idlFactory = ({ IDL }) => {
  const _CaffeineStorageCreateCertificateResult = IDL.Record({ 'method' : IDL.Text, 'blob_hash' : IDL.Text });
  const _CaffeineStorageRefillInformation = IDL.Record({ 'proposed_top_up_amount' : IDL.Opt(IDL.Nat) });
  const _CaffeineStorageRefillResult = IDL.Record({ 'success' : IDL.Opt(IDL.Bool), 'topped_up_amount' : IDL.Opt(IDL.Nat) });
  const BrandInput = IDL.Record({ 'mapsUrl' : IDL.Text, 'name' : IDL.Text, 'description' : IDL.Text, 'category' : IDL.Text, 'location' : IDL.Text });
  const FAQInput = IDL.Record({ 'question' : IDL.Text, 'answer' : IDL.Text });
  const VideoInput = IDL.Record({ 'title' : IDL.Text, 'vimeoId' : IDL.Text, 'description' : IDL.Text, 'category' : IDL.Text });
  const PricingPlanInput = IDL.Record({ 'planLabel' : IDL.Text, 'note' : IDL.Text, 'price' : IDL.Nat });
  const ServiceInput = IDL.Record({ 'title' : IDL.Text, 'features' : IDL.Vec(IDL.Text), 'description' : IDL.Text });
  const TestimonialInput = IDL.Record({ 'review' : IDL.Text, 'clientName' : IDL.Text, 'company' : IDL.Text, 'rating' : IDL.Nat });
  const UserRole = IDL.Variant({ 'admin' : IDL.Null, 'user' : IDL.Null, 'guest' : IDL.Null });
  const Time = IDL.Int;
  const ContactEnquiry = IDL.Record({ 'id' : IDL.Nat, 'name' : IDL.Text, 'email' : IDL.Text, 'message' : IDL.Text, 'timestamp' : Time, 'phone' : IDL.Text });
  const PortfolioVideo = IDL.Record({ 'id' : IDL.Nat, 'title' : IDL.Text, 'vimeoId' : IDL.Text, 'published' : IDL.Bool, 'description' : IDL.Text, 'category' : IDL.Text });
  const Brand = IDL.Record({ 'id' : IDL.Nat, 'mapsUrl' : IDL.Text, 'published' : IDL.Bool, 'name' : IDL.Text, 'description' : IDL.Text, 'category' : IDL.Text, 'location' : IDL.Text });
  const OfficeProfile = IDL.Record({ 'city' : IDL.Text, 'mapsUrl' : IDL.Text, 'whatsapp' : IDL.Text, 'email' : IDL.Text, 'address' : IDL.Text, 'phone' : IDL.Text });
  const PageSection = IDL.Record({ 'id' : IDL.Text, 'heading' : IDL.Text, 'description' : IDL.Text, 'imageUrl' : IDL.Text, 'visible' : IDL.Bool });
  const PageContent = IDL.Record({ 'pageId' : IDL.Text, 'heroTitle' : IDL.Text, 'heroSubtitle' : IDL.Text, 'heroBackgroundImage' : IDL.Text, 'sections' : IDL.Vec(PageSection) });
  const FAQItem = IDL.Record({ 'id' : IDL.Nat, 'question' : IDL.Text, 'published' : IDL.Bool, 'answer' : IDL.Text });
  const PricingPlan = IDL.Record({ 'id' : IDL.Nat, 'planLabel' : IDL.Text, 'published' : IDL.Bool, 'note' : IDL.Text, 'price' : IDL.Nat });
  const Service = IDL.Record({ 'id' : IDL.Nat, 'title' : IDL.Text, 'features' : IDL.Vec(IDL.Text), 'published' : IDL.Bool, 'description' : IDL.Text });
  const Testimonial = IDL.Record({ 'id' : IDL.Nat, 'review' : IDL.Text, 'clientName' : IDL.Text, 'published' : IDL.Bool, 'company' : IDL.Text, 'rating' : IDL.Nat });
  const PortfolioVideoFullInput = IDL.Record({ 'id' : IDL.Nat, 'title' : IDL.Text, 'vimeoId' : IDL.Text, 'published' : IDL.Bool, 'description' : IDL.Text, 'category' : IDL.Text });
  const ServiceFullInput = IDL.Record({ 'id' : IDL.Nat, 'title' : IDL.Text, 'features' : IDL.Vec(IDL.Text), 'description' : IDL.Text });
  const PresetPackage = IDL.Record({ 'id' : IDL.Nat, 'name' : IDL.Text, 'price' : IDL.Nat, 'features' : IDL.Vec(IDL.Text), 'deliveryDays' : IDL.Nat, 'enabled' : IDL.Bool });
  const ReelPricing = IDL.Record({ 'editingOnly' : IDL.Nat, 'editingCamera' : IDL.Nat, 'editingContentCamera' : IDL.Nat });
  const MonthlyPackage = IDL.Record({ 'price' : IDL.Nat, 'videoCount' : IDL.Nat, 'description' : IDL.Text, 'enabled' : IDL.Bool });
  const SliderRates = IDL.Record({ 'editing' : IDL.Nat, 'videography' : IDL.Nat, 'content' : IDL.Nat, 'other' : IDL.Nat });
  const SiteStats = IDL.Record({ 'videosDelivered' : IDL.Nat, 'happyClients' : IDL.Nat, 'viewsGenerated' : IDL.Nat });

  return IDL.Service({
    '_caffeineStorageBlobIsLive' : IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Bool], ['query']),
    '_caffeineStorageBlobsToDelete' : IDL.Func([], [IDL.Vec(IDL.Vec(IDL.Nat8))], ['query']),
    '_caffeineStorageConfirmBlobDeletion' : IDL.Func([IDL.Vec(IDL.Vec(IDL.Nat8))], [], []),
    '_caffeineStorageCreateCertificate' : IDL.Func([IDL.Text], [_CaffeineStorageCreateCertificateResult], []),
    '_caffeineStorageRefillCashier' : IDL.Func([IDL.Opt(_CaffeineStorageRefillInformation)], [_CaffeineStorageRefillResult], []),
    '_caffeineStorageUpdateGatewayPrincipals' : IDL.Func([], [], []),
    '_initializeAccessControlWithSecret' : IDL.Func([IDL.Text], [], []),
    'addBrandPartner' : IDL.Func([BrandInput], [IDL.Nat], []),
    'addFAQItem' : IDL.Func([FAQInput], [IDL.Nat], []),
    'addPortfolioVideo' : IDL.Func([VideoInput], [IDL.Nat], []),
    'addPricingPlan' : IDL.Func([PricingPlanInput], [IDL.Nat], []),
    'addService' : IDL.Func([ServiceInput], [IDL.Nat], []),
    'addTestimonial' : IDL.Func([TestimonialInput], [IDL.Nat], []),
    'assignCallerUserRole' : IDL.Func([IDL.Principal, UserRole], [], []),
    'deleteBrandPartner' : IDL.Func([IDL.Nat], [], []),
    'deleteFAQItem' : IDL.Func([IDL.Nat], [], []),
    'deletePortfolioVideo' : IDL.Func([IDL.Nat], [], []),
    'deleteTestimonial' : IDL.Func([IDL.Nat], [], []),
    'getAllContactEnquiries' : IDL.Func([], [IDL.Vec(ContactEnquiry)], ['query']),
    'getAllPageContent' : IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, PageContent))], ['query']),
    'getAllPresetPackages' : IDL.Func([], [IDL.Vec(PresetPackage)], ['query']),
    'getAllVideos' : IDL.Func([], [IDL.Vec(PortfolioVideo)], ['query']),
    'getBrandsByCategory' : IDL.Func([IDL.Text], [IDL.Vec(Brand)], ['query']),
    'getCallerUserRole' : IDL.Func([], [UserRole], ['query']),
    'getMonthlyPackage' : IDL.Func([], [MonthlyPackage], ['query']),
    'getOfficeProfile' : IDL.Func([], [OfficeProfile], ['query']),
    'getPageContent' : IDL.Func([IDL.Text], [IDL.Opt(PageContent)], ['query']),
    'getPresetPackages' : IDL.Func([], [IDL.Vec(PresetPackage)], ['query']),
    'getPublishedBrands' : IDL.Func([], [IDL.Vec(Brand)], ['query']),
    'getPublishedFAQs' : IDL.Func([], [IDL.Vec(FAQItem)], ['query']),
    'getPublishedPricingPlans' : IDL.Func([], [IDL.Vec(PricingPlan)], ['query']),
    'getPublishedServices' : IDL.Func([], [IDL.Vec(Service)], ['query']),
    'getPublishedTestimonials' : IDL.Func([], [IDL.Vec(Testimonial)], ['query']),
    'getPublishedVideos' : IDL.Func([], [IDL.Vec(PortfolioVideo)], ['query']),
    'getReelPricing' : IDL.Func([], [ReelPricing], ['query']),
    'getServicesAndPricing' : IDL.Func([], [IDL.Record({ 'pricing' : IDL.Vec(PricingPlan), 'services' : IDL.Vec(Service) })], ['query']),
    'getSiteStats' : IDL.Func([], [SiteStats], ['query']),
    'getSliderRates' : IDL.Func([], [SliderRates], ['query']),
    'getVideosByCategory' : IDL.Func([IDL.Text], [IDL.Vec(PortfolioVideo)], ['query']),
    'isCallerAdmin' : IDL.Func([], [IDL.Bool], ['query']),
    'publicCombinedVideosBrands' : IDL.Func([], [IDL.Record({ 'brands' : IDL.Vec(Brand), 'videos' : IDL.Vec(PortfolioVideo) })], ['query']),
    'seedData' : IDL.Func([], [], []),
    'seedPageContent' : IDL.Func([], [], []),
    'submitContactEnquiry' : IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
    'toggleBrandPublished' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'toggleFAQPublished' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'togglePricingPublished' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'toggleServicePublished' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'toggleTestimonialPublished' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'toggleVideoPublished' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'updateBrandPartner' : IDL.Func([IDL.Nat, BrandInput], [], []),
    'updateMonthlyPackage' : IDL.Func([MonthlyPackage], [], []),
    'updateOfficeProfile' : IDL.Func([OfficeProfile], [], []),
    'updatePageContent' : IDL.Func([IDL.Text, PageContent], [], []),
    'updatePortfolioVideo' : IDL.Func([PortfolioVideoFullInput], [], []),
    'updatePresetPackage' : IDL.Func([PresetPackage], [], []),
    'updatePricingPlan' : IDL.Func([IDL.Nat, PricingPlanInput], [], []),
    'updateReelPricing' : IDL.Func([ReelPricing], [], []),
    'updateService' : IDL.Func([ServiceFullInput], [], []),
    'updateSiteStats' : IDL.Func([SiteStats], [], []),
    'updateSliderRates' : IDL.Func([SliderRates], [], []),
  });
};

export const init = ({ IDL }) => { return []; };
