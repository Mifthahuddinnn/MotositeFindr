const postList = (motor) => `
    <div class="col col-sm-3">
        <div class="card-searchpages card mb-5" style="width: 15rem;">
            <img src="./images/heros/gambar-dasar.jpg" class="card-img-top" alt="...">
            <div class="card-body">
            <a href="#/detail/${motor._id}" class="card-title-searchpages"><p>${motor.title}</p></a>
            <span class="badge bg-secondary">Motorcycle Help</span>
            <p class="card-text"><i class="fa-solid fa-user"></i>${motor.licensePlate}</p>
            </div>
        </div>
    </div>
`;

export default postList;