import { FilterQuery } from "@mikro-orm/core";
import { Service } from "typedi";
import ExpensesContext from "../ExpensesContext";
import { RoleDescriptor } from "./RoleDescriptor.entity";

@Service()
export default class RoleDescriptorRepository {
    createRangeAsync(roleDescriptors: RoleDescriptor[]) {
        return ExpensesContext.instance.roleDescriptors.persistAndFlush(roleDescriptors)
    }

    getWhereAsync(where: FilterQuery<RoleDescriptor>): Promise<RoleDescriptor[]> {
        return ExpensesContext.instance.roleDescriptors.find(where)
    }
}
