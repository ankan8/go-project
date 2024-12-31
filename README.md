
# GoLang Todo App

This is a basic Todo app built using Go (Golang) to understand the fundamentals of web development with Go. The app allows users to create, update, and delete tasks.

## Features
- Create a new Todo task
- Update the status of a Todo task
- Delete a Todo task
- List all Todo tasks

## Technologies Used
- **Go (Golang)** for backend development
- **HTML/CSS** for frontend styling
- **JavaScript** (React) for frontend interaction (optional if you choose to use React or can work with simple HTML)

## Setup Instructions

1. **Install Go**: If you don’t have Go installed, follow the instructions on the official website:  
   [Install Go](https://golang.org/doc/install)

2. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

3. **Run the Go backend**:
   Ensure you're inside the Go project folder, then run:
   ```bash
   go run main.go
   ```

4. **Frontend**:
   The frontend of the app can be built using simple HTML, CSS, or React. If you're using React, run the React development server:
   ```bash
   npm install
   npm start
   ```

5. **Backend API Endpoints**:
   - `GET /todos` – Get the list of all Todo tasks
   - `POST /todos` – Create a new Todo task
   - `PATCH /todos/{id}` – Update a Todo task
   - `DELETE /todos/{id}` – Delete a Todo task

## Contributing

Feel free to fork this project, open issues, and create pull requests. This is a simple app intended for learning Go, so contributions are welcome to improve the code or extend functionality.

## License

This project is open source and available under the MIT License.
