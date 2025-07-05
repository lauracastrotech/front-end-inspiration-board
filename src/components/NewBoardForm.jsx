import { useState } from 'react';
import PropTypes from 'prop-types';
import "../styles/NewBoardForm.css";

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

    const makeControlledInput = (inputName) => {
      return <input 
        onChange={handleChange} 
        type='text' 
        id={`input-${inputName}`}
        name={inputName}
        value={formData[inputName]}
        className={errorData ? 'error' : ''}
      />;
  };

    return (
        <form className="new_board_form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="board_name">Board Name</label>
                { makeControlledInput('title') }
            </div>
            <div>
                <label htmlFor="owner_name">Owner Name</label>
                { makeControlledInput('owner') }
            </div>  
                { errorData && 
                    <div> 
                        <p className="error_message">{errorData}</p> 
                    </div> 
                }
            <button type="submit" className='create_board_button'>Create Board</button>
        </form>
    );
    const handleSubmit = (e) => {
        e.preventDefault();
        onBoardSubmit();
    };
    
  return (
    <form id="board-form" onSubmit={handleSubmit}>
        <section>
            <label htmlFor="title">Title</label>
            <input 
            onChange={handleChange}
            type="text"
            name="title"
            value={formData.title}
            placeholder="What inspires you?" />

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


