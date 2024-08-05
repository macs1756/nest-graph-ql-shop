import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from 'src/category/entities/category.entity';
import { BaseColumns } from 'src/utils/base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
@ObjectType()
export class Subcategory extends BaseColumns {
  @Column()
  @Field(() => String)
  label: string;

  @Column()
  @Field(() => String)
  slug: string;

  @Column()
  @Field(() => Int)
  categoryId: number;

  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'categoryId' })
  @Field(() => Category)
  category: Category;
}
