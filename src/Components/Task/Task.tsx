/* enum Status {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    INPROGRESS = "INPROGRESS"
} */

interface Task {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}



export type { Task }