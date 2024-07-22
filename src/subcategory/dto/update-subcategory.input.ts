import { IsString } from 'class-validator';
import { CreateSubcategoryInput } from './create-subcategory.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSubcategoryInput extends PartialType(
  CreateSubcategoryInput,
) {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  @IsString()
  label?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  slug?: string;
}
