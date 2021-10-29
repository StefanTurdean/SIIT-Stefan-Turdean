
var commentInput = document.querySelector("#commentInput")
var commentAddBtn = document.querySelector("#commentAddBtn")
var commentSection = document.querySelector("#commentList")


function addComment(text){
    var commentDisplay = document.createElement("div");
    commentDisplay.classList.add("comment")

    var divContainer = document.createElement("div");
    divContainer.classList.add("divContainer")

    addImg(commentDisplay);
    preMadeUser(divContainer);

    createCommentText(text,divContainer);
    commentDisplay.append(divContainer);
    
    createDeleteBtn(commentDisplay);
    
    commentSection.prepend(commentDisplay);
    text = "";
}

function addImg(parent) {
    var img = document.createElement("img")
    img.src = "https://eastern.in/wp-content/uploads/2016/09/software-developer-copy-1024x1024-1.jpg";
    img.classList.add("userImg")

    parent.append(img);
}

function preMadeUser(params) {
    var text = document.createElement("span")
    text.innerHTML = "Someone@NotGmail.com"
    text.classList.add("userName")

    params.append(text)
}

function createCommentText(comment, textParent){
    commentText = document.createElement("p");
    commentText.innerHTML = comment;
    commentText.classList.add("commentText");

    textParent.append(commentText);
}

function createDeleteBtn(element){
    var commenteDeleteBtn = document.createElement("button");
    commenteDeleteBtn.innerHTML = ("DELETE");
    commenteDeleteBtn.addEventListener("click", function selfDelete(){
        element.parentElement.removeChild(element);
    })
    commenteDeleteBtn.classList.add("commentDeleteBtn");
    
    element.append(commenteDeleteBtn);
}

addComment("Nice Work")