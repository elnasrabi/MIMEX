import { GeneralApiProblem } from "./api-problem"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type LoginUserResult = { kind: "ok"; user: any, authorization: any } | GeneralApiProblem
export type ConsignmentResult = { kind: "ok"; consignment: any } | GeneralApiProblem
export type GetARateResult = { kind: "ok"; getaRate: any; Status: number } | GeneralApiProblem
export type GetListResult = { kind: "ok"; getList: any; Status: number } | GeneralApiProblem
