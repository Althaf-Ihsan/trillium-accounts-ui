import React, { useEffect, useState } from 'react';
import { Descriptions, List, Button } from 'antd';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from "@mui/icons-material/Delete";
import { addNote, deleteNote, getAllNotes } from '../../../Redux/Accounts/accounts.actions';
import './style.css';
import toast from 'react-hot-toast';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');
  const { noteList,addNoteRes } = useSelector((state) => state.account);
  const clinicId = localStorage.getItem('clinic_id');
  const dispatch = useDispatch();

  useEffect(() => {
    const patientData = JSON.parse(localStorage.getItem('patient'));
    if (patientData && patientData.id) {
      dispatch(getAllNotes(patientData.id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (noteList?.responseCode === 0 && Array.isArray(noteList.data)) {
      setNotes(noteList.data);
    }
  }, [noteList]);
 

  const handleDelete = (noteId) => {
    dispatch(deleteNote(noteId)).then(() => {
      toast.success("Note deleted successfully");
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.PATIENT_NOTE_ID !== noteId)
      );
    });
  };
  const handleAddNote = () => {
    const patientData = JSON.parse(localStorage.getItem('patient'));
    if (patientData) {
      dispatch(addNote({
        patient_id: patientData.id,
        clinic_id: clinicId,
        notes: noteInput
      })).then(() => {
        toast.success("Note added successfully");
        dispatch(getAllNotes(patientData.id)); // Refetch notes to include the new one
        setNoteInput(''); // Clear input field
      }).catch(error => {
        toast.error(error);
      });
    }
  };
  

  return (
    <div>
      <div className="nots-display-section">
        <Descriptions />
        <List
          size="small"
          header={<div className="notes-heading">Notes</div>}
          style={{ height: '600px' }}
          className="notes-list"
          bordered
          dataSource={notes}
          renderItem={(item) => (
            <List.Item
              actions={[
                <DeleteIcon fontSize="small"  onClick={() => handleDelete(item.PATIENT_NOTE_ID)}/>
                ,
              ]}
            >
              {item.NOTE}
            </List.Item>
          )}
        />
      </div>
      <div className="notes-add-sec">
        <textarea
          name="note"
          id="note"
          rows="4"
          cols="50"
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
        ></textarea>
        <div className="send-icon-container" onClick={handleAddNote}>
          <SendRoundedIcon fontSize="large" className="sendIcon" />
        </div>
      </div>
    </div>
  );
}

export default Notes;
