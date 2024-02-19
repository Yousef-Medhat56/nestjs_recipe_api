import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Unit } from '../dto/recipe.dto';
import { User } from 'src/auth/entity/user';

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

  @ManyToOne(() => User, (user) => user.recipes, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  image?: string;
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

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients, {
    onDelete: 'CASCADE',
  })
  recipe: Recipe;
}
