// save component to display saved locations in a table format
import '../styles/Save.css';
import useSavedLocations  from '../../context/UseSavedLocations';

interface Destination {
  image: string;
  name: string;
  description: string;
  web_url: string;
}

const Save = () => {
  const { savedLocations } = useSavedLocations();

  return (
    <div>
      <h1>My Saved Destinations</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {savedLocations.map((location: Destination, index: number) => (
            <tr key={index}>
              <td>{location.name}</td>
              <td>{location.description}</td>
              <td>
                <img src={location.image} alt={location.name} />
              </td>
              <td>
                <a href={location.web_url} target="_blank" rel="noreferrer">
                  {location.web_url}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Save;
