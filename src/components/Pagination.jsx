import React from 'react';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink, MDBBtn } from 'mdb-react-ui-kit';

const Pagination = ({ currentPage, pageLimit, loadBlogsData, data, totalBlog }) => {

    const renderPagination = () => {
        const isFirstPage = currentPage === 0;
        const isLastPage = currentPage >= pageLimit - 1;
        const hasMorePages = data.length === pageLimit && totalBlog > (currentPage + 1) * pageLimit;
        const canGoBack = !isFirstPage;
        const canGoForward = hasMorePages || !isLastPage;

        return (
            <MDBPagination center className='mb-0'>
                {canGoBack && (
                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadBlogsData((currentPage - 1) * pageLimit, currentPage * pageLimit, -1)}>
                            Previous
                        </MDBBtn>
                    </MDBPaginationItem>
                )}
                <MDBPaginationItem>
                    <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
                </MDBPaginationItem>
                {canGoForward && (
                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadBlogsData((currentPage + 1) * pageLimit, (currentPage + 2) * pageLimit, 1)}>
                            Next
                        </MDBBtn>
                    </MDBPaginationItem>
                )}
            </MDBPagination>
        );
    };

    return (
        <div>{renderPagination()}</div>
    );
};

export default Pagination;