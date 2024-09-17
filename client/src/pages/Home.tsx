import { useEffect, useState } from 'react';

function Home() {
  interface Category {
    category: string;
    locations: string[];
  }
  
  const [defaultCategories, setDefaultCategories] = useState<Category[]>([]);

  useEffect(() => {
    // fetch default categorized locations from the backend for homepage display
    fetch('/api/destinations')
      .then((response) => response.json())
      .then((data) => {
        if (data.defaultCategories) {
          setDefaultCategories(data.defaultCategories);
        }
      })
      .catch((error) => console.error('Error fetching default categories:', error));
  }, []);

  return (
    <div>
      <h1>Explore Popular Destinations</h1>
      {defaultCategories.length > 0 ? (
        defaultCategories.map((category, index) => (
          <div key={index}>
            <h2>{category.category}</h2>
            <ul>
              {category.locations.map((location: string, index: number) => (
                <li key={index}>{location}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No default destinations available</p>
      )}
    </div>
  );
}

export default Home;
