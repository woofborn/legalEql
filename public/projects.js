console.log("JS file connected MEOW!")


var ctx = document.getElementById('myChart');
console.log('PASSING INFOOOOOOOOOOOOO')
projects = JSON.parse(projects)
console.log(projects)
console.log(projects[0])
console.log(projects[0].project_name)


var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: [projects[0].project_name, projects[1].project_name, projects[2].project_name],
        datasets: [{
            label: '# of Votes',
            data: [10,10,10],
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