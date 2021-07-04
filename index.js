const cardContainer = document.querySelector(".card__container");

// global array for local storage
let globalStore = [];

const newCard = ({id, imgUrl, taskTitle, taskType, taskDescription}) => {
    return `<div class="col-lg-3 col-md-4 col-sm-6 mb-3" id=${id}>
        <div class="card">
            <div class="card-header d-flex justify-content-end gap-1">
                <button class="btn id=${id} btn-outline-success btn-sm" onclick="editCard.apply(this, arguments)">
                    <i class="far fa-edit" id=${id}></i>
                </button>
                <button class="btn btn-outline-danger btn-sm" id=${id} onclick="deleteCard.apply(this, arguments)">
                    <i class="fas fa-trash" onclick="deleteCard.apply(this, arguments)"></i>
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

const loadInitialTaskCards = () =>
{
    // accessing local storage
    const getInitialData = localStorage.getItem("taskApp");
    if (!getInitialData) return; // if on new system we won't have tasky so to handle it
    
    const {cards} = JSON.parse(getInitialData);
    
    cards.forEach((cardObject) => {
        const createNewCard = newCard(cardObject);
        cardContainer.insertAdjacentHTML("beforeend", createNewCard);
        globalStore.push(cardObject);
    });
};

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

    globalStore.push(taskData);

    // local storage API
    localStorage.setItem("taskApp", JSON.stringify({cards: globalStore}));
};

const deleteCard = (e) =>
{
    e = window.event;
    const targetID = e.target.id;
    const tagname = e.target.tagName;

    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);

    localStorage.setItem("taskApp", JSON.stringify({cards: globalStore}));

    if (tagname === "BUTTON")
    {
        return cardContainer.removeChild(
            e.target.parentNode.parentNode.parentNode
        );
    }
    else
    {
        return cardContainer.removeChild(
            e.target.parentNode.parentNode.parentNode.parentNode
        );
    }
}; 


const editCard = (e) => {
    e = window.event;
    const targetId = e.target.id;
    const tagName = e.target.tagName;

    let parentElement = e.target.parentNode.parentNode
    if (tagName === "I")
        parentElement = parentElement.parentNode;
    
    let taskTitle = parentElement.childNodes[3].childNodes[3];
    taskTitle.setAttribute("contenteditable", "true");

    let taskDescription = parentElement.childNodes[3].childNodes[5];
    taskDescription.setAttribute("contenteditable", "true");

    let taskType = parentElement.childNodes[3].childNodes[7];
    taskType.setAttribute("contenteditable", "true");
    
    let saveButton = parentElement.childNodes[5].childNodes[1];
    saveButton.innerText = "Save Changes";
}
