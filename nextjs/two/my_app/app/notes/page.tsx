import Link from 'next/link';
import styles from './Notes.module.css';
import CreateNote from './CreateNote.tsx';


async function getNotes(){
  const res = await fetch('http://localhost:8090/api/collections/posts/records?pate=1&perPage=10');
  const data = await res.json();
  return data?.items as any[];
}


function Note({note}: any){
  const {id, title, content, created} = note || {}
  return (
    <Link href={`/notes/${id}`}>
    <div>
      <h2>{title}</h2>
      <h5>{content}</h5>
      <p>{created}</p>
    </div>
    </Link>
  )
}

export default async function NotesPage(){
  const notes = await getNotes();

  return (
    <div> 
      <h1>notes</h1>
      <div className={styles.grid}>
        {notes?.map((note)=>{
           return <Note key={note.id} note={note} />;
        })}
      </div>
      <CreateNote />
    </div>
  );
}
