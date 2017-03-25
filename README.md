# 🍻 pubcrawl-planner 🍻

Pubcrawl planner is a MEN stack application that allows users to plan pubcrawls based on their favorite bars.

## 🍺 Deployment
Deployed to Heroku [here](https://pubcrawlr.herokuapp.com/).

## 🍺 User Stories

Link to trello board can be found [here](https://trello.com/b/gTpgYyxn/pubcrawl-planner).

## 🍺 ERDs

| User |
| --- |
| username: String |
| password: String |
| favoriteBars: [bar] |
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
| location: street: String |
| location: city: String |
| location: state: String |

## 🍺 Wireframes
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