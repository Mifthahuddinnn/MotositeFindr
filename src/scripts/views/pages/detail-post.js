import UrlParser from '../../routes/url-parser';
import MotorSource from "../../data/motor-source";
import detailPostCreator from '../templates/detail-post-creator';


const DetailPost = {
  async render() {
    return `
      <section class="detail">
      <div class="container" id="detailMotor"></div>
      </section>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const motor = await MotorSource.detailMotor(url.id);
    console.log(motor);
    const detailContainer = document.querySelector('#detailMotor');
    detailContainer.innerHTML = detailPostCreator(motor);

    const commentInput = document.querySelector('#commentInput');
    const commentSubmitBtn = document.querySelector('#commentSubmitBtn');

    commentSubmitBtn.addEventListener('click', async () => {
      const body = commentInput.value.trim();

      if (body !== '') {
        try {
          const response = await MotorSource.postComment(url.id, body );
          if (response.success) {
            this.afterRender();
          } else {
            alert(response.message || 'Failed to post comment');
          }
        } catch (error) {
          console.error('Error posting comment:', error);
          alert('Failed to post comment. Please try again.');
        }
      }
    });
  },
};

export default DetailPost;