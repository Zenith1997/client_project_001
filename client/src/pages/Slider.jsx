import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import Model from "../components/Model";
import Input from "../components/Input";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSliders } from "../store/sliderSlice";
import { setFilteredSliders } from "../store/filteredSliderSlice";
import toast from "react-hot-toast";

const initialSlideData = {
  title: "",
  description: "",
  buttonText: "",
  buttonLink: "",
};

const Slider = () => {
  const dispatch = useDispatch();
  const { sliders } = useSelector((state) => state.slider);
  const {filteredSliders} = useSelector((state) => state.filteredSliders);
  const [showModel, setShowModel] = React.useState(false);
  const [slideData, setSlideData] = React.useState(initialSlideData);
  const { title, description, buttonText, buttonLink } = slideData;
  const [file, setFile] = React.useState(null);

  const handleDelete = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/slider/${id}`)
      .then((res) => {
        toast.success("Slider deleted successfully");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    async function fetchSlider() {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/slider`)
        .then((res) => {
          dispatch(setSliders(res.data));
          dispatch(setFilteredSliders(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchSlider();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setSlideData({
      ...slideData,
      [name]: value,
    });
  }

  function handleImageUpload(e) {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("buttonText", buttonText);
    formData.append("buttonLink", buttonLink);
    formData.append("image", file);

    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/slider/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setTimeout(() => {
          // Clear form fields
          setSlideData(initialSlideData);
          setFile(null);
          // Close the AddProduct component
          setShowModel(false);
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-gray-700 hover:bg-gray-800 duration-150 text-white font-bold py-2 px-4 rounded text-right "
          onClick={() => setShowModel(true)}
        >
          <FaPlus className="inline-block mr-2" /> Add New Slide
        </button>
      </div>
      <div className="w-full mt-5">
        <div className="bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Slide List
        </div>
        <div className="bg-gray-700 text-white font-bold py-2 px-2 rounded mt-2">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th scope="col" className="px-3 py-3 text-center">
                    Image
                  </th>
                  <th scope="col" className="px-3 py-3 text-center">
                    Title
                  </th>
                  <th scope="col" className="px-3 py-3 text-center">
                    Description
                  </th>
                  <th scope="col" className="px-3 py-3 text-center">
                    Button Text
                  </th>
                  <th scope="col" className="px-3 py-3 text-center">
                    Button Link
                  </th>
                  <th scope="col" className="px-3 py-3 text-center">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSliders.map((slider) => (
                  <tr
                    className="bg-gray-700 text-white font-normal mb-0 hover:bg-gray-600 duration-150 text-sm"
                    key={slider.id}
                  >
                    <td className="px-2 py-2 flex justify-center">
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/assets/${slider.Image}`}
                        alt={slider.Title}
                        className="w-20 h-20 rounded object-cover"
                      />
                    </td>
                    <td className="px-2 py-2 text-center ">{slider.Title}</td>
                    <td className="px-2 py-2">{slider.Description}</td>
                    <td className="px-2 py-2 text-center">
                      {slider.ButtonText}
                    </td>
                    <td className="px-2 py-2 text-center">
                      <a href={slider.ButtonLink}>{slider.ButtonLink}</a>
                    </td>
                    <td className="px-2 text-center">
                      <button
                        className="bg-gray-800 hover:bg-gray-700 duration-150 text-white hover:text-gray-300 text-sm py-1 px-3 w-full rounded my-1"
                        onClick={() => handleDelete(slider.ID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModel && (
        <Model onClose={() => setShowModel(false)}>
          <div className="w-full">
            <div className=" text-white font-bold py-2 px-4 rounded">
              Add New Slide
            </div>
            <div className=" text-white py-2 px-2 rounded mt-2">
              <form
                className="w-full max-w-lg"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <div>
                  <input
                    name="image"
                    type="file"
                    className={`w-full bg-gray-800 hover:bg-gray-700 duration-150 text-white hover:text-gray-300 py-2 px-4 mt-2 rounded mb-4`}
                    placeholder="Enter your image"
                    onChange={handleImageUpload}
                  />
                </div>
                <div>
                  <Input
                    label={"Title"}
                    name={"title"}
                    type={"text"}
                    placeholder={"Enter Title"}
                    required={true}
                    value={title}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Input
                    label={"Description"}
                    name={"description"}
                    type={"textarea"}
                    placeholder={"Enter Description"}
                    required={true}
                    value={description}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Input
                    label={"Button Text"}
                    name={"buttonText"}
                    type={"text"}
                    placeholder={"Enter Button Text"}
                    required={true}
                    value={buttonText}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Input
                    label={"Button Link"}
                    name={"buttonLink"}
                    type={"text"}
                    placeholder={"Enter Button Link"}
                    required={true}
                    value={buttonLink}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <button
                    className="w-full bg-gray-700 hover:bg-gray-800 duration-150 text-white font-bold py-2 px-4 rounded  "
                    type={"submit"}
                  >
                    Add Slide
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Model>
      )}
    </div>
  );
};

export default Slider;
