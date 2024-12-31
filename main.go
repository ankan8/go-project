package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)
type Todo struct{
	ID        int       `json:"id"`
	Completed bool      `json:"completed"`
	Body      string    `json:"body"`

}
func main() {
	fmt.Println("hello world")
	app:= fiber.New()
	err:=godotenv.Load(".env")
	if err != nil{
		log.Fatal("error loading .env file")

	}
	PORT := os.Getenv("PORT")
	todos:=[]Todo{}
	//getall todos
	app.Get("/api/todos",func(c *fiber.Ctx)error{
		return c.Status(200).JSON(todos)
	})
	//create todo
	app.Post("/api/todos",func(c *fiber.Ctx) error{
		todo:= &Todo{}//{id:0,completed:false,body:""}
		if err:= c.BodyParser(todo);err !=nil{
			return err
		}
		if todo.Body==""{
			return c.Status(400).JSON(fiber.Map{"error":"Todo body is required"})
		} 
		todo.ID=len(todos)+1
		todos  = append(todos,*todo)
		return c.Status(201).JSON(todo)



	})
	//update todo
	app.Patch("/api/todos/:id",func(c *fiber.Ctx)error{
		id:=c.Params("id")
		for i,todo:=range todos{
			if fmt.Sprint(todo.ID) ==id{
				todos[i].Completed = true
				return c.Status(200).JSON(todos[i])

			}
		}
		return c.Status(404).JSON(fiber.Map{"error":"Todo not found"})

	})
	//delete job 
	app.Delete("/api/todos/:id", func(c *fiber.Ctx) error {
		id := c.Params("id") // Get the ID from the route params
	
		// Filter the todos slice to exclude the todo with the matching ID
		filteredTodos := make([]Todo, 0)
		for _, todo := range todos {
			if fmt.Sprint(todo.ID) != id {
				filteredTodos = append(filteredTodos, todo) // Include only non-matching todos
			}
		}
	
		todos = filteredTodos // Update the original todos slice
	
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Todo deleted successfully",
		})
	})
	
	log.Fatal(app.Listen(":"+PORT))


}