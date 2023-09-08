import { Pencil, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "./icons/menu";
import { FolderPlus } from "./icons/folder-plus";
import { AddToAlbumDialog } from "./add-to-album-dialog";
import { SearchResult } from "@/app/gallery/page";
import { useState } from "react";
import Link from "next/link";

export function ImageMenu({ image }: { image: SearchResult }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="absolute top-2 right-2">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-38">
          <DropdownMenuItem asChild>
            <AddToAlbumDialog image={image} onClose={() => setOpen(false)} />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button variant="ghost" asChild className="cursor-pointer flex justify-start pl-4">
              <Link
                href={`/edit?publicId=${encodeURIComponent(image.public_id)}`}
                className="flex gap-2"
              >
                <Pencil className="w-4 h-4  " />
                Edit
              </Link>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
