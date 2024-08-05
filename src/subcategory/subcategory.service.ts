import { Injectable } from '@nestjs/common';
import { CreateSubcategoryInput } from './dto/create-subcategory.input';
import { UpdateSubcategoryInput } from './dto/update-subcategory.input';
import { Repository } from 'typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
  ) {}

  async create(createSubcategoryInput: CreateSubcategoryInput) {
    const { label } = createSubcategoryInput;

    const slug = slugify(label, { lower: true });

    const newSubcategory = this.subcategoryRepository.create({
      ...createSubcategoryInput,
      slug,
    });

    return await this.subcategoryRepository.save(newSubcategory);
  }

  async findAll() {
    return await this.subcategoryRepository.find({
      relations: ['category'],
    });
  }

  async findOne(id: number) {
    return await this.subcategoryRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async update(id: number, updateSubcategoryInput: UpdateSubcategoryInput) {
    const { label, slug } = updateSubcategoryInput;
    const current = await this.subcategoryRepository.findOneBy({ id });

    if (label) {
      current.label = label;
    }

    if (slug) {
      current.slug = slug;
    }

    return await this.subcategoryRepository.save(current);
  }

  async remove(id: number) {
    const isDeleted = await this.subcategoryRepository.delete({ id });

    return isDeleted
      ? { message: `Successfully deleted the subcategory with id:${id}` }
      : { message: `Error on delete entity with id: ${id}` };
  }
}
