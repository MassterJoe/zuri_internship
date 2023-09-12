Zuri internship Stage Two Task

You are to build a simple REST API capable of CRUD operations on a "person" resource, interfacing with any database of your choice. Your API should dynamically handle parameters, such as adding or retrieving a person by name. Accompany the development with UML diagrams to represent your system's design and database structure.  Host your entire project on GitHub, and provide a well-structured documentation in the repository that outlines request/response formats, setup instructions, and sample API usage.


This API allows you to manage persons in a SQLite database.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Endpoints](#endpoints)
  - [Create a Person](#create-a-person)
  - [Read a Person by ID](#read-a-person-by-id)
  - [Update a Person by ID](#update-a-person-by-id)
  - [Delete a Person by ID](#delete-a-person-by-id)
  - [Create a Person by Name](#create-a-person-by-name)
  - [Read a Person by Name](#read-a-person-by-name)
  - [Update a Person by Name](#update-a-person-by-name)
  - [Delete a Person by Name](#delete-a-person-by-name)
- [Request/Response Formats](#requestresponse-formats)
- [Sample API Usage](#sample-api-usage)

## Setup Instructions

1. Clone the repository.

   ```bash
   git clone https://github.com/MassterJoe/zuri_internship
   cd zuri_internship

##1. Install the required dependencies.

bash

npm install

##2. Start the server.

bash

npm start

The server will run on port 3000 by default. You can configure the port by setting the PORT environment variable.

##Endpoints

###Create a Person

    URL: /api

    Method: POST

    Request Body:

    json

{
  "name": "John Doe",
  "age": 30
}

Success Response:

    Status Code: 201 (Created)

    Response Body:

    json

        {
          "id": 1,
          "name": "John Doe",
          "age": 30
        }

    Error Responses:
        400 (Bad Request) if name or age is missing in the request body.
        500 (Internal Server Error) if there is a server-side error.

###Read a Person by ID

    URL: /api/:id

    Method: GET

    Success Response:

        Status Code: 200 (OK)

        Response Body:

        json

        {
          "id": 1,
          "name": "John Doe",
          "age": 30
        }

    Error Responses:
        404 (Not Found) if the person with the specified ID is not found.
        500 (Internal Server Error) if there is a server-side error.

###Update a Person by ID

    URL: /api/:id

    Method: PUT

    Request Body:

    json

{
  "name": "Updated Name",
  "age": 35
}

Success Response:

    Status Code: 200 (OK)

    Response Body:

    json

        {
          "message": "Person updated successfully"
        }

    Error Responses:
        400 (Bad Request) if name or age is missing in the request body.
        404 (Not Found) if the person with the specified ID is not found.
        500 (Internal Server Error) if there is a server-side error.

###Delete a Person by ID

    URL: /api/:id

    Method: DELETE

    Success Response:

        Status Code: 200 (OK)

        Response Body:

        json

        {
          "message": "Person deleted successfully"
        }

    Error Responses:
        404 (Not Found) if the person with the specified ID is not found.
        500 (Internal Server Error) if there is a server-side error.

###Create a Person by Name

    URL: /api/name/:name

    Method: POST

    Request Body:

    json

{
  "age": 30
}

Success Response:

    Status Code: 201 (Created)

    Response Body:

    json

        {
          "id": 2,
          "name": "John Doe",
          "age": 30
        }

    Error Responses:
        400 (Bad Request) if age is missing in the request body.
        409 (Conflict) if a person with the same name already exists.

###Read a Person by Name

    URL: /api/name/:name

    Method: GET

    Success Response:

        Status Code: 200 (OK)

        Response Body:

        json

        {
          "id": 2,
          "name": "John Doe",
          "age": 30
        }

    Error Responses:
        404 (Not Found) if the person with the specified name is not found.
        500 (Internal Server Error) if there is a server-side error.

###Update a Person by Name

    URL: /api/name/:name

    Method: PUT

    Request Body:

    json

{
  "age": 35
}

Success Response:

    Status Code: 200 (OK)

    Response Body:

    json

        {
          "message": "Person updated successfully"
        }

    Error Responses:
        400 (Bad Request) if age is missing in the request body.
        404 (Not Found) if the person with the specified name is not found.
        500 (Internal Server Error) if there is a server-side error.

###Delete a Person by Name

    URL: /api/name/:name

    Method: DELETE

    Success Response:

        Status Code: 200 (OK)

        Response Body:

        json

        {
          "message": "Person deleted successfully"
        }

    Error Responses:
        404 (Not Found) if the person with the specified name is not found.
        500 (Internal Server Error) if there is a server-side error.
