"use client"
// import { Task } from "./todo-list" // to add type
import { useRouter } from "next/navigation";

async function update(id: string, isDone: boolean, refresh) {
    await fetch(`/api/todo/update`, {
        method: "POST",
        body: JSON.stringify({ id, isDone })
    });

    refresh()
}

async function deleteTodo(id: string, refresh) {
    await fetch(`/api/todo/delete?id=${id}`, {
        method: "DELETE",
    });

    refresh()
}

export default function Todo({ todo }: any) /* : Task */ {

    const router = useRouter();

    return (
        <>
            <input
                type="checkbox"
                onChange={(e) => update(todo.id, e.target.checked, router.refresh)}
                checked={todo.isDone}
            />
            <span> {todo.name}</span>
            <button onClick={() => deleteTodo(todo.id, router.refresh)}>Delete</button>
        </>
    );
}
// cors error resolved with rewrites, but now error 500