// schema.js
import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const mySchema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: "ImForm",
      columns: [
        { name: "customer_name", type: "string" },
        { name: "operation_no", type: "string" },
        { name: "form_no", type: "string" },
        { name: "imexUser_id", type: "string", isIndexed: true },
        { name: "total_amount", type: "string" },
        { name: "CurrencyShortName", type: "string" },
        { name: "country", type: "string" },
        { name: "cbos_id", type: "string", isIndexed: true },
        { name: "form_date", type: "string" },
        { name: "bank_name", type: "string" },
        { name: "bank_branch", type: "string" },
        { name: "form_status", type: "string" },
        { name: "custom_unit", type: "string" },
        { name: "first_approval", type: "string" },
        { name: "second_approval", type: "string" },
        { name: "date", type: "string" },
        { name: "synced", type: "boolean" },
      ],
    }),
    tableSchema({
      name: "ExForm",
      columns: [
        { name: "customer_name", type: "string" },
        { name: "contract_no", type: "string" },
        { name: "form_no", type: "string" },
        { name: "imexUser_id", type: "string", isIndexed: true },
        { name: "total_amount", type: "string" },
        { name: "CurrencyShortName", type: "string" },
        { name: "country", type: "string" },
        { name: "cbos_id", type: "string", isIndexed: true },
        { name: "form_date", type: "string" },
        { name: "bank_name", type: "string" },
        { name: "bank_branch", type: "string" },
        { name: "form_status", type: "string" },
        { name: "custom_unit", type: "string" },
        { name: "first_approval", type: "string" },
        { name: "second_approval", type: "string" },
        { name: "date", type: "string" },
        { name: "synced", type: "boolean" },
      ],
    }),
    tableSchema({
      name: "imexUser",
      columns: [
     
        { name: "cbosid", type: "string" },
        { name: "imexUser_id", type: "string", isIndexed: true },
        { name: "login_name", type: "string" },
        { name: "fullname", type: "string" },
        { name: "mobileNo", type: "string" },
        { name: "password_updated", type: "string" },
        { name: "bank", type: "string" },
        { name: "branch", type: "string" },
        { name: "imexUser_type_name", type: "string" },
      ],
    }),
  ],
});
