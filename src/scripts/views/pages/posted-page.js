import MotorSource from "../../data/motor-source";
import postList from "../templates/post-list-creator";

// eslint-disable-next-line import/no-unresolved
require('@fortawesome/fontawesome-free/css/all.min.css');

const PostedPage = {
    async render() {
        return `
        <jumbotron-section></jumbotron-section>
            <section class="post">
                <div class="container">
                    <div class="row" id="listPost">
                        
                    </div>
                </div>
                <a href="#/post">
                    <i class="fa-solid fa-circle-plus"></i>
                </a>
            </section>
        `;
    },

    async afterRender() {
        const searchElement = document.querySelector('jumbotron-section');
        const motorContainer = document.querySelector('#listPost');

        const dataMotor = await MotorSource.listMotor();
        dataMotor.forEach((motor) => {
            motorContainer.innerHTML += postList(motor);
        })

        const renderResult = (results) => {
            if (results && Array.isArray(results.motors)) {
                // Clear previous content
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
            }catch(error){
                console.error('Error posting comment:', error);
                throw error;
            }
        };
        searchElement.clickEvent = onButtonSearchClicked;
    },
};

export default PostedPage;