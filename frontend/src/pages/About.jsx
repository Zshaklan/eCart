import Footer from "../components/Footer.jsx";
import Title from "../components/Title.jsx";

const About = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-linear-to-l from-[#141414] to-[#0c2025] text-gray-300">
      <section className="w-full py-24 px-6 md:px-16 text-center">
        <Title text1={"About"} text2={"US"} />
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          At eCart, we believe that fashion isn’t just about what you wear —
          it’s about how you express yourself. Our mission is to bring you the
          trendiest, most comfortable, and affordable fashion that empowers your
          style.
        </p>
      </section>

      <section className="w-full py-16 px-6 md:px-16 bg-[#0f1c1f]">
        <div className="max-w-5xl mx-auto text-center md:text-left">
          <h2 className="text-3xl font-semibold text-white mb-6">Our Story</h2>
          <p className="text-gray-400 leading-relaxed">
            Founded with a vision to make fashion accessible for everyone, eCart
            started as a small online boutique and quickly grew into a trusted
            name in modern fashion. From casual streetwear to elegant classics,
            our collection is designed for every mood, season, and personality.
          </p>
        </div>
      </section>

      <section className="w-full py-16 px-6 md:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-semibold text-white mb-6">
              Our Mission
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Our mission is simple — to make fashion easy, exciting, and
              eco-conscious. We’re committed to curating high-quality products
              while ensuring sustainability and fair practices across our supply
              chain.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-white mb-6">
              Our Values
            </h2>
            <ul className="space-y-3 text-gray-400 list-disc">
              <li>Customer-first approach — You inspire everything we do.</li>
              <li>
                Sustainability — We care for the planet as much as we care for
                style.
              </li>
              <li> Integrity — Honest products. Honest prices.</li>
              <li>
                Innovation — Constantly evolving to bring you the best in
                fashion.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full py-16 px-6 md:px-16 bg-[#0f1c1f] text-center">
        <h2 className="text-3xl font-semibold text-white mb-10">
          Why Choose <span className="text-teal-400">eCart?</span>
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {[
            {
              title: "Premium Quality",
              desc: "Every fabric and design is handpicked to ensure comfort, durability, and unmatched quality.",
            },
            {
              title: "Affordable Fashion",
              desc: "Style shouldn’t be expensive. We bring you top-notch fashion at pocket-friendly prices.",
            },
            {
              title: "Fast & Reliable Delivery",
              desc: "Get your favorite outfits delivered quickly and safely to your doorstep across India.",
            },
            {
              title: "Customer Satisfaction",
              desc: "Your happiness is our success — we go the extra mile to ensure a smooth shopping experience.",
            },
            {
              title: "Secure Payments",
              desc: "Shop with confidence using our trusted and encrypted payment gateways.",
            },
            {
              title: "Eco-Friendly Packaging",
              desc: "We care for the environment — that’s why our packaging is sustainable and reusable.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-[#141b1d] p-6 rounded-2xl border border-gray-700 hover:scale-[102%] transition-transform"
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
