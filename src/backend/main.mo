import Nat "mo:core/Nat";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

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

  type TestimonialInput = {
    clientName : Text;
    company : Text;
    review : Text;
    rating : Nat;
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

  // State
  var nextVideoId = 1;
  var nextBrandId = 1;
  var nextServiceId = 1;
  var nextPricingPlanId = 1;
  var nextTestimonialId = 1;
  var nextFAQId = 1;
  var nextContactId = 1;
  var nextPresetPackageId = 1;

  let portfolioVideos = Map.empty<Nat, PortfolioVideo>();
  let brandPartners = Map.empty<Nat, Brand>();
  let services = Map.empty<Nat, Service>();
  let pricingPlans = Map.empty<Nat, PricingPlan>();
  let testimonials = Map.empty<Nat, Testimonial>();
  let faqs = Map.empty<Nat, FAQItem>();
  let contactEnquiries = Map.empty<Nat, ContactEnquiry>();
  let pageContents = Map.empty<Text, PageContent>();
  let presetPackages = Map.empty<Nat, PresetPackage>();

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

  // ---- Portfolio Videos ----
  public shared ({ caller }) func addPortfolioVideo(video : VideoInput) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    let id = nextVideoId;
    nextVideoId += 1;
    portfolioVideos.add(id, { id; title = video.title; category = video.category; vimeoId = video.vimeoId; description = video.description; published = false });
    id;
  };

  public shared ({ caller }) func updatePortfolioVideo(video : PortfolioVideoFullInput) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    portfolioVideos.add(video.id, video);
  };

  public shared ({ caller }) func deletePortfolioVideo(videoId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    ignore portfolioVideos.remove(videoId);
  };

  public shared ({ caller }) func toggleVideoPublished(videoId : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    switch (portfolioVideos.get(videoId)) {
      case null Runtime.trap("Not found");
      case (?v) {
        let updated = { v with published = not v.published };
        portfolioVideos.add(videoId, updated);
        updated.published;
      };
    };
  };

  public query func getPublishedVideos() : async [PortfolioVideo] {
    portfolioVideos.values().filter(func(v) { v.published }).toArray();
  };

  public query ({ caller }) func getAllVideos() : async [PortfolioVideo] {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    portfolioVideos.values().toArray();
  };

  public query func getVideosByCategory(category : Text) : async [PortfolioVideo] {
    portfolioVideos.values().filter(func(v) { v.published and v.category == category }).toArray();
  };

  // ---- Brands ----
  public shared ({ caller }) func addBrandPartner(brand : BrandInput) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    let id = nextBrandId;
    nextBrandId += 1;
    brandPartners.add(id, { id; name = brand.name; category = brand.category; location = brand.location; description = brand.description; mapsUrl = brand.mapsUrl; published = false });
    id;
  };

  public shared ({ caller }) func updateBrandPartner(id : Nat, brand : BrandInput) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    switch (brandPartners.get(id)) {
      case null Runtime.trap("Not found");
      case (?b) {
        brandPartners.add(id, { id; name = brand.name; category = brand.category; location = brand.location; description = brand.description; mapsUrl = brand.mapsUrl; published = b.published });
      };
    };
  };

  public shared ({ caller }) func deleteBrandPartner(brandId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    ignore brandPartners.remove(brandId);
  };

  public shared ({ caller }) func toggleBrandPublished(brandId : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    switch (brandPartners.get(brandId)) {
      case null Runtime.trap("Not found");
      case (?b) {
        let updated = { b with published = not b.published };
        brandPartners.add(brandId, updated);
        updated.published;
      };
    };
  };

  public query func getPublishedBrands() : async [Brand] {
    brandPartners.values().filter(func(b) { b.published }).toArray();
  };

  public query func getBrandsByCategory(category : Text) : async [Brand] {
    brandPartners.values().filter(func(b) { b.published and b.category == category }).toArray();
  };

  // ---- Services ----
  public shared ({ caller }) func addService(service : ServiceInput) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    let id = nextServiceId;
    nextServiceId += 1;
    services.add(id, { id; title = service.title; description = service.description; features = service.features; published = false });
    id;
  };

  public shared ({ caller }) func updateService(service : ServiceFullInput) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    services.add(service.id, { id = service.id; title = service.title; description = service.description; features = service.features; published = true });
  };

  public shared ({ caller }) func toggleServicePublished(serviceId : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    switch (services.get(serviceId)) {
      case null Runtime.trap("Not found");
      case (?s) {
        let updated = { s with published = not s.published };
        services.add(serviceId, updated);
        updated.published;
      };
    };
  };

  public query func getPublishedServices() : async [Service] {
    services.values().filter(func(s) { s.published }).toArray();
  };

  // ---- Pricing Plans ----
  public shared ({ caller }) func addPricingPlan(plan : PricingPlanInput) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    let id = nextPricingPlanId;
    nextPricingPlanId += 1;
    pricingPlans.add(id, { id; planLabel = plan.planLabel; price = plan.price; note = plan.note; published = false });
    id;
  };

  public shared ({ caller }) func updatePricingPlan(id : Nat, plan : PricingPlanInput) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    switch (pricingPlans.get(id)) {
      case null Runtime.trap("Not found");
      case (?p) {
        pricingPlans.add(id, { id; planLabel = plan.planLabel; price = plan.price; note = plan.note; published = p.published });
      };
    };
  };

  public shared ({ caller }) func togglePricingPublished(planId : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    switch (pricingPlans.get(planId)) {
      case null Runtime.trap("Not found");
      case (?p) {
        let updated = { p with published = not p.published };
        pricingPlans.add(planId, updated);
        updated.published;
      };
    };
  };

  public query func getPublishedPricingPlans() : async [PricingPlan] {
    pricingPlans.values().filter(func(p) { p.published }).toArray();
  };

  // ---- Testimonials ----
  public shared ({ caller }) func addTestimonial(input : TestimonialInput) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    let id = nextTestimonialId;
    nextTestimonialId += 1;
    testimonials.add(id, { id; clientName = input.clientName; company = input.company; review = input.review; rating = input.rating; published = false });
    id;
  };

  public shared ({ caller }) func deleteTestimonial(testimonialId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    ignore testimonials.remove(testimonialId);
  };

  public shared ({ caller }) func toggleTestimonialPublished(testimonialId : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    switch (testimonials.get(testimonialId)) {
      case null Runtime.trap("Not found");
      case (?t) {
        let updated = { t with published = not t.published };
        testimonials.add(testimonialId, updated);
        updated.published;
      };
    };
  };

  public query func getPublishedTestimonials() : async [Testimonial] {
    testimonials.values().filter(func(t) { t.published }).toArray();
  };

  // ---- FAQs ----
  public shared ({ caller }) func addFAQItem(faq : FAQInput) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    let id = nextFAQId;
    nextFAQId += 1;
    faqs.add(id, { id; question = faq.question; answer = faq.answer; published = false });
    id;
  };

  public shared ({ caller }) func deleteFAQItem(faqId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    ignore faqs.remove(faqId);
  };

  public shared ({ caller }) func toggleFAQPublished(faqId : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    switch (faqs.get(faqId)) {
      case null Runtime.trap("Not found");
      case (?f) {
        let updated = { f with published = not f.published };
        faqs.add(faqId, updated);
        updated.published;
      };
    };
  };

  public query func getPublishedFAQs() : async [FAQItem] {
    faqs.values().filter(func(f) { f.published }).toArray();
  };

  // ---- Contact Enquiries ----
  public shared func submitContactEnquiry(name : Text, email : Text, phone : Text, message : Text, selectedPlan : Text) : async Nat {
    let id = nextContactId;
    nextContactId += 1;
    let storedMessage = if (selectedPlan == "") { message } else { selectedPlan # "|||" # message };
    contactEnquiries.add(id, { id; name; email; phone; message = storedMessage; timestamp = Time.now() });
    id;
  };

  public query ({ caller }) func getAllContactEnquiries() : async [ContactEnquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    contactEnquiries.values().toArray();
  };

  // ---- Office Profile ----
  public shared ({ caller }) func updateOfficeProfile(profile : OfficeProfile) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    officeProfile := profile;
  };

  public query func getOfficeProfile() : async OfficeProfile { officeProfile };

  // ---- Page Content ----
  public query func getPageContent(pageId : Text) : async ?PageContent {
    pageContents.get(pageId);
  };

  public shared ({ caller }) func updatePageContent(pageId : Text, content : PageContent) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    pageContents.add(pageId, { content with pageId });
  };

  public query ({ caller }) func getAllPageContent() : async [(Text, PageContent)] {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    pageContents.entries().toArray();
  };

  // ---- Preset Packages ----
  public shared ({ caller }) func updatePresetPackage(pkg : PresetPackage) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    presetPackages.add(pkg.id, pkg);
  };

  public query func getPresetPackages() : async [PresetPackage] {
    presetPackages.values().filter(func(p) { p.enabled }).toArray();
  };

  public query ({ caller }) func getAllPresetPackages() : async [PresetPackage] {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    presetPackages.values().toArray();
  };

  // ---- Reel Pricing ----
  public shared ({ caller }) func updateReelPricing(pricing : ReelPricing) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    reelPricing := pricing;
  };

  public query func getReelPricing() : async ReelPricing { reelPricing };

  // ---- Monthly Package ----
  public shared ({ caller }) func updateMonthlyPackage(pkg : MonthlyPackage) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    monthlyPackage := pkg;
  };

  public query func getMonthlyPackage() : async MonthlyPackage { monthlyPackage };

  // ---- Slider Rates ----
  public shared ({ caller }) func updateSliderRates(rates : SliderRates) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    sliderRates := rates;
  };

  public query func getSliderRates() : async SliderRates { sliderRates };

  // ---- Site Stats ----
  public shared ({ caller }) func updateSiteStats(stats : SiteStats) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
    siteStats := stats;
  };

  public query func getSiteStats() : async SiteStats { siteStats };

  // ---- Combined queries ----
  public query func publicCombinedVideosBrands() : async { videos : [PortfolioVideo]; brands : [Brand] } {
    {
      videos = portfolioVideos.values().filter(func(v) { v.published }).toArray();
      brands = brandPartners.values().filter(func(b) { b.published }).toArray();
    };
  };

  public query func getServicesAndPricing() : async { services : [Service]; pricing : [PricingPlan] } {
    {
      services = services.values().filter(func(s) { s.published }).toArray();
      pricing = pricingPlans.values().filter(func(p) { p.published }).toArray();
    };
  };

  // ---- Seed Data ----
  public shared ({ caller }) func seedData() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");

    let videoSeeds : [(Text, Text, Text, Text)] = [
      ("Medwin Montage Showreel", "reels", "1176462678", "Cinematic showreel"),
      ("Food Brand Ad Film", "ads", "1176462651", "Ad film for restaurant"),
      ("Event Coverage", "events", "1176462632", "Corporate event coverage"),
      ("Brand Documentary", "youtube", "1176462602", "Brand story documentary"),
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
      ("How much does a reel cost?", "Editing only starts at ₹450/video. With camera work it's ₹900, and full service (editing + content + camera) is ₹1500."),
      ("What is the monthly package?", "Our monthly package is ₹8999 and includes 10-12 videos with editing, shooting, content creation, and growth support."),
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
    presetPackages.add(1, { id = 1; name = "Basic"; price = 3099; features = ["6 Video Edits (Reels/Shorts)", "Basic Cuts & Transitions", "Simple Color Correction", "2 Captions + Script Ideas", "Posting Guidance"]; deliveryDays = 4; enabled = true });
    presetPackages.add(2, { id = 2; name = "Standard"; price = 7999; features = ["10 Video Edits (Reels/Shorts/Videos)", "Advanced Color Grading", "Sound Design", "4 Captions + Script Writing", "Hashtag Strategy", "1 Week Social Media Handling", "Basic Growth Strategy"]; deliveryDays = 2; enabled = true });
    presetPackages.add(3, { id = 3; name = "Premium"; price = 9999; features = ["18 Video Edits", "Shoot Session Included", "Cinematic Editing + Effects", "Pro Sound Design", "Full Content Planning", "Social Media Management", "Branding + Optimization", "Performance Report", "Priority Delivery"]; deliveryDays = 1; enabled = true });
    nextPresetPackageId := 4;
  };

  public shared ({ caller }) func seedPageContent() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) Runtime.trap("Unauthorized");
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
