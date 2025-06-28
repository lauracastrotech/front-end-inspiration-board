import { useState } from 'react';
import PropTypes from 'prop-types';

const KDefaultBoardState = {
    title: '',
    owner: '',
    cards: []
};
const NewBoardForm = ({ onCreateBoard }) => {
    const [formData, setFormData] = useState(KDefaultBoardState);
    const [errorData, setErrorData] = useState('');

    const validateInput = (title, owner) => {
        if (!title || !owner) {
            return 'All fields are required';
        }
        return '';
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const error = validateInput(formData.title, formData.owner);
        if (error) {
            setErrorData(error);
            return;
        }

        setErrorData('');
        onCreateBoard(formData);
        setFormData(KDefaultBoardState);
    };
    
    const handleChange = (event) => {
      const inputName = event.target.name;
      const inputValue = event.target.value;
      setFormData((formData) => ({
        ...formData,
        [inputName]: inputValue,
        }));
    };
    
    return (
        <form className="new_board_form" onSubmit={handleSubmit}>
        <label htmlFor="board_name">Board Name</label>
        <input
            type="text"
            id="board_name"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errorData ? 'error' : ''}
        />
        <label htmlFor="owner_name">Owner Name</label>
        <input
            type="text"
            id="owner_name"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className={errorData ? 'error' : ''}
        />
        {errorData && <p className="error_message">{errorData}</p>}
        <button type="submit" className='create_board_button'>Create Board</button>
        </form>
    );
};

NewBoardForm.propTypes = {
    onCreateBoard: PropTypes.func.isRequired,
};

export default NewBoardForm;

// import { useState } from "react";
// import PropTypes from 'prop-types';

// const kDefaultFormState = {
//     'title': '',
//     'owner': ''
// }
// const NewBoardForm = ({onBoardSubmit}) => {
//     const [formData, setFormData] = useState(kDefaultFormState);

//     const handleChange = (e) => {
//         e.preventDefault();
//         setFormData(formData => {
//             return {...formData, [e.target.name]: e.target.value};
//         });
//     };
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onBoardSubmit();
//     };
    
//   return (
//     <form onSubmit={handleSubmit}>
//         <section>
//             <label htmlFor="title">Title</label>
//             <input 
//             onChange={handleChange}
//             type="text"
//             name="title"
//             value={formData.title} />

//             <label htmlFor="owner">Owner</label>
//             <input 
//             onChange={handleChange}
//             type="text"
//             name="owner"
//             value={formData.owner} />

//             <button type="submit">Add</button>
//         </section>
//     </form>
//   );
// };

// NewBoardForm.propTypes = {
//   onBoardSubmit : PropTypes.func.isRequired,
// };

// export default NewBoardForm;


