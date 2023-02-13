import { useEffect, useState } from "react";
import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";
import { useOktaAuth } from "@okta/okta-react"; // manually add
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const Loans = () => {
  const { authState } = useOktaAuth();

  // Current Loans
  const [shelfCurrentLoans, setShelfCurrentLoans] = useState<
    ShelfCurrentLoans[]
  >([]);
  const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // fetchUserCurrentLoans
  useEffect(() => {
    const fetchUserCurrentLoans =async () => {
        
    }
    fetchUserCurrentLoans().catch((error: any)=>{
        setIsLoadingUserLoans(false);
        setHttpError(error.message);
    });

    // every time re-rendering, go back to left corner
    window.scrollTo(0, 0);
  }, []);

  if (isLoadingUserLoans) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return <div></div>;
};
