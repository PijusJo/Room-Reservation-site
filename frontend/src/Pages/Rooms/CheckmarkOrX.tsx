
function CheckmakrOrX({condition}: {condition: boolean}){
    return (
        condition? (
        <i className="bi bi-check-circle-fill text-success me-2"></i>): 
        <i className="bi bi-x-circle-fill bool text-danger me-2"></i>)

}
export default CheckmakrOrX;