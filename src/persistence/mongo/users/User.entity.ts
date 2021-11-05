import { Property } from "@mikro-orm/core";
import { Service } from "typedi";
import { BaseEntity } from "../BaseEntity.entity";

@Service()
export class User extends BaseEntity {
    @Property()
    email!: string

    @Property()
    password!: string
}
