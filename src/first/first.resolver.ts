import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class FirstResolver {
  @Query(() => String, { name: 'data' })
  first(): string {
    return 'first resolver';
  }

  @Query(() => Float, { name: 'random' })
  gerRandom(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, { name: 'randomFromZeroTo' })
  getRandomFromZeroTo(
    @Args('to', { nullable: true, type: () => Int }) to: number,
  ): number {
    return parseInt(String(Math.random() * to));
  }
}
