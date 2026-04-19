let activeContent = -1;

function clearCourseSelect() {
    document.getElementById("course-select-list").innerHTML = "";
}

function generateCourseSelect() {
    clearCourseSelect();
    let coursesElem = document.getElementById("course-select-list");
    for(let i in courseInfo) {
        let newElem = document.createElement("div");
        newElem.classList.add("course-tile");
        newElem.innerText = `${i} (${courseInfo[i].abbreviation})`;

        // lock course if it should be
        if(i[0] == "T") {
            console.log(`locked ${i}`);
            newElem.classList.add("locked");
            
            let lockElem = document.createElement("img");
            lockElem.width = 80;
            lockElem.height = 80;
            lockElem.src = "/assets/lock.svg";
            lockElem.classList.add("lock-icon");
            newElem.appendChild(lockElem);
        }
        else newElem.tabIndex = 0;

        newElem.addEventListener("click", () => changeContentWindow(1));
        newElem.addEventListener("click", () => generateScorecard(i));
        coursesElem.appendChild(newElem);

    }
}

function changeContentWindow(index) {
    console.log(index);
    if(index == activeContent) return;
    if(index == -1) {
        document.getElementById("course-select").classList.remove("active");
        document.getElementById("scorecard").classList.remove("active");
    }
    else if(index == 0) {
        document.getElementById("course-select").classList.add("active");
        document.getElementById("scorecard").classList.remove("active");
    }
    else {
        document.getElementById("course-select").classList.remove("active");
        document.getElementById("scorecard").classList.add("active");
    }
    activeContent = index;

}