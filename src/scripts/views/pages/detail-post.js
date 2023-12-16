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
    const deleteBtn = document.querySelector('#deletePost');
    const deleteCommentBtn = document.querySelector('#deleteComment'); 

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

    deleteBtn.addEventListener('click', async () => {
      try {
        await MotorSource.deleteMotor(motor._id);
      } catch (error) {
        console.error('Error deleting motor:', error.message);
      }
    });


    if (motor.comments && motor.comments.length > 0) {
      deleteCommentBtn.addEventListener('click', async () => {
        try {
          await MotorSource.deleteComment(motor._id, motor.comments.map(comment => comment._id));
          // Jika berhasil menghapus komentar, reload halaman
            
        } catch (error) {
          console.error('Error deleting comment:', error.message);
          // Tambahkan penanganan kesalahan sesuai kebutuhan, misalnya, menampilkan pesan kesalahan kepada pengguna
          alert('Failed to delete comment. Please try again.');
        }
      });
    } else {
      console.log('No comment');
    }
  }
};

export default DetailPost;