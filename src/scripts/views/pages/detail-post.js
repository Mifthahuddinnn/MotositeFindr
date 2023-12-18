import Swal from 'sweetalert2';
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
      const isConfirmed = await Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'You are about to delete this post. This action cannot be undone.',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });
    
      // Jika pengguna mengonfirmasi penghapusan
      if (isConfirmed.isConfirmed) {
        try {
          await MotorSource.deleteMotor(motor._id);
        } catch (error) {
          console.error('Error deleting motor:', error.message);
          // Tambahkan penanganan kesalahan sesuai kebutuhan
          Swal.fire({
            icon: 'error',
            title: 'Delete Failed',
            text: 'Failed to delete the post. Please try again.',
          });
        }
      }
    });


    if (motor.comments && motor.comments.length > 0) {
      deleteCommentBtn.addEventListener('click', async () => {
        try {
          const confirmDeleteComment = await Swal.fire({
            title: 'Are you sure?',
            text: 'You wont be able to delete this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
          });

          if (confirmDeleteComment.isConfirmed) {
            await MotorSource.deleteComment(motor._id, motor.comments.map(comment => comment._id));
            this.afterRender();
          }
        } catch (error) {
          console.error('Error deleting comment:', error.message);
          alert('Failed to delete comment. Please try again.');
        }
      });
    } else {
      console.log('No comment');
    }
  }
};

export default DetailPost;