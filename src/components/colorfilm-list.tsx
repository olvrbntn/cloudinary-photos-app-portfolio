"use client";
import { useEffect, useState } from "react";
import { CloudinaryImage } from "./cloudinary-image";
import { SearchResult } from "../app/gallery/page";
import { ImageGrid } from "@/components/image-grid";

export default function ColorFilmList({
  initialResources,
}: {
  initialResources: SearchResult[];
}) {
  const [resources, setResources] = useState(initialResources);

    // this helps avoid next.js caching delay issues
  useEffect(() => {
    setResources(initialResources)
  }, [initialResources])

  return (
    <ImageGrid 
      images={resources}

      getImage={(imageData: SearchResult) => {
        return (
            
        <CloudinaryImage
            key={imageData.public_id}
            imageData={imageData}
            width="400"
            height="300"
            alt="an image of something"
            onUnheart={(unheartedResource) => {
              setResources((currentResources) =>
                currentResources.filter(
                  (resource) => resource.public_id !== unheartedResource.public_id
                )
              );
            }}
          />

        );
      }}
      />


   
  );
}
