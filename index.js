const cardContainer = document.querySelector(".card__container");

const newCard = ({id, imgUrl, taskTitle, taskType, taskDescription}) => {
    return `<div class="col-lg-3 col-md-4 col-sm-6 mb-3" id=${id}>
        <div class="card">
            <div class="card-header d-flex justify-content-end gap-1">
                <button class="btn btn-outline-success btn-sm">
                    <i class="far fa-edit"></i>
                </button>
                <button class="btn btn-outline-danger btn-sm">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="card-body">
                <img src=${imgUrl} alt="" class="card-img-top mb-2">
                <h4 class="card-title">${taskTitle}</h4>
                <p class="card-text">${taskDescription}</p>
                <h5>
                    <span class="badge bg-success">${taskType}</span>
                </h5>
            </div>
            <div class="card-footer d-flex justify-content-end">
                <button class="btn btn-primary">
                    Open task
                </button>
            </div>
        </div>
    </div>`;
}

// function called when we click the save button in add task
const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,
        imgUrl: document.getElementById("imageUrl").value,
        taskTitle: document.getElementById("taskTitle").value,
        taskType: document.getElementById("taskType").value,
        taskDescription: document.getElementById("taskDescription").value
    };
    
    const createNewCard = newCard(taskData);
    cardContainer.insertAdjacentHTML("beforeend", createNewCard);
};

