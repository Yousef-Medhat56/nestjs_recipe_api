import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeDto } from './dto/recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get()
  async getRecipes() {
    return this.recipeService.getRecipes();
  }

  @Get('/:id')
  async getRecipe(@Param() params:{id: string}) {
    return this.recipeService.getRecipe(params.id);
  }

  @Post()
  async createRecipe(@Body() recipe: RecipeDto) {
    return this.recipeService.createRecipe(recipe);
  }

  @Delete("/:id")
  async deleteRecipe(@Param() params:{id: string}) {
    return this.recipeService.deleteRecipe(params.id);
  }
}
