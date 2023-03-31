import {Pagination} from "flowbite-react";
import React, {useEffect, useState} from "react";
import {useAsync} from "./useAsync";
import CitiesInfiniteTable from "./CitiesInfiniteTable";

export interface Cidade {
    id: string,
    nome: string
}

interface Props {
    stateId: number | string | null
}

function Cities(props: Props) {
    const {stateId} = props;

    const fetchCitiesByStateId = async (): Promise<Cidade[]> => {
        const resp = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios?orderBy=nome`)
        const json: Cidade[] = await resp.json()
        return json
    }

    const {value: cities, status, execute} = useAsync<Cidade[]>(fetchCitiesByStateId, false);
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [perPage, setPerPage] = useState(10)

    useEffect(() => {
        if (stateId) execute()
    }, [stateId])

    useEffect(() => {
        if (cities) {
            setPage(1)
            setTotalPages(Math.ceil(cities.length / perPage))
        }
    }, [cities])

    return <>
        {status === 'pending' && <p>Loading...</p>}
        {status === 'error' && <p>Error fetching cities</p>}
        {status === 'success' && (<>
                {cities && <>
                  <CitiesInfiniteTable cities={cities}
                               perPage={perPage}
                  />

                </>}
            </>
        )}
    </>
}

Cities.propTypes = {}

export default React.memo(Cities)
