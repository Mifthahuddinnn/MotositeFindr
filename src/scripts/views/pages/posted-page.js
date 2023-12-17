import MotorSource from "../../data/motor-source";
import postList from "../templates/post-list-creator";

// eslint-disable-next-line import/no-unresolved
require('@fortawesome/fontawesome-free/css/all.min.css');

const PostedPage = {
    async render() {
        return `
        <section class="jumbotron">
            <div class="p-5 mb-5">
                <div class="container-fluid py-5">
                <h1 class="fw-bold text-center pt-5" data-aos="fade-right">Find Your Lost Motorcycle</h1>
                <p class="text-center" data-aos="fade-left">Enter the details of your lost motorcycle to start the search</p>
                <div>
                    <div class="form-input">
                    <input id="searchInput" class="form-control" type="text" placeholder="Enter motor model" aria-label="default input example">
                    </div>

                    <div class="text-center mb-5">
                    
                    <div class="dropdown">
                        <button class="btn btn-filter dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Filter
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" data-filter="terbaru">Terbaru</a></li>
                            <li><a class="dropdown-item" href="#" data-filter="terlama">Terlama</a></li>
                        </ul>
                    </div>
                    <br>
                        <a href="#/searchpages"><button class="btn-search" type="button" id="searchButton">Search</button></a>
                    </div>
                </div>
            </section>
            <section class="post">
                <div class="container">
                    <div class="row" id="listPost">
                        
                    </div>
                </div>
                </div>
            </div>
        </section>
        
        <section class="post">
            <div class="container">
                <div class="row" id="listPost2">
                        
                </div>
            </div>
            <a href="#/post">
                <i class="fa-solid fa-circle-plus"></i>
            </a>
        </section>
        `;
    },

    async afterRender() {
        const searchElement = document.querySelector('#searchInput');
        const motorContainer = document.querySelector('#listPost');
        const filterDropdown = document.querySelector('.dropdown-menu');

        const dataMotor = await MotorSource.listMotor();
        dataMotor.forEach((motor) => {
            motorContainer.innerHTML += postList(motor);
        });

        const renderResult = (results) => {
            if (results && Array.isArray(results.motors)) {
                motorContainer.innerHTML = '';

                results.motors.forEach((motor) => {
                    const newElement = document.createElement('div');
                    newElement.innerHTML = postList(motor);
                    motorContainer.appendChild(newElement);
                });
            } else {
                console.error('Results.motors is not an array:', results);

                const newElement = document.createElement('div');
                newElement.innerHTML = postList(results);
                motorContainer.innerHTML = '';
                motorContainer.appendChild(newElement);
            }
        };

        const onButtonSearchClicked = async () => {
            try {
                const result = await MotorSource.searchMotor(searchElement.value);
                console.log("result: ", result);
                renderResult(result);
            } catch (error) {
                console.error('Error searching motor:', error);
                throw error;
            }
        };
        searchElement.clickEvent = onButtonSearchClicked;

        filterDropdown.addEventListener('click', async (event) => {
            event.preventDefault();
            const filterType = event.target.dataset.filter;

            try {
                let sortedData;

                switch (filterType) {
                    case 'terbaru':
                        sortedData = await MotorSource.getLatestMotor();
                        break;
                    case 'terlama':
                        sortedData = await MotorSource.getOldestMotor();
                        break;
                    default:
                        sortedData = await MotorSource.listMotor();
                        break;
                }

                renderResult({ motors: sortedData });
            } catch (error) {
                console.error('Error fetching and rendering sorted data:', error);
                throw error;
            }
        });
    },
};

export default PostedPage;