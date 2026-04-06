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

  // ---- Existing Types ----

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

  // ---- NEW: Per-Page Rich Content Types ----

  type ServiceCard = {
    itemLabel : Text;
    desc : Text;
  };

  type HomePageContent = {
    heroTitle : Text;
    heroSubtitle : Text;
    heroAccent : Text;
    heroBackgroundImage : Text;
    serviceCards : [ServiceCard];
    ctaTagline : Text;
    ctaButtonLabel : Text;
    ctaButtonLink : Text;
  };

  type SkillItem = {
    itemLabel : Text;
    level : Nat;
  };

  type MilestoneItem = {
    year : Text;
    event : Text;
  };

  type UspItem = {
    title : Text;
    desc : Text;
  };

  type AboutPageContent = {
    heroTitle : Text;
    heroSubtitle : Text;
    heroAccent : Text;
    heroBackgroundImage : Text;
    introHeading : Text;
    introParagraph1 : Text;
    introParagraph2 : Text;
    introTags : [Text];
    aboutImageUrl : Text;
    skills : [SkillItem];
    milestones : [MilestoneItem];
    usps : [UspItem];
    ctaHeading : Text;
    ctaBody : Text;
    ctaButtonLabel : Text;
    ctaButtonLink : Text;
  };

  type ServiceCardFull = {
    title : Text;
    desc : Text;
    features : [Text];
  };

  type PricingItem = {
    itemLabel : Text;
    price : Text;
    note : Text;
  };

  type ServicesPageContent = {
    heroTitle : Text;
    heroSubtitle : Text;
    heroAccent : Text;
    heroBackgroundImage : Text;
    serviceCards : [ServiceCardFull];
    pricingItems : [PricingItem];
  };

  type AreaItem = {
    title : Text;
    desc : Text;
    deliverables : [Text];
  };

  type DigitalMarketingPageContent = {
    heroTitle : Text;
    heroSubtitle : Text;
    heroAccent : Text;
    heroBackgroundImage : Text;
    areas : [AreaItem];
    ctaHeading : Text;
    ctaBody : Text;
    ctaButtonLabel : Text;
    ctaButtonLink : Text;
  };

  type ContentAreaItem = {
    title : Text;
    desc : Text;
    types : [Text];
  };

  type ContentWritingPageContent = {
    heroTitle : Text;
    heroSubtitle : Text;
    heroAccent : Text;
    heroBackgroundImage : Text;
    areas : [ContentAreaItem];
    ctaHeading : Text;
    ctaBody : Text;
    ctaButtonLabel : Text;
    ctaButtonLink : Text;
  };

  type TestimonialsPageContent = {
    heroTitle : Text;
    heroSubtitle : Text;
    heroAccent : Text;
    heroBackgroundImage : Text;
    ctaHeading : Text;
    ctaBody : Text;
    ctaButtonLabel : Text;
    ctaButtonLink : Text;
  };

  type ContactPageContent = {
    heroTitle : Text;
    heroSubtitle : Text;
    heroAccent : Text;
    heroBackgroundImage : Text;
  };

  type PortfolioPageContent = {
    heroTitle : Text;
    heroSubtitle : Text;
    heroAccent : Text;
    heroBackgroundImage : Text;
  };

  type PricingPageContent = {
    heroTitle : Text;
    heroSubtitle : Text;
    heroAccent : Text;
    heroBackgroundImage : Text;
    choosePlanHeading : Text;
    choosePlanSubtext : Text;
  };

  // ---- State ----
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

  // ---- Per-page content stable vars (always initialized with defaults) ----

  var homePageContent : HomePageContent = {
    heroTitle = "Freelancers · Tamilnadu";
    heroSubtitle = "Crafting Stories, Capturing Moments";
    heroAccent = "Creative Studio";
    heroBackgroundImage = "/assets/generated/bg-home.dim_1920x1080.jpg";
    serviceCards = [
      { itemLabel = "Video Editing"; desc = "Professional cuts, color grading & post-production" },
      { itemLabel = "Cinematography"; desc = "Cinematic shoots with professional equipment" },
      { itemLabel = "Content Creation"; desc = "Reels, shorts & social media content" },
      { itemLabel = "Digital Marketing"; desc = "Brand growth & campaign management" },
      { itemLabel = "Script Writing"; desc = "Compelling scripts for any format" },
    ];
    ctaTagline = "Ready to elevate your brand?";
    ctaButtonLabel = "Get In Touch";
    ctaButtonLink = "https://wa.me/919487897160";
  };

  var aboutPageContent : AboutPageContent = {
    heroTitle = "About Medwin Montage";
    heroSubtitle = "A creative studio built on passion, precision, and storytelling.";
    heroAccent = "Who We Are";
    heroBackgroundImage = "/assets/generated/bg-about.dim_1920x1080.jpg";
    introHeading = "Who I Am";
    introParagraph1 = "Medwin Montage began with a passion for storytelling and visual creativity, growing from simple edits into a full-service creative brand delivering high-quality videos, reels, and digital marketing solutions for modern businesses and creators.";
    introParagraph2 = "With years of hands-on experience behind the lens and at the editing desk, I bring a unique blend of technical mastery and creative vision to every project — ensuring your brand's story is told the way it deserves to be.";
    introTags = ["Video Editing", "Cinematography", "Motion Graphics", "Digital Marketing", "Content Strategy"];
    aboutImageUrl = "/assets/generated/about-bts.dim_1200x600.jpg";
    skills = [
      { itemLabel = "Video Editing"; level = 95 },
      { itemLabel = "Color Grading"; level = 90 },
      { itemLabel = "Cinematography"; level = 88 },
      { itemLabel = "Motion Graphics"; level = 80 },
      { itemLabel = "Social Media"; level = 92 },
      { itemLabel = "Digital Marketing"; level = 85 },
      { itemLabel = "Script Writing"; level = 82 },
    ];
    milestones = [
      { year = "2020"; event = "Founded Medwin Montage in Thanjavur" },
      { year = "2021"; event = "First 10 client brands onboarded" },
      { year = "2022"; event = "Expanded to full cinematography services" },
      { year = "2023"; event = "1M+ views generated for clients" },
      { year = "2024"; event = "3M+ views, 15+ happy clients" },
    ];
    usps = [
      { title = "Premium Quality"; desc = "Every frame is crafted with cinematic precision and an eye for detail." },
      { title = "Full-Service Studio"; desc = "From shoot to final delivery — one team, zero compromise." },
      { title = "Client-Centered"; desc = "Your vision leads the process. Revisions until you're 100% satisfied." },
      { title = "On-Time Delivery"; desc = "Consistent, reliable turnaround. Your deadlines are our deadlines." },
    ];
    ctaHeading = "Ready to Tell Your Story?";
    ctaBody = "Let's create something unforgettable together.";
    ctaButtonLabel = "Get In Touch";
    ctaButtonLink = "https://wa.me/919487897160";
  };

  var servicesPageContent : ServicesPageContent = {
    heroTitle = "Our Services";
    heroSubtitle = "End-to-end creative production services tailored to your brand's needs";
    heroAccent = "What We Offer";
    heroBackgroundImage = "/assets/generated/bg-services.dim_1920x1080.jpg";
    serviceCards = [
      { title = "Video Editing"; desc = "Professional post-production with color grading, sound design, motion graphics, and seamless cuts."; features = ["Color grading & correction", "Sound design & mixing", "Motion graphics & titles", "Multi-camera editing"] },
      { title = "Cinematic Shooting"; desc = "On-location or studio cinematography using professional camera, drone, and gimbal stabilizer."; features = ["Professional camera kit", "Drone aerial footage", "Gimbal stabilized shots", "Studio & location shoots"] },
      { title = "Social Media Content"; desc = "Platform-optimized short-form content: Instagram Reels, YouTube Shorts, TikTok, and Facebook."; features = ["Instagram Reels", "YouTube Shorts", "TikTok content", "Story templates"] },
      { title = "Digital Marketing"; desc = "Full-funnel digital marketing: paid ads, organic growth strategies, brand positioning, and analytics."; features = ["Meta & Google Ads", "Brand strategy", "Analytics & reporting", "Campaign management"] },
      { title = "Script & Content Writing"; desc = "Compelling scripts for reels, ads, YouTube, and brand films. Creative captions and long-form brand storytelling."; features = ["Ad scripts", "YouTube scripts", "Caption writing", "Brand storytelling"] },
      { title = "YouTube & Instagram Growth"; desc = "Channel strategy, content calendar, SEO optimization, and consistent posting to build an engaged audience."; features = ["Channel strategy", "Content calendar", "SEO optimization", "Thumbnail design"] },
    ];
    pricingItems = [
      { itemLabel = "Per 1-2 min video"; price = "₹500"; note = "Full production" },
      { itemLabel = "Editing only"; price = "₹400"; note = "Per video" },
      { itemLabel = "Editing + Camera + Content"; price = "₹1,200"; note = "Complete package" },
    ];
  };

  var digitalMarketingPageContent : DigitalMarketingPageContent = {
    heroTitle = "Digital Marketing";
    heroSubtitle = "Data-driven marketing strategies to amplify your brand's digital presence";
    heroAccent = "Grow Your Brand";
    heroBackgroundImage = "/assets/generated/bg-digital-marketing.dim_1920x1080.jpg";
    areas = [
      { title = "Social Media Management"; desc = "Complete management of your brand's social media presence across Instagram, Facebook, YouTube and more."; deliverables = ["Daily/weekly post scheduling", "Engagement & community management", "Performance analytics", "Competitor analysis"] },
      { title = "Ad Campaign Creation"; desc = "Strategic paid advertising campaigns on Meta, Google, and YouTube — designed to convert, not just impress."; deliverables = ["Ad creative design", "Audience targeting", "A/B testing", "ROI reporting"] },
      { title = "Brand Promotion Strategies"; desc = "Customized brand positioning and promotion strategies that set you apart from competitors."; deliverables = ["Brand identity audit", "Market positioning", "Content strategy", "Influencer outreach"] },
      { title = "Content Planning"; desc = "30/60/90-day content calendars aligned with your campaigns, seasons, and business goals."; deliverables = ["Monthly content calendar", "Theme & campaign ideation", "Caption & hashtag strategy", "Platform-specific optimization"] },
    ];
    ctaHeading = "Ready to Grow Your Brand?";
    ctaBody = "Let's craft a digital marketing strategy that converts visitors into loyal customers.";
    ctaButtonLabel = "Get a Free Consultation";
    ctaButtonLink = "https://wa.me/919487897160";
  };

  var contentWritingPageContent : ContentWritingPageContent = {
    heroTitle = "Content Writing";
    heroSubtitle = "Words that work — scripts, captions, and stories that move your audience";
    heroAccent = "Storytelling";
    heroBackgroundImage = "/assets/generated/bg-content-writing.dim_1920x1080.jpg";
    areas = [
      { title = "Script Writing"; desc = "Compelling scripts for Reels, YouTube videos, ads, and brand films. Every word chosen to captivate and convert."; types = ["Instagram Reel scripts", "YouTube video scripts", "Ad scripts (15s, 30s, 60s)", "Brand film narratives"] },
      { title = "Caption Writing"; desc = "Platform-native captions that drive engagement, reflect your brand voice, and include strategic hashtag research."; types = ["Instagram captions", "LinkedIn posts", "Facebook content", "Hashtag strategies"] },
      { title = "Creative Content Creation"; desc = "Original content ideas that break through the noise — trend-driven yet timeless for your brand."; types = ["Content ideation", "Trending format adaptation", "Series concepts", "Campaign themes"] },
      { title = "Brand Storytelling"; desc = "Long-form and short-form narratives that define your brand identity and connect emotionally with your audience."; types = ["Brand origin stories", "Founder narratives", "Product storytelling", "Customer journey content"] },
    ];
    ctaHeading = "Your Story, Perfectly Told";
    ctaBody = "Every brand has a unique story. Let us craft yours with words that resonate, engage, and convert.";
    ctaButtonLabel = "Start Writing Together";
    ctaButtonLink = "mailto:medwinmontage@gmail.com";
  };

  var testimonialsPageContent : TestimonialsPageContent = {
    heroTitle = "Client Testimonials";
    heroSubtitle = "Stories of success from the brands we've helped grow";
    heroAccent = "What Clients Say";
    heroBackgroundImage = "/assets/generated/bg-testimonials.dim_1920x1080.jpg";
    ctaHeading = "Ready to Join Our Happy Clients?";
    ctaBody = "Let's create content that speaks for itself.";
    ctaButtonLabel = "Start Your Project";
    ctaButtonLink = "https://wa.me/919487897160";
  };

  var contactPageContent : ContactPageContent = {
    heroTitle = "Get in Touch";
    heroSubtitle = "Let us discuss your next creative project";
    heroAccent = "Contact Us";
    heroBackgroundImage = "/assets/generated/bg-contact.dim_1920x1080.jpg";
  };

  var portfolioPageContent : PortfolioPageContent = {
    heroTitle = "Portfolio";
    heroSubtitle = "A showcase of our finest cinematic work";
    heroAccent = "Featured Work";
    heroBackgroundImage = "/assets/generated/bg-portfolio.dim_1920x1080.jpg";
  };

  var pricingPageContent : PricingPageContent = {
    heroTitle = "Pricing";
    heroSubtitle = "Transparent pricing for every project";
    heroAccent = "Choose Your Plan";
    heroBackgroundImage = "/assets/generated/bg-pricing.dim_1920x1080.jpg";
    choosePlanHeading = "Choose Your Plan";
    choosePlanSubtext = "🎉 Season Offer — Save ₹1,000 on Standard & Premium! Offer ends April 10th.";
  };

  // ---- Per-page content queries ----

  public query func getHomePageContent() : async HomePageContent { homePageContent };
  public shared ({ caller }) func updateHomePageContent(content : HomePageContent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized");
    };
    homePageContent := content;
  };

  public query func getAboutPageContent() : async AboutPageContent { aboutPageContent };
  public shared ({ caller }) func updateAboutPageContent(content : AboutPageContent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized");
    };
    aboutPageContent := content;
  };

  public query func getServicesPageContent() : async ServicesPageContent { servicesPageContent };
  public shared ({ caller }) func updateServicesPageContent(content : ServicesPageContent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized");
    };
    servicesPageContent := content;
  };

  public query func getDigitalMarketingPageContent() : async DigitalMarketingPageContent { digitalMarketingPageContent };
  public shared ({ caller }) func updateDigitalMarketingPageContent(content : DigitalMarketingPageContent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized");
    };
    digitalMarketingPageContent := content;
  };

  public query func getContentWritingPageContent() : async ContentWritingPageContent { contentWritingPageContent };
  public shared ({ caller }) func updateContentWritingPageContent(content : ContentWritingPageContent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized");
    };
    contentWritingPageContent := content;
  };

  public query func getTestimonialsPageContent() : async TestimonialsPageContent { testimonialsPageContent };
  public shared ({ caller }) func updateTestimonialsPageContent(content : TestimonialsPageContent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized");
    };
    testimonialsPageContent := content;
  };

  public query func getContactPageContent() : async ContactPageContent { contactPageContent };
  public shared ({ caller }) func updateContactPageContent(content : ContactPageContent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized");
    };
    contactPageContent := content;
  };

  public query func getPortfolioPageContent() : async PortfolioPageContent { portfolioPageContent };
  public shared ({ caller }) func updatePortfolioPageContent(content : PortfolioPageContent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized");
    };
    portfolioPageContent := content;
  };

  public query func getPricingPageContent() : async PricingPageContent { pricingPageContent };
  public shared ({ caller }) func updatePricingPageContent(content : PricingPageContent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized");
    };
    pricingPageContent := content;
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

  public query func getEnabledFullPricingPlans() : async [FullPricingPlan] {
    fullPricingPlans.values().filter(func(p) { p.enabled }).toArray();
  };

  // ---- Season Offer Settings ----
  public shared ({ caller }) func updateSeasonOfferSettings(settings : SeasonOfferSettings) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update season offer settings");
    };
    seasonOfferSettings := settings;
  };

  public query func getSeasonOfferSettings() : async SeasonOfferSettings { seasonOfferSettings };

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

  public query func getPublishedVideos() : async [PortfolioVideo] {
    portfolioVideos.values().filter(func(v) { v.published }).toArray();
  };

  public query ({ caller }) func getAllVideos() : async [PortfolioVideo] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all videos");
    };
    portfolioVideos.values().toArray();
  };

  public query func getVideosByCategory(category : Text) : async [PortfolioVideo] {
    portfolioVideos.values().filter(func(v) { v.published and v.category == category }).toArray();
  };

  public query func getVideoById(videoId : Nat) : async ?PortfolioVideo {
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

  public query func getPublishedBrands() : async [Brand] {
    brandPartners.values().filter(func(b) { b.published }).toArray();
  };

  public query ({ caller }) func getAllBrands() : async [Brand] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all brands");
    };
    brandPartners.values().toArray();
  };

  public query func getBrandsByCategory(category : Text) : async [Brand] {
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

  public query func getPublishedServices() : async [Service] {
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

  public query func getPublishedPricingPlans() : async [PricingPlan] {
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

  public query func getPublishedTestimonials() : async [Testimonial] {
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

  public query func getPublishedFAQs() : async [FAQItem] {
    faqs.values().filter(func(f) { f.published }).toArray();
  };

  public query ({ caller }) func getAllFAQs() : async [FAQItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all FAQs");
    };
    faqs.values().toArray();
  };

  // ---- Contact Enquiries ----
  public shared func submitContactEnquiry(name : Text, email : Text, phone : Text, message : Text, selectedPlan : Text) : async Nat {
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

  public query func getOfficeProfile() : async OfficeProfile { officeProfile };

  // ---- Legacy Page Content (kept for backward compatibility) ----
  public query func getPageContent(pageId : Text) : async ?PageContent {
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

  public query func getPresetPackages() : async [PresetPackage] {
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

  public query func getReelPricing() : async ReelPricing { reelPricing };

  // ---- Monthly Package ----
  public shared ({ caller }) func updateMonthlyPackage(pkg : MonthlyPackage) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update monthly package");
    };
    monthlyPackage := pkg;
  };

  public query func getMonthlyPackage() : async MonthlyPackage { monthlyPackage };

  // ---- Slider Rates ----
  public shared ({ caller }) func updateSliderRates(rates : SliderRates) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update slider rates");
    };
    sliderRates := rates;
  };

  public query func getSliderRates() : async SliderRates { sliderRates };

  // ---- Site Stats ----
  public shared ({ caller }) func updateSiteStats(stats : SiteStats) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update site stats");
    };
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

    presetPackages.add(1, { id = 1; name = "Basic"; price = 3099; features = ["7 Video Edits (Reels/Shorts/Videos)", "Basic Cuts & Transitions", "Simple Color Correction", "2 Captions + Script Ideas", "Posting Guidance"]; deliveryDays = 3; enabled = true });
    presetPackages.add(2, { id = 2; name = "Standard"; price = 7999; features = ["10 Video Edits (Reels/Shorts/Videos)", "Advanced Color Grading", "Sound Design", "4 Captions + Script Writing", "Hashtag Strategy", "Social Media Handling", "Basic Growth Strategy"]; deliveryDays = 2; enabled = true });
    presetPackages.add(3, { id = 3; name = "Premium"; price = 9999; features = ["15 Video Edits (Reels/Shorts/Videos)", "Shoot Session Included", "Cinematic Editing + Effects", "Pro Sound Design", "Full Content Planning", "Social Media Management", "Branding + Optimization", "Performance Report", "Priority Delivery"]; deliveryDays = 1; enabled = true });
    nextPresetPackageId := 4;
  };

  public shared ({ caller }) func seedPageContent() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can seed data");
    };
    // Legacy seed - now page content is always initialized with defaults above
    // This function is kept for backward compatibility
  };

};
