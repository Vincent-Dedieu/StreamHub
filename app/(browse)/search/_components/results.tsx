interface ResultsProps {
  q?: string;
}

export const Results = ({ q }: ResultsProps) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Results for your query &quot;{q}&quot; :</h2>
    </div>
  );
};

export const ResultsSkeleton = () => {
  return <div></div>;
};
