// save component to display saved locations in a table format
import "../styles/Save.css";
import useSavedLocations from "../context/UseSavedLocations";
import { useState } from "react";

interface Destination {
  id: number;
  image: string;
  name: string;
  description: string;
}


const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

const Save = () => {
  const { savedLocations, removeLocation } = useSavedLocations();
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: number]: boolean }>({});

  const toggleDescription = (index: number) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="table-container">
      <h1>My Saved Destinations</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {savedLocations.map((location: Destination, index: number) => (
            <tr key={index}>
              <td>{location.name}</td>
              <td>
                {expandedDescriptions[index]
                  ? location.description
                  : truncateText(location.description, 100)}
                <button
                  className="btn"
                  onClick={() => toggleDescription(index)}
                >
                  {expandedDescriptions[index] ? 'Show Less' : 'Read More'}
                </button>
              </td>
              <td className="image-cell">
                <img src={location.image} alt={location.name} />
              </td>
              <td>
                <button
                  className="btn"
                  onClick={() => removeLocation(location.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Save;