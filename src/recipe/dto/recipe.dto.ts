import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, Min, MinLength, ValidateNested } from "class-validator";

export class RecipeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({each: true})
  @Type(()=>IgredientDto)
  ingredients: IgredientDto[];
}

export enum Unit {
  MILILITERS = 'mililiters',
  LITERS = 'LITERS',
  GRAMS = 'grams',
  KILOGRAMS = 'kilograms',
  SPOONS = 'spoons',
  CUPS = 'cups',
  PIECES = 'pieces',
}
export class IgredientDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
  @IsNotEmpty()
  @IsEnum(Unit)
  unit: Unit;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}

