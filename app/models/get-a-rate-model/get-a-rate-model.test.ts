import { GetARateModel } from "./get-a-rate-model";

test("can be created", () => {
  const instance: GetARateModel = GetARateModel.create({});

  expect(instance).toBeTruthy();
});
