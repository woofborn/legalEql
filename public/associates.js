console.log("JS file connected MEOW!")


var ctx = document.getElementById('myChart');
console.log('PASSING INFOOOOOOOOOOOOO')
// projects = JSON.parse(projects)
billables = JSON.parse(billables)
// console.log(projects)
console.log(billables)


let projectList=[];
for (let i=0; i<billables.length; i++){
    projectList.push(billables[i].project_name)
}

let billed = []
for (let i=0; i<billables.length; i++){
    billed.push(billables[i].sum)
}


var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: projectList,
        datasets: [{

            data: billed,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(110, 245, 160, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(110, 245, 160, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }

});