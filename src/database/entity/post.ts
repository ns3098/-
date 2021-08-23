import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Post extends BaseEntity{

    @PrimaryGeneratedColumn("increment")
    id!: number;


    @Column({ type: "date", default: () => "CURRENT_TIMESTAMP" })
	createdAt!: Date;

    @Column({
		type: "date",
		default: () => "CURRENT_TIMESTAMP",
		onUpdate: "CURRENT_TIMESTAMP",
		nullable: false,
	})
	updatedAt!: Date;

    @Column({type: "text"})
    title!: string;
}
