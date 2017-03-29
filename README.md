# 🍺 pubcrawlr

**A MEN stack application that allows users to plan pubcrawls based on their favorite bars.**

## Deployment
Deployed to Heroku [here](https://pubcrawlr.herokuapp.com/).

## Features
- Complete user login/registration
- Fully responsive design
- Users can add their favorite bars and then plan pubcrawls 

## Technologies
- MongoDB document database featuring CRUD operations on three models: User, Bars, and Pubrawls.
- Bootstrap for responsiveness
- Google search and maps API for displaying bar locations as well as allowing the user to search for their favorite bars.

##  User Stories
Link to trello board can be found [here](https://trello.com/b/gTpgYyxn/pubcrawl-planner).

## ERDs

| Pubcrawl |
| --- |
| name: String |
| date: String |
| time: String |
| theme: String |
| transportation: String |
| specialInstructions: String |
| bars: [bar] |
| startBar: bar | 
# ↑
| User |
| --- |
| username: String |
| password: String |
| favoriteBars: [bar] |
| pubcrawls: [pubcrawl] |
| timestamp: createdAt: Date |
| timestamp: updatedAt: Date |
# ↓
| Bar |
| --- |
| name: String |
| location: street: String |
| location: city: String |
| location: state: String |

## Wireframes
![login](./resources/images/login.png)
![signup](./resources/images/signup.png)
![user-show](./resources/images/user-show.png)
![user-edit](./resources/images/user-edit.png)
![bar-new](./resources/images/bar-new.png)
![bar-show](./resources/images/bar-show.png)
![bar-edit](./resources/images/bar-edit.png)
![pubcrawl-new](./resources/images/pubcrawl-new.png)
![pubcrawl-show](./resources/images/pubcrawl-show.png)
![pubcrawl-edit](./resources/images/pubcrawl-edit.png)