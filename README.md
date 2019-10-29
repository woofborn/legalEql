# legalEql

This app is a project assigner intended for usage in law firms. It is meant to optimize associate utilisation by allowing partners to auto-generate a team which prioritises low-billing associates. Additionally, associates who are assigned more than X number of projects cannot be manually added to a new project. 

## Logins
Login as a partner to create and assign projects (default username/pw: awong/banana) or login as an associate to add billable hours and be depressed by your annual targets (default username/pw:wloh/wilfred).


## Technologies Used
HTML, CSS, Javascript, Node, Express, React, PostgreSQL. 

## Approach Taken
 I began building just a partner-side app, where associates (who were basically numbers in a table) could be assigned to projects created by a partner. Once an associate-side portion was added, additional log in verifications (to determine partner/associate) had to be added. Conditional rendering of certain pages to allow only partners certain functions (e.g. removing associates from a project) also needed to be developed. There was a large emphasis on querying the database to retrieve the necessary information for e.g. deal lists, completed projects, billables comparisons, etc.

## Key Motivations
I wanted to build something that solved a real-world problem that I have encountered. This allowed me to practice using the MVC framework and further develop my abilities in creating SQL queries, manipulating the DOM and using logic in rendering JSX.
 

## Unsolved Problems
Given more time, I would have liked to improve on the auto-generated team assignment to further optimise allocations. 

 