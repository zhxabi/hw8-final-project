
export interface ExpenseObj {
  expenseAmount: number
  owner: string
  comment? : string
  categories: [string]
  _id: number
  __v: number
  createdAt: Date
  updatedAt: Date
  sharedUsers: [String]
  sharedAmount: number
}

export interface UserObj {
  _id: number,
  username: string,
}

export interface MonthlySumObj {
  date: String
  dayTotal: Number
}

export interface YearlySumObj {
  month: String
  monthTotal: Number
}
