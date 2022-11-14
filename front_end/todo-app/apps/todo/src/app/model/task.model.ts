export class Task {
    _id!: string
    taskName!: string
    note!: string
    isCompleted!: boolean
    isImportant?: boolean
    isToday?: false
    deadline!: Date | null
    remindAt?: string
    file?: string
    list?: string
    createdAt?: string
    updatedAt?: string
    __v?: string
}
