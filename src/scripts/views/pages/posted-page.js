import MotorSource from "../../data/motor-source";
import postList from "../templates/post-list-creator";

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
        const dataMotor = await MotorSource.listMotor();
        console.log(dataMotor);
        const motorContainer = document.querySelector('#listPost');
        dataMotor.forEach((motor) => {
            motorContainer.innerHTML += postList(motor);
        })
    },
};

export default PostedPage;