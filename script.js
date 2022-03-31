//Main code
const pianoNotes = document.querySelectorAll(".pianonote"),
      bassNotes = document.querySelectorAll(".bassnote")

const notesInfo = [{note:"C", color:"rgba(255,0,0, 0.6)", key:"KeyZ", keySecond: "Comma"},
                {note:"C#", color:"rgb(255,120,120)", key:"KeyS", keySecond: "KeyL"},
                {note:"D", color:"rgba(255,128,64, 0.6)", key:"KeyX", keySecond: "Period"},
                {note:"D#", color:"rgb(255,150,120)", key:"KeyD", keySecond: "Semicolon"},
                {note:"E", color:"rgba(255,255,0, 0.6)", key:"KeyC", keySecond: "Slash"}, 
                {note:"F", color:"rgba(0,255,0, 0.6)", key:"KeyV"},
                {note:"F#", color:"rgb(140,255,140)", key:"KeyG"},
                {note:"G", color:"rgba(0,255,255, 0.6)", key:"KeyB"},
                {note:"G#", color:"rgb(100,200,255)", key:"KeyH"},
                {note:"A", color:"rgba(100,100,255, 0.6)", key:"KeyN"},
                {note:"A#", color:"rgb(170,170,255)", key:"KeyJ"},
                {note:"B", color:"rgba(240,50,240, 0.6)", key:"KeyM"}]

const allowedKeys =["KeyZ", "Comma", "KeyS", "KeyL", "KeyX", "Period", "KeyD", "Semicolon", "KeyC",  "Slash", "KeyV", "KeyG", "KeyB", "KeyH", "KeyN", "KeyJ", "KeyM"]
const colorBlack = "#1A1A1A",
      colorWhite = "rgba(255, 255, 255, 0.4)"

document.addEventListener("keydown", (e)=>{
    if (allowedKeys.includes(e.code)) {
        let note = notesInfo.filter(el=>el.key == e.code || el.keySecond == e.code)
        showNotesKey(note[0].note)
    }
});

document.addEventListener("keyup", (e)=>{
    if (allowedKeys.includes(e.code)){
        hideSpecificNotes (e, bassNotes); hideSpecificNotes (e, pianoNotes)
    }
})
     
function showBassNotes (key){
    let note = key.target.textContent;
    let activeNote = notesInfo.filter(element=>element.note===note)[0]
    bassNotes.forEach(e=>{
        if (e.textContent == note){
            e.style.backgroundColor = activeNote.color
        }
    })
    if(!key.target.classList.contains("black-key")){
        key.target.style.background = `linear-gradient(white, ${activeNote.color}`
    } else {
        key.target.style.background = `linear-gradient(${colorBlack}, ${activeNote.color}`
    }

}

function hideNotes (notes) {
    notes.forEach(el=>{
        if (!el.classList.contains("black-key")) {
            el.style.background = colorWhite
        } else {
            el.style.background = colorBlack
        }  
    })
}

function hideSpecificNotes (e, notes) {
    let note = notesInfo.filter(el=>el.key == e.code || el.keySecond == e.code)
    notes.forEach(el=>{
        if (el.textContent == note[0].note) {
            if (!el.classList.contains("black-key")) {
                el.style.background = colorWhite
            } else {
                el.style.background = colorBlack
            }  
        } 
    })
}

function showNotesKey(note) {
    let activeNote = notesInfo.filter(element=>element.note===note)[0]
    bassNotes.forEach(e=>{
        if (e.textContent == note){
            e.style.backgroundColor = activeNote.color
        }
    })
    pianoNotes.forEach(e=>{
        if (e.textContent == note){
            if(!e.classList.contains("black-key")){
                e.style.background = `linear-gradient(white, ${activeNote.color}`
            } else {
                e.style.background = `linear-gradient(${colorBlack}, ${activeNote.color}`
            }
        }
    })
}

pianoNotes.forEach((el) => el.addEventListener("mousedown", showBassNotes))
pianoNotes.forEach((el) => el.addEventListener("mouseup",()=>{hideNotes(bassNotes);hideNotes(pianoNotes)}))

bassNotes.forEach((el) => el.addEventListener("mousedown",()=>{showNotesKey(el.textContent)}))
bassNotes.forEach((el) => el.addEventListener("mouseup", ()=>{hideNotes(bassNotes); hideNotes(pianoNotes)}))

//Tuning
let tuningOptions = document.querySelectorAll(".tuning-option")

function tuneAll(firstString, secondString, thirdString, fourthString){

    function tuneString (string, id) {
        const nOfSemitones = 12
        bassNotes[id].textContent=notesInfo[string].note
        string = string + 1;
        if (string == nOfSemitones){
            string = 0
        }
        return (string)
    }

    bassNotes.forEach((el, id) =>{        
        if (id%4==0){
            fourthString = tuneString(fourthString, id)
        } else if ((id-5)%4==0 && id!==0){
            thirdString = tuneString(thirdString, id)
        } else if (id%2==0 && id!==0){
            secondString = tuneString(secondString, id)
        }  else {
            firstString = tuneString(firstString, id)
        }
    })
}
tuningOptions[0].addEventListener("click", ()=>{tuneAll(4,9,2,7); arrows[0].classList.toggle("up"); tuningBlock.classList.toggle("hidden")})
tuningOptions[1].addEventListener("click", ()=>{tuneAll(2,9,2,7); arrows[0].classList.toggle("up"); tuningBlock.classList.toggle("hidden")})
tuningOptions[2].addEventListener("click", ()=>{tuneAll(11,4,9,2); arrows[0].classList.toggle("up"); tuningBlock.classList.toggle("hidden")})


// Other
let about = document.querySelector("#about"),
    aboutBlock = document.querySelector(".about-block"),
    tuning = document.querySelector("#tuning"),
    tuningBlock = document.querySelector(".tuning-block")
    arrows = document.querySelectorAll(".arrow")

about.addEventListener("click", ()=>{
    if (aboutBlock.style.display === "flex"){
        arrows[1].classList.remove("up")
        aboutBlock.classList.add("hidden")
        setTimeout(()=>{aboutBlock.style.display = "none"}, 400)
    } else {
        arrows[1].classList.add("up")
        aboutBlock.style.display = "flex"
        setTimeout(()=>{aboutBlock.classList.remove("hidden")}, 10)
    }
})

tuning.addEventListener("click", ()=>{
    arrows[0].classList.toggle("up")
    tuningBlock.classList.toggle("hidden")
})
