# Varthak_Assignment

This is a an Library application built with Node.js (Express) and TypeScript.

## Technology Stack

- Node.js: JavaScript runtime environment 
- Express: Web application framework for Node.js 
- TypeScript: Typed superset of JavaScript 
- MongoDB: NoSQL database 
- Mongoose: MongoDB object modeling for Node.js 
- JWT: JSON Web Token for authentication

## Features

- Two APIs secured by JWT authentication
- Role-based access control:
  - Users with the role "CREATOR" can create books
  - Users with the role "VIEWER" can view books created by them
  - Users with the role "VIEW_ALL" can see all created books
- Filtering books based on creation time
  - `/books?old=1` shows books created 10 minutes ago and earlier
  - `/books?new=1` shows books created less than 10 minutes ago

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/syed2605/Varthak_Assignment.git
   ```

2. Navigate to the project directory:
   ```
   cd Varthak_Assignment
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the root directory
   - Define the following environment variables in the `.env` file:
     ```
     PORT=3000
     JWT_SECRET=your-secret-key
     MONGODB_URL=your-mogodatabase-url
     ```

5. Start the application:
   ```
   npm start
   ```

6. The application will be running at `http://localhost:3000`.

### Authentication

- All API endpoints except `/login` and `/register` require JWT authentication.
- Firstly, send a POST request to `/register` with the following payload:
```
  {
  "name": "your-username",
  "email": "your-email",
  "password": "your-password",
  "role":["role1", "role2"]
}
  ```
- To authenticate, send a POST request to `/login` with the following payload:
  ```
  {
    "name": "your-username",
    "password": "your-password"
  }
  ```
- The response will contain a JWT token, which should be included in the `Authorization` header of subsequent requests as follows:
  ```
  Authorization: Bearer your-jwt-token
  ```

### Endpoints

#### POST `/books`

Creates a new book.

- Requires JWT authentication with the appropriate roles.
- The request payload should include the details of the book to be created.
- Example request payload:
  ```json
  {
    "title": "Book Title",
    "author": "Author Name"
  }
  ```
- Example response (status code: 200 Created):
  ```json
  {
    "_id": "Mongo_BookId",
    "user_id": "Mongo_user_id",
    "title": "Book Title",
    "author": "Author Name",
    "createdAt": "Created TimeStamp",
    "__v": 0  
  }
  ```

#### GET `/books`

Retrieves books based on user role and filters.

- Requires JWT authentication with the appropriate roles.
- Supports filtering based on creation time:
  - Use the query parameter `old=1` to show books created 10 minutes ago and earlier.
  - Use the query parameter `new=1` to show books created less than 10 minutes ago.
- Example request: `/books, `/books?old=1`, `/books?new=1`
- Example response (status code: 200 OK):
  ```json
  [
    {
    "_id": "Mongo_BookId",
    "user_id": "Mongo_user_id",
    "title": "Book Title",
    "author": "Author Name",
    "createdAt": "Created TimeStamp",
    "__v": 0  
    },
    {
    "_id": "Mongo_BookId",
    "user_id": "Mongo_user_id",
    "title": "Book Title",
    "author": "Author Name",
    "createdAt": "Created TimeStamp",
    "__v": 0  
    }
  ]
  ```

Please make sure to adjust the code examples, payload structure, and response format according to your specific application and requirements.
- POST `/register`: Registration of user with payload
- POST `/login`: Authenticates the user and returns a JWT token.
- POST `/books`: 
    Requires JWT authentication with the appropriate roles.
    The request payload should include the details of the book to be created.
- GET `/books`: Retrieves books based on user role and filters (requires appropriate roles and query parameters).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

Feel free to modify this README file based on your specific application and requirements. Include any additional sections or instructions that would be helpful for users of your Library App.
