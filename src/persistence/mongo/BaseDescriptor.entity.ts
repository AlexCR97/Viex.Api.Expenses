import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.entity";

@Entity({ abstract: true })
export abstract class BaseDescriptor extends BaseEntity {
    @Property()
    description!: string
}
