import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Recipe } from './entity/recipe';
import { RecipeDto } from './dto/recipe.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    @InjectRepository(User) private userRepository: Repository<User>,
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

  async createRecipe(recipeDto: RecipeDto, userEmail: string): Promise<void> {
    const user = await this.userRepository.findOneOrFail({
      where: { email: userEmail },
    });
    await this.recipeRepository.save({ ...recipeDto, user });
  }


  async deleteRecipe(id: string) {
    await this.recipeRepository.delete({ id });
  }
}
