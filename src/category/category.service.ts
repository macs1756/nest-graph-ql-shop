import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryInput: CreateCategoryInput) {
    const { label } = createCategoryInput;

    const slug = slugify(label, { lower: true });

    const newCategory = this.categoryRepository.create({
      ...createCategoryInput,
      slug,
    });

    return await this.categoryRepository.save(newCategory);
  }

  findAll() {
    return this.categoryRepository.find({ relations: ['subcategories'] });
  }

  findOne(slug: string) {
    return this.categoryRepository.findOne({
      where: { slug },
      relations: ['subcategories'],
    });
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    const { label, slug } = updateCategoryInput;
    const current = await this.categoryRepository.findOneBy({ id });

    if (label) {
      current.label = label;
    }

    if (slug) {
      current.slug = slug;
    }

    return await this.categoryRepository.save(current);
  }

  async remove(id: number) {
    const isDeleted = await this.categoryRepository.delete({ id });

    return isDeleted
      ? { message: `Successfully deleted the category with id:${id}` }
      : { message: `Error on delete entity with id: ${id}` };
  }
}
