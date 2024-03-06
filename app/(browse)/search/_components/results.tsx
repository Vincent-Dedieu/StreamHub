import { getSearch } from "@/lib/search-service";

interface ResultsProps {
  q?: string;
}

export const Results = async ({ q }: ResultsProps) => {
  const data = await getSearch(q);
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Results for your query &quot;{q}&quot; :</h2>
      {data.length === 0 && <p className="text-muted-foreground text-sm">No results found...</p>}
    </div>
  );
};

export const ResultsSkeleton = () => {
  return <div></div>;
};
