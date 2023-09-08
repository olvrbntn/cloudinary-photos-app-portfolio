
// "use client";

import cloudinary from "cloudinary";
import UploadButton from "../components/upload-button";
import { SearchForm } from "../components/search-form";
import GalleryGrid from "../components/gallery-grid";
import { SearchResult } from "./gallery/page";


export type UploadResult = {
  info: {
    public_id: string;
  };
  event: "success";
};


export default async function Home({
  searchParams: { search },
}: {
  searchParams: {
    search: string;
  };
}) {
  const results = (await cloudinary.v2.search
    .expression(`resource_type:image${search ? ` AND tags=${search}`: ''}`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(1)
    .execute()) as { resources: SearchResult[] };

  console.log("results", results);

  return (
    <section>
      <div className="flex flex-col gap-8 pr-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Photos</h1>
          <UploadButton />
        </div>

        <SearchForm 
          initialSearch={search}
        />

        <GalleryGrid images={results.resources} />
        
      </div>
    </section>
  );
}



