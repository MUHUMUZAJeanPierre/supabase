import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import SmoothieCard from "../components/SmoothieCard";
import '../index.css';

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [orderBy, setOrderBy] = useState('created_at');  // Update to 'created_at'

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .order(orderBy, { ascending: false });  // Ensure proper column name is used

      if (error) {
        setFetchError("Could not fetch the smoothies");
        setSmoothies(null);
        console.error(error);
      } else {
        setSmoothies(data);
        setFetchError(null);
      }
    };

    fetchSmoothies();
  }, [orderBy]);

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="smoothie">
          <div className="order-by">
            <p>Ordered By:</p>
            <button onClick={() => setOrderBy('created_at')}>Time created</button> {/* Ensure 'created_at' */}
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
            <p>Currently ordered by: {orderBy}</p> {/* Show selected order */}
          </div>
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
