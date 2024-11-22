import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, setRating] = useState('');
  const [formError, setFormError] = useState('');  // Fix state name here

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!title || !method || !rating) {
      setFormError('Please fill in all the fields correctly');
      return;
    }

    // Ensure rating is a number
    // const ratingNumber = Number(rating);

    // Update data in Supabase
    const { data, error } = await supabase
      .from('smoothies')
      .update({ title, method, rating }) // Update rating as a number
      .eq('id', id);

    if (error) {
      console.log(error);
      setFormError('An error occurred while updating the recipe');
    }

    if (data) {
      console.log("Updated data:", data);
      setFormError(null);
      navigate('/');
    }
  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        console.log(error);
        navigate('/', { replace: true });
      }

      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
        // console.log("Fetched data:", data);
      }
    };

    fetchSmoothies();
  }, [id, navigate]);

  return (
    <div className="page update">
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

        <button  type="submit">Update Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
