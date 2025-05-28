import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FAQAccordion from "../components/FAQAccordion";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Home() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const faqList = [
    {
      question: "How do I become an ambassador on InforReel?",
      answer:
        "To become an ambassador, you must first complete the influencer onboarding form and submit your application. Our team will review your profile, social reach, and relevance to partner categories. Once approved, you can start creating VibeReels, endorsing brands, and earning commissions.",
    },
    {
      question: "Can I sell products on InforReel as a brand?",
      answer:
        "Yes. Brands can apply to open a Showroom on InforReel by completing the vendor onboarding process, which includes Stripe and Shippo integration. After approval, you can list curated products, customize your storefront, and collaborate with influencers.",
    },
    {
      question: "What are VibeReels, and who can create them?",
      answer:
        "VibeReels are short, engaging videos used to showcase products, collections, or entertainment moments. Approved ambassadors and vendors can create VibeReels to promote their offerings and drive engagement across the platform.",
    },
    {
      question: "How do users discover new products on InforReel?",
      answer:
        "Users explore curated Showrooms, follow ambassadors and brands, browse category-specific VibeReels, and receive personalized recommendations based on selected interests like beauty, fashion, fitness, or sports.",
    },
    {
      question: "How does payment and delivery work for orders?",
      answer:
        "InforReel uses Stripe Connect for secure payments and Shippo for verified delivery tracking. Funds are released to vendors only after a successful delivery is confirmed, ensuring buyer protection and transaction transparency.",
    },
    {
      question: "Is InforReel suitable for kids or teenagers?",
      answer:
        "InforReel is designed for users aged 14 and above. While the platform encourages creative expression and product discovery, it also involves commerce, influencer monetization, and brand collaboration features not intended for children. We recommend that parents supervise online activity for anyone under 18.",
    },
  ];

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    navigate("/welcome");
  };

  return (
    <div
      style={{
        backgroundColor: "#141414",
        color: "white",
        minHeight: "100vh",
        overflowX: "hidden",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Header />

      <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: "100%", height: "100%", zIndex: 0, top: 0, left: 0 }}>
          <video autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }}>
            <source src="/hero-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Bottom gradient */}
          <div
            style={{
              position: "absolute",
              bottom: "-1px",
              left: 0,
              width: "100%",
              height: "300px",
              background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #141414 100%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Top gradient
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "200px",
              background: "linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0) #141414 100%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          /> */}
        </div>

        {/* TEXT SECTION START */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            padding: "4rem 2rem",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem", marginTop: "2rem"}}>
            Welcome to InforReel
          </h1>
          <p style={{ fontSize: "0.9rem", marginBottom: "1rem" }}>
            Where Brands, Fans & Influencers Collide. Vibe. Promote. Earn.
          </p>
          

          <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#ddd" }}>
            Join InforReel — your journey into curated commerce and entertainment starts here.
          </p>

          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
              maxWidth: "500px",
              marginInline: "auto",
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "10px 16px",
                width: "100%",
                border: "1px solid #ccc",
                borderRight: "none",
                borderRadius: "6px 0 0 6px",
                flex: 1,
              }}
            />
            <button
              onClick={handleSubmit}
              style={{
                padding: "10px 20px",
                backgroundColor: "#96105E",
                color: "white",
                border: "none",
                borderRadius: "0 6px 6px 0",
                cursor: "pointer",
              }}
            >
              Get Started
            </button>
          </div>

          {error && (
            <p style={{ color: "red", fontSize: "0.9rem", marginTop: "0.5rem" }}>
              {error}
            </p>
          )}
        </div>
        {/* TEXT SECTION END */}
      </section>

      <section style={{ padding: "2rem 1rem", backgroundColor: "#141414", maxWidth: "1200px", margin: "auto" }}>
        <h2 style={{ textAlign: "center", color: "white" }}>More Reasons to Join</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            marginTop: "1rem",
            flexWrap: "nowrap",
          }}
        >
          {[
            {
              title: "Monetize Your Influence",
              description:
                "As an Approved Ambassador / Influencer Approved influencers and brand ambassadors earn through exclusive product promotions, endorsements, and VibeReels.",
            },
            {
              title: "Title Shop Smarter with Personalized Discovery ",
              description:
                "Explore curated Showrooms by interest — from fashion and wellness to sports and beauty — tailored to your selected preferences.",
            },
            {
              title: "Brands Grow Without Paid Ads",
              description:
                "Let your products be discovered through VibeReels, ambassador collections, and location-based visibility — not ad budgets.",
            },
            {
              title: "Real-Time Drops",
              description:
                "Get notified the moment your favorite brands, influencers, or product categories release new VibeReels or limited drops.",
            },
          ].map((card, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#3E3E3E",
                borderRadius: "12px",
                padding: "1.2rem",
                flex: "1 1 23%",
                minHeight: "160px",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.6rem" }}>{card.title}</h3>
              <p style={{ fontSize: "0.9rem", lineHeight: "1.4" }}>{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: "#141414", color: "white", maxWidth: "800px", margin: "3rem auto", padding: "0 1rem" }}>
        <h2 style={{ textAlign: "center" }}>Frequently Asked Questions</h2>
        <br />
        {faqList.map((faq, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: "#1a1a1a",
              borderRadius: "8px",
              marginBottom: "12px",
              padding: "1rem",
              color: "white",
            }}
          >
            <FAQAccordion {...faq} />
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}

export default Home;
