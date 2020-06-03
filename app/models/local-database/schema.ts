// schema.js
import { appSchema, tableSchema } from "@nozbe/watermelondb"

export const mySchema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: "consignment",
      columns: [
        { name: "customer_name", type: "string" },
        { name: "event_name", type: "string" },
        { name: "event_notes", type: "string" },
        { name: "user_id", type: "string", isIndexed: true },
        { name: "consignment_number", type: "string" },
        { name: "items_count", type: "string" },
        { name: "status", type: "string" },
        { name: "image", type: "string" },
        { name: "sign_by", type: "string" },
        { name: "sign_image", type: "string" },
        { name: "date", type: "string" },
        { name: "synced", type: "boolean" }
      ]
    }),
    tableSchema({
      name: "user",
      columns: [
        { name: "email", type: "string" },
        { name: "login_name", type: "string" },
        { name: "first_name", type: "string" },
        { name: "last_name", type: "string" },
        { name: "password_updated", type: "string" },
        { name: "user_type_name", type: "string" }
      ]
    }),
  ]
})
