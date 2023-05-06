import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.etity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      description: 'Todo 1',
      completed: false,
    },
    {
      id: 2,
      description: 'Todo 2',
      completed: false,
    },
    {
      id: 3,
      description: 'Todo 3',
      completed: false,
    },
    {
      id: 4,
      description: 'Todo 4',
      completed: false,
    },
  ];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }
}
