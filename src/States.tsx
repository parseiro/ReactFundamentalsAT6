import {Label, Select} from "flowbite-react";
import React from "react";

import {useAsync} from "./useAsync";

export interface Estado {
    id: string,
    sigla: string,
    nome: string
}

export async function fetchStates(): Promise<Estado[]> {
    const newStateList: Estado[] = []
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    const json: Estado[] = await response.json()
    json.forEach(({id, sigla, nome}) => {
        newStateList.push({id, sigla, nome})
    })
    return newStateList
}

interface Props {
    selectedState: Estado,
    setSelectedState: (state: Estado) => void
}

function States(props: Props) {
    const { status, value: states, error} = useAsync<Estado[]>(fetchStates, true)

    const {selectedState, setSelectedState} = props;

    return <>
        {status === 'pending' && <p>Loading...</p>}
        {status === 'error' && <p>Error fetching states: {JSON.stringify(error)}</p>}
        {status === 'success' && (<>
            <Label
                htmlFor="estados"
                value="Please select a state"
            />
            <Select
                id="estados"
                value={selectedState.sigla}
                onChange={ ({target: {value}}) => {
                    const estado = states?.find(({sigla: code}) => code === value)
                    if (!estado) {
                        console.log('Estado não encontrado')
                        return;
                    }
                    setSelectedState(estado)
                }}
            >
                <option value="">Select</option>
                {states?.map(({sigla, nome}) => (
                    <option
                        key={sigla}
                        value={sigla}
                    >{nome}</option>
                ))}
            </Select>
        </>)}

    </>
}

States.propTypes = { };

export default React.memo(States)
