import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";

export const BookCheckoutPage = () => {
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // const pathInfo = window.location.pathname;
  const bookId = (window.location.pathname).split('/')[2];

  useEffect(() => {
    // console.log(`pathInfo: ` + pathInfo);
  }, []);

  return (
    <div className="container">
      <h1>Empty Component</h1>
      {/* <h1>${pathInfo}</h1> */}
    </div>
  );
};
