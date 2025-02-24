import React from "react";

const About = () => {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero text-center text-white d-flex align-items-center justify-content-center" 
        style={{ 
          height: "60vh", 
          backgroundImage: "url('https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800')", 
          backgroundSize: "cover", 
          backgroundPosition: "center" 
        }}>
        <div className="content">
          <h1>About Our Crowdfunding Platform</h1>
          <p className="lead">Empowering innovators, creators, and dreamers to bring their ideas to life.</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="intro my-5">
        <div className="row">
          <div className="col-md-6">
            <h2>What We Do</h2>
            <p>
              Our platform connects people with big ideas to those who believe in them. Whether it’s funding a startup, supporting a social cause, or pre-ordering an innovative product, we make crowdfunding easy and transparent.
            </p>
          </div>
          <div className="col-md-6">
            <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800" className="img-fluid rounded" alt="About Us" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works my-5">
        <h2 className="text-center">How It Works</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <img src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800" className="img-fluid my-3" alt="Step 1" />
            <h4>Create a Campaign</h4>
            <p>Set your funding goal, tell your story, and upload images/videos.</p>
          </div>
          <div className="col-md-4">
            <img src="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800" className="img-fluid my-3" alt="Step 2" />
            <h4>Share with the World</h4>
            <p>Promote your campaign via social media and engage with backers.</p>
          </div>
          <div className="col-md-4">
            <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800" className="img-fluid my-3" alt="Step 3" />
            <h4>Receive Funding</h4>
            <p>Once your goal is met, funds are released to bring your idea to life.</p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mission text-center text-white p-5" 
        style={{ background: "linear-gradient(to right, #007bff, #0056b3)" }}>
        <h2>Our Mission</h2>
        <p>To make funding accessible for everyone with a vision, no matter how big or small.</p>
      </section>
    </div>
  );
};

export default About;
