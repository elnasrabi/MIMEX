import { HomeStoreModel, HomeStore } from "./home-store";

test("can be created", () => {
  const instance: HomeStore = HomeStoreModel.create({});

  expect(instance).toBeTruthy();
});
