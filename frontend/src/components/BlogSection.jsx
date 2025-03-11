import React from "react";
import blog1 from "../assets/blog1.jpg";
import blog2 from "../assets/blog2.jpg";
import blog3 from "../assets/blog3.jpg";

const BlogSection = () => {
  const blogs = [
    {
      title: "The Importance of Mental Wellness",
      description:
        "Discover the impact of mental wellness on daily life and learn strategies to maintain emotional balance.",
      image: blog1,
    },
    {
      title: "Managing Anxiety and Stress",
      description:
        "Explore practical tips for reducing stress and anxiety to enhance your overall well-being.",
      image: blog2,
    },
    {
      title: "How Therapy Can Transform Lives",
      description:
        "Understand the benefits of therapy and how it can help individuals navigate challenges.",
      image: blog3,
    },
  ];

  return (
    <section className="py-16 px-6 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-lg text-teal-600 italic">Our Blog</h2>
        <h1 className="text-4xl font-bold text-gray-800">Latest Articles & Insights</h1>
        <p className="mt-4 text-gray-600">
          Stay informed with expert insights, self-care tips, and mental health guidance.
        </p>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img src={blog.image} alt={blog.title} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">{blog.title}</h3>
              <p className="text-gray-600 mt-3">{blog.description}</p>
              <button className="mt-4 inline-block bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
