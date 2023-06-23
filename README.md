# Events-api
This API, built using Node.js, Express and MongoDB, allows users to perform CRUD operations (Create, Read, Update, Delete) on events. It provides the following features:

Create: Allows the creation of new events by sending a POST request to /events.
Read: Retrieves all events or a single event by ID using GET requests to /events or /events/:obj_id, respectively.
Update: Updates an existing event by sending a PUT request to /events/:obj_id.
Delete: Deletes an event by ID using a DELETE request to /events/:obj_id.

Additional Features:
Filtering: The API supports filtering events based on any data field.
Sorting: Events can be sorted based on a specific field.
Field Selection: Users can select the desired fields to include in the API response.
Pagination: Events can be paginated to retrieve a specific subset of results.
Limiting: Users can specify the maximum number of events to retrieve per request.
Error Handling: Improved error handling for better user experience.
Please refer to the API documentation for detailed usage instructions.

Getting Started
Clone the repository.
Install dependencies using npm install.
Set up the MongoDB connection by providing the connection string in the .env file.
Start the server using npm start.
Access the API at http://localhost:3000.
Please ensure that you have Node.js and MongoDB installed on your machine before running the API.

For further details and examples, please refer to the API endpoints described in the documentation.

Thank you for using this api (events api) and most thankful to the DT Edutech Ventures Private Limited to let me offer with this assignment.
