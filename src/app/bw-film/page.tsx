import cloudinary from "cloudinary";
import { SearchResult } from "../gallery/page";
import { ForceRefresh } from "@/components/force-refresh";
import BWFilmList from "../../components/bwfilm-list";

export default async function BWFilmPage() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image AND folder:35mm-BW/*")
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
          <h1 className="text-4xl font-bold">35mm B&W Film</h1>
        </div>
        <BWFilmList initialResources={results.resources} />
      </div>
    </section>
  );
}
