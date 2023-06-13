import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const resp = await axios.get("https://jsonplaceholder.typicode.com/todos");
    setData(resp?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  // check box
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const handleCheckboxChange = (value, id) => {
    if (selectedCheckboxes.includes(value)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((item) => item !== value)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    }
  };

  return (
    <div className="App">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Tittle</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <>
                <tr>
                  <th scope="row">{item.id}</th>
                  <td>{item.title}</td>
                  <td>{item.completed}</td>
                  <td>
                    {" "}
                    <input
                      type="checkbox"
                      aria-label="Checkbox for following text input"
                      checked={selectedCheckboxes.includes(item)}
                      onChange={() => handleCheckboxChange(item, item.id)}
                    />
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
