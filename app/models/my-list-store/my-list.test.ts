import { MyListModel, MyList } from "./my-list"

test("can be created", () => {
  const instance: MyList = MyListModel.create({})

  expect(instance).toBeTruthy()
})