let activeContent = -1;
const contentWindows = {
    blank: 0,
    courseSelect: 1,
    scorecard: 2
};

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
            newElem.classList.add("locked");
        }
        else {
            newElem.tabIndex = 0;
        }

        newElem.addEventListener("click", () => changeContentWindow(contentWindows.scorecard));
        newElem.addEventListener("click", () => generateScorecard(i));
        coursesElem.appendChild(newElem);

    }
}

function changeContentWindow(index) {
    if(index == activeContent) return;
    switchTab(0);
    document.getElementById("content").setAttribute("tab", index);
    activeContent = index;
}