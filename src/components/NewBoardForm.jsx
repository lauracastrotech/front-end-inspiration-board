import { useState } from "react";
const kDefaultFormState = {
    'title': '',
    'owner': ''
}
const NewBoardForm = () => {
    const [formData, setFormData] = useState(kDefaultFormState)

    const handleChange = (e) => {
        setFormData(formData => {
            return {...formData, [e.target.name]: e.target.value}
        })
    }
  return (
    <form>
        <label htmlFor="title"></label>
        <input 
        onChange={handleChange}
        type="text"
        name="title"
        value={''} />
        <label htmlFor="owner"></label>
    </form>
  )
}

export default NewBoardForm;

