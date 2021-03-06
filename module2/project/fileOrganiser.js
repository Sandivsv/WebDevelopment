// to run this file type-> ( node fileOrganiser.js "C:\Users\sandeep kumar\Documents\FJP-6_Web\module2\project\media" )

let fs= require('fs');
let path=require('path');

let inputArr=process.argv;
// console.log(inputArr);

// o/p ->  ['pathToNode', 'pathTofile', 'input pased in terminal']

let folderPath =inputArr[2];
// console.log(folderPath)

let extensions={
    Audio:[".mp3"],
    Video:[".mp4",".mkv"],
    Document:[".pdf",".doc",".xlsx"],
    Image:[".jpeg",".jpg",".png",".gif"],
    Software:[".exe"]
};


if(fs.existsSync(folderPath)){
    let files=fs.readdirSync(folderPath);

    for(let i=0;i<files.length; i++){
        let ext=path.extname(files[i]);

        let NameOfFolder=giveFolderName(ext);
        // console.log('ext-->',ext,'FolderName->',NameOfFolder);

        let organisedFolder=path.join(folderPath,NameOfFolder);
        // console.log(organisedFolder);

        let exist= fs.existsSync(organisedFolder);
        // if folder exist then move file in folder else create and move 
        //and after that remove unorganised files.
        
        if(exist){
            moveFile(folderPath,organisedFolder,files[i]);        }
        else{
            fs.mkdirSync(organisedFolder);
            moveFile(folderPath,organisedFolder,files[i]);
        }
    }
}
else{
    console.log("Please enter a valid path...");
}


// function to return folder name 
function giveFolderName(ext){
    for(let key in extensions){
        let extArr=extensions[key];
        for(let i =0; i<extArr.length; i++){
            if(extArr[i]==ext){
                return key;
            }
        }
    }
    return 'others';
}


function moveFile(folderPath,organisedFolder,fileName){
    let sourcepath=path.join(folderPath,fileName);
    let destination=path.join(organisedFolder,fileName);
    fs.copyFileSync(sourcepath,destination);
    fs.unlinkSync(sourcepath);
}

