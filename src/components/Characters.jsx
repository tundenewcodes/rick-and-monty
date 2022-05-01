import React,{useState} from 'react'
import endPoint from  '../api/characterApi'
import  {useQuery }  from 'react-query'
import Character from './Character'

const Characters = () => {
const [page, setPage] = useState(42)
     const fetchChars = async ({queryKey}) => {
       const response = await endPoint.get(`?page=${queryKey[1]}`)
     console.log(response)
         return response
         
     }  

 
const {data,  isPreviousData, isLoading, isError} = useQuery(['characters',page], fetchChars,{keepPreviousData :true})

    if ( isLoading ) {
        return <div >loading...</div>
    }

    if ( isError ) {
        return <div>poor network...</div>
    }
  return (
      <div  className='characters'>{data.data.results.map( result => {
          return <Character character={result}/>
      } )}
      
          <div><button   disabled = {page === 1}  onClick={() =>setPage((oldPage) =>oldPage -1)}>prev</button>
          <button  disabled ={ isPreviousData && !data.data.info.next}  onClick= {() =>setPage((oldPage) =>oldPage +1)  }> next</button>
          </div>
      
      </div>
  )
}

export default Characters