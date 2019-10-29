console.log('projects js connected BANANA')

console.log(team)

team=JSON.parse(team)

if (team.length>0){
    document.getElementById("generateButt").disabled = true;
    document.getElementById("generateInput1").disabled = true;
    document.getElementById("generateInput2").disabled = true;
    document.getElementById("addButt").disabled = false;
}