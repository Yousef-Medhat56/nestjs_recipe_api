import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  ValidationPipe,
  Request
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeDto } from './dto/recipe.dto';
import { AccessTokenGuard } from 'src/auth/gaurd/access-token.gaurd';
import { UserRole } from 'src/auth/entity/user';
import { Role } from 'src/auth/decorators/role';
import { RoleGuard } from 'src/auth/gaurd/authorization.gaurd';

@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get()
  async getRecipes() {
    return this.recipeService.getRecipes();
  }

  @Get('/:id')
  async getRecipe(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.recipeService.getRecipe(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  async createRecipe(@Body() recipeDto: RecipeDto, @Request() req) {
    const { sub } = req.user;
    return await this.recipeService.createRecipe(recipeDto, sub);
  }

  @Role(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Delete('/:id')
  async deleteRecipe(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.recipeService.deleteRecipe(id);
  }
}
