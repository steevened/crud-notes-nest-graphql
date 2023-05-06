import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field(() => Int, { description: 'TODO Unique ID' })
  id: number;

  @Field(() => String, { description: 'TODO title' })
  description: string;

  @Field(() => Boolean, { description: 'TODO state' })
  completed = false;
}
