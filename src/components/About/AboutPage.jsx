import React from "react";
import "./AboutPage.css";
import { FaWifi, FaPlug, FaBook, FaTint, FaUtensils, FaLightbulb, FaVideo } from "react-icons/fa";
import { MdMeetingRoom, MdOutlineWc } from "react-icons/md";

const AboutPage = () => {
  const amenities = [
    {
      icon: <FaWifi size={30} color="#2b6cb0" />,
      title: "High-Speed WiFi",
      desc: "Stay connected with our fast and reliable internet.",
    },
    {
      icon: <FaPlug size={30} color="#2b6cb0" />,
      title: "Charging Points",
      desc: "Keep your devices fully charged and ready to go.",
    },
    {
      icon: <MdMeetingRoom size={30} color="#2b6cb0" />,
      title: "Study Cabins",
      desc: "Quiet and private cabins for distraction-free study.",
    },
    {
      icon: <FaLightbulb size={30} color="#2b6cb0" />,
      title: "Personal Study Light",
      desc: "Each cabin is equipped with its own study light.",
    },
    {
      icon: <FaTint size={30} color="#2b6cb0" />,
      title: "Water Facility",
      desc: "Clean and safe drinking water always available.",
    },
    {
      icon: <MdOutlineWc size={30} color="#2b6cb0" />,
      title: "Washroom Available",
      desc: "Convenient and hygienic washroom facilities.",
    },
    {
      icon: <FaBook size={30} color="#2b6cb0" />,
      title: "Extensive Book Collection",
      desc: "Access a wide range of academic and reference books.",
    },
    {
      icon: <FaVideo size={30} color="#2b6cb0" />,
      title: "Camera Security",
      desc: "24/7 CCTV monitoring for a safe environment.",
    },
    {
      icon: <FaUtensils size={30} color="#2b6cb0" />,
      title: "Separate Food Room",
      desc: "Dedicated space for meals away from study areas.",
    },
  ];

  return (
    <div className="about-page">
      <div className="about-header">
        <h1>Welcome to Turning Point Library </h1>
        <p>
          A peaceful environment designed for serious learners. 
          Explore our facilities that ensure comfort, safety, and productivity.
        </p>
      </div>

      <div className="amenities-section">
        <h2>Our Facilities</h2>
        <div className="amenities-grid">
          {amenities.map((item, index) => (
            <div key={index} className="amenity-card">
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
