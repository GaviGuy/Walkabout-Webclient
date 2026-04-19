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
            for(let j = 1; j < 19; j++)
                if(json[i][j])
                    courseInfo[i].easyPars.push(json[i][j]);
            
            courseInfo[i].hardPars = [];
            for(let j = 19; j < 37; j++)
                if(json[i][j])
                    courseInfo[i].hardPars.push(json[i][j]);

            courseInfo[i].easySlingshot = json[i][37];
            // if(json[i][37])
            //     courseInfo.easySlingshot = ;     //int

            courseInfo[i].hardSlingshot = json[i][38];
            // if(json[i][38])
            //     courseInfo.hardSlingshot = ;     //int

            courseInfo[i].foxhuntBranchCount = json[i][39]; //int
            courseInfo[i].mainHuntClues = json[i][40];      //int
            courseInfo[i].foxhuntBranches = json[i][41];    //array
        }
    }).catch((e) => {
        console.error(e)   
    });
}
