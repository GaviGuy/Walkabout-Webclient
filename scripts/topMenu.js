const menuStates = {
    fixed: 0,
    collapsed: 1,
    open: 2
}

function setTopMenuState(index) {
    let elem = document.getElementById("top-menu");
    elem.setAttribute("state", index);
}

function handleTopArrow() {
    let elem = document.getElementById("top-arrow");
    let topMenuState = document.getElementById("top-menu").getAttribute("state");
    if(topMenuState != menuStates.collapsed) {
        elem.setAttribute("state", menuStates.fixed);
        setTopMenuState(menuStates.collapsed);
    }
    else {
        elem.setAttribute("state", menuStates.collapsed);
        setTopMenuState(menuStates.open);
    }
}


function initDebugHotkeys() {
    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.key === "1") {
            e.preventDefault();
            setTopMenuState(0);
        }
        else if (e.ctrlKey && e.key === "2") {
            e.preventDefault();
            setTopMenuState(1);
        }
        else if (e.ctrlKey && e.key === "3") {
            e.preventDefault();
            setTopMenuState(2);
        }
    });
}