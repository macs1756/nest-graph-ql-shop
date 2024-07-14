import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RemoveCategoryResponse {
  @Field()
  message: string;
}
