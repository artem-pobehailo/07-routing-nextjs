"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSingleNote } from "@/lib/api";
import { Note } from "@/types/note";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
interface NotePreviewProps {
  id: string;
  onClose?: () => void;
}

export default function NotePreview({ id, onClose }: NotePreviewProps) {
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getSingleNote(id)
      .then((data) => setNote(data))
      .catch(() => setNote(null))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return <Loader />;
  if (!note) return <ErrorMessage />;

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <button className={css.backBtn} onClick={handleClose}>
          Close
        </button>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          {note.tag && <span className={css.tag}>{note.tag}</span>}
        </div>
      </div>
    </Modal>
  );
}
