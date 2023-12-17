class Statistic extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <section class="statistic">
      <div class="container">
        <div class="row">
          <div class="heading-statistic col col-sm-6 text-center p-5">
            <h2>Motorcycle Theft Statistics</h2>
            <p>Learn about the prevalence of motorcycle theft</p>
          </div>
          <div class="col col-sm-6">
            <div class="card-statistic card mb-4" data-aos="fade-up" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="./images/img/statistics1.jpeg" class="img-fluid rounded" alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Statistics</h5>
                    <p class="card-text">Over 40,000 motorcycles are reported stolen every year</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-statistic card mb-5" data-aos="fade-up" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="./images/img/statistics2.jpeg" class="img-fluid rounded" alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Prevention Tips</h5>
                    <p class="card-text">Always lock your motorcycle and use a secure parking area</p>
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

customElements.define('statistic-section', Statistic);