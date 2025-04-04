
import React from "react";
import { cn } from "@/lib/utils";
import { Check, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  onToggle,
  onDelete,
}) => {
  return (
    <div
      className={cn(
        "group flex items-center justify-between p-4 mb-2 rounded-lg transition-all duration-200",
        completed ? "bg-gray-50" : "bg-white"
      )}
    >
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={() => onToggle(id)}
          className={cn(
            "w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200",
            completed
              ? "bg-emerald-500 border-emerald-500"
              : "border-gray-300 hover:border-gray-400"
          )}
        >
          {completed && <Check className="text-white" size={12} />}
        </button>
        <span
          className={cn(
            "text-sm sm:text-base transition-all duration-200",
            completed ? "text-gray-400 line-through" : "text-gray-700"
          )}
        >
          {text}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
        onClick={() => onDelete(id)}
      >
        <Trash size={16} className="text-gray-400 hover:text-red-500" />
      </Button>
    </div>
  );
};

export default TodoItem;
