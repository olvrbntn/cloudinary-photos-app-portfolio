import cloudinary from "cloudinary";
import { SearchResult } from "../gallery/page";
import { ForceRefresh } from "@/components/force-refresh";
import ColorFilmList from "../../components/colorfilm-list";

export default async function ColorFilmPage() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image AND folder:35mm-Color/*")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  console.log("results", results);

  return (
    <section>
      <ForceRefresh />
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">35mm Color Film</h1>
        </div>
        <ColorFilmList initialResources={results.resources} />
      </div>
    </section>
  );
}
