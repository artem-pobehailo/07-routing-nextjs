"use client";

import { useRouter } from "next/navigation";

import { getSingleNote } from "@/lib/api";
import { Note } from "@/types/note";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { useQuery } from "@tanstack/react-query";
interface NotePreviewProps {
  id: string;
  onClose?: () => void;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return <Loader />;
  if (isError || !data) return <ErrorMessage />;

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <button className={css.backBtn} onClick={handleClose}>
          Close
        </button>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
          </div>
          <p className={css.content}>{data.content}</p>
          {data.tag && <span className={css.tag}>{data.tag}</span>}
        </div>
      </div>
    </Modal>
  );
}
