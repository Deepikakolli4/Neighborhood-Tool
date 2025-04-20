import React from 'react';
import './products.css';

const features = [
  { title: "Browse Tools", description: "Search and filter tools by category and availability." },
  { title: "Make Reservations", description: "Reserve tools for your DIY projects with ease." },
  { title: "Report Damage", description: "Quickly report any issues with borrowed tools." },
  { title: "Leave Reviews", description: "Rate and review tools after using them." }
];

const ProductSection = () => {
  return (
    <section className="product-section">
      <h2 className="product-title">How It Works</h2>
      <div className="product-grid">
        {features.map((item, idx) => (
          <div key={idx} className="product-card">
            <h3 className="product-name">{item.title}</h3>
            <p className="product-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;