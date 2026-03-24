import Map "mo:core/Map";
import Time "mo:core/Time";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Text "mo:core/Text";

module {
  type OldContactFormSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type OldFAQItem = {
    question : Text;
    answer : Text;
  };

  type OldTestimonial = {
    clientName : Text;
    company : Text;
    review : Text;
    rating : Nat;
  };

  type OldActor = {
    contactFormSubmissions : List.List<OldContactFormSubmission>;
    faqItems : List.List<OldFAQItem>;
    testimonials : List.List<OldTestimonial>;
  };

  public type PortfolioVideo = {
    id : Nat;
    title : Text;
    category : Text;
    vimeoId : Text;
    description : Text;
    published : Bool;
  };

  public type Brand = {
    id : Nat;
    name : Text;
    category : Text;
    location : Text;
    description : Text;
    mapsUrl : Text;
    published : Bool;
  };

  public type Service = {
    id : Nat;
    title : Text;
    description : Text;
    features : [Text];
    published : Bool;
  };

  public type PricingPlan = {
    id : Nat;
    planLabel : Text;
    price : Nat;
    note : Text;
    published : Bool;
  };

  public type Testimonial = {
    id : Nat;
    clientName : Text;
    company : Text;
    review : Text;
    rating : Nat;
    published : Bool;
  };

  public type FAQItem = {
    id : Nat;
    question : Text;
    answer : Text;
    published : Bool;
  };

  public type ContactEnquiry = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  public type OfficeProfile = {
    email : Text;
    phone : Text;
    whatsapp : Text;
    address : Text;
    city : Text;
    mapsUrl : Text;
  };

  public type NewActor = {
    nextVideoId : Nat;
    nextBrandId : Nat;
    nextServiceId : Nat;
    nextPricingPlanId : Nat;
    nextTestimonialId : Nat;
    nextFAQId : Nat;
    nextContactId : Nat;
    portfolioVideos : Map.Map<Nat, PortfolioVideo>;
    brandPartners : Map.Map<Nat, Brand>;
    services : Map.Map<Nat, Service>;
    pricingPlans : Map.Map<Nat, PricingPlan>;
    testimonials : Map.Map<Nat, Testimonial>;
    faqs : Map.Map<Nat, FAQItem>;
    contactEnquiries : Map.Map<Nat, ContactEnquiry>;
    officeProfile : OfficeProfile;
  };

  public func run(old : OldActor) : NewActor {
    let defaultVideoId = 1;
    let defaultBrandId = 1;
    let defaultServiceId = 1;
    let defaultPricingPlanId = 1;
    let defaultTestimonialId = 1;
    let defaultFAQId = 1;
    let defaultContactId = 1;

    let emptyPortfolioVideos = Map.empty<Nat, PortfolioVideo>();
    let emptyBrandPartners = Map.empty<Nat, Brand>();
    let emptyServices = Map.empty<Nat, Service>();
    let emptyPricingPlans = Map.empty<Nat, PricingPlan>();
    let emptyTestimonials = Map.empty<Nat, Testimonial>();
    let emptyFAQs = Map.empty<Nat, FAQItem>();
    let emptyContactEnquiries = Map.empty<Nat, ContactEnquiry>();

    let defaultOfficeProfile : OfficeProfile = {
      email = "medwinmontage@gmail.com";
      phone = "+91 9487897160";
      whatsapp = "919487897160";
      address = "Thanjavur, Tamil Nadu, India";
      city = "Thanjavur";
      mapsUrl = "https://maps.app.goo.gl/KLb5gLXJ9gk5qKmQ8";
    };

    {
      nextVideoId = defaultVideoId;
      nextBrandId = defaultBrandId;
      nextServiceId = defaultServiceId;
      nextPricingPlanId = defaultPricingPlanId;
      nextTestimonialId = defaultTestimonialId;
      nextFAQId = defaultFAQId;
      nextContactId = defaultContactId;
      portfolioVideos = emptyPortfolioVideos;
      brandPartners = emptyBrandPartners;
      services = emptyServices;
      pricingPlans = emptyPricingPlans;
      testimonials = emptyTestimonials;
      faqs = emptyFAQs;
      contactEnquiries = emptyContactEnquiries;
      officeProfile = defaultOfficeProfile;
    };
  };
};
