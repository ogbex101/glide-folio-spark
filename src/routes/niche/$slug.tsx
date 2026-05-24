import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/niche/$slug")({
  component: NichePage,
});

function NichePage() {
  const { slug } = Route.useParams();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Niche: {slug}</h1>
    </div>
  );
}
