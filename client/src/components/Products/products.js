import React from 'react';
import './products.css';

const features = [
  {
    title: "Browse Tools",
    description: "Search and filter tools by category and availability.",
    image: "https://rukminim2.flixcart.com/image/850/1000/l2m78280/rotary-tool/l/k/u/drill-bit-set-all-size-bits-for-electric-manual-drilling-machine-original-imagdwgct5a8szs6.jpeg?q=20&crop=false"
  },
  {
    title: "Make Reservations",
    description: "Reserve tools for your DIY projects with ease.",
    image: "https://housing.com/news/wp-content/uploads/2023/03/Types-of-hammers-Different-types-and-their-applications-f.jpg"
  },
  {
    title: "Report Damage",
    description: "Quickly report any issues with borrowed tools.",
    image: "https://images.jdmagicbox.com/quickquotes/images_main/1200w-portable-electric-woodworking-chain-saw-cutting-machine-2185001848-hke8sw65.jpg"
  },
  {
    title: "Leave Reviews",
    description: "Rate and review tools after using them.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwOn3J1n_s3W8lRES4JiqMi2Gv8rkfGSPrFg&s"
  }
];


const ProductSection = () => {
  return (
    <section className="product-section">
      <h2 className="product-title">How It Works</h2>
      <div className="product-grid">
        {features.map((item, idx) => (
          <div key={idx} className="product-card">
            <img src={item.image} alt={item.title} className="product-image" /> {/* Added image */}
            <h3 className="product-name">{item.title}</h3>
            <p className="product-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;