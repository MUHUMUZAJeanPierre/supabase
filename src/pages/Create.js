import { useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, setRating] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form fields
    if (!title || !method || !rating) {
      setFormError('Please fill all the fields correctly');
      return;
    }
  
    const { data, error } = await supabase.from('smoothies').insert([{ title, method, rating }]);
  
    // console.log("Supabase response:", { data, error });
  
    if (error) {
      console.log("Error inserting data:", error);
      setFormError('An error occurred while submitting the form');
    }
  
    if (data) {
      console.log("Data inserted:", data);
      setFormError(null);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };
  

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <input
          type="text"
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button  onClick={()=>{
          navigate('/')
        }} type="submit">Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
