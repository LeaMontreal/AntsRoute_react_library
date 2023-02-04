import ReviewModel from "../../models/ReviewModel";

export const LatestReviews: React.FC<{
  reviews: ReviewModel[];
  bookId: number | undefined;
  mobile: boolean;
}> = (props) => {
  return (
    <div>
      <h1>Empty Component</h1>
    </div>
  );
};
