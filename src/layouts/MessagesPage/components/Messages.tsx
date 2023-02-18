import { useOktaAuth } from "@okta/okta-react"; // manually change
import { useEffect, useState } from "react";
import MessageModel from "../../../models/MessageModel";
import { Pagination } from "../../Utils/Pagination";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const Messages = () => {
  const { authState } = useOktaAuth();
  // Loading status
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Messages
  const [messages, setMessages] = useState<MessageModel[]>([]);

  // Pagination
  const [messagesPerPage] = useState(5); // initially every page has 5 items
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // fetchUserMessages
  useEffect(() => {
    const fetchUserMessages = async () => {
      // myDebugForOkta
      // if (authState && authState?.isAuthenticated)
      {
        // myDebugForOkta
        // authState.accessToken?.claims.sub
        const url = `http://localhost:8080/api/v1/messages/search/findByUserEmail/?userEmail=${`watera@gmail.com`}&page=${
          currentPage - 1
        }&size=${messagesPerPage}`;

        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer `,
            // myDebugForOkta
            // ${authState?.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const messagesResponse = await fetch(url, requestOptions);
        if (!messagesResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const messagesResponseJson = await messagesResponse.json();
        console.log(messagesResponseJson.page.totalPages);
        setMessages(messagesResponseJson._embedded.messages);
        setTotalPages(messagesResponseJson.page.totalPages);
      }
      setIsLoadingMessages(false);
    };
    fetchUserMessages().catch((error: any) => {
      setIsLoadingMessages(false);
      setHttpError(error.messages);
    });

    // every time re-rendering, go back to left corner
    window.scrollTo(0, 0);
  }, [currentPage]);
  // myDebugForOkta
  // [authState, currentPage]

  if (isLoadingMessages) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mt-2">
      {messages.length > 0 ? (
        // Show messages list branch
        <>
          <h5>Current Q/A: </h5>
          {messages.map((message) => (
            <div key={message.id}>
              <div className="card mt-2 shadow p-3 bg-body rounded">
                <h5>
                  Case #{message.id}: {message.title}
                </h5>
                <h6>{message.userEmail}</h6>
                <p>{message.question}</p>
                <hr />
                <div>
                  <h5>Response: </h5>
                  {message.response && message.adminEmail ? (
                    <>
                      <h6>{message.adminEmail} (admin)</h6>
                      <p>{message.response}</p>
                    </>
                  ) : (
                    <p>
                      <i>
                        Pending response from administration. Please be patient.
                      </i>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        // No message branch
        <h5>All questions you submit will be shown here</h5>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )}
    </div>
  );
};
