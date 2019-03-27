# hacktivoverflow

## router user
| Route                 | HTTP      | Header(s)     | Body      | Description     |
|-----------------------|:---------:|:-------------:|:----------|----------------:|
| /user/signup          |POST       | none          | name:String,email:String(Required),password:String(Required)                             |Sign up user  |
| /user/signin          |POST       | none          | email:String(Required),password:String(Required)                             |Sign in user  |
| /posting              |GET        | none          | none                                                           | Read all Post              |
| /posting              |POST       | token: String          | title: String(Required), decription: String(Required)    | Post a Question            |
| /posting/:id          |PATCH      | token: String          | user: userId (**Required**)                  | addvote to posting user only    |
| /posting/:id          |PUT        | token: String          | title: String(Required),  decription: String(**Required**) | edit data posting  user only    | 
| /posting/:id          |DELETE    | token: String | none          | delete posting = user only
| /answer               |POST      | token: String | content:String(**Required**)  | create an answer - user only         |
| /answer               |GET       | token: String |                               | get an answer - user only         |
| /answer/:id           |PATCH     | token: String | user: userId(**Required**)    | addVote to answer only            |
| /asnwer/:id           |DELETE    | token: String | none                          | delete posting = user only                        |


# Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:

$ npm install <br/>

$ npm run serve<br/>

