import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coffee } from './coffee.entity';


// SQL table name => 'flavor'
@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Coffee, (coffee) => coffee.flavors)
  coffees: Coffee[];
}
