Register
Endpoint  POST /user/register
This endpoint allows a user to register a new account.
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "secretpassword"
}
On successful registration, the server responds with a success message.
{
  "message": "User registered successfully!"
}
Login
Endpoint-POST /user/login
{
  "email": "johndoe@example.com",
  "password": "secretpassword"
}
on successful login
{
  "message": "User logged in successfully!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Error Responses
Status Code	Description
400	Bad request. Invalid credentials.
500	Internal server error. Login failed.

Create Chatroom
Endpoint -POST /chatroom/
Description
This endpoint creates a new chatroom.

Request Headers
Header	Value	Required	Description
Authorization	Bearer <token>	Yes	Access token for authentication
Request Body
{
  "name": "New Chatroom"
}

Field	Type	Required	Description
name	string	Yes	Name of the chatroom
Response
On successful creation, the server responds with a success message.
{
  "message": "Chatroom created successfully!"
}
Error Responses
Status Code	Description
401	Unauthorized. Invalid access token.
400	Bad request. Invalid or missing parameters.
500	Internal server error. Failed to create chatroom.

Get All Chatrooms
Endpoint -GET /chatroom/
Description
This endpoint retrieves a list of all chatrooms.

Request Headers
Header	Value	Required	Description
Authorization	Bearer <token>	Yes	Access token for authentication
Response
On success, the server responds with a JSON array containing the chatrooms.

json
Copy code
[
  {
    "id": "chatroom1",
    "name": "Chatroom 1"
  },
  {
    "id": "chatroom2",
    "name": "Chatroom 2"
  }
]
Error Responses
Status Code	Description
401	Unauthorized. Invalid access token.
500	Internal server error. Failed to retrieve chatrooms.

