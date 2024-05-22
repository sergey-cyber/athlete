"use client";

import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";

interface Props {
  onDelete: () => void;
  onEdit: () => void;
}

export function ProductItemMenu({ onDelete, onEdit }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="absolute top-2 right-1 cursor-pointer"
      >
        <EllipsisVertical className="text-gray-600" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Действия</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="mr-2 h-4 w-4" />
          <span>Изменить</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Удалить</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
