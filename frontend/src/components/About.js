import React from "react";

function about() {
  return (
    <div>
      <div className="about-page container py-5">
        {/* Hero */}
        <header className="row align-items-center mb-5">
          <div className="col-lg-7">
            <h1 className="display-5 fw-bold">About Our Platform</h1>
            <p className="lead text-muted">
              We create reliable, maintainable, and secure software so teams can
              focus on what matters: shipping value.
            </p>
            <div className="d-flex gap-2 flex-wrap">
              <a href="#mission" className="btn btn-primary btn-lg">
                Our Mission
              </a>
              <a href="#team" className="btn btn-outline-secondary btn-lg">
                Meet the Team
              </a>
            </div>
          </div>
          <div className="col-lg-5 text-center d-none d-lg-block">
            <img
              src="https://via.placeholder.com/420x300"
              alt="About illustration"
              className="img-fluid rounded shadow"
            />
          </div>
        </header>

        {/* Mission / Vision */}
        <section id="mission" className="row align-items-center mb-5">
          <div className="col-md-6">
            <h2 className="h3">Our Mission</h2>
            <p className="text-muted">
              To empower developers and teams with tools and patterns that
              reduce friction, improve performance, and increase developer
              happiness. We believe well-crafted tooling and clear processes
              unlock human potential.
            </p>
            <ul className="list-unstyled">
              <li>• Reliable infrastructure and developer workflows</li>
              <li>• High-quality developer documentation</li>
              <li>• Practical security-by-default</li>
            </ul>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h3 className="h5">Quick Facts</h3>
                <div className="row text-center mt-3">
                  <div className="col-4">
                    <div className="fs-3 fw-bold">8k+</div>
                    <div className="text-muted">Users</div>
                  </div>
                  <div className="col-4">
                    <div className="fs-3 fw-bold">120+</div>
                    <div className="text-muted">Projects</div>
                  </div>
                  <div className="col-4">
                    <div className="fs-3 fw-bold">24/7</div>
                    <div className="text-muted">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-5">
          <h2 className="h4 mb-3">Our Values</h2>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Quality First</h5>
                  <p className="card-text text-muted">
                    We prioritize correctness, tests, and maintainability over
                    quick hacks.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Empathy</h5>
                  <p className="card-text text-muted">
                    We listen to users and teammates; product decisions are
                    people-first.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Pragmatism</h5>
                  <p className="card-text text-muted">
                    Ship value quickly and iterate—balance idealism with
                    real-world constraints.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="mb-5">
          <h2 className="h4 mb-3">Meet the Team</h2>
          <div className="row g-4">
            {team.map((member) => (
              <div key={member.id} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <img
                    src={member.img}
                    className="card-img-top"
                    alt={member.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-1">{member.name}</h5>
                    <div className="text-muted small mb-2">{member.role}</div>
                    <p className="card-text text-muted">{member.bio}</p>
                    <div className="d-flex gap-2">
                      <a href="#" className="btn btn-sm btn-outline-primary">
                        Contact
                      </a>
                      <a href="#" className="btn btn-sm btn-outline-secondary">
                        View Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Footer */}
        <footer className="pt-4 mt-5 border-top text-center">
          <h3 className="h5">Want to work with us?</h3>
          <p className="text-muted">
            We’re hiring engineers, designers, and product people. Reach out and
            let’s build something great.
          </p>
          <a href="#" className="btn btn-primary btn-lg">
            Join the Team
          </a>
        </footer>
      </div>
    </div>
  );
}

export default about;
