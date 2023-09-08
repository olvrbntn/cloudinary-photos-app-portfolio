import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart } from "@/components/icons/heart";
import Link from "next/link";
import Image from "next/image";
import cloudinary from "cloudinary";
import { Folder } from "./albums/page";
import { FolderIcon } from "@/components/icons/folder";
import { FilmIcon } from "@/components/icons/filmIcon";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Photos App - Oliver Javier",
  description: "A photos app created by Oliver Javier",
};

// // ORIGINAL CODE

async function SideMenu() {
  const { folders } = (await cloudinary.v2.api.root_folders()) as {
    folders: Folder[];
  };
  return (
    <div className="pb-12 w-1/3 sm:w-1/4">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-2xl font-semibold tracking-tight">
            Manage
          </h2>
          <div className="space-y-4">
            <Button
              variant="ghost"
              className="flex gap-2 w-full justify-start text-xs md:text-base"
              asChild
            >
              <Link href="/gallery">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
                  />
                </svg>
                Gallery
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="flex gap-2 w-full justify-start text-xs md:text-base"
              asChild
            >
              <Link href="/albums">
                <FolderIcon />
                Albums
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="flex gap-2 w-full justify-start text-xs md:text-base"
              asChild
            >
              <Link href="/favorites">
                <Heart />
                Favorites
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="flex gap-2 w-full justify-start text-xs md:text-base"
              asChild
            >
              <Link href="/bw-film">
                <FilmIcon />
                35mm B&W Film
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="flex gap-2 w-full justify-start text-xs md:text-base"
              asChild
            >
              <Link href="/color-film">
                <FilmIcon />
                35mm Color Film
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="flex gap-2 w-full justify-start text-xs md:text-base"
              asChild
            >
              <Link href="/turkey-trip">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                Turkey Trip - Fall 2022
              </Link>
            </Button>

            {/* ROOT FOLDERS */}
            {/* {folders.map((folder) => (
              <Button
                asChild
                variant="ghost"
                key={folder.name}
                className="flex gap-2 w-full justify-start pl-8"
              >
                <Link href={`/albums/${folder.path}`}>{folder.name}</Link>
              </Button>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="border-b">
          <div className="flex h-20 items-center px-6 gap-4">
            <Link href="/">
              <Image
                src="/photoAlbumImg.png"
                width={50}
                height={50}
                alt="icon of this photo album app"
              />
            </Link>
            <h1 className="text-4xl">Photos App</h1>
          </div>
        </div>
        <div className="flex ">
          <SideMenu />
          <div className="w-full px-4 pt-12">{children}</div>
        </div>
      </body>
    </html>
  );
}
