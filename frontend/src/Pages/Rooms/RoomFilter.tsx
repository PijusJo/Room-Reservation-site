import type { RoomFilterOptions } from '@/Types/RoomFiltersOptions';

interface RoomFilterProps {
    Options: RoomFilterOptions;
    setOptions: React.Dispatch<React.SetStateAction<RoomFilterOptions>>;
}

function RoomFilter({Options, setOptions}: RoomFilterProps){

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const target = e.target;
        const name = target.name;
        let value: string | number | boolean;
        if(target instanceof HTMLInputElement && target.type === 'checkbox'){
            value = target.checked;
        } else if(target instanceof HTMLInputElement && target.type === 'number'){
            value = target.value === '' ? '' : Number(target.value)
        } else{
            value = target.value;
        }

        setOptions(prev =>({
            ...prev,
            [name]:value
        }
        )
        );

    }

    return(
        <div className = "border border-secondary border-3 p-3 Containter row">
            <div className = "col">
                <div className="row"> 
                    <div className="col-sm-2">MinimumCapacity:</div> 
                    <div className="col-sm-2">
                        <input 
                            type="number" 
                            name="MinimumCapacity" 
                            onChange={handleChange} 
                            value={Options.MinimumCapacity}
                        />
                    </div>
                        
                </div>
                <div className="row"> 
                    <div className="col-sm-2">Floor:</div> 
                    <div className="col-sm-2">
                        <input 
                            type="text" 
                            name="Floor" 
                            onChange={handleChange} 
                            value={Options.Floor}
                        />
                    </div>
                </div>
            </div>
            <div className = "col">
                <div className = "row"> 
                    <div className="col-sm-4">Must Have a Projector</div> 
                    <div className="col-sm-2">
                        <input 
                            type="checkbox"
                            name="MustHaveProjector" 
                            onChange={handleChange} 
                            checked={Options.MustHaveProjector}
                        />
                    </div>
                </div>
                <div className = "row">
                    <div className="col-sm-4">Must Have a TV Screen</div> 
                    <div className="col-sm-2">
                        <input 
                            type="checkbox"
                            name="MustHaveTV" 
                            onChange={handleChange} 
                            checked={Options.MustHaveTV}
                        />
                    </div>
                </div>
                <div className = "row">
                    <div className="col-sm-4">Must Have Video Conferencing</div> 
                    <div className="col-sm-2">
                        <input 
                            type="checkbox"
                            name="MustHaveVideoConferencing" 
                            onChange={handleChange} 
                            checked={Options.MustHaveVideoConferencing}
                        />
                    </div>
                </div>
                <div className = "row"> 
                    <div className="col-sm-4">Must Have a WhiteBoard</div> 
                    <div className="col-sm-2">
                        <input 
                            type="checkbox"
                            name="MustHaveWhiteBoard" 
                            onChange={handleChange} 
                            checked={Options.MustHaveWhiteBoard}
                            />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default RoomFilter;