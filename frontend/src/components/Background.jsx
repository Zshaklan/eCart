import back1 from "../assets/back1.jpg";
import back2 from "../assets/back2.jpg";
import back3 from "../assets/back3.jpg";
import back4 from "../assets/back4.jpg";
import back5 from "../assets/back5.jpg";

const images = [back1, back2, back3, back4, back5];

const Background = ({ heroCount }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-r-3xl md:rounded-none">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`background-${index}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            heroCount === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

export default Background;
