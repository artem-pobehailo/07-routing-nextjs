import NoteClient from "./Notes.client";

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const tagFromUrl = slug?.[0];
  const tag = tagFromUrl === "All" ? undefined : tagFromUrl;

  return <NoteClient tag={tag} />;
}
