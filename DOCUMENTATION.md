API Setup

    Install Dependencies: Before running the API, make sure you have Node.js installed. Install the required dependencies using the following command:

    css

npm install express body-parser sqlite3

Database Setup: The API uses an SQLite database to store person records. It creates a database file named mydatabase.db. Ensure that you have SQLite installed. If not, install it from SQLite Downloads.

Run the API: Start the API by running the following command:

    node app.js

    The API will be accessible locally at http://localhost:3000.
    & hosted at https://stage-two-6v3h.onrender.com/api

Endpoints
1. Create a New Person

    URL: /api

    Method: POST

    Request Format: JSON

    json

{
  "name": "John Doe",
  "age": 30
}

Response Format: JSON

json

{
  "id": 1,
  "name": "John Doe",
  "age": 30
}

Sample Usage:

bash

    curl -X POST -H "Content-Type: application/json" -d '{"name": "John Doe", "age": 30}' http://localhost:3000/api
  curl -X POST -H "Content-Type: application/json" -d '{"name": "John Doe", "age": 30}' https://stage-two-6v3h.onrender.com/api
2. Read a Specific Person by ID

    URL: /api/:id

    Method: GET

    Response Format: JSON

    json

{
  "id": 1,
  "name": "John Doe",
  "age": 30
}

Sample Usage:

bash

    curl http://localhost:3000/api/1
curl https://stage-two-6v3h.onrender.com/api
3. Update a Specific Person by ID

    URL: /api/:id

    Method: PUT

    Request Format: JSON

    json

{
  "name": "Updated Name",
  "age": 35
}

Response Format: JSON

json

{
  "message": "Person updated successfully"
}

Sample Usage:

bash

    curl -X PUT -H "Content-Type: application/json" -d '{"name": "Updated Name", "age": 35}' http://localhost:3000/api/1

4. Delete a Specific Person by ID

    URL: /api/:id

    Method: DELETE

    Response Format: JSON

    json

{
  "message": "Person deleted successfully"
}

Sample Usage:

bash

    curl -X DELETE http://localhost:3000/api/1

5. Create a New Person by Name

    URL: /api/:name

    Method: POST

    Request Format: JSON

    json

{
  "age": 25
}

Response Format: JSON

json

{
  "id": 2,
  "name": "New Name",
  "age": 25
}

Sample Usage:

bash

    curl -X POST -H "Content-Type: application/json" -d '{"age": 25}' http://localhost:3000/api/New%20Name

6. Retrieve Person Details by Name

    URL: /api/name/:name

    Method: GET

    Response Format: JSON

    json

{
  "id": 2,
  "name": "New Name",
  "age": 25
}

Sample Usage:

bash

    curl http://localhost:3000/api/name/New%20Name

7. Update Person Details by Name

    URL: /api/name/:name

    Method: PUT

    Request Format: JSON

    json

{
  "age": 26
}

Response Format: JSON

json

{
  "message": "Person updated successfully"
}

Sample Usage:

bash

    curl -X PUT -H "Content-Type: application/json" -d '{"age": 26}' http://localhost:3000/api/name/New%20Name

8. Delete a Person by Name

    URL: /api/name/:name

    Method: DELETE

    Response Format: JSON

    json

{
  "message": "Person deleted successfully"
}

Sample Usage:

bash

curl -X DELETE http://localhost:3000/api/name/New%20Name
