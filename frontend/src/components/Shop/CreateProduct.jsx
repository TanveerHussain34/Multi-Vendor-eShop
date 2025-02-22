import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { createProduct } from "../../features/product/productThunks";
import { toast } from "react-toastify";

function CreateProduct() {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();

  useEffect(() => {
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard/all-products");
      window.location.reload();
    }
    if (error) {
      toast.error(error);
    }
  }, [dispatch, success, error, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newForm = new FormData();
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller?._id);
    images.forEach((image) => newForm.append("images", image));
    dispatch(createProduct(newForm));
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  return (
    <div className="w-[90vh] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll scrollbar-hide">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label htmlFor="name" className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            autoComplete="true"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <br />
        <div>
          <label htmlFor="description" className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            rows="8"
            type="text"
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>
        <br />
        <div>
          <label htmlFor="category" className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i, index) => (
                <option key={index} value={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="tags" className="pb-2">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter product tags"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <br />
        <div>
          <label htmlFor="originalPrice" className="pb-2">
            Original Price
          </label>
          <input
            type="number"
            id="originalPrice"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter product original price"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <br />
        <div>
          <label htmlFor="discountPrice" className="pb-2">
            Discount Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="discountPrice"
            required
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter product discount price"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <br />
        <div>
          <label htmlFor="stock" className="pb-2">
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="stock"
            required
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter product stock"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <br />
        <div>
          <label htmlFor="images" className="pb-2">
            Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="images"
            required
            hidden
            multiple
            onChange={handleImageChange}
          />
          <div className="flex w-full items-center flex-wrap">
            <label htmlFor="images">
              <AiOutlinePlusCircle
                size={30}
                className="mt-3 cursor-pointer text-[#555] hover:text-blue-500"
                title="Add Images"
              />
            </label>
            {images &&
              images.map((i, index) => (
                <div key={index} className="relative inline-block">
                  <img
                    src={URL.createObjectURL(i)}
                    alt=""
                    className="w-[120px] h-[120px] object-cover m-2"
                  />
                  <FaTimes
                    size={20}
                    className="absolute top-3 right-3 cursor-pointer text-red-600 bg-white rounded-full"
                    onClick={() =>
                      setImages(images.filter((img, idx) => idx !== index))
                    }
                  />
                </div>
              ))}
          </div>
        </div>
        <br />
        <div>
          <input
            type="submit"
            value="Create"
            className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]  hover:bg-blue-500 hover:text-white sm:text-sm transition duration-200 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
