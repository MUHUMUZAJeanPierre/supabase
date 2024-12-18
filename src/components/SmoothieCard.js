import React from 'react'
import { Link } from 'react-router-dom'
import supabase from '../config/supabaseClient'

const SmoothieCard = ({smoothie}) => {

  const handleDelete = async () => {
    console.log('Delete function called');
    const {data, error} = await supabase.from('smoothies').delete().eq('id', smoothie.id);
  
    if (error) {
      console.log('Error:', error);
    }
    if (data) {
      console.log('Data:', data);
    }
  }
    
  return (
    <div className='smoothie-card'>
        <h3>{smoothie.title}</h3>
        <p>{smoothie.method}</p>
        <div className='rating'>{smoothie.rating}</div>
        <div className='buttons'>
            <Link to={'/' + smoothie.id}>
                <i className='material-icons'>edit</i>
            </Link>
            <Link >
                <i className='material-icons' onClick={handleDelete}>delete</i>
            </Link>
        </div>
    </div>
  )
}

export default SmoothieCard