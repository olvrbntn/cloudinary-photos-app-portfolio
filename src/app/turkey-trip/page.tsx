import cloudinary from "cloudinary";
import { SearchResult } from "../gallery/page";
import { ForceRefresh } from "@/components/force-refresh";
import ColorFilmList from "../../components/turkeytrip-list";

export default async function TurkeyTripPage() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image AND folder:Turkey-Trip-2022/*")
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
          <h1 className="text-4xl font-bold">Turkey Trip - Fall 2022</h1>
        </div>
        <ColorFilmList initialResources={results.resources} />
      </div>
    </section>
  );
}
