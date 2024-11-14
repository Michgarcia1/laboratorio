import { defineStore } from 'pinia';
import { ResultadosCitas } from 'src/interfaces/Interfaces';

export const citasMedicas = defineStore('citasMedicas', {
  state: () => ({
    citas: [] as ResultadosCitas[],
    paginas: 0
  }),
  actions:{
    setCitasMedicas(citasMedicas:ResultadosCitas[]){
      this.citas = citasMedicas
    },
    setPaginas(paginas:number){
      this.paginas = paginas
    }
  }
})
