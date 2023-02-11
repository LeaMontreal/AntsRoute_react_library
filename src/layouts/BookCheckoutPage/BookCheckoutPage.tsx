import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import ReviewModel from "../../models/ReviewModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import { LatestReviews } from "./LatestReviews";
import { useOktaAuth } from "@okta/okta-react"; // manually add this correct lib

export const BookCheckoutPage = () => {
  const { authState } = useOktaAuth();

  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Review State
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);
  // State for leave a review
  const [isReviewLeft, setIsReviewLeft] = useState(false);
  const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

  // Loans Count State
  const [currentLoansCount, setCurrentLoansCount] = useState(0);
  const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] =
    useState(true);

  // Is Book Check Out?
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isLoadingBookCheckedOut, setIsLoadingBookCheckedOut] = useState(true);

  // const pathInfo = window.location.pathname;
  const bookId = window.location.pathname.split("/")[2];

  // only for debug
  useEffect(() => {
    // console.log(`pathInfo: ` + pathInfo);
  }, []);

  // fetchBooks
  useEffect(() => {
    const fetchBooks = async () => {
      const url: string = `http://localhost:8080/api/v1/books/${bookId}`;

      const response = await fetch(url);

      // guard clause
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJson = await response.json();

      const loadedBook: BookModel = {
        id: responseJson.id,
        title: responseJson.title,
        author: responseJson.author,
        description: responseJson.description,
        copies: responseJson.copies,
        copiesAvailable: responseJson.copiesAvailable,
        category: responseJson.category,
        img: responseJson.img,
      };

      setBook(loadedBook);
      setIsLoading(false);
    };

    // catch exception
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [isCheckedOut]);

  // fetchBookReviews
  useEffect(() => {
    const fetchBookReviews = async () => {
      const reviewUrl: string = `http://localhost:8080/api/v1/reviews/search/findByBookId?bookId=${bookId}`;

      const responseReviews = await fetch(reviewUrl);

      if (!responseReviews.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJsonReviews = await responseReviews.json();

      const responseData = responseJsonReviews._embedded.reviews;

      const loadedReviews: ReviewModel[] = [];

      let weightedStarReviews: number = 0;

      for (const key in responseData) {
        loadedReviews.push({
          id: responseData[key].id,
          userEmail: responseData[key].userEmail,
          date: responseData[key].date,
          rating: responseData[key].rating,
          book_id: responseData[key].bookId,
          reviewDescription: responseData[key].reviewDescription,
        });

        // calculate weighted stars
        weightedStarReviews = weightedStarReviews + responseData[key].rating;
      }

      if (loadedReviews) {
        // round stars to .5 or .0, like 3.5, 4.0
        const round = (
          Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
        ).toFixed(1);
        setTotalStars(Number(round));
      }

      setReviews(loadedReviews);
      setIsLoadingReview(false);
    };

    fetchBookReviews().catch((error: any) => {
      setIsLoadingReview(false);
      setHttpError(error.message);
    });
  }, [isReviewLeft]);

  // fetchUserReviewBook
  useEffect(() => {
    const fetchUserReviewBook = async () => {
      // myDebugForOkta
      // if (authState && authState.isAuthenticated)
      {
        const url = `http://localhost:8080/api/v1/reviews/secure/user/book/?bookId=${bookId}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer `,
            // myDebugForOkta
            // ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const userReview = await fetch(url, requestOptions);
        if (!userReview.ok) {
          throw new Error("Something went wrong");
        }

        // API return true/false means if the user left a review for this bookId or not
        const userReviewResponseJson = await userReview.json();
        console.log(`userReviewResponseJson: ${userReviewResponseJson}`);
        setIsReviewLeft(userReviewResponseJson);
      }

      setIsLoadingUserReview(false);
    };

    // catch exception
    fetchUserReviewBook().catch((error: any) => {
      setIsLoadingUserReview(false);
      setHttpError(error.message);
    });
  }, []);
  // myDebugForOkta
  // authState

  // fetchUserCurrentLoansCount
  useEffect(() => {
    const fetchUserCurrentLoansCount = async () => {
      // myDebugForOkta
      // if (authState && authState.isAuthenticated)
      {
        const url = `http://localhost:8080/api/v1/books/secure/currentloans/count`;
        // Add jwt token into request header
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer `,
            // myDebugForOkta
            //  Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        // console.log(`send request`);
        const currentLoansCountResponse = await fetch(url, requestOptions);

        if (!currentLoansCountResponse.ok) {
          throw new Error("Something went wrong!");
        }

        const currentLoansCountResponseJson =
          await currentLoansCountResponse.json();

        // console.log(currentLoansCountResponseJson);
        setCurrentLoansCount(currentLoansCountResponseJson);
      }
      setIsLoadingCurrentLoansCount(false);
    };
    fetchUserCurrentLoansCount().catch((error: any) => {
      setIsLoadingCurrentLoansCount(false);
      setHttpError(error.message);
    });
  }, [isCheckedOut]);

  // fetchUserCheckedOutBook
  useEffect(() => {
    const fetchUserCheckedOutBook = async () => {
      // myDebugForOkta
      // if (authState && authState.isAuthenticated)
      {
        const url = `http://localhost:8080/api/v1/books/secure/ischeckedout/byuser/?bookId=${bookId}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer `,
            // myDebugForOkta
            // ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const bookCheckedOut = await fetch(url, requestOptions);

        if (!bookCheckedOut.ok) {
          throw new Error("Something went wrong!");
        }

        const bookCheckedOutResponseJson = await bookCheckedOut.json();
        setIsCheckedOut(bookCheckedOutResponseJson);
      }
      setIsLoadingBookCheckedOut(false);
    };
    fetchUserCheckedOutBook().catch((error: any) => {
      setIsLoadingBookCheckedOut(false);
      setHttpError(error.message);
    });
  }, []);

  if (
    isLoading ||
    isLoadingReview ||
    isLoadingCurrentLoansCount ||
    isLoadingBookCheckedOut
  ) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function checkoutBook() {
    const url = `http://localhost:8080/api/v1/books/secure/checkout/?bookId=${book?.id}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        // myDebugForOkta
        Authorization: `Bearer `,
        // myDebugForOkta
        // ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const checkoutResponse = await fetch(url, requestOptions);
    if (!checkoutResponse.ok) {
      throw new Error("Something went wrong!");
    }
    setIsCheckedOut(true);
  }

  return (
    <div>
      {/* Desktop */}
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {book?.img ? (
              <img src={book?.img} width="226" height="349" alt="Book" />
            ) : (
              <img
                src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
                width="226"
                height="349"
                alt="Book"
              />
            )}
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead">{book?.description}</p>
              <StarsReview rating={totalStars} size={32} />
            </div>
          </div>
          <CheckoutAndReviewBox
            book={book}
            mobile={false}
            currentLoansCount={currentLoansCount}
            // myDebugForOkta
            isAuthenticated={true}
            // isAuthenticated={authState?.isAuthenticated}
            isCheckedOut={isCheckedOut}
            checkoutBook={checkoutBook}
          />
        </div>
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
      </div>

      {/* Mobile */}
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center alighn-items-center">
          {book?.img ? (
            <img src={book?.img} width="226" height="349" alt="Book" />
          ) : (
            <img
              src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
              width="226"
              height="349"
              alt="Book"
            />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">{book?.author}</h5>
            <p className="lead">{book?.description}</p>
            <StarsReview rating={totalStars} size={32} />
          </div>
        </div>
        <CheckoutAndReviewBox
          book={book}
          mobile={true}
          currentLoansCount={currentLoansCount}
          // myDebugForOkta
          isAuthenticated={true}
          // isAuthenticated={authState?.isAuthenticated}
          isCheckedOut={isCheckedOut}
          checkoutBook={checkoutBook}
        />
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
      </div>
    </div>
  );
};
