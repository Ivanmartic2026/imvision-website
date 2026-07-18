import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/lib/projects";
import { swedishProjectCopy } from "@/lib/projects-sv";
import { ProjectDetailPage } from "@/components/sections/projects/ProjectDetailPage";
import { pageMeta, DEFAULT_OG_IMAGE } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const copy = swedishProjectCopy[slug];
  if (!project || !copy) return { title: "Projekt" };

  return {
    ...pageMeta({
      locale: "sv",
      path: `/projects/${slug}/`,
      title: copy.title,
      description: copy.description,
      image: project.image || DEFAULT_OG_IMAGE,
    }),
    robots: project.verified ? undefined : { index: false, follow: false },
  };
}

export default async function SwedishProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();

  const copy = swedishProjectCopy[project.slug];
  if (!copy) notFound();

  return <ProjectDetailPage locale="sv" project={project} copy={copy} />;
}
