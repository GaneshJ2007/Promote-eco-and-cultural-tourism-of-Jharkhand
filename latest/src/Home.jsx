import React, { useState, useEffect } from "react";

// ✅ Carousel images
const carouselImages = [
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/e2/a5/9a/jubilee-park.jpg?w=500&h=400&s=1",
  "https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/ranchi.jpg",
  "https://www.intermiles.com/iwov-resources/images/blog/top-10-places-to-visit-in-jharkhand/jharkhand-Mobile-414x233.jpg",
  "https://www.goindigo.in/content/dam/s6web/in/en/assets/Destinations/destinations/ranchi/Sun%20Temple.jpeg",
  "https://tourism.jharkhand.gov.in/app-assets/image/History1.jpg",
  "https://content.jdmagicbox.com/quickquotes/listicle/listicle_1719571735087_d3x32_1000x611.jpg?impolicy=queryparam&im=Resize=(847,400),aspect=fit&q=75",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyb7tFYKzNnggwcGBPYO42-v14Xxkdmmnhqg&s"
];

// ✅ Eco-Tourism Spots
const ecoPlaces = [
  {
    name: "Hundru Falls",
    image: "https://media.assettype.com/outlookindia/import/uploadimage/library/16_9/16_9_5/IMAGE_1654581286.webp?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true",
    description: "A breathtaking 320-feet high waterfall near Ranchi amidst dense forests.",
    link: "https://www.google.com/maps/place/Hundru+Waterfall"
  },
  {
    name: "Patratu Valley",
    image: "https://entartica.com/wp-content/uploads/2023/10/Patratu-Valley.webp",
    description: "Mesmerizing valley with winding roads and lakes surrounded by hills.",
    link: "https://www.google.com/maps/place/Patratu+Valley"
  },
  {
    name: "Betla National Park",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqc0aOJlvD6fC4HgvcSrlx6e4ivIu8ZZWPvg&s",
    description: "Home to elephants, tigers, leopards, and rich biodiversity.",
    link: "https://www.google.com/maps/place/Betla+National+Park"
  },
  {
    name: "Dassam Falls",
    image: "https://s3.india.com/wp-content/uploads/2025/07/Photography-Spots-in-Ranchi-1.jpg",
    description: "A natural 144-feet high waterfall on the Kanchi River.",
    link: "https://www.google.com/maps/place/Dasam+Falls"
  },
  {
    name: "Netarhat",
    image: "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2022/12/20130020/netarhat-1.jpeg",
    description: "Known as the ‘Queen of Chotanagpur’, famous for sunrise & sunset views.",
    link: "https://www.google.com/maps/place/Netarhat"
  }
];

// ✅ Cultural & Heritage Tourism Spots
const culturalPlaces = [
  {
    name: "Jagannath Temple Ranchi",
    image: "https://www.shutterstock.com/image-photo/beautiful-aerial-view-jagannath-temple-260nw-2190925691.jpg",
    description: "17th-century temple famous for Rath Yatra and Odisha-style architecture.",
    link: "https://www.google.com/maps/place/Jagannath+Temple+Ranchi"
  },
  {
    name: "Tagore Hill",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwABHpMCyLO12rAWu-sXCKsKQWfWRj0uzwgQ&s",
    description: "Dedicated to Rabindranath Tagore, offering peace and panoramic views.",
    link: "https://www.google.com/maps/place/Tagore+Hill"
  },
  {
    name: "Baidyanath Temple (Deoghar)",
    image: "https://www.goindigo.in/content/dam/s6web/in/en/assets/Destinations/destinations/deograh/Shravani%20Mela%20Medium.jpeg",
    description: "One of the 12 Jyotirlingas of Lord Shiva, a major pilgrimage center.",
    link: "https://www.google.com/maps/place/Baidyanath+Temple"
  },
  {
    name: "Maluti Temples",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_F8SMC3DOFQsuU9KpHs9YXI8GUX9R7Dfu8w&s",
    description: "Ancient terracotta temples showcasing medieval Bengal-style architecture.",
    link: "https://www.google.com/maps/place/Maluti+Temples"
  },
  {
    name: "Parasnath Hills (Shikharji)",
    image: "https://adventurousgopal.wordpress.com/wp-content/uploads/2015/10/parasnath-hills.jpg",
    description: "One of the most sacred Jain pilgrimage sites, atop Parasnath Hill.",
    link: "https://www.google.com/maps/place/Parasnath+Hill"
  }
];

// ✅ Adventure & Trekking
const adventurePlaces = [
  {
    name: "Rajrappa Temple & River Confluence",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/77/2c/3c/fb-img-1529564784353.jpg?w=1200&h=1200&s=1",
    description: "Famous for the temple of Goddess Chhinnamasta and boating at the river confluence.",
    link: "https://www.google.com/maps/place/Rajrappa+Temple"
  },
  {
    name: "Pahari Mandir Ranchi",
    image: "https://seawatersports.com/images/places/pahari-mandir.jpg",
    description: "A scenic hilltop Shiva temple offering a panoramic view of Ranchi city.",
    link: "https://www.google.com/maps/place/Pahari+Mandir"
  },
  {
    name: "Jonha Falls",
    image: "https://seawatersports.com/images/places/jonha-falls.jpg",
    description: "Known as Gautamdhara Falls, surrounded by lush forests with a Buddhist monastery nearby.",
    link: "https://www.google.com/maps/place/Jonha+Falls"
  },
  {
    name: "Sita Falls",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHcE9tqUAZsSOsFM8vB62XvydU1g-LSAyp9g&s",
    description: "A beautiful waterfall located about 40 km from Ranchi, ideal for picnics and treks.",
    link: "https://www.google.com/maps/place/Sita+Falls"
  }
];

