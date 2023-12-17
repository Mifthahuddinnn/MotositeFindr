const postList = (motor) => `
    <div class="col col-sm-3">
        <div class="card-searchpages card mb-5" style="width: 17rem;">
            <img src="${motor.imageURL}" class="card-img-top" style="height: 220px; width: 100%; object-fit: cover;" alt="...">
            <div class="card-body">
            <a href="#/detail/${motor._id}" class="card-title-searchpages"><p>${motor.title}</p></a>
            <span class="badge bg-secondary">Motorcycle Help</span>
            <p class="card-text">${motor.licensePlate}</p>
            </div>
        </div>
    </div>
`;

export default postList;