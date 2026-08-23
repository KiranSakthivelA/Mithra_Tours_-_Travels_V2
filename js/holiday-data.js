/**
 * Mithra Tours & Travels - Holiday Packages & Itineraries Data & Controller
 * Extracted from Official Holidays Content
 */

const holidayPackagesData = {
    "kodaikanal": {
        id: "kodaikanal",
        title: "Kodaikanal • Poombarai • Mannavanur",
        subtitle: "Beyond the Usual Kodaikanal",
        duration: "3 Nights / 4 Days",
        durationBadge: "3N / 4D",
        tagBadge: "Hill Station & Lakes",
        region: "Tamil Nadu",
        category: "domestic",
        image: "Assets/holiday_kodaikanal.jpg",
        price: "₹12,999",
        bestFor: "Families • Couples • Groups • Nature Lovers",
        overview: "Experience the beauty of Kodaikanal through its iconic attractions, scenic viewpoints and peaceful mountain landscapes, along with the charming villages of Poombarai and Mannavanur.",
        highlights: ["Kodaikanal Lake", "Poombarai Village", "Mannavanur Lake", "Pine Forest", "Coaker's Walk"],
        itinerary: [
            {
                day: "Day 1",
                title: "Chennai to Kodaikanal",
                desc: "Journey from Chennai to the scenic hills of Kodaikanal.",
                points: [
                    "Pickup from Chennai and proceed towards Kodaikanal",
                    "En-route meal / rest stop amidst scenic routes",
                    "Hotel check-in and refresh",
                    "Evening at leisure / local market exploration",
                    "Overnight stay in Kodaikanal"
                ]
            },
            {
                day: "Day 2",
                title: "Kodaikanal Local Sightseeing",
                desc: "Explore the iconic sights and natural beauty of the princess of hill stations.",
                points: [
                    "Visit serene Kodaikanal Lake for boating & cycling",
                    "Stroll along Coaker’s Walk with panoramic valley views",
                    "Bryant Park flower gardens & horticultural exhibits",
                    "Explore famous Pillar Rocks & Guna Caves",
                    "Walk through Pine Forest & scenic Moir Point",
                    "Overnight stay in Kodaikanal"
                ]
            },
            {
                day: "Day 3",
                title: "Poombarai & Mannavanur Excursion",
                desc: "Discover the quieter, terraced valleys and countryside side of the hills.",
                points: [
                    "Breakfast & proceed towards picturesque Poombarai",
                    "Explore Poombarai stepped farming village & viewpoints",
                    "Continue to Mannavanur sheep farm & tranquil lake",
                    "Explore the countryside, rolling grasslands, and nature trails",
                    "Return to Kodaikanal for an evening at leisure",
                    "Overnight stay in Kodaikanal"
                ]
            },
            {
                day: "Day 4",
                title: "Kodaikanal to Chennai Departure",
                desc: "Conclude your memorable hill getaway with a comfortable return transfer.",
                points: [
                    "Breakfast & hotel check-out",
                    "Leisure time / short local shopping, subject to departure timing",
                    "Depart towards Chennai with en-route meal / rest stops",
                    "Drop at Chennai (Home / Airport / Railway Station)"
                ]
            }
        ],
        inclusions: [
            "3 Nights accommodation as per selected category",
            "Daily delicious breakfast at hotel",
            "Dedicated private vehicle for the entire itinerary",
            "Driver charges, night allowances & fuel costs",
            "Toll gates, parking & inter-state permits",
            "Complete sightseeing as mentioned in the itinerary",
            "Mithra Welcome Kit & 24/7 on-trip concierge assistance"
        ],
        exclusions: [
            "Lunch, dinner & personal beverages",
            "Entry tickets / camera fees at monuments & parks",
            "Boating, horse riding & optional adventure activities",
            "Personal expenses & souvenir shopping",
            "Additional sightseeing or route deviations",
            "Anything not specifically mentioned under inclusions"
        ],
        notes: [
            "Hotel and room categories are subject to availability at confirmation.",
            "Equivalent premium accommodation may be offered where required.",
            "Sightseeing is subject to weather, road conditions, and local operating guidelines.",
            "Travel times may vary based on traffic and mountain road conditions.",
            "The itinerary is 100% customizable based on your travel dates and group preferences."
        ],
        bookingTerms: [
            "Booking confirmed upon receipt of the agreed advance deposit.",
            "Final hotel, vehicle, and package quotation confirmed based on real-time availability.",
            "Applicable GST and invoice details communicated clearly in the final quotation."
        ]
    },

    "rajasthan": {
        id: "rajasthan",
        title: "Jaipur • Udaipur • Jaisalmer",
        subtitle: "The Royal Rajasthan Experience",
        duration: "5 Nights / 6 Days",
        durationBadge: "5N / 6D",
        tagBadge: "Royal Heritage",
        region: "North India",
        category: "domestic",
        image: "Assets/holiday_rajasthan.jpg",
        price: "₹24,999",
        bestFor: "Families • Couples • Groups • Heritage Lovers",
        overview: "Explore Rajasthan's royal heritage, magnificent palaces, colourful cities and golden desert landscapes across Jaipur, Udaipur and Jaisalmer.",
        highlights: ["Amber Fort Jaipur", "Udaipur Lakes", "Jaisalmer Desert Safari", "City Palace", "Hawa Mahal"],
        itinerary: [
            {
                day: "Day 1",
                title: "Arrival in Jaipur (Pink City)",
                desc: "Arrival in the royal capital of Rajasthan and transfer to hotel.",
                points: [
                    "Airport / Railway Station pickup by private chauffeur",
                    "Hotel check-in & leisure refresh",
                    "Evening at leisure / explore colorful Johari Bazaar",
                    "Overnight stay in Jaipur"
                ]
            },
            {
                day: "Day 2",
                title: "Jaipur Heritage Sightseeing",
                desc: "Explore the iconic royal forts and palaces of the Pink City.",
                points: [
                    "Visit majestic hilltop Amber Fort with photo stops",
                    "Photo stop at picturesque Jal Mahal water palace",
                    "Explore Jaipur City Palace royal courtyards and museum",
                    "Visit UNESCO World Heritage Jantar Mantar observatory",
                    "Admire iconic Hawa Mahal & shop local handicraft markets",
                    "Overnight stay in Jaipur"
                ]
            },
            {
                day: "Day 3",
                title: "Jaipur to Udaipur (City of Lakes)",
                desc: "Scenic journey from the Pink City to the romantic lakes of Udaipur.",
                points: [
                    "Breakfast & hotel check-out",
                    "Proceed to Udaipur with en-route meal / rest stops",
                    "Arrive in Udaipur and check in to hotel",
                    "Optional sunset boat ride on Lake Pichola (subject to availability)",
                    "Overnight stay in Udaipur"
                ]
            },
            {
                day: "Day 4",
                title: "Udaipur Sightseeing Tour",
                desc: "Discover Udaipur's breathtaking palaces, gardens, and lakes.",
                points: [
                    "Explore grand Udaipur City Palace overlooking Lake Pichola",
                    "Visit historic Jagdish Temple & Saheliyon-ki-Bari gardens",
                    "Scenic drive along Fateh Sagar Lake",
                    "Evening leisure around Old City ghats & art bazaars",
                    "Overnight stay in Udaipur"
                ]
            },
            {
                day: "Day 5",
                title: "Udaipur to Jaisalmer (Thar Desert)",
                desc: "Journey towards the Golden City and the Thar Desert.",
                points: [
                    "Breakfast & hotel check-out",
                    "Proceed towards Jaisalmer across scenic desert highways",
                    "Check-in at desert camp / hotel in Jaisalmer",
                    "Evening desert experience, sunset over sand dunes & folk music",
                    "Overnight stay in Jaisalmer"
                ]
            },
            {
                day: "Day 6",
                title: "Jaisalmer Sightseeing & Departure",
                desc: "Experience the highlights of the Golden City before departure.",
                points: [
                    "Explore living Jaisalmer Fort (Sonar Qila)",
                    "Admire intricate stone carvings at Patwon Ki Haveli",
                    "Visit peaceful Gadisar Lake & local handicraft markets",
                    "Transfer to Jaisalmer Airport / Railway Station for onward journey"
                ]
            }
        ],
        inclusions: [
            "5 Nights accommodation as per selected category",
            "Daily buffet breakfast at hotels & desert camp",
            "Dedicated private chauffeur-driven AC vehicle for entire tour",
            "All driver allowances, fuel, tolls, and inter-city permits",
            "Thar desert sunset experience with traditional welcome",
            "Sightseeing as detailed in the proposed itinerary",
            "Mithra Welcome Kit & 24/7 dedicated travel support"
        ],
        exclusions: [
            "Lunch, dinner & personal beverages (unless specified at desert camp)",
            "Entry tickets / camera fees at forts & museums",
            "Boat rides, camel rides, jeep safaris & optional activities",
            "Personal expenses, shopping & tips",
            "Flight / train fares to Jaipur / from Jaisalmer",
            "Anything not specifically mentioned under inclusions"
        ],
        notes: [
            "Desert camp operations and activities depend on seasonal weather conditions.",
            "Hotel categories and room types confirmed subject to real-time availability.",
            "Vehicle provided for planned itinerary routes with standard operating hours.",
            "The itinerary can be extended or modified to include Jodhpur upon request."
        ],
        bookingTerms: [
            "Confirmed booking upon advance payment receipt.",
            "Transparent pricing breakdown with all taxes communicated in quotation."
        ]
    },

    "tawang": {
        id: "tawang",
        title: "Tawang • Dirang • Bomdila",
        subtitle: "Into the Himalayan Frontier",
        duration: "5 Nights / 6 Days",
        durationBadge: "5N / 6D",
        tagBadge: "Himalayan Frontier",
        region: "Arunachal Pradesh",
        category: "domestic",
        image: "Assets/holiday_tawang.jpg",
        price: "₹24,999",
        bestFor: "Families • Couples • Groups • Nature Lovers • Adventure Seekers",
        overview: "Experience the dramatic landscapes of Arunachal Pradesh — from the mountain valleys of Dirang and Bomdila to the high-altitude beauty and Buddhist heritage of Tawang.",
        highlights: ["Sela Pass & Lake", "Tawang Monastery", "Bum La Pass", "Dirang Valley", "Madhuri Lake"],
        itinerary: [
            {
                day: "Day 1",
                title: "Guwahati to Bomdila",
                desc: "Begin your journey from Assam into the misty mountains of Arunachal Pradesh.",
                points: [
                    "Pickup from Guwahati Airport / Railway Station",
                    "Scenic mountain drive towards Bomdila",
                    "En-route tea garden stops & riverside meal breaks",
                    "Hotel check-in at Bomdila & evening at leisure",
                    "Overnight stay in Bomdila"
                ]
            },
            {
                day: "Day 2",
                title: "Bomdila to Dirang Valley",
                desc: "A picturesque mountain journey through Apple orchards and valleys.",
                points: [
                    "Breakfast & visit Bomdila Monastery with panoramic views",
                    "Proceed towards Dirang valley along Kameng river",
                    "Visit Dirang Dzong & scenic Kiwi / apple plantations",
                    "Check-in at Dirang hotel & relaxed evening",
                    "Overnight stay in Dirang"
                ]
            },
            {
                day: "Day 3",
                title: "Dirang to Tawang via Sela Pass",
                desc: "Ascend through high-altitude Himalayan mountain passes.",
                points: [
                    "Breakfast & checkout from Dirang",
                    "Cross iconic Sela Pass (13,700 ft) & visit crystalline Sela Lake",
                    "Visit Jaswant Garh War Memorial paying homage to brave soldiers",
                    "Admire Nuranang (Jung) Waterfalls on the way",
                    "Arrive in Tawang, check-in to hotel & rest",
                    "Overnight stay in Tawang"
                ]
            },
            {
                day: "Day 4",
                title: "Tawang Local Sightseeing",
                desc: "Discover the spiritual grandeur and cultural heritage of Tawang.",
                points: [
                    "Visit world-renowned Tawang Monastery (second largest in the world)",
                    "Visit Giant Buddha Statue & viewpoint",
                    "Visit Tawang War Memorial with evening light & sound show",
                    "Explore local Monpa craft markets & bakeries",
                    "Overnight stay in Tawang"
                ]
            },
            {
                day: "Day 5",
                title: "Tawang Excursion (Bum La & Madhuri Lake)",
                desc: "Experience high-altitude lakes and borders near China frontier.",
                points: [
                    "Breakfast & board local 4x4 vehicle for high-altitude excursion",
                    "Visit Indo-China border at Bum La Pass (subject to Army permits & weather)",
                    "Visit breathtaking Sangetsar Lake (popularly known as Madhuri Lake)",
                    "Scenic photo stops at high-altitude alpine lakes",
                    "Return to Tawang for evening at leisure",
                    "Overnight stay in Tawang"
                ]
            },
            {
                day: "Day 6",
                title: "Tawang to Guwahati Departure",
                desc: "Conclude your Himalayan journey with a scenic return drive.",
                points: [
                    "Early breakfast & hotel check-out",
                    "Scenic descent towards Guwahati plains",
                    "En-route meal and rest stops",
                    "Drop at Guwahati Airport / Railway Station with unforgettable memories"
                ]
            }
        ],
        inclusions: [
            "5 Nights accommodation in standard/deluxe category mountain stays",
            "Daily breakfast at hotels",
            "Dedicated private SUV / Tempo Traveller for entire Assam & Arunachal route",
            "Inner Line Permit (ILP) documentation assistance for Arunachal Pradesh",
            "Driver charges, hill allowances, fuel, toll & parking charges",
            "Sightseeing as detailed in itinerary",
            "Mithra Welcome Kit & remote emergency coordination"
        ],
        exclusions: [
            "Airfare / Train fare to/from Guwahati",
            "Local 4x4 vehicle rental for Bum La Pass & Madhuri Lake (arranged locally as per Army rules)",
            "Special DC permit fees for Bum La Pass",
            "Lunch, dinner & personal beverages",
            "Entry fees & camera charges at monuments",
            "Personal expenses, warm gear rentals & tips",
            "Anything not specifically mentioned under inclusions"
        ],
        notes: [
            "Arunachal Pradesh requires Inner Line Permits (ILP); passport/ID copies required 7 days prior.",
            "Bum La Pass and high passes are strictly subject to Indian Army approval & weather.",
            "Mountain road travel times may vary depending on weather and road conditions.",
            "Warm woollens and thermals are essential year-round."
        ],
        bookingTerms: [
            "Booking confirmed with advance deposit along with travelers' ID proofs for ILP.",
            "Customizable flight add-ons available from Chennai / Bengaluru."
        ]
    },

    "singapore": {
        id: "singapore",
        title: "Singapore City & Sentosa Island",
        subtitle: "Singapore, Beyond the Skyline",
        duration: "4 Nights / 5 Days",
        durationBadge: "4N / 5D",
        tagBadge: "Skyline & Sentosa",
        region: "Southeast Asia",
        category: "international",
        image: "Assets/holiday_singapore.jpg",
        price: "₹39,999",
        bestFor: "Families • Couples • Groups • First-Time Travellers",
        overview: "Experience Singapore's perfect blend of modern attractions, vibrant neighbourhoods, family entertainment and iconic cityscapes — a destination designed for memorable getaways.",
        highlights: ["Marina Bay Sands", "Sentosa Island", "Universal Studios", "Gardens by the Bay", "Merlion Park"],
        itinerary: [
            {
                day: "Day 1",
                title: "Arrival in Singapore & City Evening",
                desc: "Begin your Singapore experience with comfortable arrival and relaxed city evening.",
                points: [
                    "Changi Airport pickup by private representative & hotel transfer",
                    "Hotel check-in & relax",
                    "Evening at leisure — explore nearby Clarke Quay / Marina Bay waterfront",
                    "Overnight stay in Singapore"
                ]
            },
            {
                day: "Day 2",
                title: "Singapore City Experience & Marina Bay",
                desc: "Discover Singapore's iconic landmarks and vibrant multi-cultural neighbourhoods.",
                points: [
                    "Breakfast at hotel",
                    "Photo stop at iconic Merlion Park & Marina Bay Sands view",
                    "Explore historic Chinatown & vibrant Little India heritage districts",
                    "Visit Gardens by the Bay (Flower Dome & Cloud Forest optional)",
                    "Witness Spectra Light & Water show at Marina Bay in the evening",
                    "Overnight stay in Singapore"
                ]
            },
            {
                day: "Day 3",
                title: "Sentosa Island Full Day Entertainment",
                desc: "A full day of tropical island experiences, rides, and oceanfront attractions.",
                points: [
                    "Breakfast at hotel",
                    "Scenic transfer / Cable car to Sentosa Island",
                    "Explore Madame Tussauds, S.E.A. Aquarium, or Siloso Beach",
                    "Enjoy leisurely beach club walks and island monorail",
                    "Spectacular Wings of Time ocean pyrotechnic show",
                    "Overnight stay in Singapore"
                ]
            },
            {
                day: "Day 4",
                title: "Universal Studios Singapore / Leisure Day",
                desc: "Enjoy thrilling blockbuster rides, themed worlds, and world-class shopping.",
                points: [
                    "Breakfast at hotel",
                    "Full day at Universal Studios Singapore (Sci-Fi City, Ancient Egypt, Far Far Away)",
                    "Enjoy world-class roller coasters, live shows, and character meet-and-greets",
                    "Evening shopping along bustling Orchard Road malls",
                    "Overnight stay in Singapore"
                ]
            },
            {
                day: "Day 5",
                title: "Singapore Departure & Jewel Changi",
                desc: "Conclude your memorable holiday with shopping and airport transfer.",
                points: [
                    "Breakfast at hotel & check-out",
                    "Leisure time for souvenir shopping subject to flight timing",
                    "Transfer to Changi Airport — explore the famous Jewel Rain Vortex waterfall",
                    "Depart Singapore with cherished holiday memories"
                ]
            }
        ],
        inclusions: [
            "4 Nights accommodation in 3*/4* selected luxury hotel",
            "Daily international buffet breakfast",
            "Return Changi Airport private transfers",
            "Half-day panoramic Singapore City Tour with English speaking guide",
            "Sentosa Island tour with transfers and selected attractions",
            "Universal Studios Singapore 1-Day Pass (optional add-on)",
            "Mithra Welcome Kit & 24/7 dedicated travel desk support"
        ],
        exclusions: [
            "International airfares to/from Singapore",
            "Singapore Tourist Visa fee",
            "Overseas Travel Insurance",
            "Lunch, dinner & personal beverages",
            "Attraction entry tickets not specifically mentioned in chosen tier",
            "Personal expenses, porterage & gratuities",
            "Anything not specifically mentioned under inclusions"
        ],
        notes: [
            "Passport must be valid for at least 6 months from date of entry.",
            "Singapore SG Arrival Card must be submitted online 3 days prior to arrival.",
            "Attraction operating hours subject to real-time park guidelines.",
            "Customizable flight and hotel packages available with departures from Chennai."
        ],
        bookingTerms: [
            "Booking confirmed upon receipt of advance payment.",
            "Transparent pricing in INR with detailed inclusions and tax breakdown."
        ]
    },

    "vietnam": {
        id: "vietnam",
        title: "Vietnam Grand Explorer (Hanoi • Halong • Da Nang • Hoi An • Saigon)",
        subtitle: "The Vietnam Grand Experience",
        duration: "6 Nights / 7 Days",
        durationBadge: "6N / 7D",
        tagBadge: "Grand Experience",
        region: "Southeast Asia",
        category: "international",
        image: "Assets/holiday_vietnam.jpg",
        price: "₹54,999",
        bestFor: "Families • Couples • Groups • First-Time Travellers",
        overview: "Discover Vietnam through its vibrant cities, spectacular landscapes, historic towns and unforgettable local experiences — from Hanoi and Halong Bay to Da Nang, Hoi An and Ho Chi Minh City.",
        highlights: ["Halong Bay Cruise", "Ba Na Hills Golden Bridge", "Hoi An Ancient Town", "Hanoi Old Quarter", "Mekong Delta"],
        itinerary: [
            {
                day: "Day 1",
                title: "Arrival in Hanoi (Capital City)",
                desc: "Arrival in Vietnam's charming ancient capital and hotel transfer.",
                points: [
                    "Noi Bai International Airport pickup & private transfer to hotel",
                    "Hotel check-in & leisure refresh",
                    "Evening stroll around vibrant Hanoi Old Quarter & Hoan Kiem Lake",
                    "Overnight stay in Hanoi"
                ]
            },
            {
                day: "Day 2",
                title: "Hanoi City Tour & Heritage",
                desc: "Explore the cultural and historic landmarks of Hanoi.",
                points: [
                    "Breakfast at hotel",
                    "Visit historic Ho Chi Minh Complex & Ba Dinh Square",
                    "Explore One Pillar Pagoda & iconic Temple of Literature",
                    "Scenic electric cart ride through the 36 ancient trade streets of Old Quarter",
                    "Enjoy traditional Vietnamese Water Puppet Show (optional)",
                    "Overnight stay in Hanoi"
                ]
            },
            {
                day: "Day 3",
                title: "Hanoi to Halong Bay Cruise Experience",
                desc: "Cruise through thousands of emerald limestone karsts and islets.",
                points: [
                    "Breakfast & morning transfer to Halong Bay marina",
                    "Board luxury cruise vessel with welcome drink & seafood lunch",
                    "Cruise through limestone islands, explore Sung Sot (Surprise) Cave",
                    "Kayaking / bamboo boat ride around Luon Cave lagoon",
                    "Sunset party on sundeck & cooking demonstration",
                    "Overnight stay on luxury cruise / Halong Bay hotel"
                ]
            },
            {
                day: "Day 4",
                title: "Halong Bay to Da Nang via Flight",
                desc: "Morning cruise sunrise and domestic flight to the coastal city of Da Nang.",
                points: [
                    "Morning Tai Chi on sundeck & light breakfast",
                    "Visit Ti Top Island for swimming or panoramic hilltop viewpoint",
                    "Disembark cruise and transfer to Hanoi Airport",
                    "Short flight to Da Nang & hotel check-in",
                    "Evening leisure along My Khe Beach & Dragon Bridge",
                    "Overnight stay in Da Nang"
                ]
            },
            {
                day: "Day 5",
                title: "Ba Na Hills (Golden Bridge) & Hoi An Ancient Town",
                desc: "Walk on the world-famous Golden Bridge held by giant stone hands.",
                points: [
                    "Breakfast at hotel & transfer to Ba Na Hills",
                    "Ride world-record cable car & walk on iconic Golden Bridge in the clouds",
                    "Explore French Village, Fantasy Park, and Linh Ung Pagoda",
                    "Afternoon proceed to UNESCO World Heritage Hoi An Ancient Town",
                    "Walk lantern-lit streets, Japanese Covered Bridge & take a lantern boat ride on Hoai River",
                    "Overnight stay in Da Nang / Hoi An"
                ]
            },
            {
                day: "Day 6",
                title: "Da Nang to Ho Chi Minh City (Saigon)",
                desc: "Fly to southern Vietnam's bustling modern metropolis.",
                points: [
                    "Breakfast & check-out; transfer to Da Nang Airport",
                    "Flight to Ho Chi Minh City (Saigon) & hotel check-in",
                    "Visit historic Notre Dame Cathedral, Central Post Office & War Remnants Museum",
                    "Shop local coffee, silk & souvenirs at lively Ben Thanh Market",
                    "Overnight stay in Ho Chi Minh City"
                ]
            },
            {
                day: "Day 7",
                title: "Ho Chi Minh City Departure",
                desc: "Conclude your grand Vietnam explorer journey with airport transfer.",
                points: [
                    "Breakfast at hotel & leisure check-out",
                    "Optional morning visit to Cu Chi Tunnels or riverside shopping",
                    "Transfer to Tan Son Nhat International Airport for flight home",
                    "Tour Ends with unforgettable memories of Vietnam"
                ]
            }
        ],
        inclusions: [
            "6 Nights total accommodation (5 nights luxury hotels + 1 night Halong Bay cruise)",
            "Daily international breakfast and cruise meals",
            "Domestic flight tickets within Vietnam (Hanoi - Da Nang - Saigon)",
            "All airport and sightseeing transfers in private AC vehicles",
            "Ba Na Hills cable car and Golden Bridge admission pass",
            "English speaking certified local guides",
            "Mithra Welcome Kit & dedicated trip concierge"
        ],
        exclusions: [
            "International airfare from/to India",
            "Vietnam E-Visa processing fee",
            "Overseas travel and medical insurance",
            "Meals not specified in inclusions",
            "Personal expenses, laundry, tips & gratuities",
            "Anything not specifically mentioned under inclusions"
        ],
        notes: [
            "Indian passport holders require a Vietnam E-Visa (processed within 3-4 working days).",
            "Domestic flight luggage allowance includes 20kg check-in + 7kg cabin.",
            "Cruise activities are subject to maritime weather permissions.",
            "Customizable for couples, families, and private corporate incentive groups."
        ],
        bookingTerms: [
            "Confirmed with advance deposit and passport scan copies.",
            "All flights and hotels confirmed with instant PNR vouchers upon booking."
        ]
    },

    "dubai": {
        id: "dubai",
        title: "Dubai & Abu Dhabi Grand Tour",
        subtitle: "Dubai, Where Extraordinary Happens",
        duration: "5 Nights / 6 Days",
        durationBadge: "5N / 6D",
        tagBadge: "Luxury & Desert",
        region: "UAE",
        category: "international",
        image: "Assets/holiday_dubai.jpg",
        price: "₹59,999",
        bestFor: "Families • Couples • Groups • First-Time Travellers",
        overview: "Experience Dubai's iconic skyline, grand attractions, desert landscapes and vibrant city life — a perfect blend of luxury, adventure, shopping and family experiences.",
        highlights: ["Burj Khalifa & Mall", "Desert Dune Safari", "Abu Dhabi Grand Mosque", "Palm Jumeirah", "Marina Dhow Cruise"],
        itinerary: [
            {
                day: "Day 1",
                title: "Arrival in Dubai & Marina Dhow Cruise",
                desc: "Begin your Dubai holiday with a warm welcome and luxury evening dinner cruise.",
                points: [
                    "Dubai International Airport pickup & private hotel transfer",
                    "Hotel check-in & relax",
                    "Evening luxury Marina Dhow Cruise with international buffet dinner",
                    "Admire illuminated skyscrapers of Dubai Marina and live Tanoura dance show",
                    "Overnight stay in Dubai"
                ]
            },
            {
                day: "Day 2",
                title: "Dubai City Tour & Palm Jumeirah",
                desc: "Discover Dubai's iconic modern architecture and heritage coastline.",
                points: [
                    "Breakfast at hotel",
                    "Guided city tour: Dubai Frame, Jumeirah Mosque, and Burj Al Arab photo stop",
                    "Drive along the iconic Palm Jumeirah & Atlantis The Palm photo stop",
                    "Monorail ride along Palm island (optional)",
                    "Evening visit to Dubai Mall & witness Dubai Fountain dancing show",
                    "Overnight stay in Dubai"
                ]
            },
            {
                day: "Day 3",
                title: "Desert Safari with BBQ Dinner & Entertainment",
                desc: "Experience thrilling dune bashing and Arabic hospitality in the desert.",
                points: [
                    "Breakfast at hotel & relaxed morning for shopping or pool time",
                    "Afternoon 4x4 Land Cruiser pickup for Desert Safari",
                    "Thrilling dune bashing across golden red dunes & sandboarding",
                    "Sunset photo stop in the desert",
                    "Arrive at Bedouin desert camp: Camel ride, henna painting & Arabic coffee",
                    "Delicious BBQ buffet dinner with live Belly Dance & Fire Shows",
                    "Overnight stay in Dubai"
                ]
            },
            {
                day: "Day 4",
                title: "Burj Khalifa At The Top & Miracle Garden",
                desc: "Stand atop the world's tallest skyscraper and explore floral wonders.",
                points: [
                    "Breakfast at hotel",
                    "Visit Burj Khalifa 124th & 125th Floor Observatory (At The Top) for 360° city views",
                    "Explore massive Dubai Aquarium & Underwater Zoo inside Dubai Mall",
                    "Visit vibrant Dubai Miracle Garden with 150 million blooming flowers (seasonal)",
                    "Evening at leisure / shopping in Gold & Spice Souk",
                    "Overnight stay in Dubai"
                ]
            },
            {
                day: "Day 5",
                title: "Full Day Abu Dhabi City Tour & Grand Mosque",
                desc: "Discover the opulent capital of the UAE.",
                points: [
                    "Breakfast at hotel & proceed to Abu Dhabi in private vehicle",
                    "Visit breathtaking Sheikh Zayed Grand Mosque with white marble domes and crystal chandeliers",
                    "Drive along Abu Dhabi Corniche & Emirates Palace photo stop",
                    "Drive past Ferrari World on Yas Island for photo stop",
                    "Return to Dubai in the evening",
                    "Overnight stay in Dubai"
                ]
            },
            {
                day: "Day 6",
                title: "Dubai Departure",
                desc: "Conclude your magical Dubai vacation.",
                points: [
                    "Breakfast at hotel & check-out",
                    "Leisure time for last-minute shopping at Meena Bazaar / Dubai Duty Free",
                    "Private transfer to Dubai International Airport",
                    "Depart Dubai with extraordinary memories"
                ]
            }
        ],
        inclusions: [
            "5 Nights stay in selected 4* / 5* luxury hotel in Dubai",
            "Daily international buffet breakfast",
            "Return Dubai International Airport private transfers",
            "Half-day Dubai city tour with English-speaking licensed guide",
            "Desert Safari with 4x4 dune bashing, BBQ dinner & live shows",
            "Burj Khalifa 124th Floor observation deck standard entry ticket",
            "Marina Dhow Cruise with buffet dinner and entertainment",
            "Full day Abu Dhabi tour including Sheikh Zayed Grand Mosque",
            "All transfers on sharing or private basis as per selected package",
            "Mithra Welcome Kit & 24/7 dedicated ground assistance"
        ],
        exclusions: [
            "International flight tickets from/to India",
            "UAE Tourist Visa & OK to Board fees",
            "Tourism Dirham Fee payable directly at hotel upon check-in",
            "Overseas travel & medical insurance",
            "Lunch and beverages not specified under inclusions",
            "Personal expenses, shopping & gratuities",
            "Anything not specifically mentioned under inclusions"
        ],
        notes: [
            "Passport must be valid for at least 6 months from travel date.",
            "UAE Single Entry 30-Day Tourist Visa assisted by Mithra team.",
            "Grand Mosque visit requires modest dress code covering shoulders and legs (women require headscarf).",
            "Customizable extensions to include Atlantis Aquaventure, Museum of the Future, or Ferrari World."
        ],
        bookingTerms: [
            "Confirmed with advance deposit and passport scan copies.",
            "Instant booking confirmation with transparent quotation and GST breakdown."
        ]
    }
};

