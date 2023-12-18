const detailPostCreator = (motor) => `
        <div class="row">
          <div class="img-detail col col-sm-6 ms-auto text-center">
            <img src="${motor.imageURL}" class="card-img-top" alt="...">
          </div>

          <div class="desc-detail col col-sm-6 text-start">
            <h5 class="title-detail mb-4">${motor.title}</h5>

            <div class="row">
            <p class="spec-detail-title col col-sm-3">License Plate:</p>
            <p class="spec-detail-desc col col-sm-7">${motor.licensePlate}</p>
            </div>

            <div class="row">
            <p class="spec-detail-title col col-sm-3">Model:</p>
            <p class="spec-detail-desc col col-sm-7">${motor.model}</p>
            </div>

            <div class="row">
            <p class="spec-detail-title col col-sm-3">Missing Date:</p>
            <p class="spec-detail-desc col col-sm-7">${motor.missingDate}</p>
            </div>

            <h5 class="title-desc mt-3">Description</h5>
            <p class="description">${motor.description}</p>

            <div class="icon-detail">
              <button type="button" class="btn btn-comment" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <i class="fa-regular fa-comment"></i>
              </button>
              
              <button type="button" class="btn">
                <i class="fa-solid fa-trash" id="deletePost" style="color: #ff0000;"></i>
              </button>
            </div>

          </div>

          <div class="comment">

          <h2>Comments</h2>

          <!-- Modal -->
          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <p class="user-comment">Comment</p>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <input id="commentInput" class="form-control form-control-sm" type="text" placeholder="add comment" aria-label=".form-control-sm example">
                </div>
                <div class="modal-footer">
                  <button id="commentSubmitBtn" type="button" class="btn btn-submit-comment" data-bs-dismiss="modal"><i class="fa-solid fa-paper-plane"></i></button>
                </div>
              </div>
            </div>
          </div>

          ${motor.comments.map((comments) => `
            <p class="user-comment"><i class="fa-solid fa-user"></i> ${comments.author.fullname}</p>
            <p>${comments.body}</p>
            <p>
              <span> ${comments.dateTime} </span>
              <button type="button" class="btn">
                <i class="fa-solid fa-trash" id="deleteComment" style="color: #ff0000;"></i>
              </button>  
            </p>
          `).join('')}
          </div>
        </div>
`;

export default detailPostCreator;