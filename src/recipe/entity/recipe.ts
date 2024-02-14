import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Unit } from '../dto/recipe.dto';

@Entity({ name: 'recipe' })
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @OneToMany(() => Igredient, (ingredient) => ingredient.recipe, {
    cascade: true,
    eager: true,
  })
  ingredients: Igredient[];
}

@Entity({ name: 'ingredient' })
export class Igredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar' })
  unit: Unit;

  @Column({ type: 'integer' })
  quantity: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients,{onDelete:"CASCADE"})
  recipe: Recipe;
}