/**
 * Controller Functions for Itinerary Modal
 */
function openItineraryModal(packageId) {
    const data = holidayPackagesData[packageId];
    if (!data) return;

    // Set banner info
    document.getElementById('modal-pkg-img').src = data.image;
    document.getElementById('modal-pkg-img').alt = data.title;
    document.getElementById('modal-pkg-region').textContent = data.region;
    document.getElementById('modal-pkg-tag').textContent = data.tagBadge;
    document.getElementById('modal-pkg-duration').textContent = data.durationBadge;
    document.getElementById('modal-pkg-title').textContent = data.title;
    document.getElementById('modal-pkg-subtitle').textContent = data.subtitle;
    document.getElementById('modal-pkg-bestfor').textContent = data.bestFor;
    document.getElementById('modal-pkg-desc').textContent = data.overview;

    // Render Highlights
    const hlContainer = document.getElementById('modal-pkg-highlights');
    if (hlContainer) {
        hlContainer.innerHTML = data.highlights.map(h => `<span class="pkg-hl-pill"><i class="fa-solid fa-location-dot" style="color:var(--gold-3); margin-right:4px;"></i> ${h}</span>`).join('');
    }

    // Render Itinerary Timeline
    const itinContainer = document.getElementById('modal-tab-itinerary-content');
    if (itinContainer) {
        itinContainer.innerHTML = data.itinerary.map((item, idx) => `
            <div class="itin-step">
                <div class="itin-marker">
                    <span class="itin-day-badge">${item.day}</span>
                </div>
                <div class="itin-content">
                    <h4 class="itin-step-title">${item.title}</h4>
                    <p class="itin-step-desc">${item.desc}</p>
                    <ul class="itin-step-points">
                        ${item.points.map(pt => `<li><i class="fa-solid fa-circle-check" style="color:var(--gold-3); margin-right:6px;"></i> ${pt}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    }

    // Render Inclusions & Exclusions
    const incContainer = document.getElementById('modal-inclusions-list');
    if (incContainer) {
        incContainer.innerHTML = data.inclusions.map(inc => `
            <li class="inc-item"><i class="fa-solid fa-check-circle" style="color:#10B981;"></i> <span>${inc}</span></li>
        `).join('');
    }

    const excContainer = document.getElementById('modal-exclusions-list');
    if (excContainer) {
        excContainer.innerHTML = data.exclusions.map(exc => `
            <li class="exc-item"><i class="fa-solid fa-circle-xmark" style="color:#EF4444;"></i> <span>${exc}</span></li>
        `).join('');
    }

    // Render Notes & Booking Terms
    const notesContainer = document.getElementById('modal-notes-list');
    if (notesContainer) {
        notesContainer.innerHTML = data.notes.map(n => `
            <li><i class="fa-solid fa-circle-info" style="color:var(--gold-3);"></i> <span>${n}</span></li>
        `).join('');
    }

    const bookingContainer = document.getElementById('modal-booking-list');
    if (bookingContainer) {
        bookingContainer.innerHTML = data.bookingTerms.map(b => `
            <li><i class="fa-solid fa-shield-halved" style="color:var(--gold-3);"></i> <span>${b}</span></li>
        `).join('');
    }

    // Configure Action Buttons
    const pageBtn = document.getElementById('modal-btn-page');
    if (pageBtn) {
        pageBtn.href = `holidays/${packageId}.html`;
    }

    const bookBtn = document.getElementById('modal-btn-book');
    if (bookBtn) {
        bookBtn.onclick = function() {
            closeItineraryModal();
            selectHolidayPackage(data.title);
            const enquirySec = document.getElementById('enquiry');
            if (enquirySec) enquirySec.scrollIntoView({ behavior: 'smooth' });
        };
    }

    const waBtn = document.getElementById('modal-btn-wa');
    if (waBtn) {
        const text = encodeURIComponent(`Hi Mithra Tours, I would like to enquire about the "${data.title}" (${data.duration}) holiday package.`);
        waBtn.href = `https://wa.me/919629245533?text=${text}`;
    }

    // Switch to Itinerary tab by default
    switchItineraryTab('itinerary');

    // Show Modal
    const modal = document.getElementById('holiday-itinerary-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeItineraryModal() {
    const modal = document.getElementById('holiday-itinerary-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function switchItineraryTab(tabName) {
    document.querySelectorAll('.modal-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    document.querySelectorAll('.modal-tab-pane').forEach(pane => {
        pane.classList.toggle('active', pane.id === `tab-pane-${tabName}`);
    });
}

function selectHolidayPackage(packageName) {
    const select = document.getElementById('h-service');
    if (select) {
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].text.includes(packageName) || select.options[i].value.includes(packageName)) {
                select.selectedIndex = i;
                break;
            }
        }
    }
    const msg = document.getElementById('h-message');
    if (msg && !msg.value) {
        msg.value = `Interested in the "${packageName}" holiday package. Please share detailed quotation and customization options.`;
    }
}

// Close on Escape or Backdrop Click
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeItineraryModal();
});
