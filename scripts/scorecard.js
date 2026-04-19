let scorecardTab = 0;

function initScorecardTabs() {
    let tab0 = document.getElementById("tab-button-0");
    let tab1 = document.getElementById("tab-button-1");
    tab0.addEventListener("click", () => switchTab(0));
    tab1.addEventListener("click", () => switchTab(1));
}

function generateHoleNumbers(gridElem) {
    let labelElem = document.createElement("div");
    labelElem.textContent = "Hole";
    gridElem.appendChild(labelElem);
    for(let i = 1; i < 19; i++) {
        let newElem = document.createElement("div")
        newElem.classList.add("hole");
        newElem.innerText = i;
        gridElem.appendChild(newElem);
    }
}

function generatePars(gridElem, parlist) {
    let labelElem = document.createElement("div");
    labelElem.textContent = "Par";
    gridElem.appendChild(labelElem);
    for(let i = 0; i < 18; i++) {
        if(!parlist[i] && parlist[i] != 0) break;
        let newElem = document.createElement("div")
        newElem.classList.add("par");
        newElem.setAttribute("par", parlist[i]);
        newElem.innerText = parlist[i];
        gridElem.appendChild(newElem);
    }
}

function generateScoreInputs(gridElem, parlist) {
    let labelElem = document.createElement("div");
    labelElem.textContent = "Score";
    gridElem.appendChild(labelElem);
    for(let i = 0; i < 18; i++) {
        if(!parlist[i] && parlist[i] != 0) break;
        let newElem = document.createElement("input")
        // newElem.setAttribute("type", "number");
        newElem.classList.add("score");
        newElem.setAttribute("par", parlist[i]);
        gridElem.appendChild(newElem);
    }
}

function generateLostBalls(gridElem, parlist) {
    let labelElem = document.createElement("div");
    labelElem.textContent = "Lost\nBall";
    gridElem.appendChild(labelElem);
    for(let i = 0; i < 18; i++) {
        if(!parlist[i] && parlist[i] != 0) break;
        let newElem = document.createElement("input")
        newElem.setAttribute("type", "checkbox");
        newElem.classList.add("lostball");
        gridElem.appendChild(newElem);
    }
}

function generateTargets(targetsElem, targetCount, type) {
    if(!targetCount) return;
    let newElem = document.createElement("div");
    
    let labelElem = document.createElement("label");
    labelElem.innerText = `${type} Targets: `;

    let inputElem = document.createElement("input");
    inputElem.classList.add("target-input");

    let targetElem = document.createElement("span");
    targetElem.textContent = ` / ${targetCount}`;

    newElem.appendChild(labelElem);
    newElem.appendChild(inputElem);
    newElem.appendChild(targetElem);
    targetsElem.appendChild(newElem);
}

function generateFoxhunts(foxhuntElem, foxhunts) {
    for(let i = 0; i < foxhunts; i++) {
        let newElem = document.createElement("div");
        newElem.classList.add("foxhunt");

        let clueElem = document.createElement("label");
        clueElem.textContent = `Foxhunt clue ${i+1}`;
        clueElem.setAttribute("for", `foxhunt-${i}`);

        let checkboxElem = document.createElement("input");
        checkboxElem.setAttribute("type", "checkbox");
        checkboxElem.id = `foxhunt-${i}`;

        newElem.appendChild(clueElem);
        newElem.appendChild(checkboxElem);

        //todo: allow clicking anywhere in the foxhunt hint
        newElem.addEventListener("click", () => {
            // clueElem.click(); 
        });
        foxhuntElem.appendChild(newElem);
    }
}

function generateScorecard(courseName) {
    clearScorecard();
    document.getElementById("scorecard-top-title").innerText = courseName;

    //easy
    let elem = document.getElementById("scorecard-0").querySelector(".scorecard-grid");
    generateHoleNumbers(elem);
    generatePars(elem, courseInfo[courseName].easyPars);
    generateScoreInputs(elem, courseInfo[courseName].easyPars);
    if(true) // TODO: not all courses have lost balls
        generateLostBalls(elem, courseInfo[courseName].easyPars);
    elem = document.getElementById("scorecard-0").querySelector(".scorecard-targets");
    generateTargets(elem, courseInfo[courseName].easySlingshot, "Slingshot");

    //hard
    elem = document.getElementById("scorecard-1").querySelector(".scorecard-grid");
    generateHoleNumbers(elem);
    generatePars(elem, courseInfo[courseName].hardPars);
    generateScoreInputs(elem, courseInfo[courseName].hardPars);
    elem = document.getElementById("scorecard-1").querySelector(".scorecard-targets");
    generateTargets(elem, courseInfo[courseName].hardSlingshot, "Slingshot");
    elem = document.getElementById("scorecard-1").querySelector(".scorecard-foxhunts");
    generateFoxhunts(elem, courseInfo[courseName].mainHuntClues);
}

function clearScorecard() {
    document.getElementById("scorecard-0").querySelector(".scorecard-grid").innerHTML = "";
    document.getElementById("scorecard-0").querySelector(".scorecard-targets").innerHTML = "";
    document.getElementById("scorecard-1").querySelector(".scorecard-grid").innerHTML = "";
    document.getElementById("scorecard-1").querySelector(".scorecard-targets").innerHTML = "";
    document.getElementById("scorecard-1").querySelector(".scorecard-foxhunts").innerHTML = "";
}

function switchTab(index) {
    if(index == scorecardTab) return;
    document.getElementById(`scorecard-${scorecardTab}`).classList.remove("active");
    document.getElementById(`scorecard-${index}`).classList.add("active");
    document.getElementById(`tab-button-${scorecardTab}`).classList.remove("active");
    document.getElementById(`tab-button-${index}`).classList.add("active");
    scorecardTab = index;
}