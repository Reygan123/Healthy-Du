import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getExerciseID, updateExercise } from "../../fetching/exercise";
import { getAllExerciseCategory, updateExerciseCategory } from "../../fetching/exercise_category";
import { getAllCategory } from "../../fetching/category";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../components/Loading";
import Input from "../../components/Input";
import Button from "../../components/Button";
import TextArea from "../../components/TextArea";
import ArrowBack from '../../assets/back.png';

const EditExercise = () => {
    const { id } = useParams();
    const [exercise, setExercise] = useState([]);
    const [category, setCategory] = useState([])
    const [categoryExercise, setCategoryExercise] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [repetition_time, setRepetition_time] = useState(0);
    const [repetition_value, setRepetition_value] = useState(0);
    const [level, setLevel] = useState("");
    const [calories, setCalories] = useState(0);
    const [link, setLink] = useState("");
    const navigate = useNavigate();

    const fetchExercise = async () => {
        try {
            const exerciseData = await getExerciseID(id);
            setExercise(exerciseData.data_exercise);
            setLoading(false);
            console.log("Exercise >>>", exerciseData.data_exercise);
            setName(exerciseData.data_exercise.name);
            setDescription(exerciseData.data_exercise.description);
            setRepetition_time(exerciseData.data_exercise.repetition_time);
            setRepetition_value(exerciseData.data_exercise.repetition_value);
            setLevel(exerciseData.data_exercise.level);
            setCalories(exerciseData.data_exercise.calories);
            setLink(exerciseData.data_exercise.link);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCategoryExercise = async () => {
        try {
            const categoryExercise = await getAllExerciseCategory(1, 100, id, "")
            setCategoryExercise(categoryExercise.data)
            console.log("Kategori Latihan >>> ", categoryExercise.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCategory = async () => {
        try {
            const category = await getAllCategory("", 100, "", "")
            setCategory(category.data)
            console.log("Kategori", category.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async () => {
        try {
            const payload = {
                name: name,
                description: description,
                repetition_time: repetition_time,
                repetition_value: repetition_value,
                level: level,
                calories: calories,
                link: link
            };

            const response = await updateExercise(id, payload);

            const updatedExerciseCategoryPromises = categoryExercise.map(async (item, index) => {
                const payloadExercise = {
                    exerciseId: id,
                    categoryId: getCategoryIdByName(selectedCategory[index])
                };

                console.log("Payload Latihan", payloadExercise);

                const response = await updateExerciseCategory(item.id, payloadExercise);
                return response;
            });

            await Promise.all(updatedExerciseCategoryPromises);

            console.log("Latihan berhasil diperbarui!", response);
            navigate(`/exercise/${id}`);
            toast.success('Gerakan berhasil diupdate!');
        } catch (error) {
            console.log(error);
            toast.error('Gagal update gerakan');
        }
    };


    const handleClick = () => {
        navigate(`/exercise/${id}`);
    }

    const getCategoryIdByName = (categoryName) => {
        const selectedCategory = category.find((cat) => cat.name === categoryName);
        return selectedCategory ? selectedCategory.id : null;
    };

    const handleDropdownChange = (event, index) => {
        const selectedCategoryName = event.target.value;
        setSelectedCategory(prevState => {
            const newState = [...prevState];
            newState[index] = selectedCategoryName;
            return newState;
        });
        const selectedCategoryId = getCategoryIdByName(selectedCategoryName);
        console.log(`ID Gerakan yang Dipilih untuk programExercise[${index}]:`, selectedCategoryId);
    };

    useEffect(() => {
        setLoading(true);
        fetchExercise();
        fetchCategoryExercise()
        fetchCategory()
    }, [id]);

    useEffect(() => {
        if (categoryExercise.length > 0) {
            setSelectedCategory(categoryExercise.map(item => item.Category.name));
        }
    }, [categoryExercise]);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <div className="flex flex-col gap-2 md:gap-4 lg:gap-6 2xl:gap-8 justify-center items-center my-4 md:my-6 lg:my-8">
                <div className="flex justify-between items-center w-full px-2 lg:px-4 2xl:px-6">
                    <button className="p-2 md:p-2 lg:p-2 2xl:p-4 bg-white border border-b-2 border-red-500 rounded-md" onClick={handleClick}>
                        <span><img src={ArrowBack} alt="" className="w-4 h-4 mr-1" /></span>
                    </button>
                    <h1 className="text-left text-md md:text-md lg:text-lg 2xl:text-xl font-bold">Edit Gerakan</h1>
                    <div></div>
                </div>
                <ToastContainer />
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama"
                />
                <TextArea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Deskripsi"
                />
                <Input
                    type="text"
                    value={repetition_time}
                    onChange={(e) => setRepetition_time(e.target.value)}
                    placeholder="Repetisi Gerakan"
                />
                <Input
                    type="text"
                    value={repetition_value}
                    onChange={(e) => setRepetition_value(e.target.value)}
                    placeholder="Timer"
                />
                <Input
                    type="text"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    placeholder="Level"
                />
                <Input
                    type="text"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="Calories"
                />
                <Input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Link Video"
                />
                <ul className="w-full flex flex-col gap-2 justify-center items-center">
                    {categoryExercise.map((list, index) => (
                        <select
                            key={list.id}
                            value={selectedCategory[index]}
                            onChange={(e) => handleDropdownChange(e, index)}
                            className="border border-[#BFBFBF] text-sm md:text-md lg:text-md 2xl:text-lg text-black rounded-md w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
                        >
                            <option value="">{list.Category.name}</option>
                            {category.map((option) => (
                                <option key={option.id} value={option.name}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    ))}
                </ul>
                <div className="w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3">
                    <Button
                        onClick={handleUpdate}
                        text="Simpan"
                        border="border-[#006090]"
                        bg="bg-[#00A9FF]"
                        width="w-full"
                    />
                </div>
            </div>
        </>
    );
};

export default EditExercise;
