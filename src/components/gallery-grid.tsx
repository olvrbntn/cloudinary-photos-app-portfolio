"use client";

import { CloudinaryImage } from "./cloudinary-image";
import { ImageGrid } from "@/components/image-grid";
import { SearchResult } from "../app/gallery/page";

export default function GalleryGrid({images}: {images: SearchResult[]}) {
  return (
    <ImageGrid
      images={images}
      getImage={(imageData: SearchResult) => {
        return (
          <CloudinaryImage
            key={imageData.public_id}
            imageData={imageData}
            width="2000"
            height="1600"
            alt="an image of something"
          />
        );
      }}
    />
  );
}
