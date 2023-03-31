import {Cidade} from "./Cities";
import React, {useState} from "react";
import InfiniteScroll from 'react-infinite-scroller';
import {Table} from "flowbite-react";

interface Props {
    cities: Cidade[],
    perPage: number
}

function CitiesInfiniteTable(props: Props) {
    const {cities, perPage} = props;
    const [page, setPage] = useState<number>(1);
    const [citiesToShow, setCitiesToShow] = useState<Cidade[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchItems = async () => {
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        setPage(page + 1)
        const list = cities?.filter((_, index) => index < endIndex)
        setCitiesToShow(list)
        if (list?.length === cities?.length) {
            setHasMore(false)
        }
    }

    return (<>
            <InfiniteScroll
                loadMore={fetchItems}
                hasMore={hasMore}
                loader={<div className="loader"
                             key={0}>Loading ...</div>}
                useWindow={true}
            >
                <Table striped
                       hoverable>
                    <Table.Head>
                        <Table.HeadCell className="text-center">
                            ID
                        </Table.HeadCell>
                        <Table.HeadCell className="min-w-[300px]">
                            Name
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {citiesToShow?.map(({id, nome}) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                           key={id}>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                                        {id}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {nome}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                    </Table.Body>
                </Table>
            </InfiniteScroll>
        </>
    );
}

export default React.memo(CitiesInfiniteTable);
