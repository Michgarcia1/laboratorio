import { defineStore } from 'pinia';
import { CitasMedicas } from 'src/interfaces/Interfaces';

export const citasMedicas = defineStore('citasMedicas', {
  state: () => ({
    citas: [] as CitasMedicas[],
  }),
  actions:{
    setCitasMedicas(citasMedicas:CitasMedicas[]){
      this.citas = [...citasMedicas]
    },
  }
})
