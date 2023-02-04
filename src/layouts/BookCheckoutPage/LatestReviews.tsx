import { Link } from "react-router-dom";
import ReviewModel from "../../models/ReviewModel";

export const LatestReviews: React.FC<{
  reviews: ReviewModel[];
  bookId: number | undefined;
  mobile: boolean;
}> = (props) => {
  return (
    <div className={props.mobile ? 'mt-3' : 'row mt-5'}>
    <div className={props.mobile ? '' : 'col-sm-2 col-md-2'}>
        <h2>Latest Reviews: </h2>
    </div>
    <div className='col-sm-10 col-md-10'>
        {props.reviews.length > 0 ?
            <>
                {/* we only show 3 reviews even there’re more */}
                {props.reviews.slice(0, 3).map(eachReview => (
                    // Review component
                ))}

                <div className='m-3'>
                    <Link type='button' className='btn main-color btn-md text-white'
                        to={`/reviewlist/${props.bookId}`}>
                        Reach all reviews.
                    </Link>
                </div>
            </>
            :
            <div className='m-3'>
                <p className='lead'>
                    Currently there are no reviews for this book
                </p>
            </div>
        }
    </div>
</div>  );
};