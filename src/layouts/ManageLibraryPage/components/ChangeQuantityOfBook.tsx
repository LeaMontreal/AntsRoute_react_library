import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";

export const ChangeQuantityOfBook: React.FC<{ book: BookModel }> = (props) => {
  const { authState } = useOktaAuth();

  const [quantity, setQuantity] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);

  // When component initialize, change useState() according to props value
  useEffect(() => {
    const fetchBookInState = () => {
      props.book.copies ? setQuantity(props.book.copies) : setQuantity(0);
      props.book.copiesAvailable
        ? setRemaining(props.book.copiesAvailable)
        : setRemaining(0);
    };
    fetchBookInState();
  }, []);

  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
      <div className="row g-0">
        {/* book image */}
        <div className="col-md-2">
          {/* desktop */}
          <div className="d-none d-lg-block">
            {props.book.img ? (
              <img src={props.book.img} width="123" height="196" alt="Book" />
            ) : (
              <img src={require("./../../../Images/BooksImages/book-luv2code-1000.png")} width="123" height="196" alt="Book"
              />
            )}
          </div>
          {/* mobile */}
          <div className="d-lg-none d-flex justify-content-center align-items-center">
            {props.book.img ? (
              <img src={props.book.img} width="123" height="196" alt="Book" />
            ) : (
              <img src={require("./../../../Images/BooksImages/book-luv2code-1000.png")} width="123" height="196" alt="Book" />
            )}
          </div>
        </div>
        {/* wrap title,author,description in a card */}
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{props.book.author}</h5>
            <h4>{props.book.title}</h4>
            <p className="card-text"> {props.book.description} </p>
          </div>
        </div>
        {/* Quantity,Remaining number */}
        <div className="mt-3 col-md-4">
          <div className="d-flex justify-content-center algin-items-center">
            <p>
              Total Quantity: <b>{quantity}</b>
            </p>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <p>
              Books Remaining: <b>{remaining}</b>
            </p>
          </div>
        </div>
        {/* delete button */}
        <div className="mt-3 col-md-1">
          <div className="d-flex justify-content-start">
            <button className="m-1 btn btn-md btn-danger">Delete</button>
          </div>
        </div>
        {/* Increase and Decrease button */}
        <button className="m1 btn btn-md main-color text-white">Increase Quantity</button>
        <button className="m1 btn btn-md btn-warning">Decrease Quantity</button>
      </div>
    </div>
  );
};
