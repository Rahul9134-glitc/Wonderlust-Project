const sampleListings = [
  {
    title: "Cozy Mountain Cabin",
    description: "A peaceful wooden cabin surrounded by pine trees, perfect for a weekend getaway.",
    image: {
        url: "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        filename: "listingImage"
    },
    price: 1800,
    location: "Manali",
    country: "India",
    geometry: {
      type: "Point",
      // Longitude, Latitude
      coordinates: [77.1887, 32.2396] 
    },
  },
  {
    title: "Beachfront Villa",
    description: "Luxury villa with a private pool and stunning sea view for family vacations.",
    image: {
        url: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1174",
        filename: "listingImage"
    },
    price: 3500,
    location: "Goa",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [74.0009, 15.4933]
    },
  },
  {
    title: "Urban Apartment Downtown",
    description: "Modern 2BHK apartment in the city center near cafes and shopping malls.",
    image: {
        url: "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=627",
        filename: "listingImage"
    },
    price: 2100,
    location: "Bangalore",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [77.5946, 12.9716]
    },
  },
  {
    title: "Desert Safari Camp",
    description: "Unique desert camp experience with camel rides and luxury tents.",
    image: {
        url: "https://plus.unsplash.com/premium_photo-1661964014750-963a28aeddea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        filename: "listingImage"
    },
    price: 1550,
    location: "Jaisalmer",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [70.9116, 26.9157] 
    },
  },
  {
    title: "Snow Chalet Retreat",
    description: "Cozy chalet with a fireplace and panoramic snowy mountain views.",
    image: {
        url: "https://images.unsplash.com/photo-1698140505387-24f68ba922f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=627",
        filename: "listingImage"
    },
    price: 2900,
    location: "Shimla",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [77.1734, 31.1048] 
    },
  },
  {
    title: "Countryside Farmhouse",
    description: "Spacious farmhouse surrounded by greenery and organic gardens.",
    image: {
        url: "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
        filename: "listingImage"
    },
    price: 1950,
    location: "Pune",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [73.8567, 18.5204] 
    },
  },
  {
    title: "Lakeview Cottage",
    description: "Serene cottage located beside a calm lake with boating access.",
    image: {
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        filename: "listingImage"
    },
    price: 1700,
    location: "Nainital",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [79.4677, 29.3804] 
    },
  },
  {
    title: "Forest Treehouse",
    description: "Adventure stay among the treetops with a scenic forest view.",
    image: {
        url: "https://images.unsplash.com/photo-1729605412184-8d796f9c6f66?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        filename: "listingImage"
    },
    price: 1650,
    location: "Wayanad",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [76.1311, 11.6853]
    },
  },
  {
    title: "Luxury Palace Stay",
    description: "Experience royal life in a heritage palace turned hotel.",
    image: {
        url: "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=627",
        filename: "listingImage"
    },
    price: 4800,
    location: "Udaipur",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [73.7125, 24.5854] 
    },
  },
  {
    title: "Hilltop Bungalow",
    description: "Beautiful bungalow offering breathtaking views of the valley.",
    image: {
        url: "https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
        filename: "listingImage"
    },
    price: 2400,
    location: "Mussoorie",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [78.0673, 30.4005] 
    },
  },
  {
    title: "Modern Studio Loft",
    description: "Compact, stylish studio apartment ideal for solo travelers.",
    image: {
        url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        filename: "listingImage"
    },
    price: 1590,
    location: "Delhi",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [77.2300, 28.6100] 
    },
  },
  {
    title: "Riverside Cottage",
    description: "Enjoy peace by the riverside with mountain air and fresh breeze.",
    image: {
        url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        filename: "listingImage"
    },
    price: 2050,
    location: "Rishikesh",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [78.2676, 30.0869] 
    },
  },
  {
    title: "Traditional Haveli Stay",
    description: "Beautiful Rajasthani haveli with artistic architecture and charm.",
    image: {
        url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        filename: "listingImage"
    },
    price: 2600,
    location: "Jaipur",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [75.7873, 26.9000]
    },
  },
  {
    title: "Luxury City Penthouse",
    description: "Top-floor penthouse offering skyline views and modern interiors.",
    image: {
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        filename: "listingImage"
    },
    price: 4200,
    location: "Mumbai",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [72.8775, 19.0761] 
    },
  },
  {
    title: "Tea Garden Cottage",
    description: "Stay amidst beautiful tea gardens with misty morning views.",
    image: {
        url: "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1073",
        filename: "listingImage"
    },
    price: 1850,
    location: "Munnar",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [77.0569, 10.0889] 
    },
  },
  {
    title: "Rustic Bamboo Hut",
    description: "Eco-friendly bamboo hut perfect for those who love simplicity.",
    image: {
        url: "https://images.unsplash.com/photo-1676089775678-f81f7253103e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        filename: "listingImage"
    },
    price: 1620,
    location: "Alleppey",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [76.3388, 9.4981] 
    },
  },
  {
    title: "Island Resort Cottage",
    description: "Beach-facing cottage offering scuba diving and island tours.",
    image: {
        url: "https://plus.unsplash.com/premium_photo-1663126298656-33616be83c32?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        filename: "listingImage"
    },
    price: 3800,
    location: "Andaman Islands",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [92.7479, 11.7401] 
    },
  },
  {
    title: "Luxury Jungle Villa",
    description: "Secluded villa in the jungle, offering peace and wildlife vibes.",
    image: {
        url: "https://images.unsplash.com/photo-1698140505537-44c3d840fcae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1331",
        filename: "listingImage"
    },
    price: 3100,
    location: "Jim Corbett",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [78.7679, 29.5392] 
    },
  },
  {
    title: "Historic Colonial House",
    description: "Restored colonial home with vintage furniture and charm.",
    image: {
        url: "https://plus.unsplash.com/premium_photo-1661963123153-5471a95b7042?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
        filename: "listingImage"
    },
    price: 2750,
    location: "Kolkata",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [88.3697, 22.5726] 
    },
  },
  {
    title: "Coastal Cliff Cabin",
    description: "A small cabin built on cliffs overlooking the ocean.",
    image: {
        url: "https://plus.unsplash.com/premium_photo-1678240508014-d1ab7345bfe6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1342",
        filename: "listingImage"
    },
    price: 3050,
    location: "Varkala",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [76.7051, 8.7380] 
    },
  },
  {
    title: "Tropical Garden Villa",
    description: "Private villa surrounded by tropical plants and calm atmosphere.",
    image: {
        url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        filename: "listingImage"
    },
    price: 3400,
    location: "Kerala", // General Kerala coordinate, assuming a central point or a specific tourist area
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [76.7725, 10.8505] 
    },
  },
  {
    title: "Wooden Cottage Retreat",
    description: "Traditional wooden cottage ideal for peaceful stays.",
    image: {
        url: "http://googleusercontent.com/image_collection/image_retrieval/12409591218092648655_17",
        filename: "listingImage"
    },
    price: 1800,
    location: "Ooty",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [76.6934, 11.4064] 
    },
  },
  {
    title: "Boutique Heritage Stay",
    description: "Stay in a restored boutique hotel with modern comforts.",
    image: {
        url: "https://images.unsplash.com/photo-1713892105009-1628c02c4050?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        filename: "listingImage"
    },
    price: 2950,
    location: "Lucknow",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [80.9462, 26.8467] 
    },
  },
  {
    title: "Luxury Floating Houseboat",
    description: "Lavish houseboat experience on serene backwaters.",
    image: {
        url: "https://images.unsplash.com/photo-1641049950555-b379b0bb4f62?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1025",
        filename: "listingImage"
    },
    price: 3600,
    location: "Kumarakom",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [76.4258, 9.6105] 
    },
  },
  {
    title: "Himalayan Eco Lodge",
    description: "Eco-lodge nestled in the Himalayas for adventure lovers.",
    image: {
        url: "https://plus.unsplash.com/premium_photo-1702598411521-ab6603e705b2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169",
        filename: "listingImage"
    },
    price: 2450,
    location: "Leh",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [77.5828, 34.1526] 
    },
  },
];

export default sampleListings;