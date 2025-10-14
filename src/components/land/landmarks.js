import data from "../../data.json"

const Landmarks = () => {
  return (
    <div className="my-5">      
      <ul>
        {data.landmarks.map((landmark, index) => (
          <li className="small text-muted mb-2" key={index}>{landmark}</li>
        ))}
      </ul>
    </div>
  );
}

export default Landmarks