import { createFileRoute, Outlet, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { nicheBundleQuery } from "@/lib/niche-queries";
import { NicheNav } from "@/components/portfolio/NicheNav";
import { Footer } from "@/components/portfolio/Footer";
import { NicheThemeProvider } from "@/components/portfolio/ThemeProvider";
import { UserProvider, type PortfolioUser } from "@/lib/user-context";

export const Route = createFileRoute("/$user/niche/$slug")({
  loader: ({ params, context }) => {
    return context.queryClient.ensureQueryData(nicheBundleQuery(params.slug));
  },
  head: ({ loaderData, params }) => {
    const s = loaderData?.settings;
    const userName =
      params.user === "joshua" ? "Ogbeifun Joshua Osewe" : "Ogbeifun Daniel Osewe";
    const title = s?.title
      ? `${userName} — ${s.title}`
      : userName;
    const description =
      s?.bio?.slice(0, 155) ?? `Multi-niche portfolio of ${userName}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: UserNicheLayout,
});

function UserNicheLayout() {
  const { slug, user } = Route.useParams();
  const { data: bundle } = useQuery({ ...nicheBundleQuery(slug) });

  if (bundle === null) throw notFound();

  // Build a user-overridden bundle with the correct display name
  const portfolioUser = (user === "joshua" ? "joshua" : "daniel") as PortfolioUser;
  const displayName =
    portfolioUser === "joshua"
      ? "Ogbeifun Joshua Osewe"
      : "Ogbeifun Daniel Osewe";

  const overriddenBundle = bundle
    ? {
        ...bundle,
        settings: bundle.settings
          ? { ...bundle.settings, full_name: displayName }
          : { full_name: displayName },
      }
    : bundle;

  return (
    <UserProvider user={portfolioUser}>
      <NicheThemeProvider theme={overriddenBundle?.settings ?? undefined}>
        <div className="page-enter min-h-screen bg-background">
          <NicheNav />
          <main key={slug}>
            <Outlet />
          </main>
          {overriddenBundle && <Footer bundle={overriddenBundle} />}
        </div>
      </NicheThemeProvider>
    </UserProvider>
  );
}
