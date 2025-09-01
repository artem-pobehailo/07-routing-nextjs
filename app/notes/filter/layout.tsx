import { fetchTags } from "@/lib/api";
import SidebarNotes from "./@sidebar/SidebarNotes";
import css from "./LayoutNotes.module.css";

export default async function LayoutNotes({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  const tags: string[] = await fetchTags();
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>
        <SidebarNotes tags={tags} />
      </aside>
      <main className={css.notesWrapper}>{children}</main>
    </div>
  );
}
