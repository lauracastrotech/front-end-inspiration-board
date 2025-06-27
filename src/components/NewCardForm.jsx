import { useState } from "react";

const kDefaultFormState = {
    'message': '',
    'likes_count': 0
};

const NewCardForm = ({onBoardSubmit}) => {
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
            <label htmlFor="message">Message</label>
            <textarea
            onChange={handleChange}
            rows='10'
            cols='50'
            type="text"
            name="message"
            placeholder="What inspired you today?"
            value={formData.message}></textarea>

            <button type="submit">Add</button>
        </section>
    </form>
  );
};

export default NewCardForm;