import { useEffect } from "react";
import axios from "@/service/axios";

interface XXX {
  ent_total: number,
  air_total: number,
  water_total: number,
  facility_total: number,
  portrait: Array<{
    tag: number,
    name: string,
    counts: number
  }>
  
}

function Water () {
  useEffect(() => {
    async function xxx () {
      let res = await axios<XXX>('/imc/comprehensive/enterprise');
      console.log(res, 'resss');
    }
    
    xxx()
  }, [])
  return (
    <div>
      Water
    </div>
  );
};

export default Water;
