class Community extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <section class="community community-section">
  <div class="container">
    <div class="row mt-3">

      <div class="heading-community col-12 col-sm-6 text-center">
        <h2>Community Help</h2>
        <p>Join our community to support each other in finding lost motorcycles</p>
      </div>

      <div class="col-12 col-sm-6">
        <div class="row">

          <div class="col-12 col-md-6">
            <div class="card-community card mt-2 mb-5" data-aos="fade-up"">
              <img src="./images/img/community1.png" class="card-img-top object-fit-cover" style="height: 200px; width: 100%; object-fit: cover;" alt="...">
              <div class="card-body">
                <h5 class="card-title-community">Ditemukan Motor Listrik</h5>
                <span class="badge bg-secondary">Motorcycle Help</span>
                <p class="card-text">P 1554 RP</p>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="card-community card mt-2 mb-5" data-aos="fade-right" style="width: 100%;">
              <img src="./images/img/community2.jpeg" class="card-img-top object-fit-cover" style="height: 200px; width: 100%; object-fit: cover;" alt="...">
              <div class="card-body">
                <h5 class="card-title-community">Dicari Motor Vino</h5>
                <span class="badge bg-secondary">Suspected Theft</span>
                <p class="card-text">P 1234 LK</p>
              </div>
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

customElements.define('community-section', Community);