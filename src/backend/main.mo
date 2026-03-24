import Nat "mo:core/Nat";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Migration "migration";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Specify upgrade migration with migration module
(with migration = Migration.run)
actor {
  // Include authorization mixin, providing access control methods
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

  // Persistent storage
  var nextVideoId = 1;
  var nextBrandId = 1;
  var nextServiceId = 1;
  var nextPricingPlanId = 1;
  var nextTestimonialId = 1;
  var nextFAQId = 1;
  var nextContactId = 1;

  let portfolioVideos = Map.empty<Nat, PortfolioVideo>();
  let brandPartners = Map.empty<Nat, Brand>();
  let services = Map.empty<Nat, Service>();
  let pricingPlans = Map.empty<Nat, PricingPlan>();
  let testimonials = Map.empty<Nat, Testimonial>();
  let faqs = Map.empty<Nat, FAQItem>();
  let contactEnquiries = Map.empty<Nat, ContactEnquiry>();

  var officeProfile : OfficeProfile = {
    email = "medwinmontage@gmail.com";
    phone = "+91 9487897160";
    whatsapp = "919487897160";
    address = "Thanjavur, Tamil Nadu, India";
    city = "Thanjavur";
    mapsUrl = "https://maps.app.goo.gl/KLb5gLXJ9gk5qKmQ8";
  };

  // Helper function to check admin access
  func assertAdmin(caller : Principal) {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };
  };

  // Portfolio Videos
  public shared ({ caller }) func addPortfolioVideo(video : VideoInput) : async Nat {
    assertAdmin(caller);
    let id = nextVideoId;
    nextVideoId += 1;

    let newVideo : PortfolioVideo = {
      id;
      title = video.title;
      category = video.category;
      vimeoId = video.vimeoId;
      description = video.description;
      published = false;
    };

    portfolioVideos.add(id, newVideo);
    id;
  };

  public shared ({ caller }) func updatePortfolioVideo(video : PortfolioVideoFullInput) : async () {
    assertAdmin(caller);
    portfolioVideos.add(video.id, video);
  };

  public shared ({ caller }) func toggleVideoPublished(videoId : Nat) : async Bool {
    assertAdmin(caller);
    switch (portfolioVideos.get(videoId)) {
      case (null) { Runtime.trap("Video not found") };
      case (?video) {
        let updatedVideo = { video with published = not video.published };
        portfolioVideos.add(videoId, updatedVideo);
        updatedVideo.published;
      };
    };
  };

  public query ({ caller }) func getPublishedVideos() : async [PortfolioVideo] {
    portfolioVideos.values().filter(func(video) { video.published }).toArray();
  };

  public query ({ caller }) func getAllVideos() : async [PortfolioVideo] {
    assertAdmin(caller);
    portfolioVideos.values().toArray();
  };

  public query ({ caller }) func getVideosByCategory(category : Text) : async [PortfolioVideo] {
    portfolioVideos.values().filter(func(video) { video.published and video.category == category }).toArray();
  };

  public query ({ caller }) func getVideoById(videoId : Nat) : async ?PortfolioVideo {
    switch (portfolioVideos.get(videoId)) {
      case (null) { null };
      case (?video) {
        // Only return if published OR caller is admin
        if (video.published or AccessControl.isAdmin(accessControlState, caller)) {
          ?video;
        } else {
          null;
        };
      };
    };
  };

  // Brand Partners
  func assertBrandCategory(category : Text) {
    if (category != "food" and category != "retail" and category != "cafe" and category != "healthcare" and category != "school" and category != "mineral" and category != "hotel") {
      Runtime.trap("Invalid brand category. Allowed values: food, retail, cafe, healthcare, school, mineral, hotel");
    };
  };

  public shared ({ caller }) func addBrandPartner(brand : BrandInput) : async Nat {
    assertAdmin(caller);
    assertBrandCategory(brand.category);
    let id = nextBrandId;
    nextBrandId += 1;

    let newBrand : Brand = {
      id;
      name = brand.name;
      category = brand.category;
      location = brand.location;
      description = brand.description;
      mapsUrl = brand.mapsUrl;
      published = false;
    };

    brandPartners.add(id, newBrand);
    id;
  };

  public shared ({ caller }) func updateBrandPartner(id : Nat, brand : BrandInput) : async () {
    assertAdmin(caller);
    assertBrandCategory(brand.category);

    switch (brandPartners.get(id)) {
      case (null) { Runtime.trap("Brand partner not found") };
      case (?existingBrand) {
        let updatedBrand : Brand = {
          id;
          name = brand.name;
          category = brand.category;
          location = brand.location;
          description = brand.description;
          mapsUrl = brand.mapsUrl;
          published = existingBrand.published;
        };
        brandPartners.add(id, updatedBrand);
      };
    };
  };

  public shared ({ caller }) func toggleBrandPublished(brandId : Nat) : async Bool {
    assertAdmin(caller);
    switch (brandPartners.get(brandId)) {
      case (null) { Runtime.trap("Brand not found") };
      case (?brand) {
        let updatedBrand = { brand with published = not brand.published };
        brandPartners.add(brandId, updatedBrand);
        updatedBrand.published;
      };
    };
  };

  public query ({ caller }) func getPublishedBrands() : async [Brand] {
    brandPartners.values().filter(func(brand) { brand.published }).toArray();
  };

  public query ({ caller }) func getBrandsByCategory(category : Text) : async [Brand] {
    brandPartners.values().filter(func(brand) { brand.published and brand.category == category }).toArray();
  };

  // Services
  public shared ({ caller }) func addService(service : ServiceInput) : async Nat {
    assertAdmin(caller);
    let id = nextServiceId;
    nextServiceId += 1;

    let newService : Service = {
      id;
      title = service.title;
      description = service.description;
      features = service.features;
      published = false;
    };

    services.add(id, newService);
    id;
  };

  public shared ({ caller }) func updateService(service : ServiceFullInput) : async () {
    assertAdmin(caller);
    services.add(service.id, {
      id = service.id;
      title = service.title;
      description = service.description;
      features = service.features;
      published = true;
    });
  };

  public shared ({ caller }) func toggleServicePublished(serviceId : Nat) : async Bool {
    assertAdmin(caller);
    switch (services.get(serviceId)) {
      case (null) { Runtime.trap("Service not found") };
      case (?service) {
        let updatedService = { service with published = not service.published };
        services.add(serviceId, updatedService);
        updatedService.published;
      };
    };
  };

  public query ({ caller }) func getPublishedServices() : async [Service] {
    services.values().filter(func(service) { service.published }).toArray();
  };

  // Pricing Plans
  public shared ({ caller }) func addPricingPlan(plan : PricingPlanInput) : async Nat {
    assertAdmin(caller);
    let id = nextPricingPlanId;
    nextPricingPlanId += 1;

    let newPlan : PricingPlan = {
      id;
      planLabel = plan.planLabel;
      price = plan.price;
      note = plan.note;
      published = false;
    };

    pricingPlans.add(id, newPlan);
    id;
  };

  public shared ({ caller }) func updatePricingPlan(id : Nat, plan : PricingPlanInput) : async () {
    assertAdmin(caller);
    switch (pricingPlans.get(id)) {
      case (null) { Runtime.trap("Pricing plan not found") };
      case (?existingPlan) {
        let updatedPlan : PricingPlan = {
          id;
          planLabel = plan.planLabel;
          price = plan.price;
          note = plan.note;
          published = existingPlan.published;
        };
        pricingPlans.add(id, updatedPlan);
      };
    };
  };

  public shared ({ caller }) func togglePricingPublished(planId : Nat) : async Bool {
    assertAdmin(caller);
    switch (pricingPlans.get(planId)) {
      case (null) { Runtime.trap("Pricing plan not found") };
      case (?plan) {
        let updatedPlan = { plan with published = not plan.published };
        pricingPlans.add(planId, updatedPlan);
        updatedPlan.published;
      };
    };
  };

  public query ({ caller }) func getPublishedPricingPlans() : async [PricingPlan] {
    pricingPlans.values().filter(func(plan) { plan.published }).toArray();
  };

  // Testimonials
  public shared ({ caller }) func addTestimonial(input : TestimonialFullInput) : async Nat {
    assertAdmin(caller);
    let id = nextTestimonialId;
    nextTestimonialId += 1;

    let testimonial : Testimonial = {
      id;
      clientName = input.clientName;
      company = input.company;
      review = input.review;
      rating = input.rating;
      published = false;
    };

    testimonials.add(id, testimonial);
    id;
  };

  public shared ({ caller }) func toggleTestimonialPublished(testimonialId : Nat) : async Bool {
    assertAdmin(caller);
    switch (testimonials.get(testimonialId)) {
      case (null) { Runtime.trap("Testimonial not found") };
      case (?testimonial) {
        let updatedTestimonial = { testimonial with published = not testimonial.published };
        testimonials.add(testimonialId, updatedTestimonial);
        updatedTestimonial.published;
      };
    };
  };

  public query ({ caller }) func getPublishedTestimonials() : async [Testimonial] {
    testimonials.values().filter(func(testimonial) { testimonial.published }).toArray();
  };

  // FAQs
  public shared ({ caller }) func addFAQItem(faq : FAQInput) : async Nat {
    assertAdmin(caller);
    let id = nextFAQId;
    nextFAQId += 1;

    let newFAQ : FAQItem = {
      id;
      question = faq.question;
      answer = faq.answer;
      published = false;
    };

    faqs.add(id, newFAQ);
    id;
  };

  public shared ({ caller }) func toggleFAQPublished(faqId : Nat) : async Bool {
    assertAdmin(caller);
    switch (faqs.get(faqId)) {
      case (null) { Runtime.trap("FAQ not found") };
      case (?faq) {
        let updatedFAQ = { faq with published = not faq.published };
        faqs.add(faqId, updatedFAQ);
        updatedFAQ.published;
      };
    };
  };

  public query ({ caller }) func getPublishedFAQs() : async [FAQItem] {
    faqs.values().filter(func(faq) { faq.published }).toArray();
  };

  // Contact Enquiries
  public shared ({ caller }) func submitContactEnquiry(name : Text, email : Text, phone : Text, message : Text) : async Nat {
    let id = nextContactId;
    nextContactId += 1;

    let newEnquiry : ContactEnquiry = {
      id;
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
    };

    contactEnquiries.add(id, newEnquiry);
    id;
  };

  // Get all contact enquiries (admin only)
  public query ({ caller }) func getAllContactEnquiries() : async [ContactEnquiry] {
    assertAdmin(caller);
    contactEnquiries.values().toArray();
  };

  // Office Profile
  public shared ({ caller }) func updateOfficeProfile(profile : OfficeProfile) : async () {
    assertAdmin(caller);
    officeProfile := profile;
  };

  public query ({ caller }) func getOfficeProfile() : async OfficeProfile {
    officeProfile;
  };

  // Generate filtered results (public methods)

  public query ({ caller }) func publicCombinedVideosBrands() : async {
    videos : [PortfolioVideo];
    brands : [Brand];
  } {
    let publishedVideos = portfolioVideos.values().filter(func(video) { video.published }).toArray();
    let publishedBrands = brandPartners.values().filter(func(brand) { brand.published }).toArray();
    { videos = publishedVideos; brands = publishedBrands };
  };

  public query ({ caller }) func getServicesAndPricing() : async {
    services : [Service];
    pricing : [PricingPlan];
  } {
    let publishedServices = services.values().filter(func(service) { service.published }).toArray();
    let publishedPricing = pricingPlans.values().filter(func(plan) { plan.published }).toArray();
    { services = publishedServices; pricing = publishedPricing };
  };

  // Seed data during upgrade (for initial population)
  public shared ({ caller }) func seedData() : async () {
    assertAdmin(caller);
    // Portfolio Videos
    let videoSeedData : [(Text, Text, Text, Text)] = [
      ("Medwin Montage Showreel", "showreel", "12345678", "Cinematic portfolio showcasing various works"),
      ("Food Brand Ad Film", "adfilm", "87654321", "Visual storytelling for restaurant launch campaign"),
      ("Wedding Highlights", "wedding", "24681357", "Candid wedding moments captured in cinematic style"),
      ("Brand Documentary", "documentary", "13572468", "Brand journey documentary for heritage company"),
      ("Event Coverage Promo", "promo", "98765432", "Event recap video for corporate conference"),
      ("Food brand Ad Film 2", "adfilm", "956400007", "Introducing new food brand in Thanjavur"),
    ];

    for (videoSeed in videoSeedData.values()) {
      let id = nextVideoId;
      nextVideoId += 1;

      let newVideo : PortfolioVideo = {
        id;
        title = videoSeed.0;
        category = videoSeed.1;
        vimeoId = videoSeed.2;
        description = videoSeed.3;
        published = true;
      };

      portfolioVideos.add(id, newVideo);
    };

    // Brand Partners
    let brandSeedData : [Brand] = [
      {
        id = 1;
        name = "The Foodies Spot";
        category = "food";
        location = "Thanjavur";
        description = "Popular restaurant chain in Thanjavur";
        mapsUrl = "https://maps.app.goo.gl/foodies-spot";
        published = true;
      },
      {
        id = 2;
        name = "Way2Home Bazaar";
        category = "retail";
        location = "Thanjavur";
        description = "Furniture and home essentials mall";
        mapsUrl = "https://maps.app.goo.gl/way2home";
        published = true;
      },
      {
        id = 3;
        name = "The Chai Spot";
        category = "cafe";
        location = "Thanjavur";
        description = "Cafe and food joint with cozy ambiance";
        mapsUrl = "https://maps.app.goo.gl/chai-spot";
        published = true;
      },
      {
        id = 4;
        name = "Idhayam Hospital";
        category = "healthcare";
        location = "Thanjavur";
        description = "Healthcare and wellness center";
        mapsUrl = "https://maps.app.goo.gl/idhayam-hospital";
        published = true;
      },
      {
        id = 5;
        name = "Sirkazhi School";
        category = "school";
        location = "Thanjavur";
        description = "Educational institution serving Thanjavur region";
        mapsUrl = "https://maps.app.goo.gl/sirkazhi-school";
        published = true;
      },
      {
        id = 6;
        name = "Chidambaram water";
        category = "mineral";
        location = "Thanjavur";
        description = "Certified mineral water supplier";
        mapsUrl = "https://maps.app.goo.gl/chidambaram-water";
        published = true;
      },
      {
        id = 7;
        name = "Hotel CAVERA";
        category = "hotel";
        location = "Thanjavur, Pudukottai";
        description = "Hotel and food brand in Thanjavur";
        mapsUrl = "https://maps.app.goo.gl/hotel-cavera";
        published = true;
      },
    ];

    for (brand in brandSeedData.values()) {
      brandPartners.add(brand.id, brand);
    };

    // Services
    let serviceSeedData : [Service] = [
      {
        id = 1;
        title = "Ad Films";
        description = "Promotional videos for products, services, and brands";
        features = ["Script writing", "Direction", "Cinematic visuals", "Professional editing"];
        published = true;
      },
      {
        id = 2;
        title = "Weddings Films";
        description = "Candid wedding highlights, pre/post wedding shoots";
        features = ["Candid coverage", "Pre-wedding shoots", "Cinematic edits"];
        published = true;
      },
      {
        id = 3;
        title = "Event Videography";
        description = "Capturing events, launches, music videos";
        features = ["Event coverage", "Stage shows", "Music video production"];
        published = true;
      },
      {
        id = 4;
        title = "Brand Documentaries";
        description = "Brand story, journey, and impact films";
        features = ["Brand documentaries", "Industry films", "Community profiles"];
        published = true;
      },
      {
        id = 5;
        title = "Digital Marketing";
        description = "Online marketing, social media, visual campaigns";
        features = ["Campaign planning", "Social media", "Content creation"];
        published = true;
      },
      {
        id = 6;
        title = "Photo Shoots";
        description = "Product, food, interior and lifestyle photography";
        features = ["Product photography", "Food shoots", "Lifestyle images"];
        published = true;
      },
    ];

    for (service in serviceSeedData.values()) {
      services.add(service.id, service);
    };

    // Pricing Plans
    let pricingSeedData : [PricingPlan] = [
      {
        id = 1;
        planLabel = "Ad Film (Under 1 Min)";
        price = 10000;
        note = "High-quality ad film up to 1 minute duration";
        published = true;
      },
      {
        id = 2;
        planLabel = "Wedding Film (Cinematic)";
        price = 15000;
        note = "Candid wedding highlights and editing";
        published = true;
      },
      {
        id = 3;
        planLabel = "Brand Documentary";
        price = 5000;
        note = "In-depth brand journey and story coverage";
        published = true;
      },
      {
        id = 4;
        planLabel = "Product Photography (20 images)";
        price = 18000;
        note = "Professional photo shoot for products";
        published = true;
      },
      {
        id = 5;
        planLabel = "Social Media Monthly";
        price = 10000;
        note = "4 video edits/month + strategy support";
        published = true;
      },
    ];

    for (plan in pricingSeedData.values()) {
      pricingPlans.add(plan.id, plan);
    };

    // Testimonials
    let testimonialSeedData : [Testimonial] = [
      {
        id = 1;
        clientName = "Sriram Kumar";
        company = "The Chai Spot";
        review = "Excellent creative work, our brand awareness improved a lot";
        rating = 5;
        published = true;
      },
      {
        id = 2;
        clientName = "Ganesh Idhayam";
        company = "Idhayam Hospital";
        review = "Visual documentation captures our service impact beautifully";
        rating = 4;
        published = true;
      },
      {
        id = 3;
        clientName = "Varun Prasad";
        company = "Way2Home";
        review = "Impressed with prompt delivery and professionalism";
        rating = 4;
        published = true;
      },
      {
        id = 4;
        clientName = "Kavya S.UserRequest";
        company = "Wedding Client";
        review = "Wedding film exceeded our expectations, highly recommended";
        rating = 5;
        published = true;
      },
    ];

    for (testimonial in testimonialSeedData.values()) {
      testimonials.add(testimonial.id, testimonial);
    };

    // FAQ Items
    let faqSeedData : [FAQItem] = [
      {
        id = 1;
        question = "How much does a brand ad film cost?";
        answer = "Pricing starts from ₹10,000 for ad films under 1 minute.";
        published = true;
      },
      {
        id = 2;
        question = "Do you offer drone videography?";
        answer = "Yes, aerial drone shots are included in select packages.";
        published = true;
      },
      {
        id = 3;
        question = "What is the turnaround time for projects?";
        answer = "Delivery time varies by project size, 1-3 weeks is typical timeline.";
        published = true;
      },
      {
        id = 4;
        question = "Can you cover events outside Thanjavur?";
        answer = "Yes, we travel and cover events across Tamil Nadu and South India.";
        published = true;
      },
      {
        id = 5;
        question = "Do you offer photo shoots as add-on service?";
        answer = "Yes, both video and photo shoot packages available";
        published = true;
      },
      {
        id = 6;
        question = "What formats do you deliver final videos in?";
        answer = "Delivery is digital download link, compatible with web & social media";
        published = true;
      },
    ];

    for (faq in faqSeedData.values()) {
      faqs.add(faq.id, faq);
    };
  };
};
