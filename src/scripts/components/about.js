class About extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <section class="about">
      <div class="container">
        <div class="heading-about text-center">
          <h2>About MotositeFindr</h2>
          <p class="about text-center">
            MotorsiteFindr revolutionizes the search for lost motorcycles with its cutting-edge online platform. Seamlessly blending advanced technology and user-friendly features, it not only helps people locate their missing motorcycles but also empowers the community to actively report and recover lost bikes. Say goodbye to the stress of losing your prized possession and join MotorsiteFindr in the quest for a more secure and connected motorcycle community.
          </p>

          <div class="row mt-5">
            <div class="col-12 col-md-6 mt-2 mb-2">
              <div class="card vision-card">
                <div class="card-body vision-body">
                  <h3 class="card-title">Our Vision</h3>
                  <p class="card-text">
                    Our vision is to create a world where no motorcycle owner has to endure the pain of losing their beloved vehicle without hope. 
                    We strive to be at the forefront of technological innovation, providing cutting-edge solutions for finding lost motor vehicles.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 mt-2 mb-2">
              <div class="card mission-card">
                <div class="card-body mission-body">
                  <h3 class="card-title">Our Mission</h3>
                  <p class="card-text">
                    Our mission is to empower communities by offering a reliable and efficient platform to rediscover lost vehicles. 
                    We are dedicated to providing unwavering support throughout the search process, ensuring that no owner feels alone in the quest to find their motorcycle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    `;
  }
}

customElements.define("about-section", About);
