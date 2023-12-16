import Swal from 'sweetalert2';
import MotorSource from "../../data/motor-source";

const FormPost = {
  async render() {
    return `
    <section class="form">
      <div class="container">
        <div class="row">
          <div class="heading-form col col-sm-9 ms-auto text-center">
            <h2>Filling Out</h2>
            <p>Follow these steps to utilize Motor Finder and recover your lost motorcycle</p>
            
            <form id="formTambahData">

              <div class="fill-form">

                <div class="mb-4">
                  <label for="title" class="form-label">Title</label>
                  <input type="text" id="title" name="title" class="form-control" placeholder="Enter motorcycle license plate">
                </div>

                <div class="mb-4">
                  <label for="licensePlate" class="form-label">License Plate</label>
                  <input type="text" id="licensePlate" name="licensePlate" class="form-control" placeholder="Enter motorcycle license plate">
                </div>

                <div class="mb-4">
                  <label for="model" class="form-label">Model</label>
                  <input type="text" id="model" name="model" class="form-control" placeholder="Enter motorcycle model">
                </div>

                <div class="mb-4">
                  <label for="dateTime" class="form-label">Date and Time</label>
                  <input type="date" id="dateTime" name="dateTIme" class="form-control" placeholder="Enter date and time when the motorcycle was lostm">
                </div>

                <div class="mb-5">
                  <label for="image" class="form-label">Add Image</label>
                  <input class="form-control" type="file" enctype="multipart/form-data" id="image" name="image" accept="image/">
                </div>
                <div id="imagePreview" class="mb-5"></div>

                <div class="mb-4">
                  <label for="description" class="form-label">Description</label>
                  <textarea class="form-control" id="description" name="description" rows="3" placeholder="Enter motorcycle description..."></textarea>
                </div>

              </div>

              <div class="btn-form text-center">
              <button class="btn-submit" type="submit" id="submitPost">Submit</button>
              </div>

              </form>

          </div>

        </div>
      </div>
    </section>
    `;
  },

  async afterRender() {

    const fileInput = document.getElementById('image');

    fileInput.addEventListener('change', () => {
      const selectedFile = fileInput.files[0];

      if (selectedFile) {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

        if (!validImageTypes.includes(selectedFile.type)) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Image Type',
            confirmButtonColor: '#00EBC7',
            color: '#00214D',
            text: 'Please select a valid image file (JPEG, PNG, JPG).',
            footer: '<a href="#/contact">Why do I have this issue?</a>'
          });
          fileInput.value = '';
        }
      }
    });

    

    document.getElementById('formTambahData').addEventListener('submit', async (event) => {
      event.preventDefault();

      const title = document.getElementById('title').value;
      const licensePlate = document.getElementById('licensePlate').value;
      const model = document.getElementById('model').value;
      const dateTime = document.getElementById('dateTime').value;
      const image = document.getElementById('image').files[0];
      const description = document.getElementById('description').value;

      if (!title || !licensePlate || !model || !dateTime || !image || !description) {
        Swal.fire({
          icon: 'error',
          title: 'Incomplete Form',
          text: 'Please fill out all fields.',
          color: '#00214D',
          confirmButtonColor: '#00EBC7',
        });
        return;
      }

      const formData = new FormData();
      formData.append('motor[title]', title);
      formData.append('motor[licensePlate]', licensePlate);
      formData.append('motor[model]', model);
      formData.append('dateTime', dateTime);
      formData.append('image', image);
      formData.append('motor[description]', description);

      MotorSource.postMotor(formData);
    });


  },
};

export default FormPost;