import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'primary_categories' })
@ObjectType()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @Column()
  @Field(() => String)
  label: string;

  @Column()
  @Field(() => String)
  slug: string;

  @Field(() => [Subcategory])
  @OneToMany(() => Subcategory, (subcategory) => subcategory.id)
  subcategories: Subcategory[];
}
