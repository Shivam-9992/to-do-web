import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2, Plus, Check, X } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (editText.trim() && editingId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, text: editText.trim() } : todo
        )
      );
      setEditingId(null);
      setEditText("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">
              Todo App
            </CardTitle>
            <p className="text-muted-foreground">Manage your tasks efficiently</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add Todo Form */}
            <div className="flex gap-2">
              <Input
                placeholder="Add a new task..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
                className="flex-1"
              />
              <Button onClick={addTodo} className="gap-2">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>

            {/* Todo List */}
            <div className="space-y-3">
              {todos.length === 0 ? (
                <p className="py-8 text-center text-muted-foreground">
                  No tasks yet. Add one above!
                </p>
              ) : (
                todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-all hover:shadow-md"
                  >
                    {editingId === todo.id ? (
                      <>
                        <Input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                          className="flex-1"
                          autoFocus
                        />
                        <Button size="icon" variant="ghost" onClick={saveEdit}>
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={cancelEdit}>
                          <X className="h-4 w-4 text-red-600" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Checkbox
                          checked={todo.completed}
                          onCheckedChange={() => toggleComplete(todo.id)}
                        />
                        <span
                          className={`flex-1 ${
                            todo.completed
                              ? "text-muted-foreground line-through"
                              : "text-foreground"
                          }`}
                        >
                          {todo.text}
                        </span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => startEdit(todo)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteTodo(todo.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Stats */}
            {todos.length > 0 && (
              <div className="flex justify-between border-t pt-4 text-sm text-muted-foreground">
                <span>Total: {todos.length}</span>
                <span>Completed: {todos.filter((t) => t.completed).length}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
