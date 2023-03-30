import {Label, Pagination, Select} from "flowbite-react";
import React, {useEffect, useState} from "react";
import {useAsync} from "./useAsync";
import CitiesTable from "./CitiesTable";

export interface Cidade {
    id: string,
    nome: string
}


/*export interface Fetch {
    execute: () => Promise<void>
    status: "idle" | "success" | "error" | "pending",
        value: Cidade[] | null,
    error: string | null,
}*/

interface Props {
    stateId: number | string | null
}

function Cities(props: Props) {
    const {stateId} = props;

    const fetchCitiesByStateId = async (): Promise<Cidade[]> => {
        const resp = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`)
        const json: Cidade[] = await resp.json()
        json.sort((a, b) => a.nome.localeCompare(b.nome))
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
                {/*            <Label
                htmlFor="estados"
                value="Please select a city"
            />
            <Select
                id="estados"
            >
                {cities?.map(({id, nome}) => (
                    <option
                        key={id}
                        value={id}
                    >{nome}</option>
                ))}
            </Select>*/}
                {cities && <>
                  <div className="flex flex-col items-center justify-center text-center">
                    <p>Page {page} of {totalPages}</p>
                    <Pagination
                      currentPage={page}
                      layout="navigation"
                      onPageChange={setPage}
                      showIcons={true}
                      totalPages={totalPages}
                    />
                  </div>
                  <CitiesTable cities={cities}
                               page={page}
                               perPage={perPage}/>

                </>}
            </>
        )}
    </>
}

Cities.propTypes = {}

export default React.memo(Cities)
/*export const EMPTY_CITIES: FetchCities = {
    execute: async () => { },
    status: 'idle',
    value: null,
    error: null
};*/
