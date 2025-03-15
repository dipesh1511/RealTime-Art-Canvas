let toolsCont = document.querySelector(".tools-cont");
let optionCont = document.querySelector(".option-cont");
let optionFlag = true;

let pencilToolCont = document.querySelector(".pencil-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");

let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let pencilFlag = false;
let eraserFlag = false;

let sticky = document.querySelector(".notes");
let upload = document.querySelector(".upload");

optionCont.addEventListener("click",(e)=>{
    // true -> show tools , flase -> hide tools
    optionFlag = !optionFlag;

    if(optionFlag){
        openTools();
    }
    else{
        closeTools();
    }
})


function openTools(){
    let iconElem = optionCont.children[0];
    iconElem.classList.remove("fa-times");
    iconElem.classList.add("fa-bars");
    toolsCont.style.display = "flex";
}

function closeTools(){
    let iconElem = optionCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-times");
    toolsCont.style.display = "none"

    pencilToolCont.style.display = "none";
    eraserToolCont.style.display = "none";
}

pencil.addEventListener("click" ,(e)=>{
    // true -> show pencil tool , false-> hide pencil tool
    pencilFlag = !pencilFlag;

    if(pencilFlag) pencilToolCont.style.display = "block";
    else pencilToolCont.style.display = "none";
})

eraser.addEventListener("click" ,(e)=>{
    // true -> show eraser tool , false-> hide eraser tool
    eraserFlag = !eraserFlag;

    if(eraserFlag) eraserToolCont.style.display = "flex";
    else eraserToolCont.style.display = "none";

})

upload.addEventListener("click" ,(e)=>{
    //open file explorer
    let input =  document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change",(e)=>{
        let file = input.files[0];
        let url = URL.createObjectURL(file);

    
    let stickyTemplateHTML = `
        <div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>

        <div class="note-cont">
            <img src="${url}"/>
        </div>
    `;
    createSticky(stickyTemplateHTML);

    })
}) 


sticky.addEventListener("click",(e)=>{
    
    let stickyTemplateHTML = `
        <div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>

        <div class="note-cont">
            <textarea spellcheck="false"></textarea>
        </div>
    `;
    createSticky(stickyTemplateHTML);

})

 function createSticky(stickyTemplateHTML){
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class","sticky-cont");
    stickyCont.innerHTML = stickyTemplateHTML;
    document.body.appendChild(stickyCont)

    let minimize = document.querySelector(".minimize");
    let remove = document.querySelector(".remove");
    noteAction(minimize,remove,stickyCont);
    stickyCont.onmousedown = function(event) {
        dragAndDrop(stickyCont,event);
      };
      
      stickyCont.ondragstart = function() {
        return false;
      };
}

function noteAction(minimize,remove,stickyCont){
    
    minimize.addEventListener("click",(e)=>{
        let noteCont = stickyCont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if(display==="none") noteCont.style.display = "block";
        else noteCont.style.display = "none";
    })
    
    remove.addEventListener("click",(e)=>{
        stickyCont.remove();
    })

}
function dragAndDrop(stickyCont,event){

    let shiftX = event.clientX - stickyCont.getBoundingClientRect().left;
        let shiftY = event.clientY - stickyCont.getBoundingClientRect().top;
      
        stickyCont.style.position = 'absolute';
        stickyCont.style.zIndex = 1000;
      
        moveAt(event.pageX, event.pageY);
      
        // moves the ball at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX, pageY) {
            stickyCont.style.left = pageX - shiftX + 'px';
            stickyCont.style.top = pageY - shiftY + 'px';
        }
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        // move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);
      
        // drop the ball, remove unneeded handlers
        stickyCont.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          stickyCont.onmouseup = null;
        };
}