import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity() // sql table === 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  // @Column('json', { nullable: true })
  // flavors: string[];

  // @JoinTable() specifies the owner side of the relationships
  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, {
    cascade: true, // automatically adds new flavor to flavor table
  })
  flavors: Flavor[];
}
