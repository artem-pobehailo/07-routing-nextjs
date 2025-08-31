import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";
import NotePreview from "./NotePreview.client";

import { getSingleNote } from "@/lib/api";

interface NotePreviewPageProps {
  params: { id: string };
}

export default async function NotePreviewPage({
  params,
}: NotePreviewPageProps) {
  const { id } = params as { id: string };
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
}
