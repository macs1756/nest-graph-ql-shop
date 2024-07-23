import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryResolver } from './subcategory.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subcategory, Category])],
  providers: [SubcategoryResolver, SubcategoryService],
})
export class SubcategoryModule {}
