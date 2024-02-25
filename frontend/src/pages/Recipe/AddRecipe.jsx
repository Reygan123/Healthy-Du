import { useState } from "react"
import { addRecipe, uploadImage } from "../../fetching/recipe"
import Input from "../../components/Input"
import TextArea from "../../components/TextArea"

const AddRecipe = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [timeCooking, setTimeCooking] = useState("")
    const [timePrepare, setTimePrepare] = useState("")
    const [tutorial, setTutorial] = useState("")
    const [selectedFile, setSelectedFile] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);

    const handleSubmit = async () => {
        try {
            const payload = {
                name: name,
                description: description,
                time_cooking: timeCooking,
                time_prepare: timePrepare,
                tutorial: tutorial
            }
            const response = await addRecipe(payload)

            console.log("tot???????????????????????", response)

            const anjay = await uploadImage(response.id, selectedFile);
            console.log(anjay)

        } catch (error) {
            console.log(error)
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
            const url = URL.createObjectURL(file);
            setSelectedFile(file);
            setImageUrl(url);
        } else {
            alert('Pilih berkas dengan ekstensi .jpg atau .jpeg');
        }
    };

    return <>
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-6 2xl:gap-6 justify-center items-center my-8">

            {imageUrl && (
                <div className="border border-[#BFBFBF] w-2/5 rounded-md">
                    <img src={imageUrl} alt="Pilihan Gambar" className="rounded-md" />
                </div>
            )}

            <input
                type="file"
                onChange={handleFileChange}
                placeholder="Upload Gambar"
                accept=".jpg, .jpeg"
                className="border border-[#BFBFBF] text-md lg:text-lg 2xl:text-xl text-black rounded-md w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 bg-white"
                required
            />

            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukan Nama" />
            <TextArea type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Bahan-Bahan" />
            <Input type="text" value={timePrepare} onChange={(e) => setTimePrepare(e.target.value)} placeholder="Waktu Persiapan" />
            <Input type="text" value={timeCooking} onChange={(e) => setTimeCooking(e.target.value)} placeholder="Waktu Memasak" />
            <TextArea type="text" value={tutorial} onChange={(e) => setTutorial(e.target.value)} placeholder="Tutorial Memasak" />
            <button type="submit" onClick={handleSubmit} className="w-3/4 md:w-1/2 lg:w-2/5 2xl:w-1/3 mt-4 py-2 text-md sm:text-lg md:text-lg lg:text-lg 2xl:text-lg text-white font-bold border-b-4 border-[#006090] bg-[#00A9FF] rounded-md">Submit</button>
        </div>
    </>
}

export default AddRecipe