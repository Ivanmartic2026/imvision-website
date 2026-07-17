import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/lib/projects";
import {
  ProjectDetailPage,
  ProjectCopy,
} from "@/components/sections/projects/ProjectDetailPage";
import { pageMeta } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return pageMeta({
    locale: "en",
    path: `/projects/${slug}/`,
    title: project.title,
    description: project.description,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const copy: ProjectCopy = {
    title: project.title,
    category: project.category,
    description: project.description,
    longDescription: project.longDescription,
    caseStudy: project.caseStudy,
  };

  return <ProjectDetailPage locale="en" project={project} copy={copy} />;
}
