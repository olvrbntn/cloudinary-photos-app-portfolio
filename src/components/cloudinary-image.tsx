"use client";

import { Heart } from "@/components/icons/heart";
import { CldImage, CldImageProps } from "next-cloudinary";
import { setAsFavoriteAction } from "./actions";
import { useState, useTransition } from "react";
import { SearchResult } from "../app/gallery/page";
import { FullHeart } from "@/components/icons/full-heart";
import { ImageMenu } from "./image-menu";

export function CloudinaryImage(props: {
  imageData: SearchResult;
  onUnheart?: (unheartedResource: SearchResult) => void;
} & Omit<CldImageProps,"src">) {
  const [transition, startTransition] = useTransition();

  const { imageData, onUnheart } = props;
  const [isFavorited, setIsFavorited] = useState(
    imageData.tags.includes("favorite")
  );

  return (
    <div className="relative bg-zinc-100/5 rounded-sm">
      <CldImage {...props} src={imageData.public_id} className="rounded-sm" />
      {isFavorited ? (
        <FullHeart
          onClick={() => {
            onUnheart?.(imageData);
            setIsFavorited(false);
            startTransition(() => {
              setAsFavoriteAction(imageData.public_id, false);
            });
          }}
          className="absolute top-2 left-2 hover:text-white text-red-500 cursor-pointer"
        />
      ) : (
        <Heart
          onClick={() => {
            setIsFavorited(true);
            startTransition(() => {
              setAsFavoriteAction(imageData.public_id, true);
            });
          }}
          className="absolute top-2 left-2 hover:text-red-500 cursor-pointer"
        />
      )}
      <ImageMenu 
        image={imageData}
      />
    </div>
  );
}
