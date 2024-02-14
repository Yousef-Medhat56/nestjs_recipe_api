import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Recipe } from './entity/recipe';
import { RecipeDto } from './dto/recipe.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
  ) {}

  async getRecipes() {
    return await this.recipeRepository.find();
  }

  async getRecipe(id: string) {
    try {
      const recipe = await this.recipeRepository.findOne({ where: { id } });
      if (!recipe) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return recipe;
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async createRecipe(recipe: RecipeDto) {
    await this.recipeRepository.save(recipe);
  }

  async deleteRecipe(id: string) {
    await this.recipeRepository.delete({ id });
  }
}
