import { useOktaAuth } from "@okta/okta-react"; // manually change
import { useState } from "react";

export const AddNewBook = () => {
    const { authState } = useOktaAuth();

    // New Book
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [copies, setCopies] = useState(0);
    const [category, setCategory] = useState('Category');
    const [selectedImage, setSelectedImage] = useState<any>(null);

    // Displays
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    function categoryField(value: string) {
        setCategory(value);
    }

    async function base64ConversionForImages(e: any){
        // console.log(e);

        if(e.target.files[0]){
            getBase64(e.target.files[0]);
        }
    }

    // read local file and save result into selectedImage useState()
    function getBase64(file: any){
        let reader = new FileReader();
        reader.readAsDataURL(file);

        // read file success
        reader.onload = function(){
            setSelectedImage(reader.result);
        };
        // read file error
        reader.onerror = function(error){
            console.log('File Reader Error', error)
        }
    }

    return (
        <div className='container mt-5 mb-5'>
            {/* prompt message bar */}
            {displaySuccess && 
                <div className='alert alert-success' role='alert'>
                    Book added successfully
                </div>
            }
            {displayWarning && 
                <div className='alert alert-danger' role='alert'>
                    All fields must be filled out
                </div>
            }
            {/* Add book card */}
            <div className='card'>
                <div className='card-header'>
                    Add a new book
                </div>
                <div className='card-body'>
                    <form method='POST'>
                        {/* Title,Author,Category */}
                        <div className='row'>
                            {/* Title input */}
                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>Title</label>
                                <input type="text" className='form-control' name='title' required 
                                    onChange={e => setTitle(e.target.value)} value={title} />
                            </div>
                            {/* Author input */}
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> Author </label>
                                <input type="text" className='form-control' name='author' required 
                                    onChange={e => setAuthor(e.target.value)} value={author}/>
                            </div>
                            {/* Category dropdown-menu */}
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> Category</label>
                                <button className='form-control btn btn-secondary dropdown-toggle' type='button' 
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                        {category}
                                </button>
                                <ul id='addNewBookId' className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li><a onClick={() => categoryField('FrontEnd')} className='dropdown-item'>Front End</a></li>
                                    <li><a onClick={() => categoryField('BackEnd')} className='dropdown-item'>Back End</a></li>
                                    <li><a onClick={() => categoryField('Data')} className='dropdown-item'>Data</a></li>
                                    <li><a onClick={() => categoryField('DevOps')} className='dropdown-item'>DevOps</a></li>
                                </ul>
                            </div>
                        </div>
                        {/* Description */}
                        <div className='col-md-12 mb-3'>
                            <label className='form-label'>Description</label>
                            <textarea className='form-control' id='exampleFormControlTextarea1' rows={3} 
                                onChange={e => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        {/* Copies */}
                        <div className='col-md-3 mb-3'>
                            <label className='form-label'>Copies</label>
                            <input type='number' className='form-control' name='Copies' required 
                                onChange={e => setCopies(Number(e.target.value))} value={copies}/>
                        </div>
                        {/* File picker */}
                        <input type='file' onChange={e=>base64ConversionForImages(e)}/>
                        {/* Submit Button */}
                        <div>
                            <button type='button' className='btn btn-primary mt-3'>
                                Add Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};