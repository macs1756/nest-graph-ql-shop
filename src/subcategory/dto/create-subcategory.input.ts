import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateSubcategoryInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  label: string;
}
