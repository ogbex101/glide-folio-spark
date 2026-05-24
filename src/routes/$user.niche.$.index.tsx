slugimport { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { nicheBundleQuery } from "@/lib/niche-queries";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Story } from "@/components/portfolio/Story";
import { Services } from "@/components/portfolio/Services";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Certifications } from "@/components/portfolio/Certifications";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { BrandLogos } from "@/components/portfolio/BrandLogos";
import { EmailDesigns } from "@/components/portfolio/EmailDesigns";
import { Contact } from "@/components/portfolio/Contact";
import { useState } from "react";
import type { PortfolioUser } from "@/lib/user-context";

export const Route = createFileRoute("/$user/niche/$slug/")({
  loader: ({ params, context }) =>
    context.queryClient.ensureQueryData(nicheBundleQuery(params.slug)),
  component: UserNicheHome,
});

function UserNicheHome() {
  const { slug, user } = Route.useParams();
  const { data: bundle } = useSuspenseQuery(nicheBundleQuery(slug));
  const [techFilter, setTechFilter] = useState<string | null>(null);

  if (!bundle) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20">
        <h1 className="text-2xl font-semibold">Niche not found</h1>
      </div>
    );
  }

  const portfolioUser = (user === "joshua" ? "joshua" : "daniel") as PortfolioUser;
  const displayName =
    portfolioUser === "joshua"
      ? "Ogbeifun Joshua Osewe"
      : "Ogbeifun Daniel Osewe";

  // Override the name in the bundle for this user
  const overriddenBundle = {
    ...bundle,
    settings: bundle.settings
      ? { ...bundle.settings, full_name: displayName }
      : { full_name: displayName },
  };

  return (
    <>
      <Hero bundle={overriddenBundle} />
      <About bundle={overriddenBundle} />
      <Story bundle={overriddenBundle} />
      <Services bundle={overriddenBundle} />
      <Skills
        bundle={overriddenBundle}
        activeFilter={techFilter}
        onFilterChange={setTechFilter}
      />
      <Projects bundle={overriddenBundle} techFilter={techFilter} />
      <EmailDesigns bundle={overriddenBundle} />
      <Certifications bundle={overriddenBundle} />
      <Testimonials bundle={overriddenBundle} />
      <BrandLogos bundle={overriddenBundle} />
      <Contact bundle={overriddenBundle} />
    </>
  );
}
