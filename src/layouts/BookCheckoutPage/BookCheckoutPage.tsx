import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const BookCheckoutPage = () => {
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // const pathInfo = window.location.pathname;
  const bookId = window.location.pathname.split("/")[2];

  useEffect(() => {
    // console.log(`pathInfo: ` + pathInfo);
  }, []);

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
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Empty Component</h1>
      {/* <h1>${pathInfo}</h1> */}
    </div>
  );
};
