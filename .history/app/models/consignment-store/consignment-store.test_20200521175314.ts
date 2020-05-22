import { ConsignmentStoreModel, ConsignmentStore } from "./consignment-store"

test("can be created", () => {
  const instance: ConsignmentStore = ConsignmentStoreModel.create({})

  expect(instance).toBeTruthy()
})