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
        coursesElem.appendChild(newElem);

        newElem.addEventListener("click", () => generateScorecard(i));
    }
}