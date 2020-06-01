import { GetARateModelModel, GetARateModel } from "./get-a-rate-model"

test("can be created", () => {
  const instance: GetARateModel = GetARateModelModel.create({})

  expect(instance).toBeTruthy()
})