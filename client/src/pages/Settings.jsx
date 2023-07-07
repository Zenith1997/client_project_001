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

const Settings = () => {
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

        formData.append("image", file);

        await axios
            .post(`${process.env.REACT_APP_BASE_URL}/backgroundimage/add`, formData, {
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
            <div className="flex justify-start">
                <button
                    className="bg-gray-700 hover:bg-gray-800 duration-150 text-white font-bold py-2 px-4 rounded text-right "
                    onClick={() => setShowModel(true)}
                >
                   Change background image
                </button>
            </div>


            {showModel && (
                <Model onClose={() => setShowModel(false)}>
                    <div className="w-full">
                        <div className=" text-white font-bold py-2 px-4 rounded">
                            Add new background image
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
                                    <button
                                        className="w-full bg-gray-700 hover:bg-gray-800 duration-150 text-white font-bold py-2 px-4 rounded  "
                                        type={"submit"}
                                    >
                                        Upload
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

export default Settings;
