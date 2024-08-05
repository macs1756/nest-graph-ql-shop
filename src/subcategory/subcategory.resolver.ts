import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubcategoryService } from './subcategory.service';
import { Subcategory } from './entities/subcategory.entity';
import { CreateSubcategoryInput } from './dto/create-subcategory.input';
import { UpdateSubcategoryInput } from './dto/update-subcategory.input';

@Resolver(() => Subcategory)
export class SubcategoryResolver {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Mutation(() => Subcategory, { name: 'createSubcategory' })
  createSubcategory(
    @Args('args')
    createSubcategoryInput: CreateSubcategoryInput,
  ) {
    return this.subcategoryService.create(createSubcategoryInput);
  }

  @Query(() => [Subcategory], { name: 'getAllSubcategory' })
  findAll() {
    return this.subcategoryService.findAll();
  }

  @Query(() => Subcategory, { name: 'getOneSubcategory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.subcategoryService.findOne(id);
  }

  @Mutation(() => Subcategory, { name: 'updateSubcategory' })
  updateSubcategory(
    @Args('updateSubcategoryInput')
    updateSubcategoryInput: UpdateSubcategoryInput,
  ) {
    return this.subcategoryService.update(
      updateSubcategoryInput.id,
      updateSubcategoryInput,
    );
  }

  @Mutation(() => Subcategory, { name: 'removeSubcategory' })
  removeSubcategory(@Args('id', { type: () => Int }) id: number) {
    return this.subcategoryService.remove(id);
  }
}