// ✅ Historical & Archaeological Sites
const historicalPlaces = [
  {
    name: "Navratangarh Fort",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5skhBB5ZDboM0M3_0yfZS5T19DvQ3Cu_7Uw&s",
    description: "Ruins of the Nagvanshi dynasty fort, an architectural and historical gem.",
    link: "https://www.google.com/maps/place/Navratangarh+Fort"
  },
  {
    name: "Palamu Fort",
    image: "https://www.shutterstock.com/image-photo/palamu-old-fort-jharkhand-india-600w-1190540464.jpg",
    description: "A twin fort complex inside Betla National Park, reflecting Mughal and tribal history.",
    link: "https://www.google.com/maps/place/Palamu+Fort"
  },
  {
    name: "Birsa Jaivik Udyan (Zoo)",
    image: "https://hblimg.mmtcdn.com/content/hubble/img/ranchi/mmt/activities/m_activities_ranchi_birsa_zoological_park_l_287_573.jpg",
    description: "Ranchi's zoological park named after Birsa Munda, home to wildlife & botanical gardens.",
    link: "https://www.google.com/maps/place/Birsa+Jaivik+Udyan"
  }
];

function Home() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState("");

  const styles = {
    app: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/9/94/Hundru_Falls.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      minHeight: "100vh",
      padding: "0",
      margin: "0",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.6)",
      minHeight: "100vh",
      paddingBottom: "40px",
    },
    heading: {
      textAlign: "center",
      margin: "20px 0",
      color: "#fff",
    },
    searchBar: {
      display: "block",
      margin: "0 auto 20px",
      padding: "10px 15px",
      width: "60%",
      maxWidth: "500px",
      borderRadius: "25px",
      border: "none",
      outline: "none",
      fontSize: "16px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    },
    carouselWrapper: {
      width: "100%",
      margin: "0 auto 40px",
      height: "400px",
      position: "relative",
      overflow: "hidden",
      borderRadius: "12px",
    },
    carouselImage: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: 0,
      transition: "opacity 1s ease-in-out",
    },
    activeImage: { opacity: 1, zIndex: 1 },
    sectionTitle: {
      color: "#fff",
      margin: "40px 0 20px",
      textAlign: "center",
      fontSize: "26px",
    },
    placesContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "24px",
      justifyContent: "center",
    },
    placeCard: {
      width: "280px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      padding: "15px",
      cursor: "pointer",
      transition: "transform 0.3s, box-shadow 0.3s",
    },
    placeImage: {
      width: "100%",
      height: "160px",
      objectFit: "cover",
      borderRadius: "8px",
      marginBottom: "10px",
    },
    placeName: { fontSize: "18px", margin: "10px 0 5px" },
    desc: {
      fontSize: "14px",
      maxHeight: "0",
      overflow: "hidden",
      transition: "max-height 0.5s ease",
    },
    expandedDesc: { maxHeight: "200px", marginTop: "10px" },
    linkStyle: {
      color: "#007BFF",
      fontWeight: "bold",
      marginLeft: "5px",
      textDecoration: "none",
    },
  };

  // ✅ Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Search filter across all categories
  const filterFn = (p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase());

  // ✅ Render reusable cards
  const renderPlaces = (places) =>
    places.filter(filterFn).map((place, i) => (
      <div
        key={i}
        style={styles.placeCard}
        onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
      >
        <img src={place.image} alt={place.name} style={styles.placeImage} />
        <h3 style={styles.placeName}>{place.name}</h3>
        <p
          style={
            expandedIndex === i
              ? { ...styles.desc, ...styles.expandedDesc }
              : styles.desc
          }
        >
          {place.description}
          {place.link && (
            <a
              href={place.link}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.linkStyle}
              onClick={(e) => e.stopPropagation()}
            >
              Location
            </a>
          )}
        </p>
      </div>
    ));

  return (
    <div style={styles.app}>
      <div style={styles.overlay}>
        <div style={styles.heading}>
          <h1>🌿 Welcome to Jharkhand</h1>
          <p>
            Explore Jharkhand – the <b>Land of Forests</b>, with its natural beauty, waterfalls,
            wildlife, and rich cultural heritage.
          </p>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search places..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchBar}
        />

        {/* Carousel */}
        <div style={styles.carouselWrapper}>
          {carouselImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`slide-${i}`}
              style={{
                ...styles.carouselImage,
                ...(i === activeIndex ? styles.activeImage : {}),
              }}
            />
          ))}
        </div>

        {/* Sections */}
        <h2 style={styles.sectionTitle}>🌲 Eco-Tourism</h2>
        <div style={styles.placesContainer}>{renderPlaces(ecoPlaces)}</div>

        <h2 style={styles.sectionTitle}>🏛️ Cultural & Heritage Tourism</h2>
        <div style={styles.placesContainer}>{renderPlaces(culturalPlaces)}</div>

        <h2 style={styles.sectionTitle}>⛰️ Adventure & Trekking</h2>
        <div style={styles.placesContainer}>{renderPlaces(adventurePlaces)}</div>

        <h2 style={styles.sectionTitle}>🏰 Historical & Archaeological Sites</h2>
        <div style={styles.placesContainer}>{renderPlaces(historicalPlaces)}</div>
      </div>
    </div>
  );
}

export default Home;
