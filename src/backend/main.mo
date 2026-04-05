import Nat "mo:core/Nat";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Char "mo:core/Char";
import Runtime "mo:core/Runtime";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  type PortfolioVideo = {
    id : Nat;
    title : Text;
    category : Text;
    vimeoId : Text;
    description : Text;
    published : Bool;
  };

  type Brand = {
    id : Nat;
    name : Text;
    category : Text;
    location : Text;
    description : Text;
    mapsUrl : Text;
    published : Bool;
  };

  type Service = {
    id : Nat;
    title : Text;
    description : Text;
    features : [Text];
    published : Bool;
  };

  type PricingPlan = {
    id : Nat;
    planLabel : Text;
    price : Nat;
    note : Text;
    published : Bool;
  };

  type FullPricingPlan = {
    id : Nat;
    name : Text;
    price : Nat;
    offerPrice : Nat;
    offerDescription : Text;
    planTypeBadge : Text;
    services : [Text];
    deliveryDays : Nat;
    videoCount : Nat;
    hasSeasonOffer : Bool;
    enabled : Bool;
  };

  type Testimonial = {
    id : Nat;
    clientName : Text;
    company : Text;
    review : Text;
    rating : Nat;
    published : Bool;
  };

  type FAQItem = {
    id : Nat;
    question : Text;
    answer : Text;
    published : Bool;
  };

  type ContactEnquiry = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type OfficeProfile = {
    email : Text;
    phone : Text;
    whatsapp : Text;
    address : Text;
    city : Text;
    mapsUrl : Text;
  };

  type PageSection = {
    id : Text;
    heading : Text;
    description : Text;
    imageUrl : Text;
    visible : Bool;
  };

  type PageContent = {
    pageId : Text;
    heroTitle : Text;
    heroSubtitle : Text;
    heroBackgroundImage : Text;
    sections : [PageSection];
  };

  type PresetPackage = {
    id : Nat;
    name : Text;
    price : Nat;
    features : [Text];
    deliveryDays : Nat;
    enabled : Bool;
  };

  type ReelPricing = {
    editingOnly : Nat;
    editingCamera : Nat;
    editingContentCamera : Nat;
  };

  type MonthlyPackage = {
    price : Nat;
    videoCount : Nat;
    description : Text;
    enabled : Bool;
  };

  type SliderRates = {
    editing : Nat;
    videography : Nat;
    content : Nat;
    other : Nat;
  };

  type SiteStats = {
    videosDelivered : Nat;
    happyClients : Nat;
    viewsGenerated : Nat;
  };

  type VideoInput = {
    title : Text;
    category : Text;
    vimeoId : Text;
    description : Text;
  };

  type BrandInput = {
    name : Text;
    category : Text;
    location : Text;
    description : Text;
    mapsUrl : Text;
  };

  type ServiceInput = {
    title : Text;
    description : Text;
    features : [Text];
  };

  type ServiceFullInput = {
    id : Nat;
    title : Text;
    description : Text;
    features : [Text];
  };

  type PricingPlanInput = {
    planLabel : Text;
    price : Nat;
    note : Text;
  };

  type TestimonialFullInput = {
    id : Nat;
    clientName : Text;
    company : Text;
    review : Text;
    rating : Nat;
    published : Bool;
  };

  type FAQInput = {
    question : Text;
    answer : Text;
  };

  type PortfolioVideoFullInput = {
    id : Nat;
    title : Text;
    category : Text;
    vimeoId : Text;
    description : Text;
    published : Bool;
  };

  type FullPricingPlanInput = {
    name : Text;
    price : Nat;
    offerPrice : Nat;
    offerDescription : Text;
    planTypeBadge : Text;
    services : [Text];
    deliveryDays : Nat;
    videoCount : Nat;
    hasSeasonOffer : Bool;
    enabled : Bool;
  };

  type SeasonOfferSettings = {
    title : Text;
    discountAmount : Nat;
    badgeColor : Text;
    startDate : Text;
    endDate : Text;
    postOfferWindowDays : Nat;
    offerMessage : Text;
    postOfferMessage : Text;
    applicablePlanIds : [Nat];
  };

  // State
  var nextVideoId = 1;
  var nextBrandId = 1;
  var nextServiceId = 1;
  var nextPricingPlanId = 1;
  var nextTestimonialId = 1;
  var nextFAQId = 1;
  var nextContactId = 1;
  var nextPresetPackageId = 1;
  var nextFullPricingPlanId = 1;

  let portfolioVideos = Map.empty<Nat, PortfolioVideo>();
  let brandPartners = Map.empty<Nat, Brand>();
  let services = Map.empty<Nat, Service>();
  let pricingPlans = Map.empty<Nat, PricingPlan>();
  let testimonials = Map.empty<Nat, Testimonial>();
  let faqs = Map.empty<Nat, FAQItem>();
  let contactEnquiries = Map.empty<Nat, ContactEnquiry>();
  let pageContents = Map.empty<Text, PageContent>();
  let presetPackages = Map.empty<Nat, PresetPackage>();
  let fullPricingPlans = Map.empty<Nat, FullPricingPlan>();

  var officeProfile : OfficeProfile = {
    email = "medwinmontage@gmail.com";
    phone = "+91 9487897160";
    whatsapp = "919487897160";
    address = "Thanjavur, Tamil Nadu, India";
    city = "Thanjavur";
    mapsUrl = "https://maps.app.goo.gl/KLb5gLXJ9gk5qKmQ8";
  };

  var reelPricing : ReelPricing = {
    editingOnly = 450;
    editingCamera = 900;
    editingContentCamera = 1500;
  };

  var monthlyPackage : MonthlyPackage = {
    price = 8999;
    videoCount = 12;
    description = "10-12 videos per month including editing, shooting, content, and growth support";
    enabled = true;
  };

  var sliderRates : SliderRates = {
    editing = 450;
    videography = 500;
    content = 150;
    other = 500;
  };

  var siteStats : SiteStats = {
    videosDelivered = 50;
    happyClients = 15;
    viewsGenerated = 3000000;
  };

  var seasonOfferSettings : SeasonOfferSettings = {
    title = "Season Offer! Limited Time";
    discountAmount = 1000;
    badgeColor = "#31BB31";
    startDate = "2026-03-30";
    endDate = "2026-04-10";
    postOfferWindowDays = 10;
    offerMessage = "Save ₹1,000 on ALL Plans! Limited time offer ends soon!";
    postOfferMessage = "Season offer has ended. Stay tuned for more deals!";
    applicablePlanIds = [1, 2, 3];
  };

  // ---- CRUD for Full Pricing Plans ----
  public shared ({ caller }) func addFullPricingPlan(input : FullPricingPlanInput) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add full pricing plans");
    };
    let id = nextFullPricingPlanId;
    nextFullPricingPlanId += 1;
    let newPlan : FullPricingPlan = {
      id;
      name = input.name;
      price = input.price;
      offerPrice = input.offerPrice;
      offerDescription = input.offerDescription;
      planTypeBadge = input.planTypeBadge;
      services = input.services;
      deliveryDays = input.deliveryDays;
      videoCount = input.videoCount;
      hasSeasonOffer = input.hasSeasonOffer;
      enabled = input.enabled;
    };
    fullPricingPlans.add(id, newPlan);
    id;
  };

  public shared ({ caller }) func updateFullPricingPlan(id : Nat, input : FullPricingPlanInput) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update full pricing plans");
    };
    switch (fullPricingPlans.get(id)) {
      case (null) {};
      case (?_existing) {
        let updated : FullPricingPlan = {
          id;
          name = input.name;
          price = input.price;
          offerPrice = input.offerPrice;
          offerDescription = input.offerDescription;
          planTypeBadge = input.planTypeBadge;
          services = input.services;
          deliveryDays = input.deliveryDays;
          videoCount = input.videoCount;
          hasSeasonOffer = input.hasSeasonOffer;
          enabled = input.enabled;
        };
        fullPricingPlans.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func deleteFullPricingPlan(planId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete full pricing plans");
    };
    ignore fullPricingPlans.remove(planId);
  };

  public shared ({ caller }) func toggleFullPricingPlanEnabled(planId : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can toggle full pricing plan status");
    };
    switch (fullPricingPlans.get(planId)) {
      case (null) { false };
      case (?plan) {
        let updated = { plan with enabled = not plan.enabled };
        fullPricingPlans.add(planId, updated);
        updated.enabled;
      };
    };
  };

  public query ({ caller }) func getAllFullPricingPlans() : async [FullPricingPlan] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all full pricing plans");
    };
    fullPricingPlans.values().toArray();
  };

  public query ({ caller }) func getEnabledFullPricingPlans() : async [FullPricingPlan] {
    fullPricingPlans.values().filter(func(p) { p.enabled }).toArray();
  };

  // ---- Season Offer Settings ----
  public shared ({ caller }) func updateSeasonOfferSettings(settings : SeasonOfferSettings) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update season offer settings");
    };
    seasonOfferSettings := settings;
  };

  public query ({ caller }) func getSeasonOfferSettings() : async SeasonOfferSettings { seasonOfferSettings };

  // ---- Portfolio Videos ----
  public shared ({ caller }) func addPortfolioVideo(video : VideoInput) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add portfolio videos");
    };
    let id = nextVideoId;
    nextVideoId += 1;
    portfolioVideos.add(id, { id; title = video.title; category = video.category; vimeoId = video.vimeoId; description = video.description; published = false });
    id;
  };

  public shared ({ caller }) func updatePortfolioVideo(video : PortfolioVideoFullInput) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update portfolio videos");
    };
    portfolioVideos.add(video.id, video);
  };

  public shared ({ caller }) func deletePortfolioVideo(videoId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete portfolio videos");
    };
    ignore portfolioVideos.remove(videoId);
  };

  public shared ({ caller }) func toggleVideoPublished(videoId : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can toggle video published status");
    };
    switch (portfolioVideos.get(videoId)) {
      case (null) { false };
      case (?v) {
        let updated = { v with published = not v.published };
        portfolioVideos.add(videoId, updated);
        updated.published;
      };
    };
  };

  public query ({ caller }) func getPublishedVideos() : async [PortfolioVideo] {
    portfolioVideos.values().filter(func(v) { v.published }).toArray();
  };

  public query ({ caller }) func getAllVideos() : async [PortfolioVideo] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all videos");
    };
    portfolioVideos.values().toArray();
  };

  public query ({ caller }) func getVideosByCategory(category : Text) : async [PortfolioVideo] {
    portfolioVideos.values().filter(func(v) { v.published and v.category == category }).toArray();
  };

  public query ({ caller }) func getVideoById(videoId : Nat) : async ?PortfolioVideo {
    portfolioVideos.get(videoId);
  };

  // ---- Brands ----
  public shared ({ caller }) func addBrandPartner(brand : BrandInput) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add brand partners");
    };
    let id = nextBrandId;
    nextBrandId += 1;
    brandPartners.add(id, { id; name = brand.name; category = brand.category; location = brand.location; description = brand.description; mapsUrl = brand.mapsUrl; published = false });
    id;
  };

  public shared ({ caller }) func updateBrandPartner(id : Nat, brand : BrandInput) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update brand partners");
    };
    switch (brandPartners.get(id)) {
      case (null) {};
      case (?b) {
        brandPartners.add(id, { id; name = brand.name; category = brand.category; location = brand.location; description = brand.description; mapsUrl = brand.mapsUrl; published = b.published });
      };
    };
  };

  public shared ({ caller }) func deleteBrandPartner(brandId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete brand partners");
    };
    ignore brandPartners.remove(brandId);
  };

  public shared ({ caller }) func toggleBrandPublished(brandId : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can toggle brand published status");
    };
    switch (brandPartners.get(brandId)) {
      case (null) { false };
      case (?b) {
        let updated = { b with published = not b.published };
        brandPartners.add(brandId, updated);
        updated.published;
      };
    };
  };

  public query ({ caller }) func getPublishedBrands() : async [Brand] {
    brandPartners.values().filter(func(b) { b.published }).toArray();
  };

  public query ({ caller }) func getAllBrands() : async [Brand] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all brands");
    };
    brandPartners.values().toArray();
  };

  public query ({ caller }) func getBrandsByCategory(category : Text) : async [Brand] {
    brandPartners.values().filter(func(b) { b.published and b.category == category }).toArray();
  };

  // ---- Services ----
  public shared ({ caller }) func addService(service : ServiceInput) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add services");
    };
    let id = nextServiceId;
    nextServiceId += 1;
    services.add(id, { id; title = service.title; description = service.description; features = service.features; published = false });
    id;
  };

  public shared ({ caller }) func updateService(service : ServiceFullInput) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update services");
    };
    switch (services.get(service.id)) {
      case (null) {};
      case (?s) {
        services.add(service.id, { id = service.id; title = service.title; description = service.description; features = service.features; published = s.published });
      };
    };
  };

  public shared ({ caller }) func toggleServicePublished(serviceId : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can toggle service published status");
    };
    switch (services.get(serviceId)) {
      case (null) { false };
      case (?s) {
        let updated = { s with published = not s.published };
        services.add(serviceId, updated);
        updated.published;
      };
    };
  };

  public query ({ caller }) func getPublishedServices() : async [Service] {
    services.values().filter(func(s) { s.published }).toArray();
  };

  public query ({ caller }) func getAllServices() : async [Service] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all services");
    };
    services.values().toArray();
  };

  // ---- Pricing Plans ----
  public shared ({ caller }) func addPricingPlan(plan : PricingPlanInput) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add pricing plans");
    };
    let id = nextPricingPlanId;
    nextPricingPlanId += 1;
    pricingPlans.add(id, { id; planLabel = plan.planLabel; price = plan.price; note = plan.note; published = false });
    id;
  };

  public shared ({ caller }) func updatePricingPlan(id : Nat, plan : PricingPlanInput) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update pricing plans");
    };
    switch (pricingPlans.get(id)) {
      case (null) {};
      case (?p) {
        pricingPlans.add(id, { id; planLabel = plan.planLabel; price = plan.price; note = plan.note; published = p.published });
      };
    };
  };

  public shared ({ caller }) func togglePricingPublished(planId : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can toggle pricing plan published status");
    };
    switch (pricingPlans.get(planId)) {
      case (null) { false };
      case (?p) {
        let updated = { p with published = not p.published };
        pricingPlans.add(planId, updated);
        updated.published;
      };
    };
  };

  public query ({ caller }) func getPublishedPricingPlans() : async [PricingPlan] {
    pricingPlans.values().filter(func(p) { p.published }).toArray();
  };

  public query ({ caller }) func getAllPricingPlans() : async [PricingPlan] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all pricing plans");
    };
    pricingPlans.values().toArray();
  };

  // ---- Testimonials ----
  public shared ({ caller }) func addTestimonial(input : TestimonialFullInput) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add testimonials");
    };
    let id = if (input.id == 0) {
      let newId = nextTestimonialId;
      nextTestimonialId += 1;
      newId;
    } else { input.id };
    testimonials.add(id, { id; clientName = input.clientName; company = input.company; review = input.review; rating = input.rating; published = input.published });
    id;
  };

  public shared ({ caller }) func deleteTestimonial(testimonialId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete testimonials");
    };
    ignore testimonials.remove(testimonialId);
  };

  public shared ({ caller }) func toggleTestimonialPublished(testimonialId : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can toggle testimonial published status");
    };
    switch (testimonials.get(testimonialId)) {
      case (null) { false };
      case (?t) {
        let updated = { t with published = not t.published };
        testimonials.add(testimonialId, updated);
        updated.published;
      };
    };
  };

  public query ({ caller }) func getPublishedTestimonials() : async [Testimonial] {
    testimonials.values().filter(func(t) { t.published }).toArray();
  };

  public query ({ caller }) func getAllTestimonials() : async [Testimonial] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all testimonials");
    };
    testimonials.values().toArray();
  };

  // ---- FAQs ----
  public shared ({ caller }) func addFAQItem(faq : FAQInput) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add FAQ items");
    };
    let id = nextFAQId;
    nextFAQId += 1;
    faqs.add(id, { id; question = faq.question; answer = faq.answer; published = false });
    id;
  };

  public shared ({ caller }) func deleteFAQItem(faqId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete FAQ items");
    };
    ignore faqs.remove(faqId);
  };

  public shared ({ caller }) func toggleFAQPublished(faqId : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can toggle FAQ published status");
    };
    switch (faqs.get(faqId)) {
      case (null) { false };
      case (?f) {
        let updated = { f with published = not f.published };
        faqs.add(faqId, updated);
        updated.published;
      };
    };
  };

  public query ({ caller }) func getPublishedFAQs() : async [FAQItem] {
    faqs.values().filter(func(f) { f.published }).toArray();
  };

  public query ({ caller }) func getAllFAQs() : async [FAQItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all FAQs");
    };
    faqs.values().toArray();
  };

  // ---- Contact Enquiries ----
  public shared ({ caller }) func submitContactEnquiry(name : Text, email : Text, phone : Text, message : Text, selectedPlan : Text) : async Nat {
    let id = nextContactId;
    nextContactId += 1;
    let storedMessage = if (selectedPlan == "") { message } else {
      selectedPlan # "|||" # message;
    };
    contactEnquiries.add(id, { id; name; email; phone; message = storedMessage; timestamp = Time.now() });
    id;
  };

  public query ({ caller }) func getAllContactEnquiries() : async [ContactEnquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact enquiries");
    };
    contactEnquiries.values().toArray();
  };

  // ---- Office Profile ----
  public shared ({ caller }) func updateOfficeProfile(profile : OfficeProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update office profile");
    };
    officeProfile := profile;
  };

  public query ({ caller }) func getOfficeProfile() : async OfficeProfile { officeProfile };

  // ---- Page Content ----
  public query ({ caller }) func getPageContent(pageId : Text) : async ?PageContent {
    pageContents.get(pageId);
  };

  public shared ({ caller }) func updatePageContent(pageId : Text, content : PageContent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update page content");
    };
    pageContents.add(pageId, { content with pageId });
  };

  public query ({ caller }) func getAllPageContent() : async [(Text, PageContent)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all page content");
    };
    pageContents.entries().toArray();
  };

  // ---- Preset Packages ----
  public shared ({ caller }) func updatePresetPackage(pkg : PresetPackage) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update preset packages");
    };
    presetPackages.add(pkg.id, pkg);
  };

  public query ({ caller }) func getPresetPackages() : async [PresetPackage] {
    presetPackages.values().filter(func(p) { p.enabled }).toArray();
  };

  public query ({ caller }) func getAllPresetPackages() : async [PresetPackage] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all preset packages");
    };
    presetPackages.values().toArray();
  };

  // ---- Reel Pricing ----
  public shared ({ caller }) func updateReelPricing(pricing : ReelPricing) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update reel pricing");
    };
    reelPricing := pricing;
  };

  public query ({ caller }) func getReelPricing() : async ReelPricing { reelPricing };

  // ---- Monthly Package ----
  public shared ({ caller }) func updateMonthlyPackage(pkg : MonthlyPackage) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update monthly package");
    };
    monthlyPackage := pkg;
  };

  public query ({ caller }) func getMonthlyPackage() : async MonthlyPackage { monthlyPackage };

  // ---- Slider Rates ----
  public shared ({ caller }) func updateSliderRates(rates : SliderRates) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update slider rates");
    };
    sliderRates := rates;
  };

  public query ({ caller }) func getSliderRates() : async SliderRates { sliderRates };

  // ---- Site Stats ----
  public shared ({ caller }) func updateSiteStats(stats : SiteStats) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update site stats");
    };
    siteStats := stats;
  };

  public query ({ caller }) func getSiteStats() : async SiteStats { siteStats };

  // ---- Combined queries ----
  public query ({ caller }) func publicCombinedVideosBrands() : async { videos : [PortfolioVideo]; brands : [Brand] } {
    {
      videos = portfolioVideos.values().filter(func(v) { v.published }).toArray();
      brands = brandPartners.values().filter(func(b) { b.published }).toArray();
    };
  };

  public query ({ caller }) func getServicesAndPricing() : async { services : [Service]; pricing : [PricingPlan] } {
    {
      services = services.values().filter(func(s) { s.published }).toArray();
      pricing = pricingPlans.values().filter(func(p) { p.published }).toArray();
    };
  };

  // ---- Seed Data for FullPricingPlans & SeasonOfferSettings ----
  public shared ({ caller }) func fullPricingSeed() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can seed data");
    };
    nextFullPricingPlanId := 1;
    fullPricingPlans.clear();

    let basicServices : [Text] = [
      "3 Days Delivery",
      "7 Video Edits (Reels, Shorts, Videos)",
      "Simple Cuts & Transitions",
      "Color Correction",
      "Background Music",
      "2 Captions + Script Ideas",
      "Posting Guidance",
    ];
    fullPricingPlans.add(1, {
      id = 1;
      name = "BASIC";
      price = 3099;
      offerPrice = 0;
      offerDescription = "";
      planTypeBadge = "";
      services = basicServices;
      deliveryDays = 3;
      videoCount = 7;
      hasSeasonOffer = false;
      enabled = true;
    });

    let standardServices : [Text] = [
      "1 Day Delivery",
      "10 Video Edits (Reels, Shorts, Videos)",
      "Excellent Sound Design",
      "4 Captions + Script Writing",
      "HashTag Strategy",
      "Social Media Handling",
      "Growth Strategy",
      "Bonus: 2 Customer Testimonial Videos for Website + Social Media",
    ];
    fullPricingPlans.add(2, {
      id = 2;
      name = "STANDARD";
      price = 7999;
      offerPrice = 6999;
      offerDescription = "%1%gSave ₹1,000 | Limited Time!%N%N %1%g";
      planTypeBadge = "";
      services = standardServices;
      deliveryDays = 1;
      videoCount = 10;
      hasSeasonOffer = true;
      enabled = true;
    });

    let premiumServices : [Text] = [
      "1 Day Delivery",
      "15 Video Edits (Reels, Shorts, Videos)",
      "Cinematic Editing + Effects",
      "Social Media Management",
      "Branding + Optimization",
      "Priority Delivery",
      "Powerful Sound Design & Optimization",
      "Bonus: 5 Customer Testimonial Videos for Website + YouTube",
    ];
    fullPricingPlans.add(3, {
      id = 3;
      name = "PREMIUM";
      price = 9999;
      offerPrice = 8999;
      offerDescription = "%1%gSave ₹1,000 | Limited Time!%N%N %1%g";
      planTypeBadge = "Most Popular";
      services = premiumServices;
      deliveryDays = 1;
      videoCount = 15;
      hasSeasonOffer = true;
      enabled = true;
    });

    seasonOfferSettings := {
      title = "Season Offer! Limited Time";
      discountAmount = 1000;
      badgeColor = "#31BB31";
      startDate = "2026-03-30";
      endDate = "2026-04-10";
      postOfferWindowDays = 10;
      offerMessage = "Save ₹1,000 on ALL Plans! Limited time offer ends soon!";
      postOfferMessage = "Season offer has ended. Stay tuned for more deals!";
      applicablePlanIds = [1, 2, 3];
    };
  };

  // ---- Seed Data ----
  public shared ({ caller }) func seedData() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can seed data");
    };
    let videoSeeds : [(Text, Text, Text, Text)] = [
      ("Medwin Montage Showreel", "reels", "1176462678", "Cinematic showreel"),
      ("Food Brand Ad Film", "ads", "1176462651", "Ad film for restaurant"),
      ("Event Coverage", "events", "1176462632", "Corporate event coverage"),
      ("Brand Documentary", "YouTube", "1176462602", "Brand story documentary"),
      ("Product Promo Reel", "reels", "1176462586", "Product promotion reel"),
    ];
    for (seed in videoSeeds.values()) {
      let id = nextVideoId;
      nextVideoId += 1;
      portfolioVideos.add(id, { id; title = seed.0; category = seed.1; vimeoId = seed.2; description = seed.3; published = true });
    };

    let brandSeeds : [(Text, Text, Text, Text, Text)] = [
      ("BEEF BOSS THANJAVUR", "food", "Thanjavur", "Popular beef restaurant in Thanjavur", "https://maps.app.goo.gl/KLb5gLXJ9gk5qKmQ8"),
      ("ANAND SALOON THANJAVUR", "retail", "Thanjavur", "Premium salon services", "https://maps.app.goo.gl/KLb5gLXJ9gk5qKmQ8"),
      ("THANJAI CAR ACCESSORIES", "retail", "Thanjavur", "Car accessories and modifications", "https://maps.app.goo.gl/KLb5gLXJ9gk5qKmQ8"),
      ("KOLAPASI RESTAURANT", "food", "Thanjavur", "Authentic Tamil cuisine restaurant", "https://maps.app.goo.gl/KLb5gLXJ9gk5qKmQ8"),
      ("MY THANJAI DIGITAL MARKETING", "retail", "Thanjavur", "Digital marketing agency", "https://maps.app.goo.gl/KLb5gLXJ9gk5qKmQ8"),
      ("ELTO LANDSCAPES", "retail", "Thanjavur", "Landscaping and outdoor design", "https://maps.app.goo.gl/KLb5gLXJ9gk5qKmQ8"),
      ("ABI KOWSA THANJAVUR", "retail", "Thanjavur", "Local business in Thanjavur", "https://maps.app.goo.gl/KLb5gLXJ9gk5qKmQ8"),
    ];
    var bId = 1;
    for (seed in brandSeeds.values()) {
      brandPartners.add(bId, { id = bId; name = seed.0; category = seed.1; location = seed.2; description = seed.3; mapsUrl = seed.4; published = true });
      bId += 1;
    };
    nextBrandId := bId;

    let serviceSeeds : [(Text, Text, [Text])] = [
      ("Video Editing", "Professional video editing for reels, ads, and events", ["Color Grading", "Sound Design", "Motion Graphics", "Fast Delivery"]),
      ("Cinematography", "Professional camera work for all types of shoots", ["Cinematic Shots", "Drone Footage", "Event Coverage", "Product Shoots"]),
      ("Content Creation", "Full content pipeline from concept to publish", ["Script Writing", "Direction", "Social Media Content", "Brand Identity"]),
      ("Digital Marketing", "Grow your brand online with targeted campaigns", ["Social Media Management", "Ad Campaigns", "Analytics", "Growth Strategy"]),
    ];
    var sId = 1;
    for (seed in serviceSeeds.values()) {
      services.add(sId, { id = sId; title = seed.0; description = seed.1; features = seed.2; published = true });
      sId += 1;
    };
    nextServiceId := sId;

    let testSeeds : [(Text, Text, Text, Nat)] = [
      ("Rajesh Kumar", "BEEF BOSS THANJAVUR", "Amazing video work! Our brand engagement skyrocketed after Medwin edited our content.", 5),
      ("Priya Sharma", "KOLAPASI RESTAURANT", "Professional, creative, and always delivers on time. Highly recommended!", 5),
      ("Arun Vijay", "THANJAI CAR ACCESSORIES", "The reels Medwin created for us went viral. Best investment we made!", 5),
      ("Meena Sundar", "Wedding Client", "Our wedding film was absolutely breathtaking. Will cherish it forever.", 5),
    ];
    var tId = 1;
    for (seed in testSeeds.values()) {
      testimonials.add(tId, { id = tId; clientName = seed.0; company = seed.1; review = seed.2; rating = seed.3; published = true });
      tId += 1;
    };
    nextTestimonialId := tId;

    let faqSeeds : [(Text, Text)] = [
      ("How much does a reel cost?", "Editing only starts at Rs.450/video. With camera work it's Rs.900, and full service (editing + content + camera) is Rs.1500."),
      ("What is the monthly package?", "Our monthly package is Rs.8999 and includes 10-12 videos with editing, shooting, content creation, and growth support."),
      ("Do you shoot outside Thanjavur?", "Yes, we travel across Tamil Nadu and South India for shoots."),
      ("What's the delivery time?", "Reels are delivered within 1-3 days. Larger projects typically take 1-2 weeks."),
    ];
    var fId = 1;
    for (seed in faqSeeds.values()) {
      faqs.add(fId, { id = fId; question = seed.0; answer = seed.1; published = true });
      fId += 1;
    };
    nextFAQId := fId;

    // Seed preset packages
    presetPackages.add(1, { id = 1; name = "Basic"; price = 3099; features = ["7 Video Edits (Reels/Shorts/Videos)", "Basic Cuts & Transitions", "Simple Color Correction", "2 Captions + Script Ideas", "Posting Guidance"]; deliveryDays = 3; enabled = true });
    presetPackages.add(2, { id = 2; name = "Standard"; price = 7999; features = ["10 Video Edits (Reels/Shorts/Videos)", "Advanced Color Grading", "Sound Design", "4 Captions + Script Writing", "Hashtag Strategy", "Social Media Handling", "Basic Growth Strategy"]; deliveryDays = 2; enabled = true });
    presetPackages.add(3, { id = 3; name = "Premium"; price = 9999; features = ["15 Video Edits (Reels/Shorts/Videos)", "Shoot Session Included", "Cinematic Editing + Effects", "Pro Sound Design", "Full Content Planning", "Social Media Management", "Branding + Optimization", "Performance Report", "Priority Delivery"]; deliveryDays = 1; enabled = true });
    nextPresetPackageId := 4;
  };

  public shared ({ caller }) func seedPageContent() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can seed data");
    };
    let pages : [PageContent] = [
      {
        pageId = "home";
        heroTitle = "Medwin Montage";
        heroSubtitle = "Crafting Stories, Capturing Moments";
        heroBackgroundImage = "/assets/generated/hero-cinematographer.dim_1920x1080.jpg";
        sections = [
          { id = "services"; heading = "Your Vision, My Edit"; description = "Full-service creative production"; imageUrl = ""; visible = true },
          { id = "featured"; heading = "Featured Work"; description = "A curated selection of recent projects"; imageUrl = ""; visible = true },
          { id = "stats"; heading = "Our Impact"; description = "Numbers that speak for themselves"; imageUrl = ""; visible = true },
          { id = "brands"; heading = "Brands Worked With"; description = "Trusted by leading businesses across Thanjavur"; imageUrl = ""; visible = true },
        ];
      },
      {
        pageId = "about";
        heroTitle = "About Medwin Montage";
        heroSubtitle = "The story behind the lens";
        heroBackgroundImage = "/assets/generated/hero-cinematographer.dim_1920x1080.jpg";
        sections = [
          { id = "story"; heading = "Our Story"; description = "Medwin Montage is a freelance creative studio based in Thanjavur."; imageUrl = ""; visible = true },
          { id = "mission"; heading = "Our Mission"; description = "Crafting visually compelling stories."; imageUrl = ""; visible = true },
          { id = "skills"; heading = "Our Skills"; description = "From pre-production to final delivery."; imageUrl = ""; visible = true },
        ];
      },
      {
        pageId = "portfolio";
        heroTitle = "Portfolio";
        heroSubtitle = "A showcase of our finest cinematic work";
        heroBackgroundImage = "/assets/generated/hero-cinematographer.dim_1920x1080.jpg";
        sections = [
          { id = "reels"; heading = "Reels"; description = "Short-form video content for social media"; imageUrl = ""; visible = true },
          { id = "ads"; heading = "Ads"; description = "Commercial and promotional videos"; imageUrl = ""; visible = true },
          { id = "events"; heading = "Events"; description = "Event coverage and highlights"; imageUrl = ""; visible = true },
          { id = "youtube"; heading = "YouTube Videos"; description = "Long-form YouTube content"; imageUrl = ""; visible = true },
        ];
      },
      {
        pageId = "pricing";
        heroTitle = "Pricing";
        heroSubtitle = "Transparent pricing for every project";
        heroBackgroundImage = "/assets/generated/hero-cinematographer.dim_1920x1080.jpg";
        sections = [
          { id = "presets"; heading = "Preset Packages"; description = "Ready-made packages for every need"; imageUrl = ""; visible = true },
          { id = "reel"; heading = "Per Reel Pricing"; description = "Pay per video with flexible options"; imageUrl = ""; visible = true },
          { id = "monthly"; heading = "Monthly Package"; description = "Best value for consistent content"; imageUrl = ""; visible = true },
          { id = "calculator"; heading = "Price Calculator"; description = "Build your custom package"; imageUrl = ""; visible = true },
        ];
      },
      {
        pageId = "contact";
        heroTitle = "Get in Touch";
        heroSubtitle = "Let us discuss your next creative project";
        heroBackgroundImage = "/assets/generated/hero-cinematographer.dim_1920x1080.jpg";
        sections = [
          { id = "form"; heading = "Send Us a Message"; description = "Fill out the form below"; imageUrl = ""; visible = true },
          { id = "details"; heading = "Contact Details"; description = "Reach us directly"; imageUrl = ""; visible = true },
          { id = "location"; heading = "Our Location"; description = "Visit us in Thanjavur"; imageUrl = ""; visible = true },
        ];
      },
      {
        pageId = "services";
        heroTitle = "Our Services";
        heroSubtitle = "Everything you need for your visual brand";
        heroBackgroundImage = "/assets/generated/hero-cinematographer.dim_1920x1080.jpg";
        sections = [
          { id = "list"; heading = "What We Offer"; description = "Professional creative services"; imageUrl = ""; visible = true },
        ];
      },
      {
        pageId = "digital-marketing";
        heroTitle = "Digital Marketing";
        heroSubtitle = "Grow your brand online";
        heroBackgroundImage = "/assets/generated/hero-cinematographer.dim_1920x1080.jpg";
        sections = [
          { id = "overview"; heading = "Digital Marketing Services"; description = "Full campaign execution"; imageUrl = ""; visible = true },
        ];
      },
      {
        pageId = "content-writing";
        heroTitle = "Content Writing";
        heroSubtitle = "Words that move, persuade, and convert";
        heroBackgroundImage = "/assets/generated/hero-cinematographer.dim_1920x1080.jpg";
        sections = [
          { id = "overview"; heading = "Content Writing Services"; description = "Professional copywriting"; imageUrl = ""; visible = true },
        ];
      },
      {
        pageId = "testimonials";
        heroTitle = "Client Testimonials";
        heroSubtitle = "What our clients say";
        heroBackgroundImage = "/assets/generated/hero-cinematographer.dim_1920x1080.jpg";
        sections = [
          { id = "reviews"; heading = "Client Reviews"; description = "Real feedback from our clients"; imageUrl = ""; visible = true },
        ];
      },
    ];
    for (page in pages.values()) {
      pageContents.add(page.pageId, page);
    };
  };
};
