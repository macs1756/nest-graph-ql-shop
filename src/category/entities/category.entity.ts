import { Field, ObjectType } from '@nestjs/graphql';
import { BaseColumns } from 'src/utils/base';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'primary_categories' })
@ObjectType()
export class Category extends BaseColumns {
  @Column()
  @Field(() => String)
  label: string;

  @Column()
  @Field(() => String)
  slug: string;

  @Field(() => [Subcategory])
  @OneToMany(() => Subcategory, (subcategory) => subcategory.category, {
    onDelete: 'CASCADE',
  })
  subcategories: Subcategory[];
}
