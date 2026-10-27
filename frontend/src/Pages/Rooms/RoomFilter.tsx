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
        <div className = "border border-secondary border-3 p-3 row">
            <div className = "col">
                <div className="row">
                    <div className="col-sm-4">MinimumCapacity:</div> 
                    <div className="col-sm-4">
                        <input 
                            type="number" 
                            name="minimumCapacity" 
                            onChange={handleChange} 
                            value={Options.minimumCapacity}
                        />
                    </div>
                </div>
                <div className="row"> 
                    <div className="col-sm-4">Location:</div> 
                    <div className="col-sm-4">
                        <input 
                            type="text" 
                            name="location" 
                            onChange={handleChange} 
                            value={Options.location}
                        />
                    </div>
                </div>
            </div>
            <div className = "col">
                <div className = "row"> 
                    <div className="col-sm-1">
                        <input 
                            type="checkbox"
                            name="mustHaveProjector" 
                            onChange={handleChange} 
                            checked={Options.mustHaveProjector}
                        />
                    </div>
                    <div className="col-sm-8">Must Have a Projector</div> 
                </div>
                <div className = "row">
                    <div className="col-sm-1">
                        <input 
                            type="checkbox"
                            name="mustHaveTV" 
                            onChange={handleChange} 
                            checked={Options.mustHaveTV}
                        />
                    </div>
                    <div className="col-sm-8">Must Have a TV Screen</div> 
                </div>
                <div className = "row">
                    <div className="col-sm-1">
                        <input 
                            type="checkbox"
                            name="mustHaveVideoConferencing" 
                            onChange={handleChange} 
                            checked={Options.mustHaveVideoConferencing}
                        />
                    </div>
                    <div className="col-sm-8">Must Have Video Conferencing</div> 
                </div>
                <div className = "row"> 
                    <div className="col-sm-1">
                        <input 
                            type="checkbox"
                            name="mustHaveWhiteBoard" 
                            onChange={handleChange} 
                            checked={Options.mustHaveWhiteBoard}
                            />
                    </div>
                    <div className="col-sm-8">Must Have a WhiteBoard</div> 
                </div>
            </div>
            
        </div>
    )
}

export default RoomFilter;