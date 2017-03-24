# 🍻 pubcrawl-planner 🍻

Pubcrawl planner is a MEN stack application that allows users to plan pubcrawls based on their favorite bars.

## 🍺 Deployment
Deployed to Heroku [here](https://pubcrawl-planner.herokuapp.com/).

## 🍺 User Stories

Link to trello board can be found [here](https://trello.com/b/gTpgYyxn/pubcrawl-planner).

## 🍺 ERDs

| User |
| --- |
| username: String |
| password: String |
| pubcrawls: [pubcrawl] |
| timestamp: createdAt: Date |
| timestamp: updatedAt: Date |
# ⬇
| Pubcrawl |
| --- |
| name: String |
| date: Date |
| locations: [bar] | 
# ⬇
| Bar |
| --- |
| name: String |
| number: Number |
| location: street: String |
| location: city: String |
| location: state: String |
| location: zip: Number
| location: lat: Number |
| location: lng: Number |

## 🍺 Wireframes
![New Pubcrawl Wireframe](./resources/images/pubcrawl-planner-pubcrawl-new.png)
![User Show Wireframe](./resources/images/pubcrawl-planner-user-show.png)
![Pubcrawl Show Wireframe](./resources/images/pubcrawl-planner-pubcrawl-show.png)
![Pubcrawl Edit Wireframe](./resources/images/pubcrawl-planner-pubcrawl-edit.png)
![Signup Wireframe](./resources/images/pubcrawl-planner-signup.png)
![Login Wireframe](./resources/images/pubcrawl-planner-login.png)
![Logout Wireframe](./resources/images/pubcrawl-planner-logout.png)