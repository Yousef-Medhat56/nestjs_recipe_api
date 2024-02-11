import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Recipe } from './entity/recipe';
import { RecipeDto } from './dto/recipe.dto';

@Injectable()
export class RecipeService {
  private _recipes: Recipe[] = [];

  async getRecipes() {
    return this._recipes;
  }

  async getRecipe(id: string) {
    const recipe = this._recipes.find((recipe) => recipe.id === id);
    if (!recipe) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return recipe;
  }

  async createRecipe(recipe: RecipeDto) {
    const createdRecipe = {
      ...recipe,
      id: Math.floor(Math.random() * 100).toString(),
    };
    this._recipes.push(createdRecipe);
  }

  async deleteRecipe(id: string) {
    this._recipes = this._recipes.filter((recipe) => recipe.id !== id);
  }
}
