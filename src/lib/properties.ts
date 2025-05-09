export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  beds: number
  baths: number
  sqft: number
  type: string
  listingType: "for-sale" | "for-rent"
  featured: boolean
  imageUrl: string
  features: string[]
  yearBuilt: number
  parking: string
}

export function getProperties(): Property[] {
  return [
    {
      id: "prop-1",
      title: "Modern Luxury Villa with Ocean View",
      description:
        "This stunning modern villa offers breathtaking ocean views and luxurious living spaces. The property features an open floor plan with high ceilings, floor-to-ceiling windows, and premium finishes throughout. The gourmet kitchen is equipped with top-of-the-line appliances and a large center island. The spacious primary suite includes a walk-in closet and a spa-like bathroom. Outside, you'll find a beautiful pool, outdoor kitchen, and multiple entertaining areas. This is truly a dream home in a prime location.",
      price: 1250000,
      location: "123 Ocean Drive, Malibu, CA",
      beds: 4,
      baths: 3.5,
      sqft: 3200,
      type: "House",
      listingType: "for-sale",
      featured: true,
      imageUrl: "/placeholder.svg?height=400&width=600",
      features: [
        "Swimming Pool",
        "Ocean View",
        "Garage",
        "Garden",
        "Air Conditioning",
        "Fireplace",
        "Security System",
        "Smart Home",
      ],
      yearBuilt: 2018,
      parking: "2-Car Garage",
    },
    {
      id: "prop-2",
      title: "Downtown Luxury Apartment",
      description:
        "Experience urban living at its finest in this luxury apartment located in the heart of downtown. This modern unit features high-end finishes, an open concept layout, and floor-to-ceiling windows offering stunning city views. The gourmet kitchen includes stainless steel appliances and quartz countertops. Building amenities include a fitness center, rooftop pool, and 24-hour concierge service.",
      price: 4500,
      location: "456 Main Street, New York, NY",
      beds: 2,
      baths: 2,
      sqft: 1200,
      type: "Apartment",
      listingType: "for-rent",
      featured: true,
      imageUrl: "/placeholder.svg?height=400&width=600",
      features: [
        "City View",
        "Fitness Center",
        "Concierge",
        "Rooftop Pool",
        "Pet Friendly",
        "In-unit Laundry",
        "Central Air",
      ],
      yearBuilt: 2015,
      parking: "Underground Parking",
    },
    {
      id: "prop-3",
      title: "Charming Suburban Family Home",
      description:
        "This beautiful family home is located in a quiet, family-friendly neighborhood with excellent schools. The property features a spacious living room, formal dining room, and updated kitchen with granite countertops. The fenced backyard includes a patio perfect for entertaining and a play area for children. Close to parks, shopping, and major highways for an easy commute.",
      price: 450000,
      location: "789 Maple Street, Suburbia, IL",
      beds: 4,
      baths: 2.5,
      sqft: 2400,
      type: "House",
      listingType: "for-sale",
      featured: false,
      imageUrl: "/placeholder.svg?height=400&width=600",
      features: ["Fenced Yard", "Fireplace", "Basement", "Garage", "Central Air", "Hardwood Floors"],
      yearBuilt: 1995,
      parking: "2-Car Garage",
    },
    {
      id: "prop-4",
      title: "Renovated Historic Townhouse",
      description:
        "This beautifully renovated townhouse combines historic charm with modern amenities. Original architectural details have been preserved while the kitchen and bathrooms have been completely updated. The property features high ceilings, hardwood floors, and a private courtyard garden. Located in a historic district within walking distance to restaurants, shops, and public transportation.",
      price: 875000,
      location: "101 Heritage Lane, Boston, MA",
      beds: 3,
      baths: 2.5,
      sqft: 1800,
      type: "Townhouse",
      listingType: "for-sale",
      featured: false,
      imageUrl: "/placeholder.svg?height=400&width=600",
      features: ["Historic Details", "Renovated Kitchen", "Private Garden", "Hardwood Floors", "Fireplace"],
      yearBuilt: 1890,
      parking: "Street Parking",
    },
    {
      id: "prop-5",
      title: "Luxury Waterfront Condo",
      description:
        "Enjoy spectacular waterfront views from this luxury condo. The open floor plan features a gourmet kitchen with high-end appliances, a spacious living area with a fireplace, and a private balcony overlooking the water. The building offers resort-style amenities including a pool, fitness center, and private marina. Located near fine dining, shopping, and entertainment.",
      price: 950000,
      location: "222 Harbor View, Miami, FL",
      beds: 3,
      baths: 2,
      sqft: 1600,
      type: "Condo",
      listingType: "for-sale",
      featured: true,
      imageUrl: "/placeholder.svg?height=400&width=600",
      features: ["Waterfront", "Balcony", "Pool", "Fitness Center", "Marina", "Security", "Elevator"],
      yearBuilt: 2010,
      parking: "Assigned Parking",
    },
    {
      id: "prop-6",
      title: "Modern Studio Apartment",
      description:
        "This stylish studio apartment is perfect for urban living. The efficient layout maximizes space with a well-designed kitchen, comfortable living area, and separate sleeping space. Building amenities include a rooftop terrace, fitness center, and community lounge. Conveniently located near public transportation, restaurants, and shopping.",
      price: 1800,
      location: "333 City Center, Chicago, IL",
      beds: 0,
      baths: 1,
      sqft: 550,
      type: "Apartment",
      listingType: "for-rent",
      featured: false,
      imageUrl: "/placeholder.svg?height=400&width=600",
      features: ["Rooftop Terrace", "Fitness Center", "Community Lounge", "Pet Friendly", "Laundry Facilities"],
      yearBuilt: 2012,
      parking: "Available for Rent",
    },
    {
      id: "prop-7",
      title: "Spacious Mountain Retreat",
      description:
        "Escape to this beautiful mountain home surrounded by nature. The property features vaulted ceilings, a stone fireplace, and large windows showcasing the mountain views. The gourmet kitchen opens to a dining area and great room, perfect for entertaining. Outside, you'll find multiple decks and a hot tub for enjoying the peaceful setting. Located near hiking trails, skiing, and a charming mountain town.",
      price: 750000,
      location: "444 Mountain View, Aspen, CO",
      beds: 4,
      baths: 3,
      sqft: 2800,
      type: "House",
      listingType: "for-sale",
      featured: false,
      imageUrl: "/placeholder.svg?height=400&width=600",
      features: ["Mountain View", "Fireplace", "Hot Tub", "Deck", "Vaulted Ceilings", "Garage"],
      yearBuilt: 2005,
      parking: "2-Car Garage",
    },
    {
      id: "prop-8",
      title: "Elegant Victorian Home",
      description:
        "This meticulously maintained Victorian home offers a perfect blend of historic charm and modern updates. The property features ornate woodwork, high ceilings, and period details throughout. The updated kitchen includes custom cabinets and high-end appliances. The landscaped yard includes a covered porch and detached garage. Located in a historic neighborhood with tree-lined streets.",
      price: 625000,
      location: "555 Heritage Avenue, San Francisco, CA",
      beds: 5,
      baths: 3,
      sqft: 3000,
      type: "House",
      listingType: "for-sale",
      featured: false,
      imageUrl: "/placeholder.svg?height=400&width=600",
      features: ["Historic Details", "Updated Kitchen", "Covered Porch", "Landscaped Yard", "Hardwood Floors"],
      yearBuilt: 1905,
      parking: "Detached Garage",
    },
    {
      id: "prop-9",
      title: "Contemporary Loft Apartment",
      description:
        "This stunning loft apartment features soaring ceilings, exposed brick walls, and large industrial windows. The open concept living space includes a modern kitchen with stainless steel appliances and a spacious living area. The building is a converted historic factory with character and charm. Located in a trendy neighborhood with art galleries, restaurants, and boutiques.",
      price: 3200,
      location: "666 Industrial Way, Portland, OR",
      beds: 1,
      baths: 1.5,
      sqft: 1100,
      type: "Loft",
      listingType: "for-rent",
      featured: false,
      imageUrl: "/placeholder.svg?height=400&width=600",
      features: ["High Ceilings", "Exposed Brick", "Industrial Windows", "Open Concept", "Stainless Appliances"],
      yearBuilt: 1940,
      parking: "Street Parking",
    },
    {
      id: "prop-10",
      title: "Lakefront Cottage with Dock",
      description:
        "Enjoy lakefront living in this charming cottage with a private dock. The property features an open living area with a fireplace, updated kitchen, and a sunroom overlooking the lake. The spacious deck is perfect for entertaining and enjoying the beautiful water views. Located in a peaceful setting yet close to amenities. This is an ideal vacation home or year-round residence for water enthusiasts.",
      price: 525000,
      location: "777 Lakeshore Drive, Lake Geneva, WI",
      beds: 3,
      baths: 2,
      sqft: 1500,
      type: "House",
      listingType: "for-sale",
      featured: false,
      imageUrl: "/placeholder.svg?height=400&width=600",
      features: ["Lakefront", "Private Dock", "Deck", "Fireplace", "Sunroom", "Updated Kitchen"],
      yearBuilt: 1985,
      parking: "Detached Garage",
    },
  ]
}

