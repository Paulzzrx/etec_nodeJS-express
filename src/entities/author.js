import { EntitySchema } from "typeorm";

const author = new EntitySchema({
    name: "Author",
    tableName: "Author",
    columns: {
        id: {primary: true, type: "int", generated: "increment"},
        name: {type: "varchar", length: 50, nullable: false},
        birthday: {type: "datetime", nullable: false},
        nationaly: {type: "varchar", length: 50, nullable: false},
        createdAt: {type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP"},
        deletedAt: {type: "datetime", nullable: true}
    }
});

export default author;