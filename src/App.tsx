import './App.css'
import {Footer} from 'flowbite-react'
import React, {useState} from 'react'
import States, {Estado} from './States'
import Cities from './Cities'

export default function App() {
    const [selectedState, setSelectedState] = useState<Estado>({id: "", nome: "", sigla: ""})

    return (
        <>
            <main className="flex flex-col items-center gap-4 container">
                <h1 className="text-center text-4xl">Infinite Scroll</h1>
                <States
                    selectedState={selectedState}
                    setSelectedState={setSelectedState}
                />

                {selectedState && selectedState.id &&
                  <Cities stateId={selectedState.id}/>
                }

            </main>
            {/*<Footer container={true}>
                <Footer.Copyright
                    href="https://parseiro.github.io"
                    by="Leonardo Vilela Pinheiro"
                    year={2023}
                />
            </Footer>*/}
        </>
    )
}
