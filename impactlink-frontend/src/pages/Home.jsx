import React from "react";

const Home = () => {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero text-center text-white d-flex align-items-center justify-content-center" style={{ height: "80vh", backgroundImage: "url('https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=800')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="content">
          <h1>Empower Change Through Crowdfunding</h1>
          <p className="lead">Support ideas, charities, and innovations that matter.</p>
          <a href="/campaigns" className="btn btn-primary btn-lg">Explore Campaigns</a>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="campaigns my-5">
        <h2 className="text-center">Featured Campaigns</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img src="https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=800" className="card-img-top" alt="Education for All" />
              <div className="card-body">
                <h5 className="card-title">Education for All</h5>
                <p className="card-text">Help provide education to underprivileged children.</p>
                <a href="/campaign/1" className="btn btn-outline-primary">View Campaign</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src="https://images.pexels.com/photos/6646913/pexels-photo-6646913.jpeg?auto=compress&cs=tinysrgb&w=800" className="card-img-top" alt="Clean Water Initiative" />
              <div className="card-body">
                <h5 className="card-title">Clean Water Initiative</h5>
                <p className="card-text">Providing clean drinking water to remote areas.</p>
                <a href="/campaign/2" className="btn btn-outline-primary">View Campaign</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" className="card-img-top" alt="Healthcare Support" />
              <div className="card-body">
                <h5 className="card-title">Healthcare Support</h5>
                <p className="card-text">Medical aid for those in need.</p>
                <a href="/campaign/3" className="btn btn-outline-primary">View Campaign</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="call-to-action text-center my-5 p-5 text-white" style={{ background: "#007bff" }}>
        <h2>Start Your Campaign Today</h2>
        <p>Join thousands of users making a difference.</p>
        <a href="/create-campaign" className="btn btn-light btn-lg">Create Campaign</a>
      </section>
    </div>
  );
};

export default Home;
