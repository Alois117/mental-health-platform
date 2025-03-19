import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import depressionImg from "../assets/depressionImg.jpg";  
import coupleImg from "../assets/coupleImg.jpg";  
import childImg from "../assets/childImg.jpg";  
import anxietyImg from "../assets/anxietyImg.jpg";  
import traumaImg from "../assets/traumaImg.jpg";  
import addictionImg from "../assets/addictionImg.jpg";  
import griefImg from "../assets/griefImg.jpg";  
import confidenceImg from "../assets/confidenceImg.jpg";  

const services = [
  {
    id: 1,
    title: "Depression Counseling",
    type: "FULL OFFLINE",
    description: "Professional support to help individuals manage depression and emotional distress.",
    price: "$26",
    image: depressionImg,
  },
  {
    id: 2,
    title: "Couple Counseling",
    type: "ONLINE | OFFLINE",
    description: "Guidance for couples to strengthen their relationship and communication.",
    price: "$32",
    image: coupleImg,
  },
  {
    id: 3,
    title: "Child Psychotherapy",
    type: "FULL ONLINE",
    description: "Tailored therapy sessions for children facing emotional or behavioral challenges.",
    price: "$20",
    image: childImg,
  },
  {
    id: 4,
    title: "Anxiety Therapy",
    type: "FULL ONLINE",
    description: "Effective strategies to help overcome anxiety and regain control of life.",
    price: "$30",
    image: anxietyImg,
  },
  {
    id: 5,
    title: "Trauma Recovery Therapy",
    type: "FULL OFFLINE",
    description: "Support for individuals healing from past trauma and PTSD.",
    price: "$35",
    image: traumaImg,
  },
  {
    id: 6,
    title: "Addiction Counseling",
    type: "ONLINE | OFFLINE",
    description: "Guidance and support for overcoming substance and behavioral addictions.",
    price: "$40",
    image: addictionImg,
  },
  {
    id: 7,
    title: "Grief Support Therapy",
    type: "FULL ONLINE",
    description: "Compassionate counseling for those dealing with loss and grief.",
    price: "$25",
    image: griefImg,
  },
  {
    id: 8,
    title: "Self-Esteem & Confidence Building",
    type: "ONLINE | OFFLINE",
    description: "Helping individuals develop confidence and a positive self-image.",
    price: "$22",
    image: confidenceImg,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold">We provide solutions</h2>
        <p className="text-lg text-gray-400">Our services prove our commitment to mental wellness</p>

        {/* Services Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          navigation
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mt-10"
        >
          {services.map((service) => (
            <SwiperSlide key={service.id}>
              <div className="bg-[#1E293B] p-6 rounded-xl shadow-lg">
                <p className="text-sm text-blue-400">{service.type}</p>
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="mt-2 text-gray-300">{service.description}</p>
                <img src={service.image} alt={service.title} className="mt-4 w-full h-40 object-cover rounded-lg" />
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-teal-400">{service.price} /Session</span>
                  <button className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700">BOOK NOW</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ServicesSection;
