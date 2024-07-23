import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateSubcategoryInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  label: string;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
