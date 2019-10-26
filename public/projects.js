console.log("JS file connected MEOW!")


var ctx = document.getElementById('myChart');
console.log('PASSING INFOOOOOOOOOOOOO')
projects = JSON.parse(projects)
billables = JSON.parse(billables)
console.log(projects)
console.log(billables)


let projectList=[];
for (let i=0; i<projects.length; i++){
    projectList.push(projects[i].project_name)
}

let billed = []
for (let i=0; i<projects.length; i++){
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
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    }

});