import { useState } from "react";
import PropTypes from 'prop-types';

const kDefaultFormState = {
    'title': '',
    'owner': ''
}
const NewBoardForm = ({onBoardSubmit}) => {
    const [formData, setFormData] = useState(kDefaultFormState);

    const handleChange = (e) => {
        e.preventDefault();
        setFormData(formData => {
            return {...formData, [e.target.name]: e.target.value};
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onBoardSubmit();
    };
    
  return (
    <form onSubmit={handleSubmit}>
        <section>
            <label htmlFor="title">Title</label>
            <input 
            onChange={handleChange}
            type="text"
            name="title"
            value={formData.title} />

            <label htmlFor="owner">Owner</label>
            <input 
            onChange={handleChange}
            type="text"
            name="owner"
            value={formData.owner} />

            <button type="submit">Add</button>
        </section>
    </form>
  );
};

NewBoardForm.propTypes = {
  onBoardSubmit : PropTypes.func.isRequired,
};

export default NewBoardForm;

