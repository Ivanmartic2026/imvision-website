import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/lib/projects";
import { swedishProjectCopy } from "@/lib/projects-sv";
import { ProjectDetailPage } from "@/components/sections/projects/ProjectDetailPage";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const copy = swedishProjectCopy[slug];
  if (!copy) return { title: "Projekt" };

  return pageMeta({
    locale: "sv",
    path: `/projects/${slug}/`,
    title: copy.title,
    description: copy.description,
  });
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
