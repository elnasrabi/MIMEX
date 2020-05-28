// schema.js
import { appSchema, tableSchema } from "@nozbe/watermelondb"

export const mySchema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: "consignmentSuccess",
      columns: [
        { name: "customerName", type: "string" },
        { name: "userName", type: "string" },
        { name: "consignmentNumber", type: "string" },
        { name: "itemsCount", type: "string" },
        { name: "status", type: "string" },
        { name: "image", type: "string" },
        { name: "signBy", type: "string" },
        { name: "signImage", type: "string" },
        { name: "date", type: "string" }
      ]
    }),
  ]
})
