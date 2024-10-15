import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import React, { useState, useEffect} from 'react';

 const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
  McD: {
    foreground: '#FF0000',
    background: '#FFFF00',
  },
 };

function ListOfFavorites({favoriteList}:any) {
  console.log("Ran ListOfFavorites");
  return (
    <div>
      <h2>List of Favorites:</h2>
      <ul>
        {favoriteList.map((note:any) => (
          <li>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}



function App() {

  
  const [notes, setNotes] = useState(dummyNotesList);
  const [favoriteList, setFavoriteList] = useState<Note[]>([]);
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const initialNote = {
    favorite: false,
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
 const [createNote, setCreateNote] = useState(initialNote);
 const [selectedNote, setSelectedNote] = useState<Note>(initialNote);

 const deleteNote = (noteId:number) => {
  setNotes(notes.filter(note => note.id !== noteId))
 }
 
 const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote({...createNote, id:-1});
  };

  const editTitleSelectedNote = (title: string, noteId:number) => {
    const edittedSelectedNote = notes.map(note => {
      if (note.id === noteId){
        console.log("found the note with the id to edit",note.id);
        return {...note, title: title};
      }
      return note;
    });

    setNotes(edittedSelectedNote)
    //try to get whole list edited and send as setNotes(updatedNoteList)!!!
  }

  const editContentSelectedNote = (content: string, noteId:number) => {
    const edittedSelectedNote = notes.map(note => {
      if (note.id === noteId){
        console.log("found the note with the id to edit",note.id);
        return {...note, content: content};
      }
      return note;
    });

    setNotes(edittedSelectedNote)
    //try to get whole list edited and send as setNotes(updatedNoteList)!!!
  }

  const editLabelSelectedNote = (label: string, noteId:number) => {
    const edittedSelectedNote = notes.map(note => {
      if (note.id === noteId){
        console.log("found the note with the id to edit",note.id);
        return {...note, Label: label};
      }
      return note;
    });

    setNotes(edittedSelectedNote)
    //try to get whole list edited and send as setNotes(updatedNoteList)!!!
  }
 
  const favoriteClicked = (noteId:number) => {
    const updatedNoteList = notes.map(note => {
      if (note.id === noteId){
        console.log("found the note with the id and favorite = ",note.favorite);
        return {...note, favorite: !note.favorite};
      }
      return note;
    })

    setNotes(updatedNoteList);
  }

  const toggleTheme = () => {
    if(currentTheme === themes.light){
      setCurrentTheme(themes.dark);
    }

    else if(currentTheme === themes.dark){
      setCurrentTheme(themes.McD);
    }

    else{
      setCurrentTheme(themes.light);
    }
  };

  

  useEffect(() => {
    setFavoriteList(notes.filter((note) => note.favorite));
  }, [notes]);

  useEffect(() => {
    console.log(notes);
  }, [notes]);
  
  
  
 return (
  
   <div className='app-container' style = {{background: currentTheme.background,
    color: currentTheme.foreground,}}>
      <form  className="note-form" onSubmit={createNoteHandler}>
        <div style = {{background: currentTheme.background,
       color: currentTheme.foreground,}}>
          <div ><input style = {{background: currentTheme.background,
       color: currentTheme.foreground,}} placeholder="Note Title" onChange={(event) =>
        setCreateNote({ ...createNote, title: event.target.value })}
      required></input></div>

          <div>< textarea onChange={(event) =>
          	setCreateNote({ ...createNote, content: event.target.value })}
        	required style = {{background: currentTheme.background,
       color: currentTheme.foreground,}}></textarea></div>

          <div>
            <select
              onChange={(event) => setCreateNote({ ...createNote, label: event.target.value as Label})}
              required>
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>

          <div ><button type="submit">Create Note</button></div>
        </div>
      </form>

      <div className="notes-grid" style = {{background: currentTheme.background,
       color: currentTheme.foreground,}}>
        {notes.map((note) => (
          <div
            key={note.id}
            className="note-item" style = {{background: currentTheme.background,
              color: currentTheme.foreground,}}>
            <div className="notes-header">
              <button onClick={() => favoriteClicked(note.id)} style = {{background: currentTheme.background,
       color: currentTheme.foreground,}}>{note.favorite ? "♥" : "♡"}</button>
              <button onClick={() => deleteNote(note.id)} style = {{background: currentTheme.background,
       color: currentTheme.foreground,}}>x</button>
            </div>
            <h2 contentEditable suppressContentEditableWarning = {true} onBlur={(event) => editTitleSelectedNote(event.target.innerHTML, note.id)}> {note.title} </h2>
            <p contentEditable onBlur={(event) => editContentSelectedNote(event.target.innerHTML, note.id)}> {note.content} </p>
            <p contentEditable onBlur={(event) => editLabelSelectedNote(event.target.innerHTML, note.id)}> {note.label} </p>
          </div>
        ))}
      </div>

      <button style = {{background: currentTheme.background,
       color: currentTheme.foreground,}} onClick={toggleTheme}> Toggle Theme </button>

      <ListOfFavorites favoriteList={favoriteList}/>
      
    </div>
    
 );
}

export default App;

