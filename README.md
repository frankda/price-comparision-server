# Price before you go
## Intro
It is a project to compare price between different stores. For this project, I want to compare Coles and Woolworth, Chemistwarehouse and Priceline. 

Basic logic of this project is user search for a product and send this request to server, then server start scraping that item and give back price form different store and stock level.

I may more focus on backend in this project.

## Stack
Frontend: use React, use Ant UI for layout and design, Framer motion and reactCssTransition for animation effect.

Backend: I will use Expressjs as framework, MongoDB as database, cheerio to parse html, use cloudinary to handle photos.

## Difficulties
Difficulties will be search function, user may not enter the correct item name, how to get the most relevant results.

If Coles website updated, this is not gonna work. So I need to run scraping everyday to update data make sure when user search anything this still works

## Timeline
2/3 days for building backend and scraping
1 day to build frontend page,
1 day to add styles and animations
1 day for testing.

## Building Process
### Connect Atlas MongoDB with Mongoose

