import {Table} from "flowbite-react";
import {Cidade} from "./Cities";
import React from "react";

interface Props {
    cities: Cidade[],
    page: number,
    perPage: number
}

function CitiesTable(props: Props) {
    const {cities, page, perPage} = props;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    return (<>
        <Table striped hoverable>
                <Table.Head>
                    <Table.HeadCell className="text-center">
                        ID
                    </Table.HeadCell>
                    <Table.HeadCell className="min-w-[300px]">
                        Name
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                {cities?.filter((_, index) => index >= startIndex && index < endIndex)
                    .map(({id, nome}) => (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={id}>
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
    </>);
}

export default React.memo(CitiesTable);
