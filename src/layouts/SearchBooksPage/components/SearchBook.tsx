import BookModel from "../../../models/BookModel";

export const SearchBook: React.FC<{book: BookModel}> = (props)=>{

    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>

                {/* book image */}
                <div className='col-md-2'>

                </div>

                {/* book description */}
                <div className='col-md-6'>

                </div>

                {/* Detail button */}
                <div className='col-md-4 d-flex justify-content-center align-items-center'>
                    
                </div>
            </div>
        </div>
    );
}