let courseInfo = {};

async function parseCourseInfo() {
    const filePath = "data/courseinfo.json";
    fetch(filePath).then((e) => {
        if(!e.ok) throw new Error("wawa");
        return e.json();
    }).then((json) => {
        for(let i in json) {
            courseInfo[i] = {};
            courseInfo[i].abbreviation = json[i][0];

            courseInfo[i].easyPars = [];
            for(let j = 1; j < 21; j++)
                courseInfo[i].easyPars.push(json[i][j]);
            
            courseInfo[i].hardPars = [];
            for(let j = 21; j < 39; j++)
                courseInfo[i].hardPars.push(json[i][j]);

            courseInfo[i].easySlingshot = [];
            if(json[i].easyslingshot)
                courseInfo.easySlingshot = json[i][39];

            courseInfo[i].hardSlingshot = [];
            if(json[i].hardslingshot)
                courseInfo.hardSlingshot = json[i][40];

            courseInfo[i].foxhuntBranchCount = json[i][41];
            courseInfo[i].mainHuntClues = json[i][42];
            courseInfo[i].foxhuntBranchCount = json[i][43];
        }
    }).catch((e) => {
        console.error(e)   
    });
}
