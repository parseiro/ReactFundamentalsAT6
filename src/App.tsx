import './App.css'
import {Footer} from 'flowbite-react'
import React, {useState} from 'react'
import States, {Estado} from './States'
import Cities from './Cities'

export default function App() {
    const [selectedState, setSelectedState] = useState<Estado>({id: "", nome: "", sigla: ""})

    // const cities = useAsync(() => fetchCitiesByStateId(selectedState.id), false)

    // Cities data from IBGE
    /*let cities: FetchCities = EMPTY_CITIES
    useEffect(() => {
        if (selectedState && selectedState.id) {
            cities = useAsync(() => fetchCitiesByStateId(selectedState.id), true)
        } else {
            cities = EMPTY_CITIES
        }
    }, [selectedState.id])*/

    return (
        <>
            <main className="flex flex-col items-center gap-4 container">
                <h1 className="text-center text-4xl">Brazilian States and Cities</h1>
                <States
                    selectedState={selectedState}
                    setSelectedState={setSelectedState}
                />

                {selectedState && selectedState.id &&
                  <Cities stateId={selectedState.id}/>
                }

            </main>
            <Footer container={true}>
                <Footer.Copyright
                    href="https://parseiro.github.io"
                    by="Leonardo Vilela Pinheiro"
                    year={2023}
                />
            </Footer>;
        </>
    )
}
