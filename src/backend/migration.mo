import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";

module {
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

  type OldActor = {
    nextVideoId : Nat;
    nextBrandId : Nat;
    nextServiceId : Nat;
    nextPricingPlanId : Nat;
    nextTestimonialId : Nat;
    nextFAQId : Nat;
    nextContactId : Nat;
    nextPresetPackageId : Nat;
    portfolioVideos : Map.Map<Nat, PortfolioVideo>;
    brandPartners : Map.Map<Nat, Brand>;
    services : Map.Map<Nat, Service>;
    pricingPlans : Map.Map<Nat, PricingPlan>;
    testimonials : Map.Map<Nat, Testimonial>;
    faqs : Map.Map<Nat, FAQItem>;
    contactEnquiries : Map.Map<Nat, ContactEnquiry>;
    pageContents : Map.Map<Text, PageContent>;
    presetPackages : Map.Map<Nat, PresetPackage>;
    officeProfile : OfficeProfile;
    reelPricing : ReelPricing;
    monthlyPackage : MonthlyPackage;
    sliderRates : SliderRates;
    siteStats : SiteStats;
  };

  type NewActor = {
    nextVideoId : Nat;
    nextBrandId : Nat;
    nextServiceId : Nat;
    nextPricingPlanId : Nat;
    nextTestimonialId : Nat;
    nextFAQId : Nat;
    nextContactId : Nat;
    nextPresetPackageId : Nat;
    portfolioVideos : Map.Map<Nat, PortfolioVideo>;
    brandPartners : Map.Map<Nat, Brand>;
    services : Map.Map<Nat, Service>;
    pricingPlans : Map.Map<Nat, PricingPlan>;
    testimonials : Map.Map<Nat, Testimonial>;
    faqs : Map.Map<Nat, FAQItem>;
    contactEnquiries : Map.Map<Nat, ContactEnquiry>;
    pageContents : Map.Map<Text, PageContent>;
    presetPackages : Map.Map<Nat, PresetPackage>;
    officeProfile : OfficeProfile;
    reelPricing : ReelPricing;
    monthlyPackage : MonthlyPackage;
    sliderRates : SliderRates;
    siteStats : SiteStats;
    nextFullPricingPlanId : Nat;
    fullPricingPlans : Map.Map<Nat, FullPricingPlan>;
    seasonOfferSettings : SeasonOfferSettings;
  };

  public func run(old : OldActor) : NewActor {
    {
      old with
      nextFullPricingPlanId = 1;
      fullPricingPlans = Map.empty<Nat, FullPricingPlan>();
      seasonOfferSettings = {
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
  };
};
