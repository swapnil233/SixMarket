import { AdCard } from "@/components/AdCard";
import Hero from "@/components/ui/Hero";
import { Button, Skeleton } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();

  let heroButtonsLayout;

  if (status === "unauthenticated") {
    heroButtonsLayout = (
      <>
        <div className="mt-5 flex w-full align-middle justify-center">
          <Button
            variant="light"
            onClick={() => signIn(undefined, { callbackUrl: "/" })}
            className="mr-3"
          >
            Log in
          </Button>
          <Button
            variant="filled"
            onClick={() => signIn(undefined, { callbackUrl: "/listings/new" })}
          >
            Post an ad
          </Button>
        </div>
      </>
    );
  } else if (status === "loading") {
    <>
      <Skeleton height={36} width={140} mr={12} />
      <Skeleton height={36} width={140} />
    </>;
  } else if (status === "authenticated") {
    heroButtonsLayout = (
      <>
        <Button variant="outline">Browse recent listings</Button>
      </>
    );
  }

  return (
    <main>
      {/* Hero */}
      <Hero heroButtonsLayout={heroButtonsLayout} />
      {/* <HeroWithBg /> */}

      {/* Recently posted ads */}
      <div className="pb-12 pt-10 md:pt-16 container flex flex-col w-full">
        <div className="max-w-6xl w-full mx-auto px-4">
          <section className="pb-12 md:pb-20">
            <div className="max-w-5xl w-full">
              <h1 className="text-4xl mb-4">Recently posted</h1>
            </div>
            <div className="mb-10">
              <p className="text-xl text-slate-600">
                See what your neighbours are selling
              </p>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
              <AdCard />
              <AdCard />
              <AdCard />
              <AdCard />
              <AdCard />
              <AdCard />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
