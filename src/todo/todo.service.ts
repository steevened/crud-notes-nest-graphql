import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.etity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs';
import { StatusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      description: 'Todo 1',
      completed: true,
    },
    {
      id: 2,
      description: 'Todo 2',
      completed: false,
    },
    {
      id: 3,
      description: 'Todo 3',
      completed: true,
    },
    {
      id: 4,
      description: 'Todo 4',
      completed: false,
    },
    {
      id: 5,
      description: 'Todo 5',
      completed: true,
    },
  ];

  get totalTodos() {
    return this.todos.length;
  }

  get completedTodos() {
    return this.todos.filter((todo) => todo.completed).length;
  }

  get pendingTodos() {
    return this.todos.filter((todo) => todo.completed === false).length;
  }

  findAll(status: StatusArgs): Todo[] {
    const { completed } = status;
    console.log(completed);

    if (completed === undefined) return this.todos;

    return this.todos.filter((t) => t.completed === completed);
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.description = createTodoInput.description;
    todo.completed = false;
    todo.id = Math.max(...this.todos.map((todo) => todo.id)) + 1;
    this.todos.push(todo);
    return todo;
  }

  update(id: number, updateTodoInput: UpdateTodoInput): Todo {
    const { completed, description } = updateTodoInput;
    const todoToUpdate = this.findOne(id);

    if (description) {
      todoToUpdate.description = description;
    }

    if (completed !== undefined) {
      todoToUpdate.completed = completed;
    }

    this.todos = this.todos.map((todo) => {
      return todo.id === id ? todoToUpdate : todo;
    });

    return todoToUpdate;
  }

  delete(id: number): boolean {
    this.findOne(id);

    this.todos = this.todos.filter((todo) => todo.id !== id);

    return true;
  }
}
