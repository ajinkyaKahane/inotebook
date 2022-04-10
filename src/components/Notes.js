import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from "../context/notes/noteContext"
//eslint-disable-next-line
import NoteState from '../context/notes/NoteState';
//eslint-disable-next-line
import Alert from './Alert';
import Noteitem from './Noteitem';
import Addnotes from './Addnotes';



const Notes = (props) => {

    const context = useContext(NoteContext);
    let history = useNavigate();
    const showAlert = props.showAlert
    const { notes, getNotes, editNote } = context;
     useEffect(() => {
         if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            history("/login")
        }
        //eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setNote] = useState({id:"" , etitle:"", edescription:"", etag:"Default"})

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})

    }
    const handleClick = (e)=>{
        editNote(note.id, note.etitle, note.edescription, note.etag)
        showAlert("Note Edited Successfully", "success")
        refClose.current.click();
    }

    const onChange = (e) =>{
        setNote({...note, [e.target.name]:e.target.value})
    }
    return (
        <>
            <Addnotes showAlert={showAlert}/>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} minLength={5} required onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value= {note.edescription} minLength={5} required onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="row">
                    <h1>Your Notes</h1>
                    <div className="container mx-1">
                    {notes.length && 'No Notes To Display' }
                    </div>
                    
                    {notes.map((note) => {
                        return <Noteitem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes