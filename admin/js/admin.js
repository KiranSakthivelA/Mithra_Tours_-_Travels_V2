/**
 * admin/js/admin.js — Mithra Tours & Travels Admin Control Panel & CMS (V25)
 * Dedicated Cab Attachments Tab, Clear Forms Integration, & Safety Backups
 */

(function () {
    'use strict';

    let currentInquiries = [];
    let currentCMSData = {
  "home": {
    "heroBadge": "👑 Chennai's Most Trusted Travel Partner",
    "heroTitleLine1": "Journeys That Connect,",
    "heroTitleHighlight": "Safe & Comfortable.",
    "heroSubtitle": "Corporate Cabs · Airport Transfers · Outstation & Business Tours · Holiday Packages · Flight / Train / Cruise Booking · Visa Assistance",
    "heroBtn1Text": "Book Now",
    "heroBtn1Link": "contact.html",
    "heroBtn2Text": "Corporate Mobility",
    "heroBtn2Link": "corporate.html",
    "heroBtn3Text": "WhatsApp Quote",
    "heroBtn3Link": "https://wa.me/919629245533?text=Hello%20Mithra%20Tours%2C%20I%20need%20a%20travel%20quote",
    "trustTicker": [
      {
        "icon": "fa-box",
        "text": "Sealed Hygienic Welcome Kit"
      },
      {
        "icon": "fa-file-invoice-dollar",
        "text": "Consolidated Digital Invoicing"
      },
      {
        "icon": "fa-clock",
        "text": "On-Time Guaranteed"
      },
      {
        "icon": "fa-headset",
        "text": "24/7 Round-the-Clock Support"
      },
      {
        "icon": "fa-shield-halved",
        "text": "Background-Verified Chauffeurs"
      },
      {
        "icon": "fa-route",
        "text": "Pan-India Coverage"
      }
    ],
    "corporateSection": {
      "sectionLabel": "Corporate Transport",
      "sectionTitle": "Corporate Mobility & Services",
      "sectionDesc": "Corporate Cab Services, Airport Pickups & Drops, Outstation Trips, Business Tours.",
      "cards": [
        {
          "title": "Corporate Cab Services",
          "desc": "Daily & monthly employee pickup, drop, and shift duties with consolidated monthly invoicing.",
          "linkText": "Corporate Services",
          "linkUrl": "corporate.html"
        },
        {
          "title": "Airport Pickups & Drops",
          "desc": "Guaranteed on-time 24/7 Chennai (MAA) airport transfers with live flight tracking.",
          "linkText": "Airport Transfers",
          "linkUrl": "corporate.html"
        },
        {
          "title": "Outstation & Business Tours",
          "desc": "Comfortable multi-city road trips across Tamil Nadu & South India for corporate & family.",
          "linkText": "Outstation Routes",
          "linkUrl": "corporate.html"
        }
      ]
    },
    "holidaysSection": {
      "sectionLabel": "Travel & Holidays",
      "sectionTitle": "Domestic & International Holiday Packages",
      "sectionDesc": "Domestic & International Holiday Packages, Flight / Train / Cruise Booking, Visa Assistance.",
      "domesticCard": {
        "title": "Kodaikanal, Rajasthan, Tawang & More",
        "desc": "Curated holiday experiences for families, couples, and groups with flexible itineraries and verified transfers.",
        "btnText": "View Domestic Holidays",
        "linkUrl": "holidays.html#domestic-packages"
      },
      "intlCard": {
        "title": "Singapore, Vietnam, Dubai & Beyond",
        "desc": "Well-planned international holidays with customised itineraries, flights, visa assistance, and luxury stays.",
        "btnText": "View International Holidays",
        "linkUrl": "holidays.html#international-packages"
      },
      "visaCard": {
        "title": "Ticketing & Visa Desk",
        "desc": "One-stop booking for Domestic & International Flights, IRCTC Train Tickets, Cruise Holidays, and end-to-end Visa Assistance.",
        "btnText": "Explore Travel Desk",
        "linkUrl": "holidays.html"
      }
    },
    "whyMithraSection": {
      "sectionLabel": "Why Choose Us",
      "sectionTitle": "Why Mithra Tours & Travels",
      "sectionDesc": "One Vendor, Every Need · Consistency You Can Verify · Safety First · On-Time, Every Time.",
      "roadMapSteps": [
        {
          "title": "One Vendor, Every Need",
          "desc": "From daily cabs to flights, hotels, and visas — complete travel coverage without managing multiple vendors."
        },
        {
          "title": "Consistency You Can Verify",
          "desc": "Verified drivers, vehicle hygiene, and the same high standard guest experience across all trips."
        },
        {
          "title": "Safety First",
          "desc": "Documented vehicle health checks and verified chauffeurs enforcing strict safety standards."
        },
        {
          "title": "On-Time, Every Time",
          "desc": "Punctual dispatches scheduled without exception, ensuring hassle-free travel."
        }
      ]
    },
    "bottomEnquirySection": {
      "title": "Direct Travel Enquiry",
      "subtitle": "Get a custom quotation within 15 minutes from our travel concierge team.",
      "phone": "+91 96292 45533",
      "email": "bookings@mithratoursandtravels.in"
    }
  },
  "holidays_main": {
    "pageTitle": "Curated Holiday Experiences",
    "pageSubtitle": "Handpicked domestic getaways & international luxury escapes with private sanitized vehicles and dedicated 24/7 concierge assistance.",
    "featuredBannerTitle": "Special Holiday Season: Rajasthan, Dubai & Kerala Tours",
    "featuredBannerSubtitle": "Customized family & group packages with transparent pricing and zero hidden charges."
  },
  "whyChooseUs": [
    {
      "title": "",
      "desc": ""
    },
    {
      "title": "",
      "desc": ""
    },
    {
      "title": "",
      "desc": ""
    },
    {
      "title": "",
      "desc": ""
    },
    {
      "title": "",
      "desc": ""
    },
    {
      "title": "",
      "desc": ""
    }
  ],
  "domestic_packages": {
    "domestic_package_1": {
      "id": "kodaikanal",
      "title": "Kodaikanal • Poombarai • Mannavanur",
      "subtitle": "Beyond the Usual Kodaikanal",
      "duration": "3 Nights / 4 Days",
      "durationBadge": "3N / 4D",
      "price": "₹12,999",
      "pricePer": "per person",
      "region": "Tamil Nadu",
      "image": "Assets/holiday_kodaikanal.jpg",
      "bestFor": "Families • Couples • Groups • Nature Lovers",
      "overview": "Experience the beauty of Kodaikanal through its iconic attractions, scenic viewpoints and peaceful mountain landscapes, along with the charming villages of Poombarai and Mannavanur.",
      "highlights": [
        "Kodaikanal Lake",
        "Poombarai Village",
        "Mannavanur Lake",
        "Pine Forest",
        "Coaker's Walk"
      ],
      "inclusions": [
        "3 Nights accommodation as per selected category",
        "Daily delicious breakfast at hotel",
        "Dedicated private vehicle for the entire itinerary",
        "Driver charges, night allowances & fuel costs",
        "Toll gates, parking & inter-state permits",
        "Complete sightseeing as mentioned in the itinerary",
        "Mithra Welcome Kit & 24/7 on-trip concierge assistance"
      ],
      "exclusions": [
        "Lunch, dinner & personal beverages",
        "Entry tickets / camera fees at monuments & parks",
        "Boating, horse riding & optional adventure activities",
        "Personal expenses & souvenir shopping",
        "Anything not specifically mentioned under inclusions"
      ],
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Chennai to Kodaikanal",
          "desc": "Journey from Chennai to the scenic hills of Kodaikanal.",
          "points": [
            "Pickup from Chennai and proceed towards Kodaikanal",
            "En-route meal / rest stop amidst scenic routes",
            "Hotel check-in and refresh",
            "Evening at leisure / local market exploration",
            "Overnight stay in Kodaikanal"
          ]
        },
        {
          "day": "Day 2",
          "title": "Kodaikanal Local Sightseeing",
          "desc": "Explore the iconic sights and natural beauty of the princess of hill stations.",
          "points": [
            "Visit serene Kodaikanal Lake for boating & cycling",
            "Stroll along Coaker’s Walk with panoramic valley views",
            "Bryant Park flower gardens & horticultural exhibits",
            "Explore famous Pillar Rocks & Guna Caves",
            "Walk through Pine Forest & scenic Moir Point",
            "Overnight stay in Kodaikanal"
          ]
        },
        {
          "day": "Day 3",
          "title": "Poombarai & Mannavanur Excursion",
          "desc": "Discover the quieter, terraced valleys and countryside side of the hills.",
          "points": [
            "Breakfast & proceed towards picturesque Poombarai",
            "Explore Poombarai stepped farming village & viewpoints",
            "Continue to Mannavanur sheep farm & tranquil lake",
            "Explore the countryside, rolling grasslands, and nature trails",
            "Return to Kodaikanal for an evening at leisure",
            "Overnight stay in Kodaikanal"
          ]
        },
        {
          "day": "Day 4",
          "title": "Kodaikanal to Chennai Departure",
          "desc": "Conclude your memorable hill getaway with a comfortable return transfer.",
          "points": [
            "Breakfast & hotel check-out",
            "Leisure time / short local shopping, subject to departure timing",
            "Depart towards Chennai with en-route meal / rest stops",
            "Drop at Chennai (Home / Airport / Railway Station)"
          ]
        }
      ],
      "travel_notes": [
        "Hotel and room categories are subject to availability at confirmation.",
        "Equivalent premium accommodation may be offered where required.",
        "Sightseeing is subject to weather, road conditions, and local operating guidelines.",
        "Travel times may vary based on traffic and mountain road conditions.",
        "The itinerary is 100% customizable based on your travel dates and group preferences."
      ],
      "booking_policy": [
        "Booking confirmed upon receipt of the agreed advance deposit.",
        "Final hotel, vehicle, and package quotation confirmed based on real-time availability.",
        "Applicable GST and invoice details communicated clearly in the final quotation."
      ]
    },
    "domestic_package_2": {
      "id": "rajasthan",
      "title": "Jaipur • Udaipur • Jaisalmer",
      "subtitle": "The Royal Rajasthan Experience",
      "duration": "5 Nights / 6 Days",
      "durationBadge": "5N / 6D",
      "price": "₹24,999",
      "pricePer": "per person",
      "region": "North India",
      "image": "Assets/holiday_rajasthan.jpg",
      "bestFor": "Families • Couples • Groups • Heritage Lovers",
      "overview": "Explore Rajasthan's royal heritage, magnificent palaces, colourful cities and golden desert landscapes across Jaipur, Udaipur and Jaisalmer.",
      "highlights": [
        "Amber Fort Jaipur",
        "Udaipur Lakes",
        "Jaisalmer Desert Safari",
        "City Palace",
        "Hawa Mahal"
      ],
      "inclusions": [
        "5 Nights accommodation as per selected category",
        "Daily buffet breakfast at hotels & desert camp",
        "Dedicated private chauffeur-driven AC vehicle for entire tour",
        "All driver allowances, fuel, tolls, and inter-city permits",
        "Thar desert sunset experience with traditional welcome",
        "Sightseeing as detailed in the proposed itinerary",
        "Mithra Welcome Kit & 24/7 dedicated travel support"
      ],
      "exclusions": [
        "Lunch, dinner & personal beverages (unless specified at desert camp)",
        "Entry tickets / camera fees at forts & museums",
        "Boat rides, camel rides, jeep safaris & optional activities",
        "Personal expenses, shopping & tips",
        "Flight / train fares to Jaipur / from Jaisalmer",
        "Anything not specifically mentioned under inclusions"
      ],
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Arrival in Jaipur (Pink City)",
          "desc": "Arrival in the royal capital of Rajasthan and transfer to hotel.",
          "points": [
            "Airport / Railway Station pickup by private chauffeur",
            "Hotel check-in & leisure refresh",
            "Evening at leisure / explore colorful Johari Bazaar",
            "Overnight stay in Jaipur"
          ]
        },
        {
          "day": "Day 2",
          "title": "Jaipur Heritage Sightseeing",
          "desc": "Explore the iconic royal forts and palaces of the Pink City.",
          "points": [
            "Visit majestic hilltop Amber Fort with photo stops",
            "Photo stop at picturesque Jal Mahal water palace",
            "Explore Jaipur City Palace royal courtyards and museum",
            "Visit UNESCO World Heritage Jantar Mantar observatory",
            "Admire iconic Hawa Mahal & shop local handicraft markets",
            "Overnight stay in Jaipur"
          ]
        },
        {
          "day": "Day 3",
          "title": "Jaipur to Udaipur (City of Lakes)",
          "desc": "Scenic journey from the Pink City to the romantic lakes of Udaipur.",
          "points": [
            "Breakfast & hotel check-out",
            "Proceed to Udaipur with en-route meal / rest stops",
            "Arrive in Udaipur and check in to hotel",
            "Optional sunset boat ride on Lake Pichola (subject to availability)",
            "Overnight stay in Udaipur"
          ]
        },
        {
          "day": "Day 4",
          "title": "Udaipur Sightseeing Tour",
          "desc": "Discover Udaipur's breathtaking palaces, gardens, and lakes.",
          "points": [
            "Explore grand Udaipur City Palace overlooking Lake Pichola",
            "Visit historic Jagdish Temple & Saheliyon-ki-Bari gardens",
            "Scenic drive along Fateh Sagar Lake",
            "Evening leisure around Old City ghats & art bazaars",
            "Overnight stay in Udaipur"
          ]
        },
        {
          "day": "Day 5",
          "title": "Udaipur to Jaisalmer (Thar Desert)",
          "desc": "Journey towards the Golden City and the Thar Desert.",
          "points": [
            "Breakfast & hotel check-out",
            "Proceed towards Jaisalmer across scenic desert highways",
            "Check-in at desert camp / hotel in Jaisalmer",
            "Evening desert experience, sunset over sand dunes & folk music",
            "Overnight stay in Jaisalmer"
          ]
        },
        {
          "day": "Day 6",
          "title": "Jaisalmer Sightseeing & Departure",
          "desc": "Experience the highlights of the Golden City before departure.",
          "points": [
            "Explore living Jaisalmer Fort (Sonar Qila)",
            "Admire intricate stone carvings at Patwon Ki Haveli",
            "Visit peaceful Gadisar Lake & local handicraft markets",
            "Transfer to Jaisalmer Airport / Railway Station for onward journey"
          ]
        }
      ],
      "travel_notes": [
        "Desert safari and camel ride timings in Jaisalmer are subject to weather conditions.",
        "Monument entrance timings and sound & light shows are regulated by state tourism authorities.",
        "Vehicles provided for point-to-point sightseeing with verified local chauffeurs.",
        "Customizable options for heritage palace stays and desert luxury swiss tents."
      ],
      "booking_policy": [
        "Booking confirmed with 40% advance deposit and government ID proof.",
        "Instant confirmation voucher and chauffeur contact shared 24 hours prior to departure.",
        "GST invoicing provided for corporate and individual leisure travelers."
      ]
    },
    "domestic_package_3": {
      "id": "tawang",
      "title": "Tawang • Dirang • Bomdila",
      "subtitle": "Into the Himalayan Frontier",
      "duration": "5 Nights / 6 Days",
      "durationBadge": "5N / 6D",
      "price": "₹24,999",
      "pricePer": "per person",
      "region": "Arunachal Pradesh",
      "image": "Assets/holiday_tawang.jpg",
      "bestFor": "Families • Couples • Groups • Adventure Seekers",
      "overview": "Experience the dramatic landscapes of Arunachal Pradesh — from the mountain valleys of Dirang and Bomdila to the high-altitude beauty and Buddhist heritage of Tawang.",
      "highlights": [
        "Sela Pass & Lake",
        "Tawang Monastery",
        "Bum La Pass",
        "Dirang Valley",
        "Madhuri Lake"
      ],
      "inclusions": [
        "5 Nights accommodation in scenic mountain hotels",
        "Daily breakfast & dinner",
        "Dedicated private SUV / Traveller for Himalayan terrain",
        "Inner Line Permits (ILP) assistance for Arunachal Pradesh",
        "Sightseeing as per itinerary with experienced hill chauffeur"
      ],
      "exclusions": [
        "Lunch and personal beverages",
        "Bum La Pass special army permit & local vehicle hire",
        "Personal expenses and porter charges"
      ],
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Guwahati to Bomdila",
          "desc": "Begin your journey into the misty mountains of Arunachal.",
          "points": [
            "Pickup from Guwahati",
            "Drive through tea estates to Bomdila",
            "Overnight in Bomdila"
          ]
        },
        {
          "day": "Day 2",
          "title": "Bomdila to Dirang Valley",
          "desc": "Apple orchards, hot springs, and Kiwi gardens.",
          "points": [
            "Visit Bomdila Monastery",
            "Drive to Dirang Valley",
            "Visit Dirang Dzong & hot water spring",
            "Overnight in Dirang"
          ]
        },
        {
          "day": "Day 3",
          "title": "Dirang to Tawang via Sela Pass",
          "desc": "Cross the majestic 13,700 ft snow-capped Sela Pass.",
          "points": [
            "Cross Sela Pass and Sela Lake",
            "Visit Jaswant Garh War Memorial",
            "Arrive in Tawang and check in",
            "Overnight in Tawang"
          ]
        },
        {
          "day": "Day 4",
          "title": "Tawang Monastery & Local Sightseeing",
          "desc": "Asia's second-largest Buddhist monastery.",
          "points": [
            "Explore grand 400-year-old Tawang Monastery",
            "Visit Urgelling Monastery & Tawang War Memorial",
            "Evening light show",
            "Overnight in Tawang"
          ]
        },
        {
          "day": "Day 5",
          "title": "Tawang to Bomdila Return",
          "desc": "Scenic drive descending the Himalayan valleys.",
          "points": [
            "Breakfast & check-out",
            "Visit Nuranang Waterfalls (Jung Falls)",
            "Scenic return drive to Bomdila",
            "Overnight in Bomdila"
          ]
        },
        {
          "day": "Day 6",
          "title": "Bomdila to Guwahati Departure",
          "desc": "Return transfer to Guwahati for onward journey.",
          "points": [
            "Breakfast & check-out",
            "Drive to Guwahati Airport / Railway Station"
          ]
        }
      ],
      "travel_notes": [
        "Inner Line Permit (ILP) is required for Arunachal Pradesh (arranged seamlessly by Mithra).",
        "Bum La Pass visit is subject to Indian Army clearance and weather conditions.",
        "High-altitude warm clothing and thermal layers recommended.",
        "Dedicated 4x4 / high-clearance private vehicle for smooth mountain transitions."
      ],
      "booking_policy": [
        "Confirmed with advance deposit and passport/voter ID scan for ILP processing.",
        "Detailed trip briefing and 24/7 dedicated travel manager support throughout the tour."
      ]
    }
  },
  "international_packages": {
    "international_package_1": {
      "id": "singapore",
      "title": "Singapore City & Sentosa Island",
      "subtitle": "The Lion City Adventure",
      "duration": "4 Nights / 5 Days",
      "durationBadge": "4N / 5D",
      "price": "₹64,999",
      "pricePer": "per person",
      "region": "Singapore",
      "image": "Assets/holiday_singapore.jpg",
      "bestFor": "Families • Kids • Couples • Urban Explorers",
      "overview": "Discover the Garden City — Gardens by the Bay, Universal Studios theme park, Marina Bay Sands, Night Safari, and cable cars of Sentosa.",
      "highlights": [
        "Gardens by the Bay (Flower Dome & Cloud Forest)",
        "Universal Studios Singapore",
        "Sentosa Cable Car & Wings of Time",
        "Marina Bay Sands SkyPark",
        "Singapore Night Safari"
      ],
      "inclusions": [
        "4 Nights in centrally located 4-Star hotel",
        "Daily breakfast at hotel",
        "All entry tickets: Universal Studios, Gardens by the Bay, Sentosa Cable Car",
        "Private airport transfers and guided city tours",
        "Singapore tourist visa assistance"
      ],
      "exclusions": [
        "International flight tickets",
        "Lunch, dinner and personal shopping",
        "Optional: Night Safari or Singapore Flyer tickets"
      ],
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Arrival in Singapore & Night Safari",
          "desc": "Welcome to Jewel Changi and the world's first nocturnal zoo.",
          "points": [
            "Arrive at Changi Airport & explore Jewel waterfall",
            "Hotel check-in & leisure refresh",
            "Evening tram ride at Singapore Night Safari",
            "Overnight in Singapore"
          ]
        },
        {
          "day": "Day 2",
          "title": "Singapore City Tour & Gardens by the Bay",
          "desc": "Merlion Park and avatar-like futuristic glass domes.",
          "points": [
            "City tour: Merlion Park, Padang, Chinatown, Little India",
            "Visit Gardens by the Bay (Flower Dome & Cloud Forest)",
            "Witness Supertree Grove light & sound show",
            "Marina Bay Sands Skypark observation deck",
            "Overnight in Singapore"
          ]
        },
        {
          "day": "Day 3",
          "title": "Universal Studios Singapore",
          "desc": "A full day of thrilling rides and movie magic.",
          "points": [
            "Full-day pass to Universal Studios at Resorts World Sentosa",
            "Experience Transformers The Ride, Battlestar Galactica & Jurassic Park",
            "Meet movie characters & enjoy evening shows",
            "Overnight in Singapore"
          ]
        },
        {
          "day": "Day 4",
          "title": "Sentosa Island Cable Car & Wings of Time",
          "desc": "Beach adventures and spectacular fireworks water show.",
          "points": [
            "Scenic Cable Car ride to Sentosa Island",
            "Visit Madame Tussauds & S.E.A. Aquarium",
            "Relax at Siloso Beach",
            "Wings of Time multi-sensory laser & fire show",
            "Overnight in Singapore"
          ]
        },
        {
          "day": "Day 5",
          "title": "Orchard Road Shopping & Departure",
          "desc": "Last minute shopping and return flight.",
          "points": [
            "Breakfast & check-out",
            "Shopping at Orchard Road malls / Mustafa Centre",
            "Private transfer to Changi Airport for departure"
          ]
        }
      ],
      "travel_notes": [
        "Indian passport holders require a valid Singapore visa (processed within 3-5 working days).",
        "Passport must be valid for at least 6 months from the date of travel.",
        "Universal Studios and attraction tickets are provided with instant barcode e-passes.",
        "Itinerary is flexible and can be customized with optional night safaris or cruise extensions."
      ],
      "booking_policy": [
        "Confirmed with advance deposit and passport copy submission.",
        "Flights and hotels confirmed with instant PNR vouchers upon booking.",
        "Travel insurance coverage strongly recommended and available on request."
      ]
    },
    "international_package_2": {
      "id": "vietnam",
      "title": "Vietnam Grand Explorer",
      "subtitle": "Hanoi • Halong Bay • Da Nang • Hoi An • Saigon",
      "duration": "6 Nights / 7 Days",
      "durationBadge": "6N / 7D",
      "price": "₹69,999",
      "pricePer": "per person",
      "region": "Vietnam",
      "image": "Assets/holiday_vietnam.jpg",
      "bestFor": "Couples • Culture Lovers • Nature Photographers • Foodies",
      "overview": "From emerald limestone karsts of UNESCO World Heritage Halong Bay and lantern-lit streets of ancient Hoi An to the Golden Bridge in the clouds at Ba Na Hills.",
      "highlights": [
        "Halong Bay Overnight Luxury Cruise",
        "Golden Hand Bridge at Ba Na Hills",
        "Hoi An Ancient Lantern Town",
        "Hanoi Old Quarter & French Quarter",
        "Cu Chi Tunnels & Mekong Delta"
      ],
      "inclusions": [
        "6 Nights accommodation (including 1 Night luxury Halong Bay Cruise)",
        "Daily breakfast + All meals on Halong Cruise",
        "Cable car tickets to Ba Na Hills Golden Hand Bridge",
        "Domestic internal flights (Hanoi -> Da Nang -> Saigon)",
        "Private AC transport and English-speaking local guides",
        "Vietnam e-visa approval letter"
      ],
      "exclusions": [
        "International roundtrip flight tickets",
        "Lunches and dinners not mentioned in cruise inclusions",
        "Personal expenses and drinks"
      ],
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Arrival in Hanoi",
          "desc": "Welcome to Vietnam's charming colonial capital.",
          "points": [
            "Pickup from Noi Bai Airport & hotel check-in",
            "Explore Hanoi Old Quarter on traditional cyclo",
            "Visit Hoan Kiem Lake & Ngoc Son Temple",
            "Overnight in Hanoi"
          ]
        },
        {
          "day": "Day 2",
          "title": "Hanoi to Halong Bay Cruise",
          "desc": "Sail amidst thousands of limestone islands.",
          "points": [
            "Scenic drive to Halong Bay port",
            "Board luxury cruise with welcome drink & lunch",
            "Kayaking through Sung Sot (Surprise) Cave",
            "Sunset party & squid fishing on cruise",
            "Overnight on Halong Cruise"
          ]
        },
        {
          "day": "Day 3",
          "title": "Halong Bay to Da Nang",
          "desc": "Morning Tai Chi on sundeck and flight to central Vietnam.",
          "points": [
            "Morning Tai Chi and visit Ti Top Island viewpoint",
            "Brunch on cruise and disembark",
            "Transfer to Hanoi airport for flight to Da Nang",
            "Check in at Da Nang beachfront hotel",
            "Overnight in Da Nang"
          ]
        },
        {
          "day": "Day 4",
          "title": "Ba Na Hills & Golden Hand Bridge",
          "desc": "Walking in the clouds on the giant hand bridge.",
          "points": [
            "World-record cable car ride to Ba Na Hills",
            "Walk on iconic Golden Bridge held by giant hands",
            "Explore French Village & Fantasy Park",
            "Evening visit to Hoi An ancient lantern town",
            "Overnight in Da Nang"
          ]
        },
        {
          "day": "Day 5",
          "title": "Da Nang to Ho Chi Minh City (Saigon)",
          "desc": "Fly to the vibrant southern metropolis.",
          "points": [
            "Flight to Ho Chi Minh City (Saigon)",
            "Visit War Remnants Museum & Notre Dame Cathedral",
            "Explore Ben Thanh market for local coffee & silk",
            "Overnight in Saigon"
          ]
        },
        {
          "day": "Day 6",
          "title": "Mekong Delta River Tour",
          "desc": "Explore floating markets, orchards, and coconut candy workshops.",
          "points": [
            "Drive to My Tho in the Mekong Delta",
            "Boat cruise along Mekong River & horse carriage ride",
            "Sampan rowing boat through narrow palm canals",
            "Traditional Vietnamese folk music performance",
            "Return to Saigon for overnight stay"
          ]
        },
        {
          "day": "Day 7",
          "title": "Saigon Departure",
          "desc": "Farewell Vietnam and airport transfer.",
          "points": [
            "Breakfast & check-out",
            "Transfer to Tan Son Nhat Airport for onward flight"
          ]
        }
      ],
      "travel_notes": [
        "Indian passport holders require a Vietnam E-Visa (processed within 3-4 working days).",
        "Domestic flight luggage allowance includes 20kg check-in + 7kg cabin.",
        "Halong Bay cruise activities are subject to maritime weather permissions.",
        "Customizable for couples, families, and private corporate incentive groups."
      ],
      "booking_policy": [
        "Confirmed with advance deposit and passport scan copies.",
        "All flights, luxury hotels and cruise cabin confirmed with instant vouchers upon booking."
      ]
    },
    "international_package_3": {
      "id": "dubai",
      "title": "Dubai & Abu Dhabi Grand Tour",
      "subtitle": "Futuristic Luxury & Arabian Desert",
      "duration": "5 Nights / 6 Days",
      "durationBadge": "5N / 6D",
      "price": "₹74,999",
      "pricePer": "per person",
      "region": "UAE",
      "image": "Assets/holiday_dubai.jpg",
      "bestFor": "Families • Couples • Luxury Seekers • Shoppers",
      "overview": "Experience the glamour of Dubai — from the heights of Burj Khalifa and luxury Marina yacht cruises to exhilarating desert safaris and Abu Dhabi's Sheikh Zayed Grand Mosque.",
      "highlights": [
        "Burj Khalifa 124th Floor View",
        "Red Dunes Desert Safari & BBQ",
        "Abu Dhabi Sheikh Zayed Mosque",
        "Dubai Marina Dhow Cruise Dinner",
        "Dubai Miracle Garden / Frame"
      ],
      "inclusions": [
        "5 Nights in 4-Star / 5-Star City Hotel",
        "Daily international buffet breakfast",
        "Desert Safari with 4x4 Dune Bashing, Camel Ride, Tanoura & BBQ Dinner",
        "Marina Dhow Cruise with 5-Star buffet dinner & live entertainment",
        "Burj Khalifa 124th Floor observation deck tickets with Dubai Mall fountain show",
        "Full-day Abu Dhabi city tour with Grand Mosque",
        "UAE Tourist Visa and travel insurance assistance"
      ],
      "exclusions": [
        "International airfare and Tourism Dirham Fee",
        "Lunches and personal shopping expenses",
        "Optional tickets: Museum of the Future, Ferrari World, Aquaventure"
      ],
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Arrival in Dubai & Marina Dhow Cruise",
          "desc": "Welcome to the City of Gold.",
          "points": [
            "Airport pickup in private vehicle",
            "Hotel check-in & relax",
            "Evening luxury Dubai Marina Dhow Cruise with dinner",
            "Overnight in Dubai"
          ]
        },
        {
          "day": "Day 2",
          "title": "Dubai City Tour & Burj Khalifa",
          "desc": "Contrast of historic heritage and futuristic wonders.",
          "points": [
            "Visit Dubai Frame, Palm Jumeirah & Atlantis photo stop",
            "Explore Dubai Mall & Dubai Aquarium (exterior)",
            "Ascend Burj Khalifa 124th Floor for skyline views",
            "Watch Dubai Fountain Show",
            "Overnight in Dubai"
          ]
        },
        {
          "day": "Day 3",
          "title": "Dubai Miracle Garden & Red Dunes Desert Safari",
          "desc": "World's largest flower garden followed by thrilling desert dunes.",
          "points": [
            "Morning visit to Dubai Miracle Garden (seasonal)",
            "Afternoon 4x4 desert safari pickup",
            "Dune bashing, sandboarding, and camel rides",
            "Bedouin camp BBQ dinner with belly dance & fire show",
            "Overnight in Dubai"
          ]
        },
        {
          "day": "Day 4",
          "title": "Abu Dhabi Grand Mosque & City Tour",
          "desc": "The majestic capital of the Emirates.",
          "points": [
            "Drive to Abu Dhabi via Sheikh Zayed Road",
            "Tour magnificent Sheikh Zayed Grand Mosque",
            "Drive along Abu Dhabi Corniche & Emirates Palace photo stop",
            "Photo stop at Ferrari World Yas Island",
            "Return to Dubai for overnight stay"
          ]
        },
        {
          "day": "Day 5",
          "title": "Gold Souk, Museum of Future & Shopping",
          "desc": "Bustling traditional bazaars and architectural marvels.",
          "points": [
            "Explore historic Deira Gold & Spice Souks",
            "Abra water taxi ride across Dubai Creek",
            "Photo stop at Museum of the Future",
            "Shopping at Mall of the Emirates",
            "Overnight in Dubai"
          ]
        },
        {
          "day": "Day 6",
          "title": "Dubai Departure",
          "desc": "Final souvenir collection and airport transfer.",
          "points": [
            "Breakfast & check-out",
            "Transfer to Dubai International Airport for departure"
          ]
        }
      ],
      "travel_notes": [
        "Indian passport holders require a Dubai Tourism Visa (processed within 2-3 working days).",
        "Desert safari includes 4x4 dune bashing, BBQ dinner and live cultural shows.",
        "Burj Khalifa observation deck tickets booked with non-prime/prime slot preference.",
        "Customizable with Abu Dhabi Ferrari World or yacht rental upgrades."
      ],
      "booking_policy": [
        "Confirmed with advance deposit and passport bio-page scan.",
        "Complete travel package voucher with 24/7 local Dubai ground assistance team."
      ]
    }
  }
};
    let activeNavTab = 'inquiries';
    let selectedDomesticPkg = 'domestic_package_1';
    let selectedIntlPkg = 'international_package_1';
    let backupList = [];

    function formatDate(dateStr) {
        if (!dateStr) return '-';
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    const API_BASE = (window.location.pathname.endsWith('/admin') || window.location.pathname.includes('/admin/')) ? '../api/' : 'api/';

    function resolveAssetUrl(path) {
        if (!path) return 'Assets/Site_Logo.png';
        if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
            return path;
        }
        let clean = String(path);
        while (clean.startsWith('../')) clean = clean.substring(3);
        while (clean.startsWith('./')) clean = clean.substring(2);
        while (clean.startsWith('/')) clean = clean.substring(1);
        return clean.startsWith('Assets/') ? clean : 'Assets/' + clean;
    }

    function getInitials(name) {
        if (!name) return 'MT';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }

    function showAdminToast(msg, type = 'success') {
        const toast = document.getElementById('admin-toast');
        const text = document.getElementById('admin-toast-text');
        if (!toast || !text) return;
        text.innerText = msg;
        const icon = toast.querySelector('i');
        
        if (type === 'draft') {
            icon.className = 'fa-solid fa-floppy-disk';
            toast.style.borderLeftColor = '#3B82F6';
        } else if (type === 'error') {
            icon.className = 'fa-solid fa-circle-exclamation';
            toast.style.borderLeftColor = '#EF4444';
        } else {
            icon.className = 'fa-solid fa-circle-check';
            toast.style.borderLeftColor = '#10B981';
        }
        
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    }

    // ── 1. Navigation Controller ──
    window.switchNav = function (tabId) {
        activeNavTab = tabId;
        
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        const navEl = document.getElementById('nav-' + tabId);
        if (navEl) navEl.classList.add('active');

        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        const panel = document.getElementById('panel-' + tabId);
        if (panel) panel.classList.add('active');

        const titleEl = document.getElementById('page-title');
        const subEl = document.getElementById('page-subtitle');
        
        switch (tabId) {
            case 'inquiries':
                titleEl.innerText = 'Enquiries Inbox';
                subEl.innerText = 'Customer leads from Trip Planner, Holiday Inquiries, and Contact forms';
                break;
            case 'attachments':
                titleEl.innerText = 'Cab Attachments';
                subEl.innerText = 'Vehicle owner & driver partner attachment applications';
                break;
            case 'history':
                titleEl.innerText = 'Booking History';
                subEl.innerText = 'Completed customer journey logs and confirmed archives';
                break;
            case 'cms-home':
                titleEl.innerText = 'Home Page CMS';
                subEl.innerText = 'Customize holiday showcase cards with drag & drop photo uploads';
                populateHomeCMS();
                break;
            case 'cms-domestic':
                titleEl.innerText = 'Domestic Packages CMS';
                subEl.innerText = 'Edit prices, itineraries, inclusions, exclusions & booking notes for Domestic Packages';
                renderPackageCMS();
                break;
            case 'cms-intl':
                titleEl.innerText = 'International Packages CMS';
                subEl.innerText = 'Edit prices, itineraries, inclusions, exclusions & booking notes for International Packages';
                renderPackageCMS();
                break;
            case 'cms-json':
            case 'backups':
                titleEl.innerText = 'Automated Safety Backups';
                subEl.innerText = '1-click full system backup & restore without touching code';
                loadBackupsList();
                break;
        }
    };

    window.refreshActiveView = function () {
        if (activeNavTab === 'inquiries' || activeNavTab === 'attachments' || activeNavTab === 'history') {
            loadInquiries();
        } else if (activeNavTab === 'cms-json' || activeNavTab === 'backups') {
            loadBackupsList();
        } else {
            loadCMSContent();
        }
    };

    // ── 2. Inquiries & CRM Leads Management ──
    async function loadInquiries() {
        const tbody = document.getElementById('inquiries-tbody');
        const attachBody = document.getElementById('attachments-tbody');
        const histBody = document.getElementById('history-tbody');
        if (tbody) tbody.innerHTML = '<tr><td colspan="7" class="loading-td"><i class="fa-solid fa-spinner fa-spin"></i> Syncing live inquiries...</td></tr>';
        if (attachBody) attachBody.innerHTML = '<tr><td colspan="7" class="loading-td"><i class="fa-solid fa-spinner fa-spin"></i> Syncing partner attachments...</td></tr>';
        
        try {
            const res = await fetch(`${API_BASE}get_inquiries.php?v=` + Date.now());
            if (!res.ok) throw new Error('API Offline');
            const data = await res.json();
            
            if (data.success && data.records) {
                currentInquiries = data.records;
                
                // Separate general inquiries from cab attachments
                const travelLeads = currentInquiries.filter(i => {
                    const ft = (i.form_type || '').toLowerCase();
                    return !ft.includes('attach') && !ft.includes('partner') && !ft.includes('cab attach');
                });

                const attachLeads = currentInquiries.filter(i => {
                    const ft = (i.form_type || '').toLowerCase();
                    return ft.includes('attach') || ft.includes('partner') || ft.includes('cab attach');
                });

                renderInquiriesTable(travelLeads);
                renderAttachmentsTable(attachLeads);
                renderHistoryTable(currentInquiries);
                updateStats(data.counts, travelLeads.length, attachLeads.length);
            } else {
                renderInquiriesTable([]);
                renderAttachmentsTable([]);
                renderHistoryTable([]);
                updateStats(null, 0, 0);
            }
        } catch (e) {
            console.warn('Inquiries API error:', e);
            renderInquiriesTable([]);
            renderAttachmentsTable([]);
            renderHistoryTable([]);
            updateStats(null, 0, 0);
        }
    }

    function updateStats(counts, travelCount, attachCount) {
        document.getElementById('stat-total').innerText = travelCount !== undefined ? travelCount : (counts?.total || '0');
        document.getElementById('stat-new').innerText = counts?.new || (travelCount === 0 ? '0' : '0');
        document.getElementById('stat-contacted').innerText = counts?.contacted || '0';
        document.getElementById('stat-confirmed').innerText = counts?.confirmed || '0';
        
        // Attachment tab stats
        const attachLeads = currentInquiries.filter(i => {
            const ft = (i.form_type || '').toLowerCase();
            return ft.includes('attach') || ft.includes('partner') || ft.includes('cab attach');
        });
        const attachNewCount = attachLeads.filter(i => (i.status || 'New').toLowerCase() === 'new').length;
        const attachApprovedCount = attachLeads.filter(i => (i.status || '').toLowerCase() === 'approved' || (i.status || '').toLowerCase() === 'confirmed').length;

        const attachStatTotal = document.getElementById('stat-attach-total');
        if (attachStatTotal) attachStatTotal.innerText = attachLeads.length;

        const attachStatNew = document.getElementById('stat-attach-new');
        if (attachStatNew) attachStatNew.innerText = attachNewCount;

        const attachStatApproved = document.getElementById('stat-attach-approved');
        if (attachStatApproved) attachStatApproved.innerText = attachApprovedCount;

        const inboxBadge = document.getElementById('inbox-new-badge');
        if (inboxBadge) {
            inboxBadge.innerText = travelCount || '0';
            inboxBadge.style.display = travelCount > 0 ? 'inline-block' : 'none';
        }

        const attachBadge = document.getElementById('badge-attachments');
        if (attachBadge) {
            attachBadge.innerText = attachCount || '0';
            attachBadge.style.display = attachCount > 0 ? 'inline-block' : 'none';
        }
    }

    function getSourceBadge(formType) {
        const ft = (formType || '').toLowerCase();
        if (ft.includes('hero') || ft.includes('planner') || ft.includes('quick')) {
            return '<span class="source-badge cab"><i class="fa-solid fa-bolt"></i> Hero Quick Enquiry</span>';
        } else if (ft.includes('custom') || ft.includes('desk')) {
            return '<span class="source-badge holiday"><i class="fa-solid fa-umbrella-beach"></i> Custom Holiday</span>';
        } else if (ft.includes('package') || ft.includes('booking')) {
            return '<span class="source-badge holiday"><i class="fa-solid fa-map-location-dot"></i> Package Booking</span>';
        } else if (ft.includes('contact')) {
            return '<span class="source-badge contact"><i class="fa-solid fa-envelope"></i> Contact Us</span>';
        } else {
            return '<span class="source-badge cab"><i class="fa-solid fa-paper-plane"></i> Direct Enquiry</span>';
        }
    }

    // ── Render Enquiries Table (Images 2, 3, 4) ──
    function renderInquiriesTable(list) {
        const tbody = document.getElementById('inquiries-tbody');
        if (!tbody) return;

        if (!list || list.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:2.5rem; color:#94A3B8;"><i class="fa-solid fa-inbox" style="font-size:2.2rem; margin-bottom:0.6rem; display:block;"></i>No customer inquiries in inbox</td></tr>';
            return;
        }

        tbody.innerHTML = list.map(item => {
            const statusClass = (item.status || 'New').toLowerCase().replace(/\s+/g, '-');
            const cleanPhone = (item.phone || '').replace(/[^0-9+]/g, '');
            const waText = encodeURIComponent(`Hello ${item.name || 'Sir/Madam'}, thank you for contacting Mithra Tours & Travels regarding your ${item.package_name || item.service || 'travel'} inquiry.`);
            const initials = getInitials(item.name);
            
            // 1. Service / Package / Destination column
            let serviceHtml = '';
            if (item.package_name) {
                serviceHtml = `<strong style="color:#B45309; font-size:0.88rem;"><i class="fa-solid fa-map-location-dot"></i> ${item.package_name}</strong><br><span style="font-size:0.75rem; color:#64748B;">${item.service || 'Holiday Package'}</span>`;
            } else if (item.drop_city) {
                serviceHtml = `<strong style="color:#B45309; font-size:0.88rem;"><i class="fa-solid fa-umbrella-beach"></i> ${item.service || 'Holiday Enquiry'}</strong><br><span style="font-size:0.78rem; font-weight:700; color:#0F172A;"><i class="fa-solid fa-location-dot" style="color:#D97706; margin-right:3px;"></i> ${item.drop_city}</span>`;
            } else if (item.service) {
                serviceHtml = `<strong style="color:#B45309; font-size:0.88rem;"><i class="fa-solid fa-car-side"></i> ${item.service}</strong>`;
            } else {
                serviceHtml = `<strong style="color:#B45309; font-size:0.88rem;">General Travel Request</strong>`;
            }

            // 2. Travel Date & Pax column (Exact from form inputs)
            let datePaxHtml = '';
            if (item.travel_date && item.travelers_count) {
                datePaxHtml = `<div style="font-size:0.82rem; font-weight:700; color:#1E293B;"><i class="fa-solid fa-calendar-day" style="color:#D97706; margin-right:4px;"></i> ${item.travel_date}</div><div style="font-size:0.76rem; color:#64748B;"><i class="fa-solid fa-users" style="margin-right:4px;"></i> ${item.travelers_count}</div>`;
            } else if (item.travel_date) {
                datePaxHtml = `<div style="font-size:0.82rem; font-weight:700; color:#1E293B;"><i class="fa-solid fa-calendar-day" style="color:#D97706; margin-right:4px;"></i> ${item.travel_date}</div>`;
            } else if (item.travelers_count) {
                datePaxHtml = `<div style="font-size:0.78rem; color:#64748B;"><i class="fa-solid fa-users" style="margin-right:4px;"></i> ${item.travelers_count}</div>`;
            } else {
                datePaxHtml = '<span style="color:#94A3B8; font-size:0.85rem;">—</span>';
            }

            // 3. Requirements / Notes column
            const notesHtml = item.message ? `<div style="max-width:210px; font-size:0.8rem; color:#475569; line-height:1.35; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;" title="${item.message.replace(/"/g, '&quot;')}">${item.message}</div>` : '<span style="color:#94A3B8; font-size:0.8rem;">—</span>';

            return `
                <tr id="inquiry-row-${item.id}">
                    <td>
                        <strong style="font-size:0.84rem;">${formatDate(item.created_at)}</strong><br>
                        <span style="font-size:0.74rem; color:#94A3B8; font-weight:700;">#LEAD-${item.id}</span>
                    </td>
                    <td>
                        ${getSourceBadge(item.form_type)}
                    </td>
                    <td>
                        <div class="customer-cell">
                            <div class="customer-avatar">${initials}</div>
                            <div>
                                <strong style="color:var(--text-primary); font-size:0.9rem;">${item.name || 'Customer'}</strong><br>
                                <span style="font-size:0.8rem; color:#64748B;"><i class="fa-solid fa-phone" style="font-size:0.72rem; color:var(--mtt-gold-600);"></i> ${item.phone || '-'}</span>
                                ${item.email ? '<br><span style="font-size:0.76rem; color:#94A3B8;">' + item.email + '</span>' : ''}
                            </div>
                        </div>
                    </td>
                    <td>
                        ${serviceHtml}
                    </td>
                    <td>
                        ${datePaxHtml}
                    </td>
                    <td>
                        ${notesHtml}
                    </td>
                    <td>
                        <select class="status-dropdown ${statusClass}" onchange="updateInquiryStatus(${item.id}, this.value)">
                            <option value="New" ${item.status === 'New' ? 'selected' : ''}>✨ New</option>
                            <option value="Contacted" ${item.status === 'Contacted' ? 'selected' : ''}>📞 Contacted</option>
                            <option value="In Progress" ${item.status === 'In Progress' ? 'selected' : ''}>⏳ In Progress</option>
                            <option value="Confirmed" ${item.status === 'Confirmed' ? 'selected' : ''}>✅ Confirmed</option>
                            <option value="Completed" ${item.status === 'Completed' ? 'selected' : ''}>🏁 Completed</option>
                            <option value="Cancelled" ${item.status === 'Cancelled' ? 'selected' : ''}>❌ Cancelled</option>
                        </select>
                    </td>
                    <td class="text-right">
                        <div class="action-btns-group">
                            <button class="btn-crm-action view" onclick="openLeadModal(${item.id})" title="View Details">
                                <i class="fa-solid fa-eye"></i> Details
                            </button>
                            <a href="https://wa.me/${cleanPhone}?text=${waText}" target="_blank" class="btn-crm-action wa" title="Chat on WhatsApp">
                                <i class="fa-brands fa-whatsapp"></i> Chat
                            </a>
                            <a href="tel:${cleanPhone}" class="btn-crm-action call" title="Call Customer">
                                <i class="fa-solid fa-phone"></i> Call
                            </a>
                            <button class="btn-crm-action del" onclick="deleteInquiryRecord(${item.id})" title="Delete Lead">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // ── Render Cab Attachments Table (Image 5) ──
    function renderAttachmentsTable(list) {
        const tbody = document.getElementById('attachments-tbody');
        if (!tbody) return;

        if (!list || list.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:2.5rem; color:#94A3B8;"><i class="fa-solid fa-car-side" style="font-size:2.2rem; margin-bottom:0.6rem; display:block;"></i>No vehicle attachment applications yet</td></tr>';
            return;
        }

        tbody.innerHTML = list.map(item => {
            const statusClass = (item.status || 'New').toLowerCase().replace(/\s+/g, '-');
            const cleanPhone = (item.phone || '').replace(/[^0-9+]/g, '');
            const waText = encodeURIComponent(`Hello ${item.name || 'Partner'}, thank you for applying for Vehicle Attachment with Mithra Tours & Travels for your ${item.car_type || 'vehicle'}.`);
            const initials = getInitials(item.name);

            return `
                <tr id="attachment-row-${item.id}">
                    <td>
                        <strong style="font-size:0.84rem;">${formatDate(item.created_at)}</strong><br>
                        <span style="font-size:0.74rem; color:#94A3B8; font-weight:700;">#ATTACH-${item.id}</span>
                    </td>
                    <td>
                        <div class="customer-cell">
                            <div class="customer-avatar" style="background:#F3E8FF; color:#7C3AED;">${initials}</div>
                            <div>
                                <strong style="color:var(--text-primary); font-size:0.9rem;">${item.name || 'Owner / Driver'}</strong><br>
                                <span style="font-size:0.8rem; color:#64748B;"><i class="fa-solid fa-phone" style="font-size:0.72rem; color:var(--mtt-gold-600);"></i> ${item.phone || '-'}</span>
                                ${item.email ? '<br><span style="font-size:0.76rem; color:#94A3B8;">' + item.email + '</span>' : ''}
                            </div>
                        </div>
                    </td>
                    <td>
                        <strong style="color:#0F172A; font-size:0.88rem;"><i class="fa-solid fa-car" style="color:#D97706; margin-right:4px;"></i> ${item.car_type || 'Vehicle'}</strong>
                        ${item.travel_date ? '<br><span style="font-size:0.75rem; font-weight:700; color:#64748B; background:#F8FAFC; border:1px solid #E2E8F0; padding:1px 6px; border-radius:4px;">Reg: ' + item.travel_date + '</span>' : ''}
                    </td>
                    <td>
                        <span style="font-size:0.82rem; font-weight:700; color:#334155;">${item.service || 'Commercial Taxi'}</span>
                    </td>
                    <td>
                        <span style="font-size:0.85rem; font-weight:700; color:#334155;"><i class="fa-solid fa-location-dot" style="color:#D97706; margin-right:4px;"></i> ${item.pickup || 'Chennai'}</span>
                    </td>
                    <td>
                        <select class="status-dropdown ${statusClass}" onchange="updateInquiryStatus(${item.id}, this.value)">
                            <option value="New" ${item.status === 'New' ? 'selected' : ''}>✨ New</option>
                            <option value="Contacted" ${item.status === 'Contacted' ? 'selected' : ''}>📞 Contacted</option>
                            <option value="Approved" ${item.status === 'Approved' || item.status === 'Confirmed' ? 'selected' : ''}>✅ Approved</option>
                            <option value="Rejected" ${item.status === 'Rejected' || item.status === 'Cancelled' ? 'selected' : ''}>❌ Rejected</option>
                        </select>
                    </td>
                    <td class="text-right">
                        <div class="action-btns-group">
                            <button class="btn-crm-action view" onclick="openLeadModal(${item.id})" title="View Details">
                                <i class="fa-solid fa-eye"></i> Details
                            </button>
                            <a href="https://wa.me/${cleanPhone}?text=${waText}" target="_blank" class="btn-crm-action wa" title="Chat on WhatsApp">
                                <i class="fa-brands fa-whatsapp"></i> Chat
                            </a>
                            <a href="tel:${cleanPhone}" class="btn-crm-action call" title="Call Partner">
                                <i class="fa-solid fa-phone"></i> Call
                            </a>
                            <button class="btn-crm-action del" onclick="deleteInquiryRecord(${item.id})" title="Delete Application">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    function renderHistoryTable(list) {
        const histBody = document.getElementById('history-tbody');
        if (!histBody) return;
        
        const historyList = (list || []).filter(i => i.status === 'Completed' || i.status === 'Confirmed' || i.status === 'Approved');
        if (historyList.length === 0) {
            histBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:2rem; color:#94A3B8;">No completed booking history found.</td></tr>';
            return;
        }

        histBody.innerHTML = historyList.map(item => `
            <tr>
                <td><strong>${formatDate(item.created_at)}</strong></td>
                <td><strong style="color:var(--text-primary);">${item.name || 'Customer'}</strong><br><span style="font-size:0.78rem; color:#64748B;">${item.phone || '-'}</span></td>
                <td>${item.package_name || item.service || item.car_type || 'Trip Booking'}</td>
                <td>${item.travel_date || item.pickup || '-'}</td>
                <td><span class="source-badge" style="background:#ECFDF5; color:#065F46; border:1px solid #A7F3D0;"><i class="fa-solid fa-circle-check"></i> ${item.status}</span></td>
                <td class="text-right"><button class="btn-crm-action view" onclick="openLeadModal(${item.id})"><i class="fa-solid fa-eye"></i> View</button></td>
            </tr>
        `).join('');
    }

    // ── Dynamic Lead Details Modal (Exact Fields for Each Form Type) ──
    window.openLeadModal = function (id) {
        const lead = currentInquiries.find(i => i.id == id);
        if (!lead) return;

        const ft = (lead.form_type || '').toLowerCase();
        const isPartner = ft.includes('attach') || ft.includes('partner');
        const isHero = ft.includes('hero') || ft.includes('planner');
        const isCustomHoliday = ft.includes('custom') || ft.includes('desk');
        const isPackage = ft.includes('package');

        const modal = document.getElementById('lead-modal');
        const badge = document.getElementById('modal-lead-badge');
        const title = document.getElementById('modal-lead-name');
        const body = document.getElementById('modal-lead-body');
        const footer = document.getElementById('modal-lead-footer');

        title.innerText = lead.name || 'Customer Lead';
        const cleanPhone = (lead.phone || '').replace(/[^0-9+]/g, '');
        const waText = encodeURIComponent(`Hello ${lead.name || 'Sir/Madam'}, regarding your inquiry with Mithra Tours & Travels:`);

        if (isPartner) {
            // Cab Attachment Form Fields (cab-attachment.html)
            badge.innerText = 'Vehicle Attachment Partner Application';
            body.innerHTML = `
                <div class="detail-grid">
                    <div class="detail-item"><label>Owner / Driver Name</label><span>${lead.name || '-'}</span></div>
                    <div class="detail-item"><label>Mobile Number</label><span>${lead.phone || '-'}</span></div>
                    <div class="detail-item"><label>Vehicle Model</label><span>${lead.car_type || '-'}</span></div>
                    <div class="detail-item"><label>Year of Registration</label><span>${lead.travel_date || '-'}</span></div>
                    <div class="detail-item"><label>Vehicle Category</label><span>${lead.service || '-'}</span></div>
                    <div class="detail-item"><label>Location in Chennai</label><span>${lead.pickup || '-'}</span></div>
                    <div class="detail-item"><label>Application Date</label><span>${formatDate(lead.created_at)}</span></div>
                    <div class="detail-item"><label>Current Status</label><span style="color:#D97706; font-weight:800;">${lead.status || 'New'}</span></div>
                </div>
                ${lead.message ? '<div class="detail-item" style="margin-bottom:1rem;"><label>Additional Notes / Permits</label><p style="font-size:0.85rem; color:#334155; margin-top:0.3rem;">' + lead.message + '</p></div>' : ''}
            `;
        } else if (isHero) {
            // Hero Dock Quick Trip Planner (index.html Hero Bar)
            badge.innerText = 'Hero Quick Trip Enquiry';
            body.innerHTML = `
                <div class="detail-grid">
                    <div class="detail-item"><label>Full Name</label><span>${lead.name || '-'}</span></div>
                    <div class="detail-item"><label>Contact Number</label><span>${lead.phone || '-'}</span></div>
                    <div class="detail-item"><label>Service Required</label><span>${lead.service || '-'}</span></div>
                    <div class="detail-item"><label>Travel Date</label><span>${lead.travel_date || 'Any Date'}</span></div>
                    <div class="detail-item"><label>Submitted Date</label><span>${formatDate(lead.created_at)}</span></div>
                    <div class="detail-item"><label>Current Status</label><span style="color:#D97706; font-weight:800;">${lead.status || 'New'}</span></div>
                </div>
                ${lead.message ? '<div class="detail-item" style="margin-bottom:1rem;"><label>Requirement Details</label><p style="font-size:0.85rem; color:#334155; margin-top:0.3rem;">' + lead.message + '</p></div>' : ''}
            `;
        } else if (isCustomHoliday) {
            // Custom Holiday Desk Form (holidays.html)
            badge.innerText = 'Custom Holiday & Booking Enquiry';
            body.innerHTML = `
                <div class="detail-grid">
                    <div class="detail-item"><label>Your Name</label><span>${lead.name || '-'}</span></div>
                    <div class="detail-item"><label>Mobile Number</label><span>${lead.phone || '-'}</span></div>
                    <div class="detail-item"><label>Destination / Route</label><span>${lead.drop_city || lead.package_name || '-'}</span></div>
                    <div class="detail-item"><label>Approx. Travel Date</label><span>${lead.travel_date || '-'}</span></div>
                    <div class="detail-item"><label>Service Category</label><span>${lead.service || '-'}</span></div>
                    <div class="detail-item"><label>No. of Travellers</label><span>${lead.travelers_count || '-'}</span></div>
                    <div class="detail-item"><label>Submitted Date</label><span>${formatDate(lead.created_at)}</span></div>
                    <div class="detail-item"><label>Current Status</label><span style="color:#D97706; font-weight:800;">${lead.status || 'New'}</span></div>
                </div>
                ${lead.message ? '<div class="detail-item" style="margin-bottom:1rem;"><label>Requirement Details / Notes</label><p style="font-size:0.85rem; color:#334155; margin-top:0.3rem;">' + lead.message + '</p></div>' : ''}
            `;
        } else if (isPackage) {
            // Package Detail Booking Widget (holidays/*.html)
            badge.innerText = 'Holiday Package Booking Widget';
            body.innerHTML = `
                <div class="detail-grid">
                    <div class="detail-item" style="grid-column:1 / -1;"><label>Package Title</label><span style="color:#B45309; font-weight:800;">${lead.package_name || 'Holiday Package'}</span></div>
                    <div class="detail-item"><label>Customer Name</label><span>${lead.name || '-'}</span></div>
                    <div class="detail-item"><label>Phone Number</label><span>${lead.phone || '-'}</span></div>
                    <div class="detail-item"><label>Travel Date</label><span>${lead.travel_date || '-'}</span></div>
                    <div class="detail-item"><label>Travelers</label><span>${lead.travelers_count || '-'}</span></div>
                    <div class="detail-item"><label>Submitted Date</label><span>${formatDate(lead.created_at)}</span></div>
                    <div class="detail-item"><label>Current Status</label><span style="color:#D97706; font-weight:800;">${lead.status || 'New'}</span></div>
                </div>
                ${lead.message ? '<div class="detail-item" style="margin-bottom:1rem;"><label>Custom Requirements / Notes</label><p style="font-size:0.85rem; color:#334155; margin-top:0.3rem;">' + lead.message + '</p></div>' : ''}
            `;
        } else {
            // Direct Home / Contact Us Form (contact.html / index.html)
            badge.innerText = lead.form_type || 'Direct Travel Enquiry';
            body.innerHTML = `
                <div class="detail-grid">
                    <div class="detail-item"><label>Customer Name</label><span>${lead.name || '-'}</span></div>
                    <div class="detail-item"><label>Mobile Number</label><span>${lead.phone || '-'}</span></div>
                    <div class="detail-item"><label>Service Category</label><span>${lead.service || 'General Inquiry'}</span></div>
                    <div class="detail-item"><label>Submitted Date</label><span>${formatDate(lead.created_at)}</span></div>
                    <div class="detail-item"><label>Current Status</label><span style="color:#D97706; font-weight:800;">${lead.status || 'New'}</span></div>
                </div>
                ${lead.message ? '<div class="detail-item" style="margin-bottom:1rem;"><label>Message / Requirement Details</label><p style="font-size:0.85rem; color:#334155; margin-top:0.3rem;">' + lead.message + '</p></div>' : ''}
            `;
        }

        footer.innerHTML = `
            <div style="display:flex; gap:0.5rem;">
                <a href="https://wa.me/${cleanPhone}?text=${waText}" target="_blank" class="btn-crm-action wa" style="padding:0.55rem 1rem;"><i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp</a>
                <a href="tel:${cleanPhone}" class="btn-crm-action call" style="padding:0.55rem 1rem;"><i class="fa-solid fa-phone"></i> Call Now</a>
            </div>
            <button type="button" class="btn-draft-cms" onclick="closeLeadModal()">Close</button>
        `;

        modal.classList.add('show');
    };

    window.closeLeadModal = function () {
        document.getElementById('lead-modal')?.classList.remove('show');
    };

    window.updateInquiryStatus = async function (id, newStatus) {
        try {
            showAdminToast(`Updating lead #${id}...`, 'draft');
            const res = await fetch(`${API_BASE}update_status.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id, status: newStatus })
            });
            const data = await res.json();
            if (data.success) {
                showAdminToast(`Lead #${id} updated to ${newStatus}`);
                loadInquiries();
            } else {
                showAdminToast('Failed to update status', 'error');
            }
        } catch(e) {
            showAdminToast('Status updated locally');
        }
    };

    window.deleteInquiryRecord = async function (id) {
        if (!confirm(`Are you sure you want to permanently delete lead #${id}?\nThis action cannot be undone.`)) return;
        try {
            const res = await fetch(`${API_BASE}delete_inquiry.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id })
            });
            const data = await res.json();
            if (data.success) {
                showAdminToast(`Lead #${id} deleted successfully`);
                loadInquiries();
            } else {
                showAdminToast('Failed to delete lead', 'error');
            }
        } catch(e) {
            showAdminToast(`Lead #${id} removed`);
            document.getElementById(`inquiry-row-${id}`)?.remove();
            document.getElementById(`attachment-row-${id}`)?.remove();
        }
    };

    window.filterInquiries = function () {
        const query = document.getElementById('inquiries-search')?.value.toLowerCase() || '';
        const source = document.getElementById('filter-source')?.value || 'all';
        const status = document.getElementById('filter-status')?.value || 'all';

        const filtered = currentInquiries.filter(i => {
            const ft = (i.form_type || '').toLowerCase();
            const isAttach = ft.includes('attach') || ft.includes('partner') || ft.includes('cab attach');
            if (isAttach) return false; // Attachments are handled in their own tab

            const matchesQuery = !query || 
                (i.name && i.name.toLowerCase().includes(query)) ||
                (i.phone && i.phone.toLowerCase().includes(query)) ||
                (i.package_name && i.package_name.toLowerCase().includes(query)) ||
                (i.service && i.service.toLowerCase().includes(query)) ||
                (i.pickup && i.pickup.toLowerCase().includes(query));

            const matchesSource = (source === 'all') || (i.form_type && i.form_type.toLowerCase().includes(source.toLowerCase()));
            const matchesStatus = (status === 'all') || (i.status === status);

            return matchesQuery && matchesSource && matchesStatus;
        });

        renderInquiriesTable(filtered);
    };

    window.filterAttachments = function () {
        const query = document.getElementById('attachments-search')?.value.toLowerCase() || '';
        const category = document.getElementById('filter-attach-category')?.value || 'all';
        const status = document.getElementById('filter-attach-status')?.value || 'all';

        const filtered = currentInquiries.filter(i => {
            const ft = (i.form_type || '').toLowerCase();
            const isAttach = ft.includes('attach') || ft.includes('partner') || ft.includes('cab attach');
            if (!isAttach) return false;

            const matchesQuery = !query || 
                (i.name && i.name.toLowerCase().includes(query)) ||
                (i.phone && i.phone.toLowerCase().includes(query)) ||
                (i.car_type && i.car_type.toLowerCase().includes(query)) ||
                (i.pickup && i.pickup.toLowerCase().includes(query));

            const matchesCategory = (category === 'all') || (i.service && i.service.toLowerCase().includes(category.toLowerCase()));
            const matchesStatus = (status === 'all') || (i.status === status);

            return matchesQuery && matchesCategory && matchesStatus;
        });

        renderAttachmentsTable(filtered);
    };

    window.exportInquiriesCSV = function () {
        let csv = 'ID,Form Type,Customer Name,Phone,Email,Service,Package,Pickup,Drop,Car,Date,Travelers,Status,Created At\n';
        currentInquiries.forEach(i => {
            csv += `"${i.id}","${i.form_type || ''}","${i.name || ''}","${i.phone || ''}","${i.email || ''}","${i.service || ''}","${i.package_name || ''}","${i.pickup || ''}","${i.drop_city || ''}","${i.car_type || ''}","${i.travel_date || ''}","${i.travelers_count || ''}","${i.status || ''}","${i.created_at || ''}"\n`;
        });
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mithra_leads_${new Date().toISOString().slice(0,10)}.csv`;
        a.click();
    };

    // ── 3. Content Management System (CMS) Logic ──
    async function loadCMSContent() {
        try {
            const res = await fetch('../api/get_cms_content.php?v=' + Date.now());
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.content) {
                    currentCMSData = data.content;
                }
            }
        } catch(e) {
            console.warn('CMS API offline, using local data store');
        }
    }

    function populateHomeCMS() {
        const hols = currentCMSData.home?.holidaysSection || {};
        const dom = hols.domesticCard || {};
        const intl = hols.intlCard || {};

        const setVal = (id, v) => { const el = document.getElementById(id); if (el && v !== undefined) el.value = v; };

        setVal('cms-hols-label', hols.sectionLabel || 'Travel & Holidays');
        setVal('cms-hols-title', hols.sectionTitle || 'Domestic & International Holiday Packages');
        setVal('cms-hols-desc', hols.sectionDesc || 'Domestic & International Holiday Packages, Flight / Train / Cruise Booking, Visa Assistance.');

        setVal('cms-hols-dom-title', dom.title || 'Kodaikanal, Rajasthan, Tawang & More');
        setVal('cms-hols-dom-desc', dom.desc || 'Curated holiday experiences for families, couples, and groups with flexible itineraries and verified transfers.');
        setVal('cms-hols-dom-image', dom.image || 'Assets/holiday_kodaikanal.jpg');

        setVal('cms-hols-intl-title', intl.title || 'Singapore, Vietnam, Dubai & Beyond');
        setVal('cms-hols-intl-desc', intl.desc || 'Well-planned international holidays with customised itineraries, flights, visa assistance, and luxury stays.');
        setVal('cms-hols-intl-image', intl.image || 'Assets/holiday_singapore.jpg');

        updateHolidaysPreview();
    }

    window.updateHolidaysPreview = function () {
        const domTitle = document.getElementById('cms-hols-dom-title')?.value || 'Kodaikanal, Rajasthan, Tawang & More';
        const domDesc = document.getElementById('cms-hols-dom-desc')?.value || 'Curated holiday experiences...';
        const domImg = document.getElementById('cms-hols-dom-image')?.value || 'Assets/holiday_kodaikanal.jpg';

        const intlTitle = document.getElementById('cms-hols-intl-title')?.value || 'Singapore, Vietnam, Dubai & Beyond';
        const intlDesc = document.getElementById('cms-hols-intl-desc')?.value || 'Well-planned international holidays...';
        const intlImg = document.getElementById('cms-hols-intl-image')?.value || 'Assets/holiday_singapore.jpg';

        const mockDomImg = document.getElementById('mock-dom-img');
        if (mockDomImg) {
            mockDomImg.src = resolveAssetUrl(domImg);
            mockDomImg.onerror = function() { this.src = 'https://mithratoursandtravels.in/' + resolveAssetUrl(domImg); };
        }
        const mockDomTitle = document.getElementById('mock-dom-title');
        if (mockDomTitle) mockDomTitle.innerText = domTitle;
        const mockDomDesc = document.getElementById('mock-dom-desc');
        if (mockDomDesc) mockDomDesc.innerText = domDesc;

        const mockIntlImg = document.getElementById('mock-intl-img');
        if (mockIntlImg) {
            mockIntlImg.src = resolveAssetUrl(intlImg);
            mockIntlImg.onerror = function() { this.src = 'https://mithratoursandtravels.in/' + resolveAssetUrl(intlImg); };
        }
        const mockIntlTitle = document.getElementById('mock-intl-title');
        if (mockIntlTitle) mockIntlTitle.innerText = intlTitle;
        const mockIntlDesc = document.getElementById('mock-intl-desc');
        if (mockIntlDesc) mockIntlDesc.innerText = intlDesc;

        const thumbDom = document.getElementById('cms-hols-dom-thumb');
        if (thumbDom) {
            thumbDom.src = resolveAssetUrl(domImg);
            thumbDom.onerror = function() { this.src = 'https://mithratoursandtravels.in/' + resolveAssetUrl(domImg); };
        }
        const thumbIntl = document.getElementById('cms-hols-intl-thumb');
        if (thumbIntl) {
            thumbIntl.src = resolveAssetUrl(intlImg);
            thumbIntl.onerror = function() { this.src = 'https://mithratoursandtravels.in/' + resolveAssetUrl(intlImg); };
        }
    };

    window.selectHomeCardPreset = function (cardType, imgPath) {
        const inputId = (cardType === 'domestic') ? 'cms-hols-dom-image' : 'cms-hols-intl-image';
        const input = document.getElementById(inputId);
        if (input) {
            input.value = imgPath;
            updateHolidaysPreview();
            showAdminToast(`Applied preset photo "${imgPath}"`);
        }
    };

    window.handleHomeCardImageDrop = function (e, cardType) {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = function (evt) {
                const b64 = evt.target.result;
                const inputId = (cardType === 'domestic') ? 'cms-hols-dom-image' : 'cms-hols-intl-image';
                const input = document.getElementById(inputId);
                if (input) {
                    input.value = b64;
                    updateHolidaysPreview();
                    showAdminToast(`Loaded custom photo for ${cardType} holidays card`);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    window.triggerHomeCardFileInput = function (cardType) {
        const inputId = (cardType === 'domestic') ? 'file-upload-dom-card' : 'file-upload-intl-card';
        document.getElementById(inputId)?.click();
    };

    // ── Live Package Preview Card Generator ──
    window.updatePackageLivePreview = function (type) {
        const isDomestic = (type === 'domestic');
        const mockupEl = document.getElementById(isDomestic ? 'domestic-live-mockup' : 'intl-live-mockup');
        if (!mockupEl) return;

        const container = document.getElementById(isDomestic ? 'domestic-editor-content' : 'intl-editor-content');
        if (!container) return;

        const title = container.querySelector('#pkg-title')?.value || 'Package Title';
        const subtitle = container.querySelector('#pkg-subtitle')?.value || 'Package Tagline';
        const price = container.querySelector('#pkg-price')?.value || '₹0';
        const pricePer = container.querySelector('#pkg-priceper')?.value || 'per person';
        const durationBadge = container.querySelector('#pkg-duration-badge')?.value || '3N / 4D';
        const bestFor = container.querySelector('#pkg-bestfor')?.value || 'Best for';
        const region = container.querySelector('#pkg-region')?.value || 'Destination';
        const image = container.querySelector('#pkg-image')?.value || (isDomestic ? 'Assets/holiday_kodaikanal.jpg' : 'Assets/holiday_singapore.jpg');
        const overview = container.querySelector('#pkg-overview')?.value || '';

        const thumb = container.querySelector('#pkg-image-preview-thumb');
        if (thumb) {
            thumb.src = resolveAssetUrl(image);
            thumb.onerror = function() { this.src = 'https://mithratoursandtravels.in/' + resolveAssetUrl(image); };
        }

        mockupEl.innerHTML = `
            <div style="font-size:0.82rem; font-weight:800; color:#B45309; text-transform:uppercase; margin-bottom:0.9rem; display:flex; align-items:center; gap:0.45rem;">
                <i class="fa-solid fa-eye"></i> Live Package Preview Card
            </div>
            <div style="display:flex; gap:1.4rem; flex-wrap:wrap; align-items:flex-start;">
                <div style="width:190px; flex-shrink:0; border-radius:12px; overflow:hidden; border:1px solid #E2E8F0; position:relative;">
                    <img src="${resolveAssetUrl(image)}" alt="${title}" style="width:100%; height:130px; object-fit:cover; display:block;" onerror="this.src='https://mithratoursandtravels.in/Assets/Site_Logo.png'">
                    <span style="position:absolute; top:8px; left:8px; background:rgba(15,23,42,0.88); color:#FDE68A; font-size:0.72rem; font-weight:800; padding:2px 8px; border-radius:10px;">${durationBadge}</span>
                </div>
                <div style="flex:1; min-width:260px;">
                    <div style="display:flex; gap:0.5rem; margin-bottom:0.4rem; flex-wrap:wrap;">
                        <span style="font-size:0.75rem; font-weight:800; background:#F8FAFC; border:1px solid #E2E8F0; padding:2px 8px; border-radius:6px; color:#334155;"><i class="fa-solid fa-map-pin"></i> ${region}</span>
                        <span style="font-size:0.75rem; font-weight:800; background:#EFF6FF; border:1px solid #BFDBFE; padding:2px 8px; border-radius:6px; color:#1D4ED8;"><i class="fa-solid fa-users"></i> ${bestFor}</span>
                    </div>
                    <h3 style="font-size:1.25rem; font-weight:800; color:#0F172A; margin:0.15rem 0;">${title}</h3>
                    <div style="font-size:0.84rem; font-weight:700; color:#64748B; margin-bottom:0.4rem;">${subtitle}</div>
                    <p style="font-size:0.84rem; color:#64748B; line-height:1.45;">${overview}</p>
                </div>
                <div style="text-align:right; background:#F8FAFC; border:1px solid #E2E8F0; padding:0.85rem 1.3rem; border-radius:12px; flex-shrink:0;">
                    <span style="font-size:0.72rem; font-weight:800; color:#64748B; text-transform:uppercase;">Starting From</span>
                    <div style="font-size:1.45rem; font-weight:900; color:#0F172A;">${price}</div>
                    <span style="font-size:0.76rem; color:#64748B;">${pricePer}</span>
                </div>
            </div>
        `;
    };

    window.selectImagePreset = function (type, imagePath) {
        const isDomestic = (type === 'domestic');
        const container = document.getElementById(isDomestic ? 'domestic-editor-content' : 'intl-editor-content');
        if (!container) return;
        const input = container.querySelector('#pkg-image');
        if (input) {
            input.value = imagePath;
            updatePackageLivePreview(type);
            showAdminToast(`Applied preset photo "${imagePath}"`);
        }
    };

    window.handleImageDrop = function (e, type) {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = function (evt) {
                const b64 = evt.target.result;
                const isDomestic = (type === 'domestic');
                const container = document.getElementById(isDomestic ? 'domestic-editor-content' : 'intl-editor-content');
                if (container) {
                    const input = container.querySelector('#pkg-image');
                    if (input) {
                        input.value = b64;
                        updatePackageLivePreview(type);
                        showAdminToast(`Loaded photo for ${type} package`);
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    };

    window.triggerFileInput = function (type) {
        const isDomestic = (type === 'domestic');
        const container = document.getElementById(isDomestic ? 'domestic-editor-content' : 'intl-editor-content');
        container?.querySelector('#pkg-file-upload')?.click();
    };

    // ── Package CMS Renderer (Full Page Detail Builder with Section 6 Notes) ──
    function renderPackageCMS() {
        const isDomestic = (activeNavTab === 'cms-domestic');
        const pkgStore = isDomestic ? currentCMSData.domestic_packages : currentCMSData.international_packages;
        if (!pkgStore) return;

        const type = isDomestic ? 'domestic' : 'international';
        const selectedId = isDomestic ? selectedDomesticPkg : selectedIntlPkg;
        const pillsContainer = document.getElementById(isDomestic ? 'domestic-pkg-pills' : 'intl-pkg-pills');
        const contentContainer = document.getElementById(isDomestic ? 'domestic-editor-content' : 'intl-editor-content');
        const indicatorEl = document.getElementById(isDomestic ? 'domestic-pkg-indicator' : 'intl-pkg-indicator');

        // Render Package Selector Pills
        if (pillsContainer) {
            pillsContainer.innerHTML = Object.keys(pkgStore).map(key => {
                const p = pkgStore[key];
                const activeCls = (key === selectedId) ? 'active' : '';
                return `
                    <button type="button" class="pkg-pill-btn ${activeCls}" onclick="selectPackageTab('${type}', '${key}')">
                        <div>
                            <strong style="font-size:0.88rem; display:block; color:var(--text-primary);">${p.title || key}</strong>
                            <span style="font-size:0.75rem; color:#64748B;"><i class="fa-solid fa-clock"></i> ${p.duration || '3N / 4D'} &middot; ${p.region || 'Tour'}</span>
                        </div>
                        <span class="tag">${p.price || '₹0'}</span>
                    </button>
                `;
            }).join('');
        }

        const pkg = pkgStore[selectedId];
        if (!pkg || !contentContainer) return;

        if (indicatorEl) indicatorEl.innerText = `${selectedId.replace(/[^0-9]/g, '')}: ${pkg.title || 'Package'}`;

        // Render Package Edit Form with all 6 numbered sections
        contentContainer.innerHTML = `
            <!-- Section 1: Hero & Media -->
            <div class="cms-card">
                <h3><i class="fa-solid fa-camera"></i> 1. Hero Banner Image &amp; Media Asset</h3>
                <div class="upload-dropzone" 
                     ondragover="event.preventDefault(); this.classList.add('dragover');" 
                     ondragleave="this.classList.remove('dragover');" 
                     ondrop="handleImageDrop(event, '${type}')" 
                     onclick="triggerFileInput('${type}')">
                    <input type="file" id="pkg-file-upload" style="display:none;" accept="image/*" onchange="handleImageDrop(event, '${type}')">
                    <div class="dropzone-icon"><i class="fa-solid fa-cloud-arrow-up"></i></div>
                    <div class="dropzone-title">Drag &amp; drop package banner photo or <span style="color:#B45309; text-decoration:underline; font-weight:700;">browse files</span></div>
                    <div class="dropzone-dimensions-badge">
                        <i class="fa-solid fa-ruler-combined"></i> Exact Dimensions: <strong>1600 x 900 px</strong> (16:9 Ratio) &middot; WEBP / JPG &middot; Max 5 MB
                    </div>
                </div>

                <div class="preset-picker-row">
                    <span style="font-size:0.76rem; font-weight:800; color:#64748B; text-transform:uppercase;">Quick Presets:</span>
                    <button type="button" class="preset-thumb-btn" onclick="selectImagePreset('${type}', 'Assets/holiday_kodaikanal.jpg')"><img src="Assets/holiday_kodaikanal.jpg" onerror="this.src='https://mithratoursandtravels.in/Assets/holiday_kodaikanal.jpg'" alt="Kodai"> <span>Kodaikanal</span></button>
                    <button type="button" class="preset-thumb-btn" onclick="selectImagePreset('${type}', 'Assets/holiday_rajasthan.jpg')"><img src="Assets/holiday_rajasthan.jpg" onerror="this.src='https://mithratoursandtravels.in/Assets/holiday_rajasthan.jpg'" alt="Rajasthan"> <span>Rajasthan</span></button>
                    <button type="button" class="preset-thumb-btn" onclick="selectImagePreset('${type}', 'Assets/holiday_tawang.jpg')"><img src="Assets/holiday_tawang.jpg" onerror="this.src='https://mithratoursandtravels.in/Assets/holiday_tawang.jpg'" alt="Tawang"> <span>Tawang</span></button>
                    <button type="button" class="preset-thumb-btn" onclick="selectImagePreset('${type}', 'Assets/holiday_singapore.jpg')"><img src="Assets/holiday_singapore.jpg" onerror="this.src='https://mithratoursandtravels.in/Assets/holiday_singapore.jpg'" alt="Singapore"> <span>Singapore</span></button>
                    <button type="button" class="preset-thumb-btn" onclick="selectImagePreset('${type}', 'Assets/holiday_vietnam.jpg')"><img src="Assets/holiday_vietnam.jpg" onerror="this.src='https://mithratoursandtravels.in/Assets/holiday_vietnam.jpg'" alt="Vietnam"> <span>Vietnam</span></button>
                    <button type="button" class="preset-thumb-btn" onclick="selectImagePreset('${type}', 'Assets/holiday_dubai.jpg')"><img src="Assets/holiday_dubai.jpg" onerror="this.src='https://mithratoursandtravels.in/Assets/holiday_dubai.jpg'" alt="Dubai"> <span>Dubai</span></button>
                </div>

                <div class="cms-form-row" style="align-items:center; margin-top:1rem;">
                    <div style="width:85px; height:56px; border-radius:8px; overflow:hidden; border:1px solid #E2E8F0; flex-shrink:0;">
                        <img id="pkg-image-preview-thumb" src="${resolveAssetUrl(pkg.image || (isDomestic ? 'Assets/holiday_kodaikanal.jpg' : 'Assets/holiday_singapore.jpg'))}" onerror="this.src='https://mithratoursandtravels.in/Assets/holiday_kodaikanal.jpg'" alt="Preview" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div class="cms-form-group" style="flex:1; margin-bottom:0;">
                        <label>Active Image File Path</label>
                        <input type="text" id="pkg-image" class="cms-input" value="${pkg.image || ''}" oninput="updatePackageLivePreview('${type}')" placeholder="Assets/holiday_kodaikanal.jpg">
                    </div>
                </div>
            </div>

            <!-- Section 2: Header Titles & Pricing -->
            <div class="cms-card">
                <h3><i class="fa-solid fa-tag"></i> 2. Package Titles &amp; Pricing</h3>
                
                <div class="cms-form-row">
                    <div class="cms-form-group">
                        <label>Destination / Region Name</label>
                        <input type="text" id="pkg-region" class="cms-input" value="${pkg.region || ''}" oninput="updatePackageLivePreview('${type}')" placeholder="e.g. Tamil Nadu, India">
                    </div>
                    <div class="cms-form-group">
                        <label>Package Title (H1)</label>
                        <input type="text" id="pkg-title" class="cms-input" value="${pkg.title || ''}" oninput="updatePackageLivePreview('${type}')" placeholder="e.g. Kodaikanal • Poombarai • Mannavanur">
                    </div>
                </div>

                <div class="cms-form-group">
                    <label>Package Tagline / Subtitle</label>
                    <input type="text" id="pkg-subtitle" class="cms-input" value="${pkg.subtitle || ''}" oninput="updatePackageLivePreview('${type}')" placeholder="e.g. Princess of Hill Stations & Scenic Valleys Tour">
                </div>

                <div class="cms-form-row">
                    <div class="cms-form-group">
                        <label>Starting Price Display</label>
                        <input type="text" id="pkg-price" class="cms-input" value="${pkg.price || '₹12,999'}" oninput="updatePackageLivePreview('${type}')" placeholder="₹12,999">
                    </div>
                    <div class="cms-form-group">
                        <label>Price Unit Label</label>
                        <input type="text" id="pkg-priceper" class="cms-input" value="${pkg.pricePer || 'per person'}" oninput="updatePackageLivePreview('${type}')" placeholder="per person">
                    </div>
                    <div class="cms-form-group">
                        <label>Duration Pill Badge</label>
                        <input type="text" id="pkg-duration-badge" class="cms-input" value="${pkg.durationBadge || '3N / 4D'}" oninput="updatePackageLivePreview('${type}')" placeholder="3N / 4D">
                    </div>
                    <div class="cms-form-group">
                        <label>Full Duration Text</label>
                        <input type="text" id="pkg-duration" class="cms-input" value="${pkg.duration || '4 Days / 3 Nights'}" oninput="updatePackageLivePreview('${type}')" placeholder="4 Days / 3 Nights">
                    </div>
                </div>

                <div class="cms-form-group">
                    <label>Best For (Target Audience)</label>
                    <input type="text" id="pkg-bestfor" class="cms-input" value="${pkg.bestFor || ''}" oninput="updatePackageLivePreview('${type}')" placeholder="Families • Couples • Groups • Nature Lovers">
                </div>

                <div class="cms-form-group">
                    <label>Full Overview Paragraph</label>
                    <textarea id="pkg-overview" class="cms-textarea" rows="3" oninput="updatePackageLivePreview('${type}')">${pkg.overview || ''}</textarea>
                </div>
            </div>

            <!-- Section 3: Highlights & Badges -->
            <div class="cms-card">
                <h3><i class="fa-solid fa-star"></i> 3. Key Highlights &amp; Attractions (Tag Pills)</h3>
                <div id="highlights-container" class="bullet-points-list">
                    ${(pkg.highlights || []).map((hl, hIdx) => `
                        <div class="bullet-row">
                            <input type="text" class="cms-input pkg-highlight-input" value="${hl}" placeholder="Key Attraction (e.g. Kodaikanal Lake)">
                            <button type="button" class="btn-del-bullet" onclick="this.closest('.bullet-row').remove()">&times;</button>
                        </div>
                    `).join('')}
                </div>
                <button type="button" class="btn-add-bullet" onclick="addHighlightInput('${type}')" style="margin-top:0.4rem;"><i class="fa-solid fa-plus"></i> Add Highlight Tag</button>
            </div>

            <!-- Section 4: Day-by-Day Itinerary Builder -->
            <div class="cms-card">
                <h3><i class="fa-solid fa-map-location-dot"></i> 4. Day-by-Day Detailed Itinerary Builder</h3>
                <div id="itinerary-days-container">
                    ${(pkg.itinerary || []).map((day, dIdx) => `
                        <div class="itinerary-day-box" id="day-box-${dIdx}">
                            <div class="day-header-row">
                                <span class="day-badge">${day.day || `Day ${dIdx + 1}`}</span>
                                <button type="button" class="btn-remove-day" onclick="removeItineraryDay('${type}', ${dIdx})"><i class="fa-solid fa-trash"></i> Remove Day</button>
                            </div>
                            <div class="cms-form-group">
                                <label>Day Title</label>
                                <input type="text" id="day-title-${dIdx}" class="cms-input" value="${day.title || ''}">
                            </div>
                            <div class="cms-form-group">
                                <label>Day Description</label>
                                <input type="text" id="day-desc-${dIdx}" class="cms-input" value="${day.desc || ''}">
                            </div>
                            <label style="font-size:0.78rem; font-weight:700; color:#475569;">Key Sightseeing / Activity Points:</label>
                            <div class="bullet-points-list" id="day-bullets-${dIdx}">
                                ${(day.points || []).map((pt, pIdx) => `
                                    <div class="bullet-row">
                                        <input type="text" class="cms-input day-bullet-input-${dIdx}" value="${pt}">
                                        <button type="button" class="btn-del-bullet" onclick="this.closest('.bullet-row').remove()">&times;</button>
                                    </div>
                                `).join('')}
                            </div>
                            <button type="button" class="btn-add-bullet" onclick="addBulletPoint('${type}', ${dIdx})"><i class="fa-solid fa-plus"></i> Add Point</button>
                        </div>
                    `).join('')}
                </div>
                <button type="button" class="btn-add-day" onclick="addItineraryDay('${type}')"><i class="fa-solid fa-calendar-plus"></i> Add New Itinerary Day</button>
            </div>

            <!-- Section 5: Inclusions & Exclusions -->
            <div class="cms-card">
                <h3><i class="fa-solid fa-list-check"></i> 5. Inclusions &amp; Exclusions</h3>
                <div class="cms-grid">
                    <div>
                        <h4 style="font-size:0.92rem; color:#059669; margin-bottom:0.5rem;"><i class="fa-solid fa-circle-check"></i> Inclusions</h4>
                        <div id="inclusions-container" class="bullet-points-list">
                            ${(pkg.inclusions || []).map((inc, iIdx) => `
                                <div class="bullet-row">
                                    <input type="text" class="cms-input pkg-inclusion-input" value="${inc}">
                                    <button type="button" class="btn-del-bullet" onclick="this.closest('.bullet-row').remove()">&times;</button>
                                </div>
                            `).join('')}
                        </div>
                        <button type="button" class="btn-add-bullet" onclick="addInclusionInput('${type}')"><i class="fa-solid fa-plus"></i> Add Inclusion</button>
                    </div>

                    <div>
                        <h4 style="font-size:0.92rem; color:#DC2626; margin-bottom:0.5rem;"><i class="fa-solid fa-circle-xmark"></i> Exclusions</h4>
                        <div id="exclusions-container" class="bullet-points-list">
                            ${(pkg.exclusions || []).map((exc, eIdx) => `
                                <div class="bullet-row">
                                    <input type="text" class="cms-input pkg-exclusion-input" value="${exc}">
                                    <button type="button" class="btn-del-bullet" onclick="this.closest('.bullet-row').remove()">&times;</button>
                                </div>
                            `).join('')}
                        </div>
                        <button type="button" class="btn-add-bullet" onclick="addExclusionInput('${type}')"><i class="fa-solid fa-plus"></i> Add Exclusion</button>
                    </div>
                </div>
            </div>

            <!-- Section 6: Important Notes & Booking Policy -->
            <div class="cms-card">
                <h3><i class="fa-solid fa-shield-halved"></i> 6. Important Notes &amp; Booking Policy</h3>
                <div class="cms-grid">
                    <div>
                        <h4 style="font-size:0.92rem; color:#B45309; margin-bottom:0.5rem;"><i class="fa-solid fa-circle-info"></i> Travel Notes &amp; Flexibility</h4>
                        <div id="travel-notes-container" class="bullet-points-list">
                            ${(pkg.travel_notes || [
                                "Hotel and room categories are subject to availability at the time of final booking.",
                                "Equivalent premium accommodation may be offered if specified hotels are unavailable.",
                                "Sightseeing is subject to weather, road conditions, and local administrative timings.",
                                "Travel times may vary based on traffic and mountain road regulations.",
                                "The itinerary is 100% customizable based on your group preferences and arrival schedule."
                            ]).map((note, nIdx) => `
                                <div class="bullet-row">
                                    <input type="text" class="cms-input pkg-travel-note-input" value="${note}">
                                    <button type="button" class="btn-del-bullet" onclick="this.closest('.bullet-row').remove()">&times;</button>
                                </div>
                            `).join('')}
                        </div>
                        <button type="button" class="btn-add-bullet" onclick="addTravelNoteInput('${type}')"><i class="fa-solid fa-plus"></i> Add Travel Note</button>
                    </div>

                    <div>
                        <h4 style="font-size:0.92rem; color:#0F172A; margin-bottom:0.5rem;"><i class="fa-solid fa-handshake"></i> Booking Confirmation &amp; Transparency</h4>
                        <div id="booking-policy-container" class="bullet-points-list">
                            ${(pkg.booking_policy || [
                                "Booking confirmed upon receipt of the agreed advance deposit.",
                                "Final hotel, vehicle, and package quotation confirmed with detailed digital invoice.",
                                "Applicable GST and invoice details communicated clearly before payment."
                            ]).map((pol, pIdx) => `
                                <div class="bullet-row">
                                    <input type="text" class="cms-input pkg-booking-policy-input" value="${pol}">
                                    <button type="button" class="btn-del-bullet" onclick="this.closest('.bullet-row').remove()">&times;</button>
                                </div>
                            `).join('')}
                        </div>
                        <button type="button" class="btn-add-bullet" onclick="addBookingPolicyInput('${type}')"><i class="fa-solid fa-plus"></i> Add Booking Policy</button>
                    </div>
                </div>
            </div>
        `;

        updatePackageLivePreview(type);
    }

    window.selectPackageTab = function (type, key) {
        if (type === 'domestic') selectedDomesticPkg = key;
        else selectedIntlPkg = key;
        renderPackageCMS();
    };

    window.addHighlightInput = function (type) {
        const isDomestic = (type === 'domestic');
        const container = document.getElementById(isDomestic ? 'domestic-editor-content' : 'intl-editor-content');
        const c = container?.querySelector('#highlights-container');
        if (!c) return;
        const row = document.createElement('div');
        row.className = 'bullet-row';
        row.innerHTML = `<input type="text" class="cms-input pkg-highlight-input" placeholder="New Highlight Tag"><button type="button" class="btn-del-bullet" onclick="this.closest('.bullet-row').remove()">&times;</button>`;
        c.appendChild(row);
    };

    window.addInclusionInput = function (type) {
        const isDomestic = (type === 'domestic');
        const container = document.getElementById(isDomestic ? 'domestic-editor-content' : 'intl-editor-content');
        const c = container?.querySelector('#inclusions-container');
        if (!c) return;
        const row = document.createElement('div');
        row.className = 'bullet-row';
        row.innerHTML = `<input type="text" class="cms-input pkg-inclusion-input" placeholder="New Included Amenity"><button type="button" class="btn-del-bullet" onclick="this.closest('.bullet-row').remove()">&times;</button>`;
        c.appendChild(row);
    };

    window.addExclusionInput = function (type) {
        const isDomestic = (type === 'domestic');
        const container = document.getElementById(isDomestic ? 'domestic-editor-content' : 'intl-editor-content');
        const c = container?.querySelector('#exclusions-container');
        if (!c) return;
        const row = document.createElement('div');
        row.className = 'bullet-row';
        row.innerHTML = `<input type="text" class="cms-input pkg-exclusion-input" placeholder="New Excluded Item"><button type="button" class="btn-del-bullet" onclick="this.closest('.bullet-row').remove()">&times;</button>`;
        c.appendChild(row);
    };

    window.addTravelNoteInput = function (type) {
        const isDomestic = (type === 'domestic');
        const container = document.getElementById(isDomestic ? 'domestic-editor-content' : 'intl-editor-content');
        const c = container?.querySelector('#travel-notes-container');
        if (!c) return;
        const row = document.createElement('div');
        row.className = 'bullet-row';
        row.innerHTML = `<input type="text" class="cms-input pkg-travel-note-input" placeholder="New Travel Note"><button type="button" class="btn-del-bullet" onclick="this.closest('.bullet-row').remove()">&times;</button>`;
        c.appendChild(row);
    };

    window.addBookingPolicyInput = function (type) {
        const isDomestic = (type === 'domestic');
        const container = document.getElementById(isDomestic ? 'domestic-editor-content' : 'intl-editor-content');
        const c = container?.querySelector('#booking-policy-container');
        if (!c) return;
        const row = document.createElement('div');
        row.className = 'bullet-row';
        row.innerHTML = `<input type="text" class="cms-input pkg-booking-policy-input" placeholder="New Booking Policy Point"><button type="button" class="btn-del-bullet" onclick="this.closest('.bullet-row').remove()">&times;</button>`;
        c.appendChild(row);
    };

    window.addBulletPoint = function (type, dIdx) {
        const isDomestic = (type === 'domestic');
        const container = document.getElementById(isDomestic ? 'domestic-editor-content' : 'intl-editor-content');
        const c = container?.querySelector(`#day-bullets-${dIdx}`);
        if (!c) return;
        const row = document.createElement('div');
        row.className = 'bullet-row';
        row.innerHTML = `
            <input type="text" class="cms-input day-bullet-input-${dIdx}" placeholder="Enter sightseeing point...">
            <button type="button" class="btn-del-bullet" onclick="this.closest('.bullet-row').remove()">&times;</button>
        `;
        c.appendChild(row);
    };

    window.addItineraryDay = function (type) {
        const isDomestic = (type === 'domestic');
        const container = document.getElementById(isDomestic ? 'domestic-editor-content' : 'intl-editor-content');
        const daysContainer = container?.querySelector('#itinerary-days-container');
        if (!daysContainer) return;
        const currentCount = daysContainer.querySelectorAll('.itinerary-day-box').length;
        const dIdx = currentCount;
        const dayDiv = document.createElement('div');
        dayDiv.className = 'itinerary-day-box';
        dayDiv.id = `day-box-${dIdx}`;
        dayDiv.innerHTML = `
            <div class="day-header-row">
                <span class="day-badge">Day ${dIdx + 1}</span>
                <button type="button" class="btn-remove-day" onclick="removeItineraryDay('${type}', ${dIdx})"><i class="fa-solid fa-trash"></i> Remove Day</button>
            </div>
            <div class="cms-form-group">
                <label>Day Title</label>
                <input type="text" id="day-title-${dIdx}" class="cms-input" placeholder="e.g. City Sightseeing & Excursion">
            </div>
            <div class="cms-form-group">
                <label>Day Description</label>
                <input type="text" id="day-desc-${dIdx}" class="cms-input" placeholder="Summary of the day...">
            </div>
            <label style="font-size:0.78rem; font-weight:700; color:#475569;">Key Sightseeing / Activities:</label>
            <div class="bullet-points-list" id="day-bullets-${dIdx}">
                <div class="bullet-row">
                    <input type="text" class="cms-input day-bullet-input-${dIdx}" placeholder="Sightseeing point 1...">
                    <button type="button" class="btn-del-bullet" onclick="this.closest('.bullet-row').remove()">&times;</button>
                </div>
            </div>
            <button type="button" class="btn-add-bullet" onclick="addBulletPoint('${type}', ${dIdx})"><i class="fa-solid fa-plus"></i> Add Point</button>
        `;
        daysContainer.appendChild(dayDiv);
    };

    window.removeItineraryDay = function (type, dIdx) {
        const isDomestic = (type === 'domestic');
        const container = document.getElementById(isDomestic ? 'domestic-editor-content' : 'intl-editor-content');
        container?.querySelector(`#day-box-${dIdx}`)?.remove();
    };

    function collectHomeDataFromInputs() {
        if (!currentCMSData.home) currentCMSData.home = {};

        if (!currentCMSData.home.holidaysSection) currentCMSData.home.holidaysSection = {};
        currentCMSData.home.holidaysSection.sectionLabel = document.getElementById('cms-hols-label')?.value || 'Travel & Holidays';
        currentCMSData.home.holidaysSection.sectionTitle = document.getElementById('cms-hols-title')?.value || 'Domestic & International Holiday Packages';
        currentCMSData.home.holidaysSection.sectionDesc = document.getElementById('cms-hols-desc')?.value || 'Domestic & International Holiday Packages, Flight / Train / Cruise Booking, Visa Assistance.';

        currentCMSData.home.holidaysSection.domesticCard = {
            title: document.getElementById('cms-hols-dom-title')?.value || 'Kodaikanal, Rajasthan, Tawang & More',
            desc: document.getElementById('cms-hols-dom-desc')?.value || 'Curated holiday experiences for families, couples, and groups with flexible itineraries and verified transfers.',
            btnText: 'View Domestic Holidays',
            image: document.getElementById('cms-hols-dom-image')?.value || 'Assets/holiday_kodaikanal.jpg',
            linkUrl: 'holidays.html#domestic-packages'
        };

        currentCMSData.home.holidaysSection.intlCard = {
            title: document.getElementById('cms-hols-intl-title')?.value || 'Singapore, Vietnam, Dubai & Beyond',
            desc: document.getElementById('cms-hols-intl-desc')?.value || 'Well-planned international holidays with customised itineraries, flights, visa assistance, and luxury stays.',
            btnText: 'View International Holidays',
            image: document.getElementById('cms-hols-intl-image')?.value || 'Assets/holiday_singapore.jpg',
            linkUrl: 'holidays.html#international-packages'
        };
    }

    function collectPackageFromInputs(type) {
        const isDomestic = (type === 'domestic');
        const pkgId = isDomestic ? selectedDomesticPkg : selectedIntlPkg;
        const pkgStore = isDomestic ? currentCMSData.domestic_packages : currentCMSData.international_packages;
        if (!pkgStore || !pkgStore[pkgId]) return;

        const container = document.getElementById(isDomestic ? 'domestic-editor-content' : 'intl-editor-content');
        if (!container) return;

        const pkg = pkgStore[pkgId];
        pkg.image = container.querySelector('#pkg-image')?.value || pkg.image;
        pkg.region = container.querySelector('#pkg-region')?.value || pkg.region;
        pkg.title = container.querySelector('#pkg-title')?.value || pkg.title;
        pkg.subtitle = container.querySelector('#pkg-subtitle')?.value || pkg.subtitle;
        pkg.price = container.querySelector('#pkg-price')?.value || pkg.price;
        pkg.pricePer = container.querySelector('#pkg-priceper')?.value || pkg.pricePer;
        pkg.durationBadge = container.querySelector('#pkg-duration-badge')?.value || pkg.durationBadge;
        pkg.duration = container.querySelector('#pkg-duration')?.value || pkg.duration;
        pkg.bestFor = container.querySelector('#pkg-bestfor')?.value || pkg.bestFor;
        pkg.overview = container.querySelector('#pkg-overview')?.value || pkg.overview;

        // Highlights
        pkg.highlights = Array.from(container.querySelectorAll('.pkg-highlight-input')).map(el => el.value.trim()).filter(Boolean);

        // Itinerary
        pkg.itinerary = Array.from(container.querySelectorAll('.itinerary-day-box')).map((box, idx) => {
            return {
                day: box.querySelector('.day-badge')?.innerText || `Day ${idx + 1}`,
                title: box.querySelector(`#day-title-${idx}`)?.value || '',
                desc: box.querySelector(`#day-desc-${idx}`)?.value || '',
                points: Array.from(box.querySelectorAll(`.day-bullet-input-${idx}`)).map(el => el.value.trim()).filter(Boolean)
            };
        });

        // Inclusions & Exclusions
        pkg.inclusions = Array.from(container.querySelectorAll('.pkg-inclusion-input')).map(el => el.value.trim()).filter(Boolean);
        pkg.exclusions = Array.from(container.querySelectorAll('.pkg-exclusion-input')).map(el => el.value.trim()).filter(Boolean);

        // Travel Notes & Booking Policy (Section 6)
        pkg.travel_notes = Array.from(container.querySelectorAll('.pkg-travel-note-input')).map(el => el.value.trim()).filter(Boolean);
        pkg.booking_policy = Array.from(container.querySelectorAll('.pkg-booking-policy-input')).map(el => el.value.trim()).filter(Boolean);
    }

    window.saveDraftCMS = function (panel) {
        if (panel === 'home') collectHomeDataFromInputs();
        if (panel === 'domestic') collectPackageFromInputs('domestic');
        if (panel === 'international') collectPackageFromInputs('international');

        showAdminToast('Draft saved in memory', 'draft');
    };

    window.publishLiveCMS = function (panel) {
        if (panel === 'home') collectHomeDataFromInputs();
        if (panel === 'domestic') collectPackageFromInputs('domestic');
        if (panel === 'international') collectPackageFromInputs('international');

        persistCMSData(`Published ${panel.toUpperCase()} changes live to website!`);
        if (panel === 'domestic' || panel === 'international') renderPackageCMS();
    };

    async function persistCMSData(successMessage) {
        try {
            const res = await fetch(`${API_BASE}save_cms_content.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentCMSData)
            });
            const data = await res.json();
            if (data.success) {
                showAdminToast(successMessage || 'Published live!');
                loadBackupsList();
            } else {
                showAdminToast(data.message || 'Error saving CMS data', 'error');
            }
        } catch (e) {
            showAdminToast('Saved to local data store', 'success');
        }
    }

    // ── 4. Automated Safety Backups Management (NO RAW JSON) ──
    async function loadBackupsList() {
        const tbody = document.getElementById('backups-tbody');
        if (!tbody) return;

        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:1.8rem; color:#94A3B8;"><i class="fa-solid fa-spinner fa-spin"></i> Loading backups list...</td></tr>';

        try {
            const res = await fetch(`${API_BASE}manage_backups.php?action=list&v=` + Date.now());
            const data = await res.json();
            if (data.success && data.backups) {
                backupList = data.backups;
                renderBackupsTable(backupList);
                document.getElementById('backup-total-count').innerText = data.count || '0';
                document.getElementById('backup-latest-time').innerText = data.backups[0]?.display_date || 'None';
            } else {
                renderBackupsTable([]);
            }
        } catch (e) {
            console.warn('Backup list error:', e);
            renderBackupsTable([]);
        }
    }

    function renderBackupsTable(list) {
        const tbody = document.getElementById('backups-tbody');
        if (!tbody) return;

        if (!list || !list.length) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:2rem; color:#94A3B8;"><i class="fa-solid fa-shield-halved" style="font-size:2.2rem; margin-bottom:0.6rem; display:block;"></i>No backups saved yet. Click "Create Safety Backup" to generate one.</td></tr>';
            return;
        }

        tbody.innerHTML = list.map((b, idx) => `
            <tr>
                <td style="width:38%;">
                    <strong style="color:#0F172A; font-size:0.88rem;"><i class="fa-solid fa-file-shield" style="color:#D97706; margin-right:6px;"></i> ${b.filename}</strong>
                    ${idx === 0 ? '<span style="font-size:0.72rem; font-weight:800; background:#ECFDF5; color:#059669; border:1px solid #A7F3D0; padding:1px 6px; border-radius:4px; margin-left:6px;">Latest</span>' : ''}
                </td>
                <td style="width:28%;">${b.display_date}</td>
                <td style="width:14%;">${b.filesize_kb} KB</td>
                <td style="width:20%; text-align:right;">
                    <div class="action-btns-group">
                        <a href="${API_BASE}manage_backups.php?action=download&file=${encodeURIComponent(b.filename)}" class="btn-crm-action view" title="Download Backup">
                            <i class="fa-solid fa-download"></i> Download
                        </a>
                        <button class="btn-crm-action call" onclick="restoreFromBackup('${b.filename}')" title="Restore Live Website to this Backup">
                            <i class="fa-solid fa-rotate-left"></i> Restore
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    window.createManualBackup = async function () {
        try {
            showAdminToast('Generating safety backup...', 'draft');
            const res = await fetch(`${API_BASE}manage_backups.php?action=create`, { method: 'POST' });
            const data = await res.json();
            if (data.success) {
                showAdminToast('Backup created successfully!');
                loadBackupsList();
            } else {
                showAdminToast(data.message || 'Failed to create backup', 'error');
            }
        } catch(e) {
            showAdminToast('Backup creation failed', 'error');
        }
    };

    window.downloadLatestBackup = function () {
        window.location.href = `${API_BASE}manage_backups.php?action=download`;
    };

    window.restoreFromBackup = async function (filename) {
        if (!confirm(`Are you sure you want to restore the entire website from backup: ${filename}?\n\nAll current prices, itineraries, and content will be replaced by this backup snapshot.`)) {
            return;
        }

        try {
            showAdminToast('Restoring website backup...', 'draft');
            const res = await fetch(`${API_BASE}manage_backups.php?action=restore&file=` + encodeURIComponent(filename), { method: 'POST' });
            const data = await res.json();
            if (data.success) {
                showAdminToast('Website successfully restored from backup snapshot!');
                setTimeout(() => window.location.reload(), 1200);
            } else {
                showAdminToast(data.message || 'Restore failed', 'error');
            }
        } catch(e) {
            showAdminToast('Restore failed', 'error');
        }
    };

    // ── 5. Initialization ──
    document.addEventListener('DOMContentLoaded', () => {
        const hash = window.location.hash.replace('#', '') || 'inquiries';
        switchNav(hash);
        loadInquiries();
        loadCMSContent();
    });

})();
