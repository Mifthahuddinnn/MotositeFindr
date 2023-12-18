class Jumbotron extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.querySelector("#searchInput").value;
  }

  handleSearch() {
    const searchInputValue = this.value;

    // Dispatch a custom event with the search input value
    const searchEvent = new CustomEvent('search', {
      detail: { searchInputValue },
    });
    this.dispatchEvent(searchEvent);
  }

  render() {
    this.innerHTML = `
      <section class="jumbotron">
        <div class="p-5 mb-1">
          <div class="container-fluid py-5">
            <h1 class="fw-bold text-center pt-5" data-aos="fade-right">Find Your Lost Motorcycle</h1>
            <p class="text-center" data-aos="fade-left">Enter the details of your lost motorcycle to start the search</p>
            <div>
              <div class="form-input">
                <input id="searchInput" class="form-control" type="text" placeholder="Enter motor model" aria-label="default input example">
              </div>
              <div class="text-center mb-1">
                <!-- Use a click event listener to trigger the handleSearch function -->
                <button class="btn-search" type="button" id="searchButton">Search</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    // Attach the handleSearch function to the click event of the search button
    this.querySelector('#searchButton').addEventListener('click', () => this.handleSearch());
  }
}

customElements.define('jumbotron-section', Jumbotron);
