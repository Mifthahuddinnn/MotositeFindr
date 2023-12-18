class Header extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    const authToken = localStorage.getItem('authToken');
    const isLoggedIn = authToken !== null && authToken !== undefined && authToken !== '';

    this.innerHTML = `
            <header>
                <nav class="navbar navbar-expand-lg navbar-light fixed-top">
                    <div class="container-fluid">
                        <a class="navbar-brand ms-5" href="#"><img src="./images/logo/logo.png" alt="Bootstrap">MotositeFindr</a>

                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav ms-auto me-5">
                                <li class="nav-item px-2">
                                    <a class="nav-link" aria-current="page" href="#/">Home</a>
                                </li>
                                <li class="nav-item px-2">
                                    <a class="nav-link" href="#/searchpages">Post</a>
                                </li>
                                <li class="nav-item px-2">
                                    <a class="nav-link" href="#/contact">Contact</a>
                                </li>
                                <li class="btn-log nav-item px-2" id="loginLogoutItem">
                                    ${isLoggedIn
        ? `<a class="nav-link" href="#" id="logoutLink"><i class="fa-solid fa-sign-out"></i> Logout</a>`
        : `<a class="nav-link" href="#/login" id="loginLink"><i class="fa-solid fa-user"></i> Login</a>`
      }
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        `;
  }

  setupEventListeners() {
    const loginLogoutItem = this.querySelector('#loginLogoutItem');

    if (loginLogoutItem) {
      loginLogoutItem.addEventListener('click', (event) => {
        const loginLink = this.querySelector('#loginLink');
        const logoutLink = this.querySelector('#logoutLink');

        if (event.target === loginLink) {
          // Redirect to the login page or any other desired page
          window.location.href = '#/login';
        } else if (event.target === logoutLink) {
          // Remove the token from localStorage
          localStorage.removeItem('authToken');

          // Update the render to show the "Login" button
          this.updateRender();
        }
      });
    }
  }

  updateRender() {
    this.innerHTML = ''; // Clear the current content
    this.render();
    this.setupEventListeners();
  }
}

customElements.define('header-section', Header);